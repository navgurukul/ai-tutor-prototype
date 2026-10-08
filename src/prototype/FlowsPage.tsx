import { ExternalLink } from 'lucide-react'
import board1 from '../../docs/flows/1-launch-and-profiles.png'
import board2 from '../../docs/flows/2-asking-a-question.png'
import board3 from '../../docs/flows/3-thinking-and-answer.png'
import board4 from '../../docs/flows/4-coming-back-to-chats.png'
import PageShell from './PageShell.tsx'
import styles from './FlowsPage.module.css'

const boards = [
  { src: board1, title: '1 · Launch and profiles', covers: 'App launch, background loading, welcome, making a profile, the profile picker.' },
  { src: board2, title: '2 · Asking a question', covers: 'Empty chat, speaking or typing, Cancel, suggestion chips.' },
  { src: board3, title: '3 · Thinking and the answer', covers: 'Thinking steps, the not-found fallback, the answer, speech, Hear again, Explain simpler.' },
  { src: board4, title: '4 · Coming back to chats', covers: 'New chat, old chats, Switch, the 15-minute idle return, chat titles.' },
]

const legend = [
  { className: styles.keyScreen, label: 'Screen the student sees' },
  { className: styles.keyApp, label: 'Done by the app' },
  { className: styles.keyDecision, label: 'Decision' },
  { className: styles.keyWarning, label: 'Warning or fallback' },
]

export default function FlowsPage() {
  return (
    <PageShell
      eyebrow="Reference"
      title="Flows"
      intro="The four flow boards the prototype is built from. Where a board and the spec disagree, the spec wins."
    >
      <ul className={styles.legend} aria-label="How to read the boards">
        {legend.map((key) => (
          <li key={key.label} className={`text-sm ${styles.key}`}>
            <span className={`${styles.keyBox} ${key.className}`} aria-hidden="true" />
            {key.label}
          </li>
        ))}
      </ul>

      {boards.map((board) => (
        <section key={board.title} className={styles.board}>
          <header className={styles.boardHeader}>
            <div>
              <h2 className="h4">{board.title}</h2>
              <p className={`text-sm ${styles.covers}`}>{board.covers}</p>
            </div>
            <a className={`text-sm weight-bold ${styles.open}`} href={board.src} target="_blank" rel="noreferrer">
              Open full size
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </header>
          <img className={styles.image} src={board.src} alt={`Flow board ${board.title}. ${board.covers}`} loading="lazy" />
        </section>
      ))}
    </PageShell>
  )
}
