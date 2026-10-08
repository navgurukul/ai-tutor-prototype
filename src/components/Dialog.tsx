import { useId, useRef, type ReactNode } from 'react'
import styles from './Dialog.module.css'
import { useModal } from './useModal.ts'

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

export default function Dialog({ open, onClose, ...panel }: Props) {
  const titleId = useId()
  const scrim = useRef<HTMLDivElement>(null)
  useModal(scrim, open, onClose)

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
