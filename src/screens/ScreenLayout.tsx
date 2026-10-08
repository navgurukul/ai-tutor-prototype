import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import StatusBanner from '../components/StatusBanner.tsx'
import { useStore } from '../state/storeContext.ts'
import styles from './ScreenLayout.module.css'

// Wraps every screen the student sees. The low-memory warning sits at the
// top of whatever screen is up and never blocks it.
export default function ScreenLayout() {
  const { state, checkMemory } = useStore()
  const [checking, setChecking] = useState(false)

  async function checkAgain() {
    setChecking(true)
    await checkMemory()
    setChecking(false)
  }

  return (
    <div className={styles.layout}>
      {state.memoryLow && (
        <div className={styles.banner}>
          <StatusBanner tone="warning" action={{ label: 'Check again', onClick: checkAgain, disabled: checking }}>
            Your laptop is running low on memory. Close other apps, like Chrome, so your tutor runs smoothly.
          </StatusBanner>
        </div>
      )}
      <div className={styles.screen}>
        <Outlet />
      </div>
    </div>
  )
}
