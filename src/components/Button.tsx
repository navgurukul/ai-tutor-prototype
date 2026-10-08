import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  icon?: ReactNode
  block?: boolean
  // Off for a short wait. Unlike `disabled`, the button keeps keyboard
  // focus, so the student is still on it when it works again.
  busy?: boolean
}

const inspectNames = { primary: 'PrimaryButton', outline: 'OutlineButton', ghost: 'GhostButton' }

export default function Button({ variant = 'primary', icon, block, busy = false, className, children, type = 'button', onClick, ...rest }: Props) {
  const classes = [styles.button, styles[variant], block && styles.block, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} aria-disabled={busy || undefined} onClick={busy ? undefined : onClick} data-inspect={inspectNames[variant]} {...rest}>
      {icon}
      {children}
    </button>
  )
}
