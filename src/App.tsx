import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import styles from './App.module.css'
import InspectOverlay from './inspect/InspectOverlay.tsx'
import InspectPanel from './inspect/InspectPanel.tsx'
import InspectProvider from './inspect/InspectProvider.tsx'
import { useInspect } from './inspect/inspectContext.ts'
import ComponentsPage from './prototype/ComponentsPage.tsx'
import FlowsPage from './prototype/FlowsPage.tsx'
import { frames } from './prototype/frames.ts'
import PrototypeBar from './prototype/PrototypeBar.tsx'
import TokensPage from './prototype/TokensPage.tsx'
import { useStored } from './prototype/useStored.ts'

function Shell() {
  const [frameId, setFrameId] = useStored('frame', 'fit')
  const frame = frames.find((item) => item.id === frameId) ?? frames[0]
  const fixed = frame.width !== undefined
  const inspect = useInspect()

  return (
    <div className={styles.shell}>
      <PrototypeBar frameId={frame.id} onFrame={setFrameId} />
      <div className={styles.body}>
        <div className={fixed ? `${styles.stage} ${styles.stageFixed}` : styles.stage}>
          {/* The app. Everything outside this element is prototype tooling. */}
          <div
            className={fixed ? `${styles.frame} ${styles.frameFixed}` : styles.frame}
            style={fixed ? { width: frame.width, height: frame.height } : undefined}
            data-app-frame
            data-inspecting={inspect.enabled || undefined}
          >
            <div className={styles.scroller}>
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
        </div>
        <InspectPanel />
      </div>
      <InspectOverlay />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <InspectProvider>
        <Shell />
      </InspectProvider>
    </HashRouter>
  )
}
