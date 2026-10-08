import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import ComponentsPage from './prototype/ComponentsPage.tsx'
import FlowsPage from './prototype/FlowsPage.tsx'
import PrototypeBar from './prototype/PrototypeBar.tsx'
import TokensPage from './prototype/TokensPage.tsx'

export default function App() {
  return (
    <HashRouter>
      <div className={styles.shell}>
        <PrototypeBar />
        <div className={styles.frame} data-app-frame>
          <Routes>
            {/* Product screens arrive in Phase 4. Until then the app opens on Tokens. */}
            <Route path="/" element={<Navigate to="/prototype/tokens" replace />} />
            <Route path="/prototype/tokens" element={<TokensPage />} />
            <Route path="/prototype/flows" element={<FlowsPage />} />
            <Route path="/prototype/components" element={<ComponentsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
