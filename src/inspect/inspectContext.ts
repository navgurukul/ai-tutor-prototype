import { createContext, useContext } from 'react'
import type { TokenMap } from './tokenMap.ts'

export type InspectState = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  hovered: Element | null
  pinned: Element | null
  // True while Alt is held: draw distances from the pinned element.
  measuring: boolean
  // Changes whenever the pinned element moves or resizes, so readers refresh.
  revision: number
  map: TokenMap | null
  clear: () => void
}

export const InspectContext = createContext<InspectState | null>(null)

export function useInspect(): InspectState {
  const state = useContext(InspectContext)
  if (!state) throw new Error('useInspect needs an InspectProvider above it')
  return state
}
