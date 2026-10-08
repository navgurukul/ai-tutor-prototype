import { NavLink } from 'react-router-dom'
import { APP_NAME, PROTOTYPE_VERSION } from '../config.ts'
import styles from './PrototypeBar.module.css'

const pages = [
  { to: '/prototype/flows', label: 'Flows' },
  { to: '/prototype/tokens', label: 'Tokens' },
  { to: '/prototype/components', label: 'Components' },
]

// Prototype tooling only: none of this ships in the real app.
export default function PrototypeBar() {
  return (
    <header className={styles.bar} data-inspector-ui>
      <NavLink to="/" className={styles.title}>
        {APP_NAME} prototype
      </NavLink>
      <span className={styles.version}>{PROTOTYPE_VERSION}</span>

      <nav className={styles.tools} aria-label="Prototype tools">
        {/* Frame and Inspect arrive in Phase 2, Scenarios in Phase 3. */}
        <button type="button" className={styles.item} disabled title="Arrives in Phase 2">
          Frame: Fit window
        </button>
        <button type="button" className={styles.item} disabled title="Arrives in Phase 2">
          Inspect
        </button>
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
