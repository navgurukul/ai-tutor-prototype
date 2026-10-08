import { Mic } from 'lucide-react'
import type { ButtonHTMLAttributes, Ref } from 'react'
import styles from './MicButton.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'composer' | 'empty'
  listening?: boolean
  // Off while an answer is being worked on. Unlike `disabled`, the mic keeps
  // keyboard focus, so Space works again the moment the answer is in.
  busy?: boolean
  ref?: Ref<HTMLButtonElement>
}

// Tap once to listen, tap again to send. The big one sits on the empty chat.
export default function MicButton({ size = 'composer', listening = false, busy = false, className, type = 'button', onClick, ...rest }: Props) {
  const classes = [styles.mic, size === 'empty' && styles.empty, listening && styles.listening, className]
    .filter(Boolean)
    .join(' ')
  return (
    <button
      type={type}
      className={classes}
      aria-label={listening ? 'Stop listening and send' : 'Speak your question'}
      aria-pressed={listening}
      aria-disabled={busy || undefined}
      onClick={busy ? undefined : onClick}
      data-inspect={size === 'empty' ? 'MicEmptyState' : 'MicComposer'}
      {...rest}
    >
      {listening && (
        <>
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.ring} aria-hidden="true" />
        </>
      )}
      <Mic aria-hidden="true" />
    </button>
  )
}
