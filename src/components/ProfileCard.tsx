import { Plus } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import type { Animal } from '../data/animals.ts'
import { Avatar } from './Avatar.tsx'
import styles from './ProfileCard.module.css'

type ProfileCardProps = ButtonHTMLAttributes<HTMLButtonElement> & { name: string; animal: Animal }

export function ProfileCard({ name, animal, className, type = 'button', ...rest }: ProfileCardProps) {
  return (
    <button type={type} className={[styles.card, styles.profile, className].filter(Boolean).join(' ')} data-inspect="ProfileCard" {...rest}>
      <Avatar animal={animal} />
      <span className={`h5 ${styles.name}`}>{name}</span>
    </button>
  )
}

export function AddProfileCard({ className, type = 'button', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={[styles.card, styles.add, className].filter(Boolean).join(' ')} data-inspect="AddProfileCard" {...rest}>
      <Plus aria-hidden="true" />
      <span className="text weight-bold">New Profile</span>
    </button>
  )
}
