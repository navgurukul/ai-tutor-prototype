import { Square, Volume2 } from 'lucide-react'
import { useMemo } from 'react'
import { parseAnswer, type Block, type Piece } from '../services/answerText.ts'
import Button from './Button.tsx'
import SourceLine from './SourceLine.tsx'
import styles from './TutorAnswer.module.css'

type Props = {
  // Plain text with blank lines between blocks. "## " starts a heading,
  // "### " a sub-heading, "- " a list item, and **two stars** mark a key term.
  text: string
  source?: { label: string; detail: string }
  speaking?: boolean
  // While speaking: the word the voice is on, counted through the whole
  // answer from 0. Before the first word it is -1.
  spokenWord?: number
  onHearAgain?: () => void
  onStop?: () => void
  onExplainSimpler?: () => void
  // True while another answer is being worked on.
  busy?: boolean
}

// While the tutor speaks, the words still to come are grey, the word being
// said is marked and the words already said are back to normal.
function wordClass(word: number, spokenWord: number | undefined) {
  if (spokenWord === undefined || word > spokenWord) return styles.word
  return word === spokenWord ? `${styles.word} ${styles.now}` : `${styles.word} ${styles.said}`
}

function inline(pieces: Piece[], spokenWord: number | undefined) {
  return pieces.map((piece, index) => {
    const words =
      piece.word === undefined ? (
        piece.text
      ) : (
        <span key={index} className={wordClass(piece.word, spokenWord)}>
          {piece.text}
        </span>
      )
    return piece.term ? (
      <strong key={index} className={styles.term}>
        {words}
      </strong>
    ) : (
      words
    )
  })
}

function block({ kind, lines }: Block, index: number, spokenWord: number | undefined) {
  if (kind === 'subheading') {
    return (
      <h4 key={index} className="h6">
        {inline(lines[0], spokenWord)}
      </h4>
    )
  }
  if (kind === 'heading') {
    return (
      <h3 key={index} className="h5">
        {inline(lines[0], spokenWord)}
      </h3>
    )
  }
  if (kind === 'list') {
    return (
      <ul key={index} className={styles.list}>
        {lines.map((line, item) => (
          <li key={item}>{inline(line, spokenWord)}</li>
        ))}
      </ul>
    )
  }
  return <p key={index}>{inline(lines[0], spokenWord)}</p>
}

// No bubble: the answer is the page.
export default function TutorAnswer({ text, source, speaking = false, spokenWord = -1, onHearAgain, onStop, onExplainSimpler, busy = false }: Props) {
  const blocks = useMemo(() => parseAnswer(text), [text])
  const hasActions = onHearAgain || onExplainSimpler
  const body = speaking ? `text weight-medium ${styles.body} ${styles.speaking}` : `text weight-medium ${styles.body}`
  return (
    <article className={styles.answer} aria-label="Tutor's answer" data-inspect="TutorAnswer">
      <div className={body}>{blocks.map((item, index) => block(item, index, speaking ? spokenWord : undefined))}</div>

      {source && <SourceLine label={source.label} detail={source.detail} />}

      {hasActions && (
        <div className={styles.actions}>
          {onHearAgain &&
            (speaking ? (
              <Button variant="text" icon={<Square aria-hidden="true" />} onClick={onStop}>
                Stop
              </Button>
            ) : (
              <Button variant="text" icon={<Volume2 aria-hidden="true" />} onClick={onHearAgain}>
                Hear Again
              </Button>
            ))}
          {onExplainSimpler && (
            <Button variant="text" onClick={onExplainSimpler} busy={busy}>
              Make It Simpler
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
