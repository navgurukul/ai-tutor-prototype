import { findAnswer } from '../data/answers.ts'
import { chapters, matchScore, type Chapter } from '../data/textbooks.ts'
import type { Source } from '../state/types.ts'
import { scenarios, wait } from './scenarios.ts'

export type SearchResult = { found: boolean; source?: Source }

const sourceOf = (chapter: Chapter, page: number): Source => ({
  classNum: chapter.classNum,
  subject: chapter.subject,
  book: chapter.book,
  chapter: chapter.number,
  chapterName: chapter.name,
  page,
})

// Looks for the question in one class's books, never in another class.
export const retrieval = {
  async search(question: string, classNum: number): Promise<SearchResult> {
    await wait(1500, 2500)
    if (scenarios.take('searchFindsNothing')) return { found: false }

    const mine = chapters.filter((chapter) => chapter.classNum === classNum)

    // A ready answer names its own chapter and page.
    const answer = findAnswer(question, classNum)
    const answerChapter = answer && mine.find((chapter) => chapter.subject === answer.subject && chapter.number === answer.chapter)
    if (answer && answerChapter) return { found: true, source: sourceOf(answerChapter, answer.page) }

    // Otherwise the chapter whose keywords fit best, at its first page.
    let best: Chapter | undefined
    let bestScore = 0
    for (const chapter of mine) {
      const score = matchScore(question, chapter.keywords)
      if (score > bestScore) {
        best = chapter
        bestScore = score
      }
    }
    return best ? { found: true, source: sourceOf(best, best.pages[0]) } : { found: false }
  },
}
