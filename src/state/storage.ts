import type { Saved } from './types.ts'

// Everything the prototype keeps in localStorage starts with this, so a
// reset can find all of it.
export const prefix = 'ai-tutor-prototype.'

const key = `${prefix}data`
const version = 1

export const emptySaved: Saved = {
  profiles: [],
  chats: [],
  settings: { voiceOn: true, speed: 'normal' },
}

export function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return emptySaved
    const parsed = JSON.parse(raw) as { version?: number; data?: Partial<Saved> }
    if (parsed.version !== version || !parsed.data) return emptySaved
    return {
      profiles: parsed.data.profiles ?? [],
      chats: parsed.data.chats ?? [],
      settings: { ...emptySaved.settings, ...parsed.data.settings },
    }
  } catch {
    return emptySaved
  }
}

export function saveData(data: Saved) {
  try {
    localStorage.setItem(key, JSON.stringify({ version, data }))
  } catch {
    // Storage is full or blocked: the app still works until it is closed.
  }
}

// Profiles, chats, settings, scenarios and prototype choices: all of it.
export function clearEverything() {
  try {
    Object.keys(localStorage)
      .filter((name) => name.startsWith(prefix))
      .forEach((name) => localStorage.removeItem(name))
  } catch {
    // Nothing was stored, so there is nothing to clear.
  }
}
