import type { ButtonHTMLAttributes } from 'react'
import styles from './HistoryRow.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { title: string; active?: boolean }

export default function HistoryRow({ title, active = false, className, type = 'button', ...rest }: Props) {
  const classes = [styles.row, active && styles.active, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} aria-current={active ? 'page' : undefined} title={title} data-inspect="HistoryRow" {...rest}>
      <span className={styles.title}>{title}</span>
    </button>
  )
}
