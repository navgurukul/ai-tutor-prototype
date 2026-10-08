// Ready answers for the likeliest questions. The real app writes its answers
// with a model; the prototype picks one of these by keyword. The answers
// themselves are in answers6.ts and answers7.ts, and every question that
// works is listed in docs/test-questions.md.
//
// Every answer is written for an 11-year-old and its facts have been checked.
// Key terms are marked with **two stars**. Blank lines separate paragraphs,
// and lines that start with "- " make a list.
//
// UNVERIFIED: the page numbers are placeholders, like the page ranges in
// textbooks.ts, and must be checked against the printed books.

import { class6 } from './answers6.ts'
import { class7 } from './answers7.ts'
import { matchScore, type Subject } from './textbooks.ts'

export type Answer = {
  id: string
  classNum: 6 | 7
  subject: Subject
  chapter: number
  page: number
  // Lower-case words and phrases that point to this answer.
  keywords: string[]
  // The question as a student would ask it.
  question: string
  // One of the first questions the scripted microphone types out.
  sample?: boolean
  // What the chat is called in the sidebar: 3 to 5 words.
  title: string
  text: string
  simpler: string
}

// Order matters inside a class: the first answer whose keywords fit the
// question wins, so narrow topics come before broad ones.
export const answers: Answer[] = [...class6, ...class7]

// The answer for a question in one class, or nothing: the first one in the
// list above with a keyword in the question.
export function findAnswer(question: string, classNum: number, chapter?: number): Answer | undefined {
  return answers.find(
    (answer) =>
      answer.classNum === classNum && (chapter === undefined || answer.chapter === chapter) && matchScore(question, answer.keywords) > 0,
  )
}

// Questions for the scripted microphone, the chosen samples first.
export function samplesFor(classNum: number): string[] {
  const mine = answers.filter((answer) => answer.classNum === classNum)
  return [...mine.filter((answer) => answer.sample), ...mine.filter((answer) => !answer.sample)].map((answer) => answer.question)
}
