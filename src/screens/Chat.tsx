import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button.tsx'
import { useStore } from '../state/storeContext.ts'
import styles from './Chat.module.css'
import screen from './Screen.module.css'

// TEMPORARY: a stand-in for the empty chat, so the launch flow has somewhere
// to land. Phase 5 replaces it with the sidebar, mic, chips and composer.
export default function Chat() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const profile = state.profiles.find((item) => item.id === state.activeProfileId)

  // Nobody is signed in after a relaunch, so the app starts again from the top.
  if (!profile) return <Navigate to="/" replace />

  function leave() {
    dispatch({ type: 'profile/enter', profileId: null })
    navigate('/')
  }

  return (
    <main className={screen.centred}>
      <div className={styles.greeting}>
        <h1 className="h2">Hi, {profile.name}</h1>
        <p className="text-lg">What do you want to understand today?</p>
      </div>
      <div className={styles.note}>
        <p className="caption">Prototype note: the mic, suggestions and typing arrive in Phase 5.</p>
        <Button variant="ghost" onClick={leave}>
          Switch
        </Button>
      </div>
    </main>
  )
}
