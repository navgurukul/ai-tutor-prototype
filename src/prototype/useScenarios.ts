import { useSyncExternalStore } from 'react'
import { scenarios } from '../services/scenarios.ts'

// The scenario switches, kept in step when a "next ..." one turns itself off.
export const useScenarios = () => useSyncExternalStore(scenarios.subscribe, scenarios.get)
