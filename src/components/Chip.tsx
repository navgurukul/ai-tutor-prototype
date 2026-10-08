import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Chip.module.css'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode }

export function Chip({ icon, className, children, type = 'button', ...rest }: ChipProps) {
  return (
    <button type={type} className={[styles.chip, className].filter(Boolean).join(' ')} data-inspect="Chip" {...rest}>
      {icon}
      <span className={styles.label}>{children}</span>
    </button>
  )
}

type ClassChipProps = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }

// The class picker in profile step 3. "Class", never "Grade".
export function ClassChip({ selected = false, className, children, type = 'button', ...rest }: ClassChipProps) {
  const classes = [styles.classChip, selected && styles.selected, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} aria-pressed={selected} data-inspect="ClassChip" {...rest}>
      {children}
    </button>
  )
}
