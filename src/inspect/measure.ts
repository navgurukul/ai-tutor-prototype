// Reads one element and describes it the way the Inspect panel shows it:
// every value with the token that produces it.

import {
  colourKey,
  colourText,
  fontKey,
  lengthKey,
  parseColour,
  radiusKey,
  shadowKey,
  weightKey,
  type Category,
  type TokenMap,
} from './tokenMap.ts'

export type Value = {
  text: string
  tokens: string[]
  // A value that should come from a token but matches none.
  missing: boolean
  // How to write it in CSS: var(--token) when there is one.
  css: string
  swatch?: string
}

export type Row = { label: string; summary?: string; values: Value[] }

export type Box = { top: number; right: number; bottom: number; left: number }

export type Inspection = {
  name: string
  component: string | null
  tag: string
  text: string
  width: Value
  height: Value
  x: number
  y: number
  box: { margin: string[]; border: string[]; padding: string[] }
  boxRows: Row[]
  layout: Row[]
  type: Row[]
  colour: Row[]
  shape: Row[]
  contrast: { ratio: number; pass: boolean; large: boolean; on: string } | null
  css: string
}

const round = (number: number) => Math.round(number * 100) / 100
const number = (value: string) => parseFloat(value) || 0
const plain = (text: string, css = text): Value => ({ text, tokens: [], missing: false, css })

function lengthValue(map: TokenMap, px: number, categories: Category[], required: boolean): Value {
  if (px === 0) return plain('0')
  const names = map.find(categories, lengthKey(Math.abs(px)))
  if (names.length === 0) return { text: String(round(px)), tokens: [], missing: required, css: `${round(px)}px` }
  return px < 0
    ? { text: String(round(px)), tokens: names.map((name) => `-${name}`), missing: false, css: `calc(var(--${names[0]}) * -1)` }
    : { text: String(round(px)), tokens: names, missing: false, css: `var(--${names[0]})` }
}

function colourValue(map: TokenMap, computed: string): Value | null {
  const colour = parseColour(computed)
  if (!colour || colour[3] === 0) return null
  const names = map.find(['color'], colourKey(computed) ?? '')
  return {
    text: colourText(computed),
    tokens: names,
    missing: names.length === 0,
    css: names.length > 0 ? `var(--${names[0]})` : computed,
    swatch: computed,
  }
}

// Four sides, written the short CSS way: "16", "0 24" or all four.
function shorthand(parts: string[]): string {
  const [top, right, bottom, left] = parts
  if (top === right && top === bottom && top === left) return top
  if (top === bottom && right === left) return `${top} ${right}`
  return parts.join(' ')
}

function sidesRow(label: string, sides: Value[]): Row {
  const texts = sides.map((side) => side.text)
  if (new Set(texts).size === 1) return { label, values: [sides[0]] }
  const distinct = sides.filter((side, index) => side.text !== '0' && texts.indexOf(side.text) === index)
  return { label, summary: shorthand(texts), values: distinct }
}

const sideNames = ['top', 'right', 'bottom', 'left'] as const

// "rgba(38, 38, 38, 0.08) 0px 2px 4px 0px" as "0 2 4 · #262626 8%".
function shadowText(computed: string): string {
  const colours = computed.match(/rgba?\([^)]*\)/g) ?? []
  if (colours.length !== 1) return computed
  const offsets = computed.replace(colours[0], '').trim().split(/\s+/).map(number)
  return `${offsets.slice(0, offsets[3] ? 4 : 3).join(' ')} · ${colourText(colours[0])}`
}

// The font in the stack that is actually drawn, found by measuring text.
function renderedFamily(stack: string): string {
  const context = document.createElement('canvas').getContext('2d')
  const families = stack.split(',').map((family) => family.trim().replace(/['"]/g, ''))
  if (!context) return families[0]
  const sample = 'mmmwwwlliiiQQ@#'
  const width = (font: string) => {
    context.font = `72px ${font}`
    return context.measureText(sample).width
  }
  const generic = new Set(['serif', 'sans-serif', 'monospace', 'system-ui', 'cursive', 'fantasy'])
  for (const family of families) {
    if (generic.has(family)) return family
    const drawn = ['monospace', 'serif'].some((fallback) => width(`"${family}", ${fallback}`) !== width(fallback))
    if (drawn) return family
  }
  return families[0]
}

// WCAG relative luminance and contrast.
function luminance([r, g, b]: number[]): number {
  const [x, y, z] = [r, g, b].map((part) => {
    const channel = part / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * x + 0.7152 * y + 0.0722 * z
}

const over = (top: number[], under: number[]) => top.slice(0, 3).map((part, index) => part * top[3] + under[index] * (1 - top[3]))

// The colour really behind an element: the nearest solid background, with
// any see-through ones on the way laid over it.
function backgroundBehind(element: Element): number[] {
  const layers: number[][] = []
  for (let node: Element | null = element; node; node = node.parentElement) {
    const colour = parseColour(getComputedStyle(node).backgroundColor)
    if (!colour || colour[3] === 0) continue
    layers.push(colour)
    if (colour[3] === 1) break
  }
  return layers.reduceRight((under, layer) => over(layer, under), [255, 255, 255])
}

// The element whose text styles to report: itself if it holds text directly,
// otherwise the first text inside a small component such as a button or row.
function textHost(element: Element): Element | null {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) return element
  const hasOwnText = Array.from(element.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
  if (hasOwnText) return element
  if ((element.textContent ?? '').trim().length === 0 || (element.textContent ?? '').trim().length > 80) return null
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
  while (walker.nextNode()) {
    if (walker.currentNode.textContent?.trim()) return walker.currentNode.parentElement
  }
  return null
}

export function nameOf(element: Element): string {
  return element.getAttribute('data-inspect') ?? element.tagName.toLowerCase()
}

export function inspect(element: Element, map: TokenMap): Inspection {
  const style = getComputedStyle(element)
  const rect = element.getBoundingClientRect()
  const parent = element.parentElement?.getBoundingClientRect()
  const css: string[] = []
  const declare = (property: string, value: string) => css.push(`${property}: ${value};`)

  // Size: layout decides most widths and heights, so no token is not a fault.
  const sizeFirst: Category[] = element instanceof SVGElement ? ['icon', 'size'] : ['size', 'space']
  const width = lengthValue(map, rect.width, sizeFirst, false)
  const height = lengthValue(map, rect.height, sizeFirst, false)
  if (width.tokens.length > 0) declare('width', width.css)
  if (height.tokens.length > 0) declare('height', height.css)

  // Box model. Typed OM is used only to tell an "auto" margin from a number.
  const typed = 'computedStyleMap' in element ? element.computedStyleMap() : null
  const margin = sideNames.map((side) =>
    typed?.get(`margin-${side}`)?.toString() === 'auto'
      ? plain('auto')
      : lengthValue(map, number(style.getPropertyValue(`margin-${side}`)), ['space'], true),
  )
  const borderWidth = sideNames.map((side) => lengthValue(map, number(style.getPropertyValue(`border-${side}-width`)), ['border'], true))
  const padding = sideNames.map((side) => lengthValue(map, number(style.getPropertyValue(`padding-${side}`)), ['space'], true))
  const boxRows = [sidesRow('Margin', margin), sidesRow('Border', borderWidth), sidesRow('Padding', padding)]

  // Layout
  const layout: Row[] = [{ label: 'Display', values: [plain(style.display)] }]
  declare('display', style.display)
  if (style.display.includes('flex') || style.display.includes('grid')) {
    if (style.display.includes('flex')) {
      layout.push({ label: 'Direction', values: [plain(style.flexDirection)] })
      if (style.flexDirection !== 'row') declare('flex-direction', style.flexDirection)
    }
    const gaps = [style.rowGap, style.columnGap].map((gap) => lengthValue(map, number(gap), ['space'], true))
    layout.push(
      gaps[0].text === gaps[1].text
        ? { label: 'Gap', values: [gaps[0]] }
        : { label: 'Gap', summary: `${gaps[0].text} ${gaps[1].text}`, values: gaps.filter((value) => value.text !== '0') },
    )
    if (gaps.some((value) => value.text !== '0')) declare('gap', shorthand([gaps[0].css, gaps[1].css, gaps[0].css, gaps[1].css]))
    layout.push({ label: 'Align', values: [plain(style.alignItems)] })
    layout.push({ label: 'Justify', values: [plain(style.justifyContent)] })
    if (style.alignItems !== 'normal') declare('align-items', style.alignItems)
    if (style.justifyContent !== 'normal') declare('justify-content', style.justifyContent)
  }
  if (padding.some((side) => side.text !== '0')) declare('padding', shorthand(padding.map((side) => side.css)))
  if (margin.some((side) => side.text !== '0')) declare('margin', shorthand(margin.map((side) => side.css)))

  // Shape
  const radius = ['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((corner): Value => {
    const computed = style.getPropertyValue(`border-${corner}-radius`).split(' ')[0]
    if (number(computed) === 0) return plain('0')
    const names = map.find(['radius'], radiusKey(computed))
    const text = computed.endsWith('%') ? computed : String(round(number(computed)))
    return { text, tokens: names, missing: names.length === 0, css: names.length > 0 ? `var(--${names[0]})` : computed }
  })
  const drawn = sideNames.filter((_, index) => borderWidth[index].text !== '0')
  const borderStyle = drawn.length > 0 ? style.getPropertyValue(`border-${drawn[0]}-style`) : ''
  const borderRow = sidesRow('Border', borderWidth)
  const shape: Row[] = [
    sidesRow('Radius', radius),
    { ...borderRow, summary: [borderRow.summary, borderStyle].filter(Boolean).join(' · ') || undefined },
  ]
  if (radius.some((corner) => corner.text !== '0')) declare('border-radius', shorthand(radius.map((corner) => corner.css)))

  // Colour
  const colour: Row[] = []
  const host = textHost(element)
  const hostStyle = host ? getComputedStyle(host) : null
  const textColour = hostStyle && colourValue(map, hostStyle.color)
  if (textColour) colour.push({ label: 'Text', values: [textColour] })
  if (element instanceof SVGElement) {
    const stroke = colourValue(map, style.color)
    if (stroke) colour.push({ label: 'Icon', values: [stroke] })
  }
  const fill = colourValue(map, style.backgroundColor)
  if (fill) {
    colour.push({ label: 'Fill', values: [fill] })
    declare('background', fill.css)
  }
  if (style.backgroundImage !== 'none') {
    colour.push({ label: 'Fill image', values: [{ text: 'gradient or image', tokens: [], missing: true, css: style.backgroundImage }] })
  }
  const borderColours = drawn
    .map((side) => colourValue(map, style.getPropertyValue(`border-${side}-color`)))
    .filter((value): value is Value => value !== null)
  const distinctBorders = borderColours.filter((value, index) => borderColours.findIndex((other) => other.text === value.text) === index)
  if (distinctBorders.length > 0) colour.push({ label: 'Border', values: distinctBorders })
  drawn.forEach((side) => {
    const index = sideNames.indexOf(side)
    const sideColour = colourValue(map, style.getPropertyValue(`border-${side}-color`))
    const value = `${borderWidth[index].css} ${style.getPropertyValue(`border-${side}-style`)} ${sideColour?.css ?? 'transparent'}`
    if (drawn.length === 4 && distinctBorders.length <= 1 && new Set(borderWidth.map((item) => item.text)).size === 1) {
      if (index === 0) declare('border', value)
    } else {
      declare(`border-${side}`, value)
    }
  })
  if (style.boxShadow !== 'none') {
    const names = map.find(['elevation'], shadowKey(style.boxShadow))
    colour.push({
      label: 'Shadow',
      values: [{ text: shadowText(style.boxShadow), tokens: names, missing: names.length === 0, css: names.length > 0 ? `var(--${names[0]})` : style.boxShadow }],
    })
    declare('box-shadow', names.length > 0 ? `var(--${names[0]})` : style.boxShadow)
  }
  if (textColour) declare('color', textColour.css)

  // Typography
  const type: Row[] = []
  let contrast: Inspection['contrast'] = null
  if (host && hostStyle) {
    const size = number(hostStyle.fontSize)
    const line = number(hostStyle.lineHeight)
    const fontNames = map.find(['font'], fontKey(hostStyle.fontFamily))
    const step = map.steps.find((item) => item.size === round(size) && item.line === round(line) && fontNames.includes(item.font))
    const sizeNames = step ? [`${step.name}-size`] : map.find(['type-size'], lengthKey(size))
    const lineNames = step ? [`${step.name}-line`] : map.find(['type-line'], lengthKey(line))
    const weightNames = map.find(['weight'], weightKey(hostStyle.fontWeight))

    type.push({
      label: 'Family',
      values: [{ text: renderedFamily(hostStyle.fontFamily), tokens: fontNames, missing: fontNames.length === 0, css: fontNames.length > 0 ? `var(--${fontNames[0]})` : hostStyle.fontFamily }],
    })
    type.push({ label: 'Size', values: [{ text: String(round(size)), tokens: sizeNames, missing: sizeNames.length === 0, css: sizeNames.length > 0 ? `var(--${sizeNames[0]})` : `${round(size)}px` }] })
    type.push({
      label: 'Line height',
      values: [hostStyle.lineHeight === 'normal' ? plain('normal') : { text: String(round(line)), tokens: lineNames, missing: lineNames.length === 0, css: lineNames.length > 0 ? `var(--${lineNames[0]})` : `${round(line)}px` }],
    })
    type.push({
      label: 'Weight',
      values: [{ text: hostStyle.fontWeight, tokens: weightNames, missing: weightNames.length === 0, css: weightNames.length > 0 ? `var(--${weightNames[0]})` : hostStyle.fontWeight }],
    })
    if (hostStyle.letterSpacing !== 'normal' && number(hostStyle.letterSpacing) !== 0) {
      const em = round(number(hostStyle.letterSpacing) / size)
      const names = map.find(['tracking'], `tracking:${em}`)
      type.push({ label: 'Spacing', values: [{ text: `${em}em`, tokens: names, missing: names.length === 0, css: names.length > 0 ? `var(--${names[0]})` : `${em}em` }] })
    }
    type.push({
      label: 'Type step',
      values: [plain(step ? `${step.name} · ${step.size}/${step.line} · ${hostStyle.fontWeight}` : 'No type step matches')],
    })
    type.forEach((row) => {
      const property = { Family: 'font-family', Size: 'font-size', 'Line height': 'line-height', Weight: 'font-weight', Spacing: 'letter-spacing' }[row.label]
      if (property) declare(property, row.values[0].css)
    })

    const text = parseColour(hostStyle.color)
    if (text) {
      const behind = backgroundBehind(host)
      const shown = over(text, behind)
      const [lighter, darker] = [luminance(shown), luminance(behind)].sort((a, b) => b - a)
      const ratio = (lighter + 0.05) / (darker + 0.05)
      const large = size >= 24 || (size >= 18.66 && Number(hostStyle.fontWeight) >= 700)
      contrast = {
        ratio: Math.floor(ratio * 10) / 10,
        pass: ratio >= (large ? 3 : 4.5),
        large,
        on: colourText(`rgb(${behind.map(Math.round).join(', ')})`),
      }
    }
  }

  const ancestor = element.parentElement?.closest('[data-inspect]')
  return {
    name: nameOf(element),
    component: element.hasAttribute('data-inspect') ? null : (ancestor?.getAttribute('data-inspect') ?? null),
    tag: element.tagName.toLowerCase(),
    text: (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.value || element.placeholder : (element.textContent ?? ''))
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 40),
    width,
    height,
    x: parent ? round(rect.left - parent.left) : 0,
    y: parent ? round(rect.top - parent.top) : 0,
    box: { margin: margin.map((side) => side.text), border: borderWidth.map((side) => side.text), padding: padding.map((side) => side.text) },
    boxRows,
    layout,
    type,
    colour,
    shape,
    contrast,
    css: css.join('\n'),
  }
}

export type Segment = { x1: number; y1: number; x2: number; y2: number; length: number }

// Distance lines from the pinned box to the hovered one, the way Figma draws
// them: the gap when they sit apart, edge-to-edge when one overlaps the other.
export function distances(pinned: DOMRect, hovered: DOMRect): Segment[] {
  const segments: Segment[] = []
  const add = (x1: number, y1: number, x2: number, y2: number) => {
    const length = round(Math.abs(x2 - x1) + Math.abs(y2 - y1))
    if (length > 0) segments.push({ x1, y1, x2, y2, length })
  }
  const middleY = pinned.top + pinned.height / 2
  const middleX = pinned.left + pinned.width / 2

  if (hovered.right <= pinned.left) add(hovered.right, middleY, pinned.left, middleY)
  else if (hovered.left >= pinned.right) add(pinned.right, middleY, hovered.left, middleY)
  else {
    add(hovered.left, middleY, pinned.left, middleY)
    add(pinned.right, middleY, hovered.right, middleY)
  }

  if (hovered.bottom <= pinned.top) add(middleX, hovered.bottom, middleX, pinned.top)
  else if (hovered.top >= pinned.bottom) add(middleX, pinned.bottom, middleX, hovered.top)
  else {
    add(middleX, hovered.top, middleX, pinned.top)
    add(middleX, pinned.bottom, middleX, hovered.bottom)
  }
  return segments
}
