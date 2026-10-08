import { Check, LoaderCircle, type LucideIcon } from 'lucide-react'
import styles from './ThinkingSteps.module.css'

export type ThinkingStep = { label: string; state: 'current' | 'done'; icon?: LucideIcon }

type Props = {
  // Only the finished steps and the current one. Upcoming steps are not shown.
  steps: ThinkingStep[]
  // After 10 seconds of waiting.
  slow?: boolean
}

export default function ThinkingSteps({ steps, slow = false }: Props) {
  return (
    <div className={styles.wrap} data-inspect="ThinkingSteps">
      <ol className={styles.steps}>
        {steps.map((step) => {
          const Icon = step.state === 'done' ? Check : (step.icon ?? LoaderCircle)
          return (
            <li key={step.label} className={`text-sm ${styles.step} ${styles[step.state]}`}>
              <Icon aria-hidden="true" />
              {step.label}
              {step.state === 'done' && <span className="visually-hidden"> (done)</span>}
            </li>
          )
        })}
      </ol>
      {slow && <p className={`caption ${styles.slow}`}>Still working. This laptop may take a little longer.</p>}
    </div>
  )
}
