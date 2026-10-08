import { createContext, useContext, type Dispatch } from 'react'
import type { Action } from './store.tsx'
import type { AppState, Chat } from './types.ts'

export type Store = {
  state: AppState
  dispatch: Dispatch<Action>
  // Runs the memory check now and updates the warning. Resolves to "low".
  checkMemory: () => Promise<boolean>
}

export const StoreContext = createContext<Store | null>(null)

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore needs a StoreProvider above it')
  return store
}

// One profile's chats, newest first.
export function chatsOf(state: AppState, profileId: string): Chat[] {
  return state.chats.filter((chat) => chat.profileId === profileId).sort((a, b) => b.updatedAt - a.updatedAt)
}
