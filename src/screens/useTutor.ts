import { BookOpenCheck, Hourglass, PenLine, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ThinkingStep } from '../components/ThinkingSteps.tsx'
import { model } from '../services/model.ts'
import { retrieval } from '../services/retrieval.ts'
import { newId, sourceFound, type Message, type Source } from '../state/types.ts'

// After this long the wait gets a reassuring line under the steps.
const SLOW_AFTER = 10_000
// After this long the wait is treated as a failure.
const FAIL_AFTER = 45_000

export type Thinking = { steps: ThinkingStep[]; slow: boolean }

type Options = {
  // Search stays inside the student's own class.
  classNum: number
  // The tutor has something to say: an answer, or that it found nothing.
  onAnswer: (chatId: string, message: Message) => void
}

const loaded = () => model.status === 'ready'

// Works out one answer. The steps it reports change only when a service
// call finishes, never on a timer.
export function useTutor(options: Options) {
  const [thinking, setThinking] = useState<Thinking | null>(null)

  const latest = useRef(options)
  useEffect(() => {
    latest.current = options
  })

  // Each question gets a number, so one that was left behind can't report late.
  const run = useRef(0)
  useEffect(
    () => () => {
      run.current += 1
    },
    [],
  )

  // `simpler` is the source of the answer to explain again: with it the
  // search is skipped and the answer comes back in easier words.
  const ask = useCallback(async (chatId: string, question: string, simpler?: Source) => {
    const mine = ++run.current
    const live = () => mine === run.current
    const { classNum } = latest.current

    const steps: ThinkingStep[] = []
    let slow = false
    const show = () => {
      if (live()) setThinking({ steps: steps.map((step) => ({ ...step })), slow })
    }
    // The step before is done the moment the next one starts.
    const start = (label: string, icon: ThinkingStep['icon']) => {
      steps.forEach((step) => (step.state = 'done'))
      steps.push({ label, state: 'current', icon })
      show()
    }
    const say = (message: Omit<Extract<Message, { role: 'tutor' }>, 'id' | 'role' | 'at'>) =>
      latest.current.onAnswer(chatId, { id: newId(), role: 'tutor', at: Date.now(), ...message })

    const slowTimer = setTimeout(() => {
      slow = true
      show()
    }, SLOW_AFTER)
    const failTimer = setTimeout(() => {
      if (!live()) return
      run.current += 1
      setThinking(null)
    }, FAIL_AFTER)

    try {
      // Only for a very quick first question, before the load has finished.
      if (!loaded()) {
        start('Getting ready', Hourglass)
        // A loop, because the load can be started again while this waits.
        while (!loaded()) await model.load()
        if (!live()) return
      }

      let source = simpler
      if (!simpler) {
        start(`Searching your Class ${classNum} books`, Search)
        const result = await retrieval.search(question, classNum)
        if (!live()) return
        if (!result.found) {
          say({ text: `I couldn’t find this in your Class ${classNum} books. Try asking it another way, or ask your teacher.`, plain: true })
          return
        }
        source = result.source
        // The finished search step says where the answer will come from,
        // and keeps a book for its icon.
        const searched = steps.at(-1)
        if (searched && source) {
          searched.label = sourceFound(source)
          searched.doneIcon = BookOpenCheck
        }
      }

      start(simpler ? 'Putting it into simpler words' : 'Putting it into simple words', PenLine)
      const text = await model.generate(question, source, { simpler: simpler !== undefined })
      if (!live()) return
      say({ text, source, simpler: simpler !== undefined })
    } catch {
      // Nothing to add: with no answer after the question, the chat shows
      // "Something went wrong." and offers to try again.
    } finally {
      clearTimeout(slowTimer)
      clearTimeout(failTimer)
      if (live()) setThinking(null)
    }
  }, [])

  return { thinking, ask }
}
