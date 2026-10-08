import { WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.tsx'
import Card from '../components/Card.tsx'
import { APP_NAME } from '../config.ts'
import screen from './Screen.module.css'
import styles from './Welcome.module.css'

// Shown only on the first launch on a laptop, before any profile exists.
export default function Welcome() {
  const navigate = useNavigate()
  return (
    <main className={screen.centred}>
      <Card className={styles.welcome}>
        <div className={styles.words}>
          <h1 className="h1">{APP_NAME}</h1>
          <p className={`text-lg ${styles.tagline}`}>Ask anything from your books.</p>
        </div>
        <p className={`text-sm weight-medium ${styles.offline}`}>
          <WifiOff aria-hidden="true" />
          Works without internet
        </p>
        <Button onClick={() => navigate('/new-profile')}>Get started</Button>
      </Card>
    </main>
  )
}
