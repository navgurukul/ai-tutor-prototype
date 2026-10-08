import { answers, findAnswer } from '../data/answers.ts'
import { normalise } from '../data/textbooks.ts'
import { wait } from './scenarios.ts'

// The title a chat has until the model writes one: the question, cut to 40
// characters at a word boundary.
export function placeholderTitle(question: string): string {
  const text = question.replace(/\s+/g, ' ').trim()
  if (text.length <= 40) return text
  const cut = text.slice(0, 40)
  const end = cut.lastIndexOf(' ')
  return `${(end > 0 ? cut.slice(0, end) : cut).replace(/[.,;:!?]+$/, '')}…`
}

const filler = new Set(['what', 'whats', 'why', 'how', 'who', 'when', 'where', 'which', 'is', 'are', 'was', 'do', 'does', 'did', 'can', 'the', 'a', 'an', 'of', 'in', 'on', 'to', 'i', 'me', 'my', 'we', 'our', 'you', 'it', 'there', 'tell', 'about', 'please', 'want', 'learn', 'and', 'or', 'so', 'any', 'hey', 'today'])

// The real app asks the model for a title once the first answer is done.
// Here it is the matched topic's title, or the main words of the question.
export const titles = {
  async generate(question: string, answer: string, signal?: AbortSignal): Promise<string> {
    await wait(1500, 1500, signal)
    const known = answers.find((item) => item.text === answer || item.simpler === answer) ?? answers.find((item) => findAnswer(question, item.classNum) === item)
    if (known) return known.title

    // A short question is its own best title.
    const asked = question.replace(/\s+/g, ' ').trim().replace(/[.?!]+$/, '')
    const length = asked.split(' ').length
    if (length >= 3 && length <= 5) return asked

    const words = normalise(question).trim().split(' ').filter((word) => word && !filler.has(word)).slice(0, 4)
    if (words.length === 0) return 'A new question'
    if (words.length < 3) return `A question about ${words.join(' ')}`
    const title = words.join(' ')
    return title[0].toUpperCase() + title.slice(1)
  },
}
