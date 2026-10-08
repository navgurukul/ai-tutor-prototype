import { BookOpen } from 'lucide-react'
import { useId } from 'react'
import styles from './SourceLine.module.css'

type Props = {
  // Short form, e.g. "NCERT · Class 6 Science · Ch 12 · p. 215".
  label: string
  // Full book, chapter and page, shown in the tooltip.
  detail: string
}

// Where an answer came from. Plain words with a book icon: it leads
// nowhere, so nothing about it should look like something to press.
export default function SourceLine({ label, detail }: Props) {
  const tooltipId = useId()
  return (
    <p className={`text-sm ${styles.source}`} data-inspect="SourceLine">
      <BookOpen aria-hidden="true" />
      <span className={styles.label} aria-describedby={tooltipId}>
        {label}
      </span>
      <span className={`caption ${styles.tooltip}`} id={tooltipId} role="tooltip">
        {detail}
      </span>
    </p>
  )
}
