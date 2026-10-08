import { answers, findAnswer } from '../data/answers.ts'
import type { ModelStatus, Source } from '../state/types.ts'
import { scenarios, wait } from './scenarios.ts'

let status: ModelStatus = 'idle'
let loading: Promise<void> | null = null
let run = 0
const listeners = new Set<(status: ModelStatus) => void>()

function setStatus(next: ModelStatus) {
  status = next
  listeners.forEach((listener) => listener(next))
}

// The real app loads a small model through Ollama and keeps it loaded until
// the app closes. Here the load is a 5.5 second wait.
export const model = {
  get status() {
    return status
  },

  subscribe(listener: (status: ModelStatus) => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  // Safe to call many times: there is only ever one load running.
  load(): Promise<void> {
    if (!loading) {
      const mine = ++run
      setStatus('loading')
      loading = wait(5500).then(() => {
        if (mine === run) setStatus('ready')
      })
    }
    return loading
  },

  // The "Cold model" scenario: throw the loaded model away and load again.
  restart(): Promise<void> {
    loading = null
    return model.load()
  },

  // The whole answer arrives at once, like the real app today.
  async generate(question: string, source: Source | undefined, options: { simpler?: boolean } = {}): Promise<string> {
    while (status !== 'ready') await model.load()
    await wait(2000, 4000)
    if (scenarios.take('answerFails')) throw new Error('The answer could not be written')

    const answer =
      source === undefined
        ? answers.find((item) => findAnswer(question, item.classNum) === item)
        : findAnswer(question, source.classNum, source.chapter)
    if (answer && (source === undefined || answer.subject === source.subject)) return options.simpler ? answer.simpler : answer.text

    // The book has it, but the prototype has no answer written for it.
    return source
      ? `This looks like something from Chapter ${source.chapter}, **${source.chapterName}**, in your ${source.subject} book. It starts on page ${source.page}.\n\nI can’t explain this one yet, because this is a test version of the app.`
      : 'I can’t explain this one yet, because this is a test version of the app.'
  },
}
