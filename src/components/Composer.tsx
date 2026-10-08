import { ArrowUp, Mic } from 'lucide-react'
import type { FormEvent, KeyboardEvent, Ref } from 'react'
import IconButton from './IconButton.tsx'
import styles from './Composer.module.css'

type Props = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  // Goes back to speaking. Left out where a mic is already on screen.
  onSpeak?: () => void
  // True while an answer is being worked on: the student can still type.
  busy?: boolean
  // The text field, so a screen can move focus to it.
  inputRef?: Ref<HTMLTextAreaElement>
}

// The box for typing a question. Speaking comes first, so this only shows
// once the student asks to type.
export default function Composer({ value, onChange, onSend, onSpeak, busy = false, inputRef }: Props) {
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
      {onSpeak && (
        <IconButton label="Speak Instead" className={styles.speak} onClick={onSpeak}>
          <Mic aria-hidden="true" />
        </IconButton>
      )}

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

      <IconButton type="submit" variant="filled" label="Send" disabled={!canSend}>
        <ArrowUp aria-hidden="true" />
      </IconButton>
    </form>
  )
}
