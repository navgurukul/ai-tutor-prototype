import { Square, Volume2 } from 'lucide-react'
import type { ReactNode } from 'react'
import Button from './Button.tsx'
import SourceChip from './SourceChip.tsx'
import styles from './TutorAnswer.module.css'

type Props = {
  // Plain text with blank lines between blocks. "## " starts a heading,
  // "### " a sub-heading, "- " a list item, and **two stars** mark a key term.
  text: string
  source?: { label: string; detail: string }
  speaking?: boolean
  onHearAgain?: () => void
  onStop?: () => void
  onExplainSimpler?: () => void
  // True while another answer is being worked on.
  busy?: boolean
}

function inline(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className={styles.term}>
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

function block(text: string, index: number) {
  if (text.startsWith('### ')) {
    return (
      <h4 key={index} className="h6">
        {inline(text.slice(4))}
      </h4>
    )
  }
  if (text.startsWith('## ')) {
    return (
      <h3 key={index} className="h5">
        {inline(text.slice(3))}
      </h3>
    )
  }
  const lines = text.split('\n')
  if (lines.every((line) => line.startsWith('- '))) {
    return (
      <ul key={index} className={styles.list}>
        {lines.map((line, item) => (
          <li key={item}>{inline(line.slice(2))}</li>
        ))}
      </ul>
    )
  }
  return <p key={index}>{inline(text)}</p>
}

// No bubble: the answer is the page.
export default function TutorAnswer({ text, source, speaking = false, onHearAgain, onStop, onExplainSimpler, busy = false }: Props) {
  const hasActions = onHearAgain || onExplainSimpler
  return (
    <article className={styles.answer} aria-label="Tutor's answer" data-inspect="TutorAnswer">
      <div className={`text ${styles.body}`}>{text.trim().split(/\n{2,}/).map(block)}</div>

      {source && <SourceChip label={source.label} detail={source.detail} />}

      {hasActions && (
        <div className={styles.actions}>
          {onHearAgain &&
            (speaking ? (
              <Button variant="ghost" icon={<Square aria-hidden="true" />} onClick={onStop}>
                Stop
              </Button>
            ) : (
              <Button variant="ghost" icon={<Volume2 aria-hidden="true" />} onClick={onHearAgain}>
                Hear again
              </Button>
            ))}
          {onExplainSimpler && (
            <Button variant="ghost" onClick={onExplainSimpler} busy={busy}>
              Explain simpler
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
