import { scenarios, wait } from './scenarios.ts'

// Checks free memory. The real threshold will come from a test on a real
// laptop; the prototype reports low only when the scenario says so.
export const memory = {
  async check(): Promise<{ low: boolean }> {
    await wait(300)
    return { low: scenarios.get().memoryLow }
  },
}
