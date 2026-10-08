import { Outlet } from 'react-router-dom'
import StatusBanner from '../components/StatusBanner.tsx'
import { useStore } from '../state/storeContext.ts'
import styles from './ScreenLayout.module.css'

// Wraps every screen the student sees. The low-memory warning sits at the
// top of whatever screen is up and never blocks it. It has no button: the
// store keeps checking, and the warning goes once memory is free.
export default function ScreenLayout() {
  const { state } = useStore()

  return (
    <div className={styles.layout}>
      {state.memoryLow && (
        <div className={styles.banner}>
          <StatusBanner tone="warning">Your laptop is running low on memory. Close other apps, like Chrome, so your tutor runs smoothly.</StatusBanner>
        </div>
      )}
      <div className={styles.screen}>
        <Outlet />
      </div>
    </div>
  )
}
