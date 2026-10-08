import { ArrowRight, BookOpen, WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.tsx'
import { APP_NAME } from '../config.ts'
import { useStore } from '../state/storeContext.ts'
import WelcomeArt from './WelcomeArt.tsx'
import WelcomeShelf from './WelcomeShelf.tsx'
import type { WelcomeLook } from './welcomeLooks.ts'
import styles from './Welcome.module.css'

// Shown only on the first launch on a laptop, before any profile exists.
export default function Welcome({ look = 'centred-bold' }: { look?: WelcomeLook }) {
  const navigate = useNavigate()
  const { state } = useStore()
  // A look is a layout and a colour: centred or two panels, bold or calm.
  const centred = look.startsWith('centred')
  const bold = look.endsWith('bold')
  const classes = [styles.welcome, centred && styles.centred, bold && styles.bold, state.memoryLow && styles.underBanner]
    .filter(Boolean)
    .join(' ')

  const brand = (
    <p className={`h5 ${styles.brand}`}>
      <BookOpen aria-hidden="true" />
      {APP_NAME}
    </p>
  )
  const tagline = <p className={`text-lg ${styles.tagline}`}>Answers come straight from the books you study in class.</p>
  const start = (
    <div className={styles.start}>
      <Button className={styles.cta} onClick={() => navigate('/new-profile')}>
        Start Asking
        <ArrowRight aria-hidden="true" />
      </Button>
      {/* Plain text under the button, so it can't be taken for a second button. */}
      <p className={`text-sm ${styles.offline}`}>
        <WifiOff aria-hidden="true" />
        Works without internet
      </p>
    </div>
  )

  // Centred: the name at the top, the words and the button in the middle,
  // the shelf of books along the bottom.
  if (centred) {
    return (
      <main className={classes}>
        {brand}
        <div className={styles.words}>
          <h1 className={`display ${styles.heading}`}>Ask anything from your books.</h1>
          {tagline}
          {start}
        </div>
        <WelcomeShelf className={styles.shelf} />
      </main>
    )
  }

  return (
    <main className={classes}>
      <div className={styles.inner}>
        <div className={styles.words}>
          {/* The name sits with the words, not in a corner like a website's logo. */}
          {brand}
          <h1 className={`display ${styles.heading}`}>
            Ask anything
            <br />
            from your books.
          </h1>
          {tagline}
          {start}
        </div>
        <WelcomeArt className={styles.art} />
      </div>
    </main>
  )
}
