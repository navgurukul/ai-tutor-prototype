// Switches that force the hard paths, so nobody has to wait for them to
// happen. Every simulated service reads its timing and failures from here.

import { prefix } from '../state/storage.ts'

export type ScenarioName = 'slowLaptop' | 'memoryLow' | 'searchFindsNothing' | 'answerFails' | 'fakeMic' | 'shortIdle'

export type Scenarios = Record<ScenarioName, boolean>

const key = `${prefix}scenarios`

const off: Scenarios = {
  slowLaptop: false,
  memoryLow: false,
  searchFindsNothing: false,
  answerFails: false,
  fakeMic: false,
  shortIdle: false,
}

function load(): Scenarios {
  try {
    return { ...off, ...(JSON.parse(localStorage.getItem(key) ?? '{}') as Partial<Scenarios>) }
  } catch {
    return off
  }
}

let current = load()
const listeners = new Set<() => void>()

export const scenarios = {
  get: () => current,

  set(name: ScenarioName, on: boolean) {
    current = { ...current, [name]: on }
    try {
      localStorage.setItem(key, JSON.stringify(current))
    } catch {
      // Not remembered after a reload, but still applied now.
    }
    listeners.forEach((listener) => listener())
  },

  // For the "next ..." scenarios: reports the switch and turns it off again.
  take(name: ScenarioName): boolean {
    const on = current[name]
    if (on) scenarios.set(name, false)
    return on
  },

  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

// A wait that feels like an 8 GB laptop: somewhere between `min` and `max`
// milliseconds, then 20% either way so it never looks scripted, and three
// times longer with Slow laptop on. Rejects if `signal` is aborted.
export function wait(min: number, max = min, signal?: AbortSignal): Promise<void> {
  const base = min + Math.random() * (max - min)
  const spread = 0.8 + Math.random() * 0.4
  const time = base * spread * (current.slowLaptop ? 3 : 1)
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason)
    const timer = setTimeout(resolve, time)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(signal.reason)
    })
  })
}

// How long the app waits with no activity before going back to the picker.
export const idleLimit = () => (current.shortIdle ? 30_000 : 15 * 60_000)
