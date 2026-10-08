import type { ButtonHTMLAttributes } from 'react'
import styles from './IconButton.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // Icon-only, so the label is what screen readers and the tooltip say.
  label: string
  variant?: 'plain' | 'filled'
}

export default function IconButton({ label, variant = 'plain', className, children, type = 'button', ...rest }: Props) {
  const classes = [styles.button, variant === 'filled' && styles.filled, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} aria-label={label} title={label} data-inspect="IconButton" {...rest}>
      {children}
    </button>
  )
}
