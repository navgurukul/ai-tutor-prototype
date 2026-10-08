import { NavLink } from 'react-router-dom'
import { APP_NAME, PROTOTYPE_VERSION } from '../config.ts'
import { useInspect } from '../inspect/inspectContext.ts'
import FrameSizer from './FrameSizer.tsx'
import styles from './PrototypeBar.module.css'

const pages = [
  { to: '/prototype/flows', label: 'Flows' },
  { to: '/prototype/tokens', label: 'Tokens' },
  { to: '/prototype/components', label: 'Components' },
]

type Props = { frameId: string; onFrame: (id: string) => void }

// Prototype tooling only: none of this ships in the real app.
export default function PrototypeBar({ frameId, onFrame }: Props) {
  const inspect = useInspect()
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
        {/* Scenarios arrive in Phase 3. */}
        <button type="button" className={styles.item} disabled title="Arrives in Phase 3">
          Scenarios
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
    </header>
  )
}
