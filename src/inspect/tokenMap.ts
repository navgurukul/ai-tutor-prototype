// Builds a lookup from a rendered value back to the token names that produce
// it. Tokens are read from the :root rules in the page's stylesheets, so
// tokens.css stays the only place they are written down.

export type Category =
  | 'color'
  | 'size'
  | 'space'
  | 'icon'
  | 'border'
  | 'radius'
  | 'type-size'
  | 'type-line'
  | 'weight'
  | 'font'
  | 'elevation'
  | 'tracking'

export type TypeStep = { name: string; size: number; line: number; font: 'font-heading' | 'font-text' | 'font-label' }

type Token = { name: string; value: string; category: Category; key: string }

export type TokenMap = {
  // Names of the tokens whose value is `key`, looking in `categories` first
  // and then, for lengths, in any other length category.
  find: (categories: Category[], key: string) => string[]
  steps: TypeStep[]
  count: number
}

// When a length matches nothing in the preferred categories, these are tried in order.
const lengthOrder: Category[] = ['size', 'space', 'icon', 'border', 'radius', 'type-size', 'type-line']

const round = (number: number) => Math.round(number * 100) / 100

export const lengthKey = (px: number) => `len:${round(px)}`
export const radiusKey = (computed: string) => (computed.endsWith('%') ? `pct:${round(parseFloat(computed))}` : lengthKey(parseFloat(computed)))
export const fontKey = (stack: string) => `font:${stack.split(',')[0].trim().replace(/['"]/g, '').toLowerCase()}`
export const weightKey = (weight: string) => `weight:${weight}`
export const shadowKey = (computed: string) => `shadow:${computed.replace(/\s+/g, ' ').trim()}`

// "rgb(38, 38, 38)" or "rgba(38, 38, 38, 0.4)" as [r, g, b, a].
export function parseColour(computed: string): [number, number, number, number] | null {
  const parts = computed.match(/[\d.]+/g)
  if (!computed.startsWith('rgb') || !parts || parts.length < 3) return null
  const [r, g, b, a = '1'] = parts
  return [Number(r), Number(g), Number(b), round(Number(a))]
}

export function colourKey(computed: string): string | null {
  const colour = parseColour(computed)
  return colour && `colour:${colour.join(',')}`
}

// Uppercase hex, with the opacity after it when the colour is see-through.
export function colourText(computed: string): string {
  const colour = parseColour(computed)
  if (!colour) return computed
  const hex = '#' + colour.slice(0, 3).map((part) => part.toString(16).padStart(2, '0')).join('').toUpperCase()
  return colour[3] === 1 ? hex : `${hex} ${Math.round(colour[3] * 100)}%`
}

function readRootTokens(): { name: string; value: string }[] {
  const found = new Map<string, string>()
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':root') continue
      for (const property of Array.from(rule.style)) {
        if (property.startsWith('--')) found.set(property.slice(2), rule.style.getPropertyValue(property).trim())
      }
    }
  }
  return Array.from(found, ([name, value]) => ({ name, value }))
}

function categoryOf(name: string, value: string): Category | null {
  if (name.startsWith('font-')) return 'font'
  if (name.startsWith('weight-')) return 'weight'
  if (name.startsWith('elevation-')) return 'elevation'
  if (name.startsWith('radius-')) return 'radius'
  if (name.startsWith('space-')) return 'space'
  if (name.startsWith('border-') || name === 'focus-offset' || name === 'icon-stroke') return 'border'
  if (name.startsWith('icon-')) return 'icon'
  if (name.endsWith('-tracking')) return 'tracking'
  if (name.startsWith('motion')) return null
  if (name.startsWith('size-')) return 'size'
  if (name.endsWith('-size')) return 'type-size'
  if (name.endsWith('-line')) return 'type-line'
  if (CSS.supports('color', value)) return 'color'
  if (CSS.supports('width', value)) return 'size'
  return null
}

// The browser rewrites values (#fff, 0px 2px 4px ...), so each token is
// applied to a hidden element and read back in the same form elements report.
function keyOf(probe: HTMLElement, name: string, value: string, category: Category): string | null {
  const read = (property: string) => {
    probe.style.cssText = ''
    probe.style.setProperty(property, `var(--${name})`)
    return getComputedStyle(probe).getPropertyValue(property)
  }
  switch (category) {
    case 'color':
      return colourKey(read('color'))
    case 'radius':
      return radiusKey(read('border-top-left-radius'))
    case 'weight':
      return weightKey(read('font-weight'))
    case 'elevation':
      return shadowKey(read('box-shadow'))
    case 'font':
      return fontKey(value)
    case 'tracking':
      return `tracking:${round(parseFloat(value))}`
    default:
      return lengthKey(parseFloat(read('width')))
  }
}

export function buildTokenMap(): TokenMap {
  const probe = document.createElement('div')
  probe.setAttribute('data-inspector-ui', '')
  probe.hidden = true
  document.body.append(probe)

  const tokens: Token[] = []
  for (const { name, value } of readRootTokens()) {
    const category = categoryOf(name, value)
    const key = category && keyOf(probe, name, value, category)
    if (category && key) tokens.push({ name, value, category, key })
  }
  probe.remove()

  const inCategory = (category: Category, key: string) =>
    tokens.filter((token) => token.category === category && token.key === key).map((token) => token.name)

  const find = (categories: Category[], key: string) => {
    const order = key.startsWith('len:') ? [...categories, ...lengthOrder] : categories
    for (const category of order) {
      const names = inCategory(category, key)
      if (names.length > 0) return names
    }
    return []
  }

  const px = (name: string) => parseFloat(tokens.find((token) => token.name === name)?.key.slice(4) ?? '')
  const steps: TypeStep[] = tokens
    .filter((token) => token.category === 'type-size')
    .map((token) => token.name.slice(0, -'-size'.length))
    .map((name) => ({
      name,
      size: px(`${name}-size`),
      line: px(`${name}-line`),
      font: /^(display|h\d)$/.test(name) ? 'font-heading' : name === 'label' ? 'font-label' : 'font-text',
    }))

  return { find, steps, count: tokens.length }
}
