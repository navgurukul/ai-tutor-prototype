import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import Button from './Button.tsx'
import styles from './StatusBanner.module.css'

type Props = {
  tone: 'success' | 'warning' | 'error' | 'info'
  children: ReactNode
  action?: { label: string; onClick: () => void; busy?: boolean }
}

const icons = { success: CircleCheck, warning: TriangleAlert, error: CircleX, info: Info }

// Status is never colour alone: every banner has an icon and words.
export default function StatusBanner({ tone, children, action }: Props) {
  const Icon = icons[tone]
  return (
    <div className={`${styles.banner} ${styles[tone]}`} role={tone === 'error' ? 'alert' : 'status'} data-inspect="StatusBanner">
      <Icon aria-hidden="true" />
      <p className={`text weight-medium ${styles.message}`}>{children}</p>
      {action && (
        <Button variant="ghost" className={styles.action} onClick={action.onClick} busy={action.busy}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
