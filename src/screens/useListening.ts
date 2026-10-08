import { useCallback, useEffect, useRef, useState } from 'react'
import { speech } from '../services/speech.ts'

// Listening ends only by a tap, Cancel or this limit. Nothing stops on silence.
const LIMIT = 60_000

type Options = {
  // What the scripted microphone types out.
  sample?: string
  // The student tapped again and something was heard.
  onSend: (question: string) => void
  // The time limit passed: the transcript goes to the text field to be fixed.
  onTimeUp: (transcript: string) => void
  // Cancel or Esc threw the transcript away.
  onCancel: () => void
}

// One mic: tap to listen, tap again to send. The big mic on the empty chat
// and the smaller one under the messages both work through this.
export function useListening(options: Options) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  // True after a send with nothing heard, until the next try.
  const [missed, setMissed] = useState(false)

  const latest = useRef(options)
  useEffect(() => {
    latest.current = options
  })

  const heard = useRef('')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  // Each start gets a number, so a stopped session can't report late.
  const run = useRef(0)

  const start = useCallback(() => {
    const mine = ++run.current
    heard.current = ''
    setTranscript('')
    setMissed(false)
    setListening(true)

    speech.listen({
      sample: latest.current.sample,
      onInterim(text) {
        if (mine !== run.current) return
        heard.current = text
        setTranscript(text)
      },
      onFinal(text) {
        if (mine !== run.current) return
        run.current += 1
        const question = text.trim()
        if (question) latest.current.onSend(question)
        else setMissed(true)
      },
    })

    timer.current = setTimeout(() => {
      run.current += 1
      speech.cancelListening()
      setListening(false)
      latest.current.onTimeUp(heard.current.trim())
    }, LIMIT)
  }, [])

  // Tap again: stop and send what was heard.
  const send = useCallback(() => {
    clearTimeout(timer.current)
    setListening(false)
    speech.stopListening()
  }, [])

  // Cancel or Esc: throw the transcript away.
  const cancel = useCallback(() => {
    clearTimeout(timer.current)
    run.current += 1
    speech.cancelListening()
    setListening(false)
    setTranscript('')
    latest.current.onCancel()
  }, [])

  useEffect(() => {
    if (!listening) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') cancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [listening, cancel])

  // Leaving the chat stops the microphone.
  useEffect(
    () => () => {
      clearTimeout(timer.current)
      run.current += 1
      speech.cancelListening()
    },
    [],
  )

  return {
    listening,
    transcript,
    missed,
    toggle: listening ? send : start,
    cancel,
    forget: useCallback(() => setMissed(false), []),
  }
}
