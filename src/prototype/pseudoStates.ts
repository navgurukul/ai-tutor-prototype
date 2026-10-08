// Lets the Components page show hover, pressed and focus without a pointer.
// For every CSS rule that uses :hover, :active or :focus(-visible), it adds a
// twin right after it that matches [data-pseudo~="hover"] and so on, so a
// forced state looks exactly like the real one.

const pseudo = /:(hover|active|focus-visible|focus)(?![\w-])/g
const names: Record<string, string> = { hover: 'hover', active: 'pressed', 'focus-visible': 'focus', focus: 'focus' }

const done = new WeakSet<CSSStyleSheet>()

function addTwins(container: CSSStyleSheet | CSSGroupingRule) {
  for (let index = container.cssRules.length - 1; index >= 0; index--) {
    const rule = container.cssRules[index]
    if (rule instanceof CSSStyleRule) {
      const forced = rule.selectorText
        .split(',')
        .filter((selector) => selector.search(pseudo) !== -1)
        .map((selector) => selector.replace(pseudo, (_, name: string) => `[data-pseudo~="${names[name]}"]`))
      if (forced.length > 0) container.insertRule(`${forced.join(',')}{${rule.style.cssText}}`, index + 1)
    } else if (rule instanceof CSSGroupingRule) {
      addTwins(rule)
    }
  }
}

export function enablePseudoStates() {
  for (const sheet of Array.from(document.styleSheets)) {
    if (done.has(sheet)) continue
    done.add(sheet)
    try {
      addTwins(sheet)
    } catch {
      // A sheet from another origin can't be read. There are none in this app.
    }
  }
}
