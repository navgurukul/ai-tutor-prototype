import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button.tsx'
import Dialog from '../components/Dialog.tsx'
import { model } from '../services/model.ts'
import { scenarios, type ScenarioName } from '../services/scenarios.ts'
import { clearEverything } from '../state/storage.ts'
import { useStore } from '../state/storeContext.ts'
import { useScenarios } from './useScenarios.ts'
import styles from './ScenarioPanel.module.css'

const switches: { name: ScenarioName; label: string; effect: string }[] = [
  { name: 'slowLaptop', label: 'Slow laptop', effect: 'Every wait takes 3 times longer.' },
  { name: 'memoryLow', label: 'Memory low', effect: 'The memory check reports low memory.' },
  { name: 'searchFindsNothing', label: 'Next search finds nothing', effect: 'Turns itself off after one search.' },
  { name: 'answerFails', label: 'Next answer fails', effect: 'Turns itself off after one answer.' },
  { name: 'fakeMic', label: 'Fake mic', effect: 'Types out a sample question instead of listening.' },
  { name: 'shortIdle', label: 'Short idle timer', effect: 'Returns to the profile picker after 30 seconds, not 15 minutes.' },
]

// Forces the hard paths so nobody has to wait for them. Prototype tooling only.
export default function ScenarioPanel({ onClose }: { onClose: () => void }) {
  const on = useScenarios()
  const { state, checkMemory } = useStore()
  const [confirming, setConfirming] = useState(false)
  const panel = useRef<HTMLDivElement>(null)

  // Esc or a click anywhere else closes the panel.
  useEffect(() => {
    if (confirming) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Element
      if (!panel.current?.contains(target) && !target.closest('[data-scenarios-toggle]')) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [confirming, onClose])

  function toggle(name: ScenarioName, value: boolean) {
    scenarios.set(name, value)
    // Show or clear the memory banner on whatever screen is up.
    if (name === 'memoryLow') void checkMemory()
  }

  function reset() {
    clearEverything()
    window.location.hash = '#/'
    window.location.reload()
  }

  return (
    <div className={styles.panel} ref={panel} role="dialog" aria-label="Scenarios">
      <div>
        <h2 className="h6">Scenarios</h2>
        <p className={`caption ${styles.quiet}`}>Force the hard paths without waiting for them.</p>
      </div>

      <ul className={styles.list}>
        {switches.map((item) => (
          <li key={item.name}>
            <label className={styles.row}>
              <span className={styles.words}>
                <span className="text-sm weight-bold">{item.label}</span>
                <span className={`caption ${styles.quiet}`}>{item.effect}</span>
              </span>
              <input
                type="checkbox"
                role="switch"
                className={styles.switch}
                checked={on[item.name]}
                onChange={(event) => toggle(item.name, event.target.checked)}
              />
            </label>
          </li>
        ))}
      </ul>

      <div className={styles.row}>
        <span className={styles.words}>
          <span className="text-sm weight-bold">Cold model</span>
          <span className={`caption ${styles.quiet}`}>
            Loads the model again, to test asking before it’s ready. Now: {state.modelStatus}.
          </span>
        </span>
        <Button variant="ghost" onClick={() => void model.restart()}>
          Load again
        </Button>
      </div>

      <div className={styles.row}>
        <span className={styles.words}>
          <span className="text-sm weight-bold">Reset prototype</span>
          <span className={`caption ${styles.quiet}`}>Clears all profiles, chats and settings, back to first launch.</span>
        </span>
        <Button variant="ghost" onClick={() => setConfirming(true)}>
          Reset
        </Button>
      </div>

      <Dialog
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Reset the prototype?"
        actions={
          <>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              Keep everything
            </Button>
            <Button onClick={reset}>Reset</Button>
          </>
        }
      >
        This clears every profile, chat and setting on this laptop. It can’t be undone.
      </Dialog>
    </div>
  )
}
