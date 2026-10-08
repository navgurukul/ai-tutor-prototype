import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { memory } from '../services/memory.ts'
import { model } from '../services/model.ts'
import { launchMemoryCheck } from './launch.ts'
import { loadSaved, saveData } from './storage.ts'
import { StoreContext } from './storeContext.ts'
import type { AppState, Chat, Message, ModelStatus, Profile, Settings } from './types.ts'

export type Action =
  | { type: 'profile/add'; profile: Profile }
  // Entering a profile, or leaving it (null) through Switch or the idle return.
  | { type: 'profile/enter'; profileId: string | null }
  | { type: 'chat/add'; chat: Chat }
  | { type: 'chat/message'; chatId: string; message: Message }
  | { type: 'chat/title'; chatId: string; title: string }
  | { type: 'settings/set'; settings: Partial<Settings> }
  | { type: 'model/status'; status: ModelStatus }
  | { type: 'memory/low'; low: boolean }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'profile/add':
      return { ...state, profiles: [...state.profiles, action.profile] }
    case 'profile/enter':
      return { ...state, activeProfileId: action.profileId }
    case 'chat/add':
      return { ...state, chats: [...state.chats, action.chat] }
    case 'chat/message':
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.id === action.chatId ? { ...chat, messages: [...chat.messages, action.message], updatedAt: action.message.at } : chat,
        ),
      }
    case 'chat/title':
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.chatId ? { ...chat, title: action.title, titled: true } : chat)),
      }
    case 'settings/set':
      return { ...state, settings: { ...state.settings, ...action.settings } }
    case 'model/status':
      return { ...state, modelStatus: action.status }
    case 'memory/low':
      return { ...state, memoryLow: action.low }
  }
}

// How often the memory check repeats while the warning is up.
const MEMORY_RECHECK = 5_000

const start = (): AppState => ({ ...loadSaved(), activeProfileId: null, modelStatus: model.status, memoryLow: false })

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, start)

  const checkMemory = useCallback(async () => {
    const { low } = await memory.check()
    dispatch({ type: 'memory/low', low })
    return low
  }, [])

  // The model load and the memory check start at launch, before this renders.
  // Their results land here whenever they arrive and never block a screen.
  useEffect(() => {
    const stop = model.subscribe((status) => dispatch({ type: 'model/status', status }))
    void model.load()
    void launchMemoryCheck().then(({ low }) => dispatch({ type: 'memory/low', low }))
    return stop
  }, [])

  // While memory is low the check repeats on its own, so the warning goes
  // away once the student has closed enough apps.
  const { memoryLow } = state
  useEffect(() => {
    if (!memoryLow) return
    const timer = setInterval(() => void checkMemory(), MEMORY_RECHECK)
    return () => clearInterval(timer)
  }, [memoryLow, checkMemory])

  // Profiles, chats and settings survive a relaunch.
  const { profiles, chats, settings } = state
  useEffect(() => saveData({ profiles, chats, settings }), [profiles, chats, settings])

  const store = useMemo(() => ({ state, dispatch, checkMemory }), [state, checkMemory])
  return <StoreContext value={store}>{children}</StoreContext>
}
