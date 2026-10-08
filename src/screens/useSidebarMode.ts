import { useCallback, useSyncExternalStore } from 'react'

export type SidebarMode = 'full' | 'rail' | 'drawer'

// From section 12 of docs/style-tokens.md: the sidebar is 280 wide at 1200
// and wider, a 72 rail below that, and a drawer below 1024.
const FULL_FROM = 1200
const RAIL_FROM = 1024

// Follows the width of the app itself, not the browser window, so a fixed
// frame size in the prototype bar behaves like a window of that size.
export function useSidebarMode(app: HTMLElement | null): SidebarMode {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!app) return () => {}
      const observer = new ResizeObserver(onChange)
      observer.observe(app)
      return () => observer.disconnect()
    },
    [app],
  )
  return useSyncExternalStore(subscribe, () => {
    const width = app?.getBoundingClientRect().width ?? FULL_FROM
    return width >= FULL_FROM ? 'full' : width >= RAIL_FROM ? 'rail' : 'drawer'
  })
}
