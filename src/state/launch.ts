import { memory } from '../services/memory.ts'
import { model } from '../services/model.ts'

// What the app starts the moment it opens, before any screen renders. Neither
// ever blocks a screen: the store picks up both results when they arrive.
let firstCheck: Promise<{ low: boolean }> | undefined

export function launch() {
  void model.load()
  firstCheck = memory.check()
}

// The memory check started at launch, the first time this is asked for.
export function launchMemoryCheck(): Promise<{ low: boolean }> {
  const check = firstCheck ?? memory.check()
  firstCheck = undefined
  return check
}
