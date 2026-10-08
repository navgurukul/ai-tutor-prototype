import { useEffect, type RefObject } from 'react'

const focusable = 'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

// What every layer over the app needs from the keyboard: focus moves in, Tab
// stays inside, Esc closes, and focus goes back where it was afterwards.
export function useModal(container: RefObject<HTMLElement | null>, open: boolean, onClose: () => void, start: 'first' | 'last' = 'last') {
  useEffect(() => {
    if (!open) return
    const before = document.activeElement as HTMLElement | null
    const items = () => Array.from(container.current?.querySelectorAll<HTMLElement>(focusable) ?? [])
    items().at(start === 'first' ? 0 : -1)?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const list = items()
      const first = list[0]
      const last = list.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      before?.focus()
    }
  }, [container, open, onClose, start])
}
