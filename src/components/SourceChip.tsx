import { BookOpen } from 'lucide-react'
import { useId } from 'react'
import { Chip } from './Chip.tsx'
import styles from './SourceChip.module.css'

type Props = {
  // Short form, e.g. "NCERT · Class 6 Science · Ch 12 · p. 215".
  label: string
  // Full book, chapter and page, shown in the tooltip.
  detail: string
}

// In the prototype this only shows a tooltip. The real app will open the page.
export default function SourceChip({ label, detail }: Props) {
  const tooltipId = useId()
  return (
    <span className={styles.wrap} data-inspect="SourceChip">
      <Chip icon={<BookOpen aria-hidden="true" />} aria-describedby={tooltipId}>
        {label}
      </Chip>
      <span className={`caption ${styles.tooltip}`} id={tooltipId} role="tooltip">
        {detail}
      </span>
    </span>
  )
}
