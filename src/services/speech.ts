// Listening and speaking, through the browser for now.
//
// Listening uses the Web Speech API. In Chrome and Edge that sends audio to
// a cloud service, so it needs internet: fine for a prototype, and the real
// app will use local speech-to-text. When the API is missing, the microphone
// is refused, or the Fake mic scenario is on, a sample question is typed out
// word by word instead, which also makes demos repeatable.

import { parseAnswer } from './answerText.ts'
import { scenarios } from './scenarios.ts'

// The parts of the Web Speech API this file uses.
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } }
type Recognition = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: { resultIndex: number; results: ArrayLike<RecognitionResult> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

type ListenOptions = {
  // Everything heard so far, updated as the student speaks.
  onInterim: (transcript: string) => void
  // The transcript to send, after stopListening().
  onFinal: (transcript: string) => void
  // What the scripted microphone types out.
  sample?: string
}

// "word" fires each time the voice moves on to another word of the answer.
type SpeechEvent = 'start' | 'end' | 'word'

const RecognitionClass = (): (new () => Recognition) | undefined => {
  const scope = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition
}

const defaultSample = 'What is the solar system?'

// One listening session at a time.
let session: { stop: () => void; cancel: () => void } | null = null

function listenScripted({ onInterim, onFinal, sample = defaultSample }: ListenOptions) {
  const words = sample.split(' ')
  let heard = ''
  let count = 0
  // About three seconds for the whole question.
  const timer = setInterval(() => {
    count += 1
    heard = words.slice(0, count).join(' ')
    onInterim(heard)
    if (count >= words.length) clearInterval(timer)
  }, 3000 / words.length)

  return {
    stop() {
      clearInterval(timer)
      onFinal(heard)
    },
    cancel() {
      clearInterval(timer)
    },
  }
}

function listenLive(Recogniser: new () => Recognition, options: ListenOptions) {
  const { onInterim, onFinal } = options
  let settled = ''
  let pending = ''
  let active = true
  let wanted: 'listen' | 'send' | 'discard' = 'listen'
  let scripted: ReturnType<typeof listenScripted> | null = null

  const recogniser = new Recogniser()
  recogniser.continuous = true
  recogniser.interimResults = true
  recogniser.lang = 'en-IN'

  recogniser.onresult = (event) => {
    pending = ''
    for (let index = event.resultIndex; index < event.results.length; index++) {
      const result = event.results[index]
      if (result.isFinal) settled = `${settled} ${result[0].transcript}`.trim()
      else pending = `${pending} ${result[0].transcript}`.trim()
    }
    onInterim(`${settled} ${pending}`.trim())
  }

  // No microphone or no connection: carry on with the scripted one.
  recogniser.onerror = (event) => {
    if (!['not-allowed', 'service-not-allowed', 'network', 'audio-capture'].includes(event.error) || !active) return
    console.warn(`Speech recognition failed (${event.error}). Using the scripted microphone.`)
    active = false
    scripted = listenScripted(options)
  }

  // The browser stops by itself after a pause. Nothing in this app stops on
  // silence, so listening starts again and keeps what was heard.
  recogniser.onend = () => {
    if (wanted === 'send') onFinal(`${settled} ${pending}`.trim())
    else if (wanted === 'listen' && active) recogniser.start()
  }

  recogniser.start()

  return {
    stop() {
      if (scripted) return scripted.stop()
      wanted = 'send'
      recogniser.stop()
    },
    cancel() {
      if (scripted) return scripted.cancel()
      wanted = 'discard'
      recogniser.abort()
    },
  }
}

// Speaking

const speechListeners: Record<SpeechEvent, Set<() => void>> = { start: new Set(), end: new Set(), word: new Set() }
const emit = (event: SpeechEvent) => speechListeners[event].forEach((listener) => listener())

let speaking = false
// Each speak() gets a number, so a cancelled one can't report "end" late.
let utteranceRun = 0
// The word of the answer being said, as parseAnswer() counts them. -1 for none.
let word = -1
let wordTimer: ReturnType<typeof setTimeout> | undefined

function sayWord(index: number) {
  if (index === word) return
  word = index
  emit('word')
}

function finish(run: number) {
  if (run !== utteranceRun || !speaking) return
  clearTimeout(wordTimer)
  speaking = false
  word = -1
  emit('end')
}

// One utterance: its text, and where in that text each word of the answer starts.
type Sentence = { text: string; words: { index: number; at: number }[] }

// Signs the voice would skip or read oddly.
const spokenWord = (text: string) =>
  text
    .replace(/÷/g, ' divided by ')
    .replace(/×/g, ' times ')
    .replace(/(\d)\/(\d)/g, '$1 by $2')
    .trim()

// The answer as sentences to say, without the marks that are only for the
// screen. A sentence ends at a full stop, a question or exclamation mark, or
// the end of a line.
export function spokenSentences(text: string): Sentence[] {
  const sentences: Sentence[] = []
  for (const block of parseAnswer(text)) {
    for (const line of block.lines) {
      const words: string[] = []
      let first = -1
      for (const piece of line) {
        if (piece.word === undefined) continue
        if (first < 0) first = piece.word
        words[piece.word - first] = (words[piece.word - first] ?? '') + piece.text
      }

      let sentence: Sentence = { text: '', words: [] }
      const close = () => {
        if (sentence.words.length > 0) sentences.push(sentence)
        sentence = { text: '', words: [] }
      }
      words.forEach((written, offset) => {
        const spoken = spokenWord(written)
        if (spoken) {
          if (sentence.text) sentence.text += ' '
          sentence.words.push({ index: first + offset, at: sentence.text.length })
          sentence.text += spoken
        }
        if (/[.!?]["'”’)\]]*$/.test(written)) close()
      })
      close()
    }
  }
  return sentences
}

// Roughly how long the voice spends on one letter at normal speed.
const LETTER_TIME = 65

// For voices that don't report which word they are on: steps through a
// sentence at about speaking pace. Each sentence starts again from its own
// first word, so the guess never drifts far.
function paceWords(sentence: Sentence, rate: number, run: number, from = 0) {
  clearTimeout(wordTimer)
  const current = sentence.words[from]
  if (!current || run !== utteranceRun) return
  sayWord(current.index)
  const next = sentence.words[from + 1]
  const letters = (next ? next.at : sentence.text.length + 1) - current.at
  wordTimer = setTimeout(() => paceWords(sentence, rate, run, from + 1), (letters * LETTER_TIME) / rate)
}

function indianEnglishVoice(): SpeechSynthesisVoice | undefined {
  const voices = speechSynthesis.getVoices()
  return voices.find((voice) => voice.lang === 'en-IN') ?? voices.find((voice) => voice.lang.startsWith('en'))
}

export const speech = {
  // Whether listen() will use the real microphone or the scripted one.
  get micMode(): 'live' | 'scripted' {
    return scenarios.get().fakeMic || !RecognitionClass() ? 'scripted' : 'live'
  },

  get listening() {
    return session !== null
  },

  get speaking() {
    return speaking
  },

  listen(options: ListenOptions) {
    session?.cancel()
    const Recogniser = RecognitionClass()
    session = scenarios.get().fakeMic || !Recogniser ? listenScripted(options) : listenLive(Recogniser, options)
  },

  // Stops and hands the transcript to onFinal.
  stopListening() {
    const current = session
    session = null
    current?.stop()
  },

  // Stops and throws the transcript away.
  cancelListening() {
    const current = session
    session = null
    current?.cancel()
  },

  // The word of the answer being said, counted as parseAnswer() counts
  // them, or -1 when no word is.
  get word() {
    return word
  },

  // Reads an answer aloud. Sentences are queued one by one, because browsers
  // cut off a single long utterance.
  speak(text: string, rate = 1) {
    speech.cancel()
    const run = ++utteranceRun
    const sentences = spokenSentences(text)
    speaking = true
    emit('start')

    if (!('speechSynthesis' in window) || sentences.length === 0) {
      // No voice on this machine: stay "speaking" for about as long as it
      // would take, so everything that waits for the end still happens.
      const wordCount = sentences.reduce((sum, sentence) => sum + sentence.words.length, 0)
      setTimeout(() => finish(run), Math.min(8000, wordCount * 300))
      return
    }

    const voice = indianEnglishVoice()
    // True once this voice has reported a word itself.
    let reports = false
    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence.text)
      utterance.rate = rate
      utterance.lang = voice?.lang ?? 'en-IN'
      if (voice) utterance.voice = voice
      utterance.onstart = () => {
        if (run !== utteranceRun) return
        if (reports) sayWord(sentence.words[0].index)
        else paceWords(sentence, rate, run)
      }
      utterance.onboundary = (event) => {
        if (run !== utteranceRun || event.name !== 'word') return
        reports = true
        clearTimeout(wordTimer)
        const said = sentence.words.findLast((item) => item.at <= event.charIndex)
        if (said) sayWord(said.index)
      }
      if (index === sentences.length - 1) {
        utterance.onend = () => finish(run)
        utterance.onerror = () => finish(run)
      }
      speechSynthesis.speak(utterance)
    })
  },

  // Stops speech at once.
  cancel() {
    if ('speechSynthesis' in window) speechSynthesis.cancel()
    finish(utteranceRun)
  },

  on(event: SpeechEvent, listener: () => void) {
    speechListeners[event].add(listener)
    return () => {
      speechListeners[event].delete(listener)
    }
  },
}
