import { useEffect, useId, useRef, type ReactNode } from 'react'
import styles from './Dialog.module.css'

type PanelProps = {
  title: string
  children: ReactNode
  // Buttons, most important last.
  actions: ReactNode
  titleId?: string
}

// The visible box. Dialog adds the scrim and the keyboard behaviour.
export function DialogPanel({ title, children, actions, titleId }: PanelProps) {
  return (
    <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId} data-inspect="Dialog">
      <h2 className="h3" id={titleId}>
        {title}
      </h2>
      <div className={`text ${styles.body}`}>{children}</div>
      <div className={styles.actions}>{actions}</div>
    </div>
  )
}

type Props = PanelProps & { open: boolean; onClose: () => void }

const focusable = 'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

export default function Dialog({ open, onClose, ...panel }: Props) {
  const titleId = useId()
  const scrim = useRef<HTMLDivElement>(null)

  // Move focus in, keep Tab inside, close on Esc, and hand focus back after.
  useEffect(() => {
    if (!open) return
    const before = document.activeElement as HTMLElement | null
    const items = () => Array.from(scrim.current?.querySelectorAll<HTMLElement>(focusable) ?? [])
    items().at(-1)?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const list = items()
      const first = list[0]
      const last = list.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      before?.focus()
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className={styles.scrim}
      ref={scrim}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <DialogPanel {...panel} titleId={titleId} />
    </div>
  )
}
