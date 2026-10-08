import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useStored } from '../prototype/useStored.ts'
import { InspectContext } from './inspectContext.ts'
import { buildTokenMap } from './tokenMap.ts'

// The element under the pointer, if it is part of the app and not of the
// inspector's own UI (bar, panel, outlines).
function inApp(target: EventTarget | null): Element | null {
  if (!(target instanceof Element)) return null
  if (target.closest('[data-inspector-ui]') || !target.closest('[data-app-frame]')) return null
  return target
}

// A click lands on the nearest component. With Shift it lands on the exact
// element (an icon counts as one element, not its paths).
function resolve(target: Element, exact: boolean): Element {
  const element = target.closest('svg') ?? target
  return exact ? element : (element.closest('[data-inspect]') ?? element)
}

const swallowed = ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'dblclick'] as const

export default function InspectProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useStored('inspect', false)
  const [hovered, setHovered] = useState<Element | null>(null)
  const [pinned, setPinned] = useState<Element | null>(null)
  const [measuring, setMeasuring] = useState(false)
  const [revision, setRevision] = useState(0)
  const location = useLocation()

  // A new page, or switching Inspect off and on, drops the old selection.
  const scope = `${location.pathname}|${enabled}`
  const [seenScope, setSeenScope] = useState(scope)
  if (scope !== seenScope) {
    setSeenScope(scope)
    setHovered(null)
    setPinned(null)
  }

  // Key handlers need the current selection the moment a key goes down.
  const pinnedNow = useRef(pinned)
  useEffect(() => {
    pinnedNow.current = pinned
  }, [pinned])

  const clear = useCallback(() => {
    setHovered(null)
    setPinned(null)
  }, [])

  // The lookup is rebuilt each time Inspect is switched on, so it always
  // reflects the tokens that are loaded.
  const map = useMemo(() => (enabled ? buildTokenMap() : null), [enabled])

  // Alt+I works whether Inspect is on or off.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.code === 'KeyI') {
        event.preventDefault()
        setEnabled(!enabled)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [enabled, setEnabled])


  // While on, the pointer selects instead of pressing: every listener is in
  // the capture phase on document, ahead of the app's own handlers.
  useEffect(() => {
    if (!enabled) return

    function onMove(event: PointerEvent) {
      const target = inApp(event.target)
      setHovered(target && resolve(target, event.shiftKey))
      setMeasuring(event.altKey)
    }

    function swallow(event: Event) {
      if (!inApp(event.target)) return
      event.preventDefault()
      event.stopPropagation()
    }

    function onClick(event: MouseEvent) {
      const target = inApp(event.target)
      if (!target) return
      event.preventDefault()
      event.stopPropagation()
      setPinned(resolve(target, event.shiftKey))
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Alt') setMeasuring(true)
      const current = pinnedNow.current
      if (!current) return
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setPinned(null)
        return
      }
      const typing = event.target instanceof Element && event.target.closest('input, textarea, select')
      if (event.key === 'ArrowUp' && !typing) {
        event.preventDefault()
        const parent = current.parentElement
        if (parent && !parent.hasAttribute('data-app-frame') && parent.closest('[data-app-frame]')) setPinned(parent)
      }
    }

    function onKeyUp(event: KeyboardEvent) {
      if (event.key === 'Alt') setMeasuring(false)
    }

    document.addEventListener('pointermove', onMove, true)
    document.addEventListener('click', onClick, true)
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('keyup', onKeyUp, true)
    swallowed.forEach((type) => document.addEventListener(type, swallow, true))
    return () => {
      document.removeEventListener('pointermove', onMove, true)
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('keyup', onKeyUp, true)
      swallowed.forEach((type) => document.removeEventListener(type, swallow, true))
    }
  }, [enabled])

  // Watch the pinned element every frame: scrolling, resizing the window or
  // changing the frame all move it, and it may leave the page altogether.
  useEffect(() => {
    if (!pinned && !hovered) return
    let frame = 0
    let last = ''
    function check() {
      if (pinned && !pinned.isConnected) {
        setPinned(null)
        return
      }
      const key = [pinned, hovered]
        .map((element) => {
          const rect = element?.getBoundingClientRect()
          return rect ? `${rect.x},${rect.y},${rect.width},${rect.height}` : ''
        })
        .join('|')
      if (key !== last) {
        last = key
        setRevision((count) => count + 1)
      }
      frame = requestAnimationFrame(check)
    }
    frame = requestAnimationFrame(check)
    return () => cancelAnimationFrame(frame)
  }, [pinned, hovered])

  const state = useMemo(
    () => ({ enabled, setEnabled, hovered, pinned, measuring, revision, map, clear }),
    [enabled, setEnabled, hovered, pinned, measuring, revision, map, clear],
  )

  return <InspectContext value={state}>{children}</InspectContext>
}
