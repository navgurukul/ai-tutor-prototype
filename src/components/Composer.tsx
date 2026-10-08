import { ArrowUp } from 'lucide-react'
import type { FormEvent, KeyboardEvent, Ref } from 'react'
import Button from './Button.tsx'
import IconButton from './IconButton.tsx'
import MicButton from './MicButton.tsx'
import styles from './Composer.module.css'

type Props = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onMic: () => void
  onCancel?: () => void
  listening?: boolean
  // What has been heard so far, while listening.
  transcript?: string
  // True while an answer is being worked on: the student can still type.
  busy?: boolean
  // A short line under the field, e.g. "I didn't catch that. Try again."
  hint?: string
  // The text field and the mic, so a screen can move focus to them.
  inputRef?: Ref<HTMLTextAreaElement>
  micRef?: Ref<HTMLButtonElement>
}

export default function Composer({ value, onChange, onSend, onMic, onCancel, listening = false, transcript = '', busy = false, hint, inputRef, micRef }: Props) {
  const canSend = !busy && value.trim() !== ''

  function submit(event: FormEvent) {
    event.preventDefault()
    if (canSend) onSend()
  }

  // Enter sends, Shift+Enter adds a line.
  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      if (canSend) onSend()
    }
  }

  return (
    <form className={styles.composer} onSubmit={submit} data-inspect="Composer">
      <MicButton ref={micRef} listening={listening} busy={busy} onClick={onMic} />

      <div className={styles.field}>
        {listening ? (
          <>
            {transcript && <p className={`text-lg ${styles.transcript}`}>{transcript}</p>}
            <p className={`caption ${styles.hint}`}>Listening. Tap again to send.</p>
          </>
        ) : (
          <>
            <textarea
              className={styles.input}
              ref={inputRef}
              rows={1}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your question"
              aria-label="Type your question"
            />
            {hint && <p className={`caption ${styles.hint}`}>{hint}</p>}
          </>
        )}
      </div>

      {listening ? (
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      ) : (
        <IconButton type="submit" variant="filled" label="Send" disabled={!canSend}>
          <ArrowUp aria-hidden="true" />
        </IconButton>
      )}
    </form>
  )
}
