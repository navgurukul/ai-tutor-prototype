import { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { APP_NAME, PROTOTYPE_VERSION } from '../config.ts'
import { useInspect } from '../inspect/inspectContext.ts'
import FrameSizer from './FrameSizer.tsx'
import ScenarioPanel from './ScenarioPanel.tsx'
import { useScenarios } from './useScenarios.ts'
import styles from './PrototypeBar.module.css'

const pages = [
  { to: '/prototype/flows', label: 'Flows' },
  { to: '/prototype/tokens', label: 'Tokens' },
  { to: '/prototype/components', label: 'Components' },
  // TEMPORARY: the service test page goes away once the real screens use the services.
  { to: '/prototype/services', label: 'Services' },
]

type Props = { frameId: string; onFrame: (id: string) => void }

// Prototype tooling only: none of this ships in the real app.
export default function PrototypeBar({ frameId, onFrame }: Props) {
  const inspect = useInspect()
  const [scenariosOpen, setScenariosOpen] = useState(false)
  const closeScenarios = useCallback(() => setScenariosOpen(false), [])
  const active = Object.values(useScenarios()).filter(Boolean).length
  return (
    <header className={styles.bar} data-inspector-ui>
      <NavLink to="/" className={styles.title}>
        {APP_NAME} prototype
      </NavLink>
      <span className={styles.version}>{PROTOTYPE_VERSION}</span>

      <nav className={styles.tools} aria-label="Prototype tools">
        <FrameSizer frameId={frameId} onChange={onFrame} />
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
        <span className={styles.divider} aria-hidden="true" />
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
      {scenariosOpen && <ScenarioPanel onClose={closeScenarios} />}
    </header>
  )
}
