import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddProfileCard, ProfileCard } from '../components/ProfileCard.tsx'
import { animalOf } from '../data/animals.ts'
import { useStore } from '../state/storeContext.ts'
import styles from './ProfilePicker.module.css'
import screen from './Screen.module.css'

// Every launch after the first opens here. No locks: a student taps their card.
export default function ProfilePicker() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()

  // Being on the picker means nobody is signed in.
  const entered = state.activeProfileId !== null
  useEffect(() => {
    if (entered) dispatch({ type: 'profile/enter', profileId: null })
  }, [entered, dispatch])

  function enter(profileId: string) {
    dispatch({ type: 'profile/enter', profileId })
    navigate('/chat')
  }

  return (
    <main className={screen.centred}>
      <h1 className={`h1 ${styles.title}`}>Who&rsquo;s learning today?</h1>
      <ul className={styles.cards}>
        {state.profiles.map((profile) => (
          <li key={profile.id}>
            <ProfileCard name={profile.name} animal={animalOf(profile.animalId)} onClick={() => enter(profile.id)} />
          </li>
        ))}
        <li>
          <AddProfileCard onClick={() => navigate('/new-profile')} />
        </li>
      </ul>
    </main>
  )
}
