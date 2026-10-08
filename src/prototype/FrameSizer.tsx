import { frames } from './frames.ts'
import styles from './PrototypeBar.module.css'

export default function FrameSizer({ frameId, onChange }: { frameId: string; onChange: (id: string) => void }) {
  return (
    <label className={styles.frame}>
      Frame
      <select className={styles.select} value={frameId} onChange={(event) => onChange(event.target.value)}>
        {frames.map((frame) => (
          <option key={frame.id} value={frame.id}>
            {frame.label}
          </option>
        ))}
      </select>
    </label>
  )
}
