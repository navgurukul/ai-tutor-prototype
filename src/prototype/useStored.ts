import { useCallback, useState } from 'react'

const prefix = 'ai-tutor-prototype.'

// A prototype setting that survives a reload. Falls back quietly when
// localStorage is unavailable.
export function useStored<T>(key: string, initial: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(prefix + key)
      return saved === null ? initial : (JSON.parse(saved) as T)
    } catch {
      return initial
    }
  })

  const store = useCallback(
    (next: T) => {
      setValue(next)
      try {
        localStorage.setItem(prefix + key, JSON.stringify(next))
      } catch {
        // Nothing to do: the choice just won't be remembered.
      }
    },
    [key],
  )

  return [value, store]
}
