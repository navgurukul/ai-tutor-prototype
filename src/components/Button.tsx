import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
  icon?: ReactNode
  block?: boolean
}

const inspectNames = { primary: 'PrimaryButton', outline: 'OutlineButton', ghost: 'GhostButton' }

export default function Button({ variant = 'primary', icon, block, className, children, type = 'button', ...rest }: Props) {
  const classes = [styles.button, styles[variant], block && styles.block, className].filter(Boolean).join(' ')
  return (
    <button type={type} className={classes} data-inspect={inspectNames[variant]} {...rest}>
      {icon}
      {children}
    </button>
  )
}
