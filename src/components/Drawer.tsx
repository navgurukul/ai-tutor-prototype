import { useRef, type ReactNode } from 'react'
import styles from './Drawer.module.css'
import { useModal } from './useModal.ts'

type Props = { open: boolean; onClose: () => void; label: string; children: ReactNode }

// The sidebar, laid over the chat from the left when there's no room to keep
// it open. Esc or a click outside closes it.
export default function Drawer({ open, onClose, label, children }: Props) {
  const scrim = useRef<HTMLDivElement>(null)
  useModal(scrim, open, onClose, 'first')

  if (!open) return null
  return (
    <div
      className={styles.scrim}
      ref={scrim}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={label} data-inspect="Drawer">
        {children}
      </div>
    </div>
  )
}
