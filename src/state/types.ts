import type { Subject } from '../data/textbooks.ts'

export type ClassNum = 6 | 7 | 8 | 9 | 10 | 11 | 12

export const classNums: ClassNum[] = [6, 7, 8, 9, 10, 11, 12]

// A student on this laptop. No locks: only a remote admin can delete a
// profile or change its class.
export type Profile = {
  id: string
  name: string
  animalId: string
  classNum: ClassNum
  createdAt: number
}

// Where an answer came from in the student's books.
export type Source = {
  classNum: number
  subject: Subject
  book: string
  chapter: number
  chapterName: string
  page: number
}

export type Message =
  // `small` is the follow-up the app adds for "Explain simpler", and `about`
  // is the answer it asks about.
  | { id: string; role: 'student'; text: string; small?: boolean; about?: string; at: number }
  // `plain` marks the "couldn't find it" message: answer style, no source.
  // `simpler` marks an answer that is already the easier version.
  | { id: string; role: 'tutor'; text: string; source?: Source; plain?: boolean; simpler?: boolean; at: number }

export type Chat = {
  id: string
  profileId: string
  // Starts as the trimmed first question, then swaps to a short written title.
  title: string
  titled: boolean
  messages: Message[]
  createdAt: number
  updatedAt: number
}

export type Settings = {
  voiceOn: boolean
  speed: 'normal' | 'slow'
}

export type ModelStatus = 'idle' | 'loading' | 'ready'

// What is kept between launches.
export type Saved = {
  profiles: Profile[]
  chats: Chat[]
  settings: Settings
}

// Saved data plus what only lasts while the app is open.
export type AppState = Saved & {
  activeProfileId: string | null
  modelStatus: ModelStatus
  memoryLow: boolean
}

export const speechRate = { normal: 1, slow: 0.85 } as const

export const newId = () => crypto.randomUUID()

// "NCERT · Class 6 Science · Ch 12 · p. 215"
export const sourceLabel = (source: Source) => `NCERT · Class ${source.classNum} ${source.subject} · Ch ${source.chapter} · p. ${source.page}`

// "Curiosity, Class 6 Science · Chapter 12: Beyond Earth · page 215"
export const sourceDetail = (source: Source) =>
  `${source.book}, Class ${source.classNum} ${source.subject} · Chapter ${source.chapter}: ${source.chapterName} · page ${source.page}`
