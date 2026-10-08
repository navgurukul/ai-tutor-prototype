import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import Button from '../components/Button.tsx'
import { Chip } from '../components/Chip.tsx'
import Composer from '../components/Composer.tsx'
import IconButton from '../components/IconButton.tsx'
import Input from '../components/Input.tsx'
import MessageStudent from '../components/MessageStudent.tsx'
import MicButton from '../components/MicButton.tsx'
import StatusBanner from '../components/StatusBanner.tsx'
import ThinkingSteps from '../components/ThinkingSteps.tsx'
import TutorAnswer from '../components/TutorAnswer.tsx'
import { suggestionsFor } from '../data/answers.ts'
import { speech } from '../services/speech.ts'
import { placeholderTitle } from '../services/titles.ts'
import { useStore } from '../state/storeContext.ts'
import { newId, sourceDetail, sourceLabel, speechRate, type Chat, type Message, type Profile } from '../state/types.ts'
import styles from './Conversation.module.css'
import { useListening } from './useListening.ts'
import { useTutor } from './useTutor.ts'

const MISSED = 'I didn’t catch that. Try again.'

const studentMessage = (text: string): Message => ({ id: newId(), role: 'student', text, at: Date.now() })

// The small message the app adds when the student asks for easier words.
const simplerMessage = (about: string): Message => ({ id: newId(), role: 'student', text: 'Explain it simpler', small: true, about, at: Date.now() })

// The question that led to a message: the nearest one the student asked before it.
function questionBefore(messages: Message[], id: string): string {
  for (let index = messages.findIndex((message) => message.id === id); index >= 0; index--) {
    const message = messages[index]
    if (message.role === 'student' && !message.small) return message.text
  }
  return ''
}

type Props = {
  profile: Profile
  // Nothing yet on an empty chat: it is made when the first question is sent.
  chat?: Chat
  onCreated: (chatId: string) => void
}

// One chat: the empty state with the big mic, or the messages with the
// composer docked under them.
export default function Conversation({ profile, chat, onCreated }: Props) {
  const { state, dispatch } = useStore()
  const messages = chat?.messages ?? []
  const empty = messages.length === 0
  const suggestions = suggestionsFor(profile.classNum)

  // What is typed, shared by the quiet field on the empty chat and the composer.
  const [draft, setDraft] = useState('')
  const quietField = useRef<HTMLInputElement>(null)
  const composerField = useRef<HTMLTextAreaElement>(null)
  // Goes up each time focus should move to the text field.
  const [focusTurn, setFocusTurn] = useState(0)
  useEffect(() => {
    if (focusTurn > 0) (composerField.current ?? quietField.current)?.focus()
  }, [focusTurn])

  // The voice settings as they are when an answer arrives, not when it was asked for.
  const settings = useRef(state.settings)
  useEffect(() => {
    settings.current = state.settings
  })

  // The answer being read aloud, if any.
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  useEffect(() => speech.on('end', () => setSpeakingId(null)), [])
  function speak(message: Message) {
    speech.speak(message.text, speechRate[settings.current.speed])
    setSpeakingId(message.id)
  }

  // Leaving the chat stops the tutor's voice, and so does turning Voice off.
  useEffect(() => () => speech.cancel(), [])
  const { voiceOn } = state.settings
  useEffect(() => {
    if (!voiceOn) speech.cancel()
  }, [voiceOn])

  const tutor = useTutor({
    classNum: profile.classNum,
    onAnswer(chatId, message) {
      dispatch({ type: 'chat/message', chatId, message })
      // Only the newest answer speaks on its own.
      if (settings.current.voiceOn) speak(message)
    },
  })
  const busy = tutor.thinking !== null
  // A question with nothing after it and nothing on the way: it went wrong.
  const last = messages.at(-1)
  const failed = !busy && last?.role === 'student'

  // New messages and new steps are always in view.
  const scroller = useRef<HTMLDivElement>(null)
  const stepCount = tutor.thinking?.steps.length
  const slow = tutor.thinking?.slow
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages.length, stepCount, slow, failed])

  function send(text: string) {
    const question = text.trim()
    if (!question || busy) return
    const message = studentMessage(question)
    // The chat joins Recent chats with its first question, and is named after it.
    const chatId = chat?.id ?? newId()
    if (chat) {
      dispatch({ type: 'chat/message', chatId, message })
    } else {
      dispatch({
        type: 'chat/add',
        chat: { id: chatId, profileId: profile.id, title: placeholderTitle(question), titled: false, messages: [message], createdAt: message.at, updatedAt: message.at },
      })
      onCreated(chatId)
    }
    // The student has moved on, so the tutor stops reading the last answer.
    speech.cancel()
    void tutor.ask(chatId, question)
    setDraft('')
    mic.forget()
    // The empty chat's controls are about to go: carry on from the composer.
    if (empty) setFocusTurn(focusTurn + 1)
  }

  const mic = useListening({
    // With Fake mic on, a question from this class that hasn't been asked yet.
    sample: suggestions.find((question) => !messages.some((message) => message.text === question)),
    onSend: send,
    onTimeUp(transcript) {
      setDraft(`${draft} ${transcript}`.trim())
      setFocusTurn(focusTurn + 1)
    },
  })

  // Tapping the mic while the tutor is speaking stops the speech at once.
  function tapMic() {
    if (!mic.listening) speech.cancel()
    mic.toggle()
  }

  function explainSimpler(answer: Message) {
    if (!chat || busy || answer.role !== 'tutor' || !answer.source) return
    dispatch({ type: 'chat/message', chatId: chat.id, message: simplerMessage(answer.id) })
    speech.cancel()
    void tutor.ask(chat.id, questionBefore(messages, answer.id), answer.source)
  }

  // Sends the unanswered question again, without repeating it in the chat.
  function tryAgain() {
    if (!chat || last?.role !== 'student') return
    const about = last.small ? messages.find((message) => message.id === last.about) : undefined
    if (about?.role === 'tutor' && about.source) void tutor.ask(chat.id, questionBefore(messages, about.id), about.source)
    else void tutor.ask(chat.id, questionBefore(messages, last.id))
  }

  function submitQuiet(event: FormEvent) {
    event.preventDefault()
    send(draft)
  }

  if (empty) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyColumn}>
          <div className={styles.greeting}>
            <h1 className="h2">Hi, {profile.name}</h1>
            {/* Two lines tall whatever it holds, so the mic never moves. */}
            <div className={styles.slot}>
              {mic.listening ? (
                <p className={`text-lg ${styles.transcript}`}>{mic.transcript}</p>
              ) : (
                <p className={`text-lg ${styles.prompt}`}>What do you want to understand today?</p>
              )}
            </div>
          </div>

          <div className={styles.micBlock}>
            <MicButton size="empty" listening={mic.listening} onClick={tapMic} />
            <p className={`caption ${styles.micCaption}`} role="status">
              {mic.listening ? 'Listening. Tap again to send.' : mic.missed ? MISSED : 'Tap to speak'}
            </p>
          </div>

          {/* Both layers share one space, so swapping them moves nothing. */}
          <div className={styles.below}>
            <div className={mic.listening ? `${styles.layer} ${styles.away}` : styles.layer}>
              {suggestions.length > 0 && (
                <ul className={styles.chips} aria-label="Questions you could ask">
                  {suggestions.map((question) => (
                    <li key={question}>
                      <Chip onClick={() => send(question)}>{question}</Chip>
                    </li>
                  ))}
                </ul>
              )}
              <form className={styles.quiet} onSubmit={submitQuiet}>
                <Input
                  ref={quietField}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Or type your question"
                  aria-label="Type your question"
                  autoComplete="off"
                />
                <IconButton type="submit" variant="filled" label="Send" disabled={draft.trim() === ''}>
                  <ArrowUp aria-hidden="true" />
                </IconButton>
              </form>
            </div>
            <div className={mic.listening ? styles.layer : `${styles.layer} ${styles.away}`}>
              <Button variant="ghost" className={styles.cancel} onClick={mic.cancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.scroller} ref={scroller}>
        {/* A log: screen readers hear each step and each answer as it arrives. */}
        <div className={styles.column} role="log" aria-label="Conversation">
          {messages.map((message) =>
            message.role === 'student' ? (
              <MessageStudent key={message.id} small={message.small}>
                {message.text}
              </MessageStudent>
            ) : (
              <TutorAnswer
                key={message.id}
                text={message.text}
                source={message.source && { label: sourceLabel(message.source), detail: sourceDetail(message.source) }}
                speaking={message.id === speakingId}
                onHearAgain={() => speak(message)}
                onStop={() => speech.cancel()}
                onExplainSimpler={message.source && !message.simpler ? () => explainSimpler(message) : undefined}
                busy={busy}
              />
            ),
          )}
          {tutor.thinking && <ThinkingSteps steps={tutor.thinking.steps} slow={tutor.thinking.slow} />}
          {failed && (
            <StatusBanner tone="error" action={{ label: 'Try again', onClick: tryAgain }}>
              Something went wrong.
            </StatusBanner>
          )}
        </div>
      </div>
      <div className={styles.dock}>
        <Composer
          value={draft}
          onChange={setDraft}
          onSend={() => send(draft)}
          onMic={tapMic}
          onCancel={mic.cancel}
          listening={mic.listening}
          transcript={mic.transcript}
          busy={busy}
          hint={mic.missed ? MISSED : undefined}
          inputRef={composerField}
        />
      </div>
    </>
  )
}
