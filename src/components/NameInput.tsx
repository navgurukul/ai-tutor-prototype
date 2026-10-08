import { CircleX } from 'lucide-react'
import { useId, type InputHTMLAttributes } from 'react'
import styles from './NameInput.module.css'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  // Shown under the name with an error icon, e.g. when the name is taken.
  error?: string
}

export default function NameInput({ error, className, maxLength = 20, ...rest }: Props) {
  const errorId = useId()
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} data-inspect="NameInput">
      <input
        type="text"
        className={styles.input}
        maxLength={maxLength}
        aria-label="Your name"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        autoComplete="off"
        spellCheck={false}
        {...rest}
      />
      <p className={`caption ${styles.error}`} id={errorId} role="alert">
        {error && (
          <>
            <CircleX aria-hidden="true" />
            {error}
          </>
        )}
      </p>
    </div>
  )
}
