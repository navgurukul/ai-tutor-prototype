import { Volume2, VolumeX } from 'lucide-react'
import Button from './Button.tsx'
import styles from './VoiceControl.module.css'

type Speed = 'normal' | 'slow'

type Props = {
  voiceOn: boolean
  speed: Speed
  onVoice: (on: boolean) => void
  onSpeed: (speed: Speed) => void
}

const speeds: { id: Speed; label: string }[] = [
  { id: 'normal', label: 'Normal' },
  { id: 'slow', label: 'Slow' },
]

// Whether new answers are read aloud, and how fast the tutor speaks.
export default function VoiceControl({ voiceOn, speed, onVoice, onSpeed }: Props) {
  return (
    <div className={styles.control} data-inspect="VoiceControl">
      <Button
        variant="ghost"
        className={styles.voice}
        icon={voiceOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        onClick={() => onVoice(!voiceOn)}
      >
        {voiceOn ? 'Voice on' : 'Voice off'}
      </Button>
      <div className={styles.speeds} role="group" aria-label="Voice speed">
        {speeds.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === speed ? `${styles.speed} ${styles.selected}` : styles.speed}
            aria-pressed={item.id === speed}
            onClick={() => onSpeed(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
