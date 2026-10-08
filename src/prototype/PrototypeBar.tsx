import { useCallback, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { APP_NAME, PROTOTYPE_VERSION } from '../config.ts'
import { useInspect } from '../inspect/inspectContext.ts'
import { welcomeLooks, type WelcomeLook } from '../screens/welcomeLooks.ts'
import { useStore } from '../state/storeContext.ts'
import FrameSizer from './FrameSizer.tsx'
import ScenarioPanel from './ScenarioPanel.tsx'
import { useScenarios } from './useScenarios.ts'
import styles from './PrototypeBar.module.css'

const pages = [
  { to: '/prototype/flows', label: 'Flows' },
  { to: '/prototype/tokens', label: 'Tokens' },
  { to: '/prototype/components', label: 'Components' },
]

type Props = {
  frameId: string
  onFrame: (id: string) => void
  welcomeLook: WelcomeLook
  onWelcomeLook: (look: WelcomeLook) => void
}

// Prototype tooling only: none of this ships in the real app.
export default function PrototypeBar({ frameId, onFrame, welcomeLook, onWelcomeLook }: Props) {
  const inspect = useInspect()
  const [scenariosOpen, setScenariosOpen] = useState(false)
  const closeScenarios = useCallback(() => setScenariosOpen(false), [])
  const active = Object.values(useScenarios()).filter(Boolean).length
  // Every screen the student sees lives outside /prototype.
  const { pathname } = useLocation()
  const inApp = !pathname.startsWith('/prototype')
  const navigate = useNavigate()
  const { state } = useStore()

  // Picking a look also shows it. Welcome is only at the start on a first
  // launch, so a laptop that has profiles gets it at its own address.
  function pickWelcomeLook(look: WelcomeLook) {
    onWelcomeLook(look)
    const showing = pathname === '/welcome' || (pathname === '/' && state.profiles.length === 0)
    if (!showing) navigate('/welcome')
  }

  return (
    <header className={styles.bar} data-inspector-ui>
      <NavLink to="/" className={styles.title}>
        {APP_NAME} prototype
      </NavLink>
      <span className={styles.version}>{PROTOTYPE_VERSION}</span>

      <nav className={styles.tools} aria-label="Prototype tools">
        <FrameSizer frameId={frameId} onChange={onFrame} />
        <label className={styles.frame}>
          Welcome
          <select
            className={styles.select}
            value={welcomeLook}
            onChange={(event) => pickWelcomeLook(event.target.value as WelcomeLook)}
          >
            {welcomeLooks.map((look) => (
              <option key={look.id} value={look.id}>
                {look.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={inspect.enabled ? `${styles.item} ${styles.on}` : styles.item}
          aria-pressed={inspect.enabled}
          title="Alt + I"
          onClick={() => inspect.setEnabled(!inspect.enabled)}
        >
          Inspect{inspect.enabled ? ': on' : ''}
        </button>
        <button
          type="button"
          className={scenariosOpen ? `${styles.item} ${styles.active}` : styles.item}
          aria-expanded={scenariosOpen}
          data-scenarios-toggle
          onClick={() => setScenariosOpen(!scenariosOpen)}
        >
          Scenarios{active > 0 ? `: ${active} on` : ''}
        </button>
        {/* Straight after its button, so Tab goes from one into the other. */}
        {scenariosOpen && <ScenarioPanel onClose={closeScenarios} />}
        <span className={styles.divider} aria-hidden="true" />
        <NavLink to="/" className={inApp ? `${styles.item} ${styles.active}` : styles.item}>
          App
        </NavLink>
        {pages.map((page) => (
          <NavLink
            key={page.to}
            to={page.to}
            className={({ isActive }) => (isActive ? `${styles.item} ${styles.active}` : styles.item)}
          >
            {page.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
