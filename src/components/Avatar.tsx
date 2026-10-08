import type { ButtonHTMLAttributes } from 'react'
import type { Animal } from '../data/animals.ts'
import styles from './Avatar.module.css'

type AvatarProps = { animal: Animal; size?: 'sm' | 'lg'; className?: string }

// PLACEHOLDER: an emoji in a tinted circle. Illustrated avatars come later.
export function Avatar({ animal, size = 'lg', className }: AvatarProps) {
  return (
    <span
      className={[styles.avatar, styles[size], className].filter(Boolean).join(' ')}
      style={{ background: `var(--${animal.tint})` }}
      aria-hidden="true"
      data-inspect="Avatar"
    >
      {animal.emoji}
    </span>
  )
}

type OptionProps = ButtonHTMLAttributes<HTMLButtonElement> & { animal: Animal; selected?: boolean }

// One animal in the "pick an animal" grid.
export function AvatarOption({ animal, selected = false, className, type = 'button', ...rest }: OptionProps) {
  const classes = [styles.avatar, styles.lg, styles.option, selected && styles.selected, className]
    .filter(Boolean)
    .join(' ')
  return (
    <button
      type={type}
      className={classes}
      style={selected ? undefined : { background: `var(--${animal.tint})` }}
      aria-label={animal.name}
      aria-pressed={selected}
      data-inspect="AvatarOption"
      {...rest}
    >
      <span aria-hidden="true">{animal.emoji}</span>
    </button>
  )
}
