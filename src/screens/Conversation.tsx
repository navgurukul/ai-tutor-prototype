import { Keyboard, Mic } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button.tsx'
import Composer from '../components/Composer.tsx'
import MessageStudent from '../components/MessageStudent.tsx'
import MicButton from '../components/MicButton.tsx'
import StatusBanner from '../components/StatusBanner.tsx'
import ThinkingSteps from '../components/ThinkingSteps.tsx'
import TutorAnswer from '../components/TutorAnswer.tsx'
import { samplesFor } from '../data/answers.ts'
import { speech } from '../services/speech.ts'
import { placeholderTitle } from '../services/titles.ts'
import { useStore } from '../state/storeContext.ts'
import { newId, sourceDetail, sourceLabel, speechRate, type Chat, type Message, type Profile, type Source } from '../state/types.ts'
import styles from './Conversation.module.css'
import { useIdleReturn } from './useIdleReturn.ts'
import { useListening } from './useListening.ts'
import { useTutor } from './useTutor.ts'

const MISSED = 'I didn’t catch that. Try again.'

const studentMessage = (text: string): Message => ({ id: newId(), role: 'student', text, at: Date.now() })

// The small message the app adds when the student asks for easier words.
const simplerMessage = (about: string): Message => ({ id: newId(), role: 'student', text: 'Make it simpler', small: true, about, at: Date.now() })

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
  // The tutor is starting on an answer in this chat.
  onAsk: (chatId: string) => void
  // The newest answer has appeared and, with Voice on, has been read aloud.
  onSettled: (chat: Chat) => void
  // Nobody has used the laptop for the idle limit.
  onIdle: () => void
}

// One chat: the empty state with the big mic, or the messages with a smaller
// mic docked under them. Either way the mic leads and typing is one step away.
export default function Conversation({ profile, chat, onCreated, onAsk, onSettled, onIdle }: Props) {
  const { state, dispatch } = useStore()
  const messages = chat?.messages ?? []
  const empty = messages.length === 0

  const [draft, setDraft] = useState('')
  // The text box shows only once the student asks to type, and stays until
  // they go back to the mic.
  const [typing, setTyping] = useState(false)
  const field = useRef<HTMLTextAreaElement>(null)
  // Whichever mic is on screen: the big one or the one under the messages.
  const micButton = useRef<HTMLButtonElement>(null)
  // Set each time keyboard focus should move, so it never ends up on a
  // control that has just gone away.
  const [focusMove, setFocusMove] = useState<{ to: 'field' | 'mic' } | null>(null)
  useEffect(() => {
    if (focusMove?.to === 'mic') micButton.current?.focus()
    if (focusMove?.to === 'field') field.current?.focus()
  }, [focusMove])

  // Voice comes first: a student who arrives with nothing in focus starts
  // on the big mic, so Space is enough to speak.
  useEffect(() => {
    if (document.activeElement === document.body) micButton.current?.focus()
  }, [])

  // The voice settings as they are when an answer arrives, not when it was asked for.
  const settings = useRef(state.settings)
  useEffect(() => {
    settings.current = state.settings
  })

  // The answer being read aloud, if any, and the word the voice is on.
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [spokenWord, setSpokenWord] = useState(-1)
  useEffect(() => speech.on('end', () => setSpeakingId(null)), [])
  useEffect(() => speech.on('word', () => setSpokenWord(speech.word)), [])
  function speak(message: Message) {
    speech.speak(message.text, speechRate[settings.current.speed])
    setSpeakingId(message.id)
    setSpokenWord(-1)
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

  // The written title waits for a quiet moment, so it never competes with
  // an answer for the model.
  const settled = chat !== undefined && !chat.titled && last?.role === 'tutor' && speakingId === null
  useEffect(() => {
    if (settled && chat) onSettled(chat)
  }, [settled, chat, onSettled])


  function ask(chatId: string, question: string, simpler?: Source) {
    // The student has moved on, so the tutor stops reading the last answer.
    speech.cancel()
    onAsk(chatId)
    void tutor.ask(chatId, question, simpler)
  }

  function send(text: string, by: 'typing' | 'mic' = 'typing') {
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
    ask(chatId, question)
    setDraft('')
    mic.forget()
    // The control that sent it may be about to go: carry on from the mic
    // for a spoken question and from the text box for a typed one.
    if (by === 'mic') setTyping(false)
    setFocusMove({ to: by === 'mic' ? 'mic' : 'field' })
  }

  const mic = useListening({
    // With Fake mic on, a question from this class that hasn't been asked yet.
    sample: samplesFor(profile.classNum).find((question) => !messages.some((message) => message.text === question)),
    onSend: (question) => send(question, 'mic'),
    // The words go to the text box, which opens so they can be fixed.
    onTimeUp(transcript) {
      setDraft(`${draft} ${transcript}`.trim())
      setTyping(true)
      setFocusMove({ to: 'field' })
    },
    // The Cancel button goes away, so focus goes back to the idle mic.
    onCancel: () => setFocusMove({ to: 'mic' }),
  })

  // Waiting for an answer, speaking and listening are all use of the laptop.
  useIdleReturn(busy || mic.listening || speakingId !== null, onIdle)

  // Words have been heard and are on screen.
  const hearing = mic.listening && mic.transcript !== ''

  // New messages and new steps are always in view, and stay there when the
  // space under them changes height.
  const scroller = useRef<HTMLDivElement>(null)
  const stepCount = tutor.thinking?.steps.length
  const slow = tutor.thinking?.slow
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages.length, stepCount, slow, failed, hearing, typing])

  // Tapping the mic while the tutor is speaking stops the speech at once.
  function tapMic() {
    if (!mic.listening) speech.cancel()
    mic.toggle()
  }

  function startTyping() {
    setTyping(true)
    setFocusMove({ to: 'field' })
  }

  // Back to the mic. It waits for a tap before it listens.
  function speakInstead() {
    setTyping(false)
    setFocusMove({ to: 'mic' })
  }

  function explainSimpler(answer: Message) {
    if (!chat || busy || answer.role !== 'tutor' || !answer.source) return
    dispatch({ type: 'chat/message', chatId: chat.id, message: simplerMessage(answer.id) })
    ask(chat.id, questionBefore(messages, answer.id), answer.source)
  }

  // Sends the unanswered question again, without repeating it in the chat.
  function tryAgain() {
    if (!chat || last?.role !== 'student') return
    const about = last.small ? messages.find((message) => message.id === last.about) : undefined
    if (about?.role === 'tutor' && about.source) ask(chat.id, questionBefore(messages, about.id), about.source)
    else ask(chat.id, questionBefore(messages, last.id))
    // The banner and its button are about to go.
    setFocusMove({ to: typing ? 'field' : 'mic' })
  }

  const layer = (shown: boolean) => (shown ? styles.layer : `${styles.layer} ${styles.away}`)

  // Nothing while an answer is on its way: the mic is off until it lands.
  const micCaption = mic.listening ? 'Listening. Tap again to send.' : mic.missed ? MISSED : busy ? '' : 'Tap to speak'

  const micBlock = (size: 'docked' | 'empty') => (
    <div className={styles.micBlock}>
      <MicButton ref={micButton} size={size} listening={mic.listening} busy={busy} onClick={tapMic} />
      <p className={`caption ${styles.micCaption}`} role="status">
        {micCaption}
      </p>
    </div>
  )

  const textBox = (onSpeak?: () => void) => (
    <Composer value={draft} onChange={setDraft} onSend={() => send(draft)} onSpeak={onSpeak} busy={busy} inputRef={field} />
  )

  // Under the mic or the text box: the way over to the other one, or Cancel
  // while listening. Both layers share one space, so swapping them moves
  // nothing.
  const switchLine = (
    <div className={styles.below}>
      <div className={layer(!mic.listening)}>
        {typing ? (
          <div className={`text-sm ${styles.otherWay}`}>
            <span>Ready to speak?</span>
            <Button variant="text" icon={<Mic aria-hidden="true" />} onClick={speakInstead}>
              Speak Your Question
            </Button>
          </div>
        ) : (
          <div className={`text-sm ${styles.otherWay}`}>
            <span>Can’t speak right now?</span>
            <Button variant="text" icon={<Keyboard aria-hidden="true" />} onClick={startTyping}>
              Type Your Question
            </Button>
          </div>
        )}
      </div>
      <div className={layer(mic.listening)}>
        <Button variant="ghost" onClick={mic.cancel}>
          Cancel
        </Button>
      </div>
    </div>
  )

  // The student's words as they are heard, on the colour their message will have.
  const heard = (
    <div className={`text-lg weight-medium ${styles.heard}`}>
      <div className={styles.heardWords}>
        <p>{mic.transcript}</p>
      </div>
    </div>
  )

  if (empty) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyColumn}>
          {/* The student's own words take the place of the question as they
              are heard, in the same space, so the mic never moves. */}
          <div className={styles.greeting}>
            <div className={layer(!hearing)}>
              <p className={`text-lg ${styles.hello}`}>Hi, {profile.name}</p>
              <h1 className="h2">What do you want to understand today?</h1>
            </div>
            <div className={layer(hearing)}>{heard}</div>
          </div>

          {/* The text box takes the mic's place, in the same space, so the
              greeting and the line under it stay where they are. */}
          <div className={styles.ask}>
            <div className={layer(!typing)}>{micBlock('empty')}</div>
            {typing && (
              <div className={styles.layer}>
                <div className={styles.typeBox}>{textBox()}</div>
              </div>
            )}
          </div>
          {switchLine}
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
                spokenWord={spokenWord}
                onHearAgain={() => speak(message)}
                onStop={() => speech.cancel()}
                onExplainSimpler={message.source && !message.simpler ? () => explainSimpler(message) : undefined}
                busy={busy}
              />
            ),
          )}
          {tutor.thinking && <ThinkingSteps steps={tutor.thinking.steps} slow={tutor.thinking.slow} />}
          {failed && (
            <StatusBanner tone="error" action={{ label: 'Try Again', onClick: tryAgain }}>
              Something went wrong.
            </StatusBanner>
          )}
        </div>
      </div>
      {/* Docked under the messages: the mic, or the text box once the
          student has asked to type. */}
      <div className={styles.dock}>
        {typing ? (
          textBox(speakInstead)
        ) : (
          <div className={styles.voice}>
            {hearing && heard}
            {micBlock('docked')}
            {switchLine}
          </div>
        )}
      </div>
    </>
  )
}
