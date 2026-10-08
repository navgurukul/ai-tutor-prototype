import styles from './MessageStudent.module.css'

type Props = {
  children: string
  // The small follow-up, like "Make it simpler".
  small?: boolean
}

export default function MessageStudent({ children, small = false }: Props) {
  return (
    <div className={styles.row}>
      <p className={small ? `${styles.bubble} ${styles.small}` : styles.bubble} data-inspect="StudentMessage">
        <span className="visually-hidden">You asked: </span>
        {children}
      </p>
    </div>
  )
}
