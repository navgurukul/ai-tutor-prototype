import type { InputHTMLAttributes, Ref } from 'react'
import styles from './Input.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; ref?: Ref<HTMLInputElement> }

export default function Input({ invalid, className, type = 'text', ...rest }: Props) {
  return (
    <input
      type={type}
      className={[styles.input, className].filter(Boolean).join(' ')}
      aria-invalid={invalid || undefined}
      data-inspect="Input"
      {...rest}
    />
  )
}
