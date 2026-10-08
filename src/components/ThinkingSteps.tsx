import { Check, Clock, LoaderCircle, type LucideIcon } from 'lucide-react'
import styles from './ThinkingSteps.module.css'

export type ThinkingStep = {
  label: string
  state: 'current' | 'done'
  // Shown while the step is the current one.
  icon?: LucideIcon
  // Shown once it is done, in place of the tick.
  doneIcon?: LucideIcon
}

type Props = {
  // Only the finished steps and the current one. Upcoming steps are not shown.
  steps: ThinkingStep[]
  // After 10 seconds of waiting: a line that keeps the student's spirits up.
  slow?: boolean
}

export default function ThinkingSteps({ steps, slow = false }: Props) {
  return (
    <div className={styles.wrap} data-inspect="ThinkingSteps">
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const Icon = step.state === 'done' ? (step.doneIcon ?? Check) : (step.icon ?? LoaderCircle)
          return (
            <li key={index} className={`text-sm ${styles.step} ${styles[step.state]}`}>
              <Icon aria-hidden="true" />
              {step.label}
              {step.state === 'done' && <span className="visually-hidden"> (done)</span>}
            </li>
          )
        })}
      </ol>
      {slow && (
        <p className={`text-sm ${styles.step} ${styles.slow}`}>
          <Clock aria-hidden="true" />
          Still working on it. Just a few more moments.
        </p>
      )}
    </div>
  )
}
