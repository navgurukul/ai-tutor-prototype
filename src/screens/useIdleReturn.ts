import { useEffect, useRef } from 'react'
import { idleLimit } from '../services/scenarios.ts'

// What counts as someone being at the laptop.
const signs = ['pointerdown', 'pointermove', 'wheel', 'keydown'] as const

// Calls onIdle once nobody has touched the laptop for the idle limit, so the
// next student never lands in someone else's chat. While `paused` (the tutor
// is speaking, listening or working on an answer) no time counts as idle,
// and the count starts from zero afterwards.
export function useIdleReturn(paused: boolean, onIdle: () => void) {
  const latest = useRef(onIdle)
  useEffect(() => {
    latest.current = onIdle
  })

  useEffect(() => {
    if (paused) return
    let lastActive = Date.now()
    const active = () => {
      lastActive = Date.now()
    }
    signs.forEach((sign) => window.addEventListener(sign, active, { capture: true, passive: true }))

    // Checked every second against the clock, so the Short idle timer
    // scenario applies as soon as it is switched on.
    const timer = setInterval(() => {
      if (Date.now() - lastActive < idleLimit()) return
      clearInterval(timer)
      latest.current()
    }, 1000)

    return () => {
      clearInterval(timer)
      signs.forEach((sign) => window.removeEventListener(sign, active, { capture: true }))
    }
  }, [paused])
}
