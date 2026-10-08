import type { ReactNode } from 'react'
import styles from './PageShell.module.css'

type Props = {
  eyebrow: string
  title: string
  intro: ReactNode
  children?: ReactNode
}

// Shared frame for the prototype's reference pages (Flows, Tokens, Components).
export default function PageShell({ eyebrow, title, intro, children }: Props) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>
        <h1 className="h1">{title}</h1>
        <p className={`text ${styles.intro}`}>{intro}</p>
      </header>
      {children}
    </main>
  )
}
