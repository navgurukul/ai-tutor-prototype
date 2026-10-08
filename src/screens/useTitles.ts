import { useCallback, useEffect, useRef } from 'react'
import { titles } from '../services/titles.ts'
import { useStore } from '../state/storeContext.ts'
import type { Chat } from '../state/types.ts'

// Swaps a chat's placeholder title for a short written one. Naming a chat
// must never slow down a real answer, so a title job can be dropped at any
// moment and asked for again later.
export function useTitles() {
  const { dispatch } = useStore()
  // The title jobs under way, by chat.
  const jobs = useRef(new Map<string, AbortController>())

  // Leaving the profile drops every job. Those chats get their title the
  // next time they are opened.
  useEffect(() => {
    const running = jobs.current
    return () => {
      running.forEach((job) => job.abort())
      running.clear()
    }
  }, [])

  // Asks for a title, unless the chat has one, one is on its way, or there
  // is no answer yet to name it after.
  const request = useCallback(
    (chat: Chat) => {
      if (chat.titled || jobs.current.has(chat.id)) return
      const question = chat.messages.find((message) => message.role === 'student' && !message.small)
      const answer = chat.messages.find((message) => message.role === 'tutor')
      if (!question || !answer) return

      const job = new AbortController()
      jobs.current.set(chat.id, job)
      titles
        .generate(question.text, answer.text, job.signal)
        .then((title) => {
          if (!job.signal.aborted) dispatch({ type: 'chat/title', chatId: chat.id, title })
        })
        // Dropped: the chat keeps its placeholder for now.
        .catch(() => {})
        .finally(() => {
          if (jobs.current.get(chat.id) === job) jobs.current.delete(chat.id)
        })
    },
    [dispatch],
  )

  const drop = useCallback((chatId: string) => {
    jobs.current.get(chatId)?.abort()
    jobs.current.delete(chatId)
  }, [])

  return { request, drop }
}
