import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import Button from '../components/Button.tsx'
import { Chip } from '../components/Chip.tsx'
import Composer from '../components/Composer.tsx'
import IconButton from '../components/IconButton.tsx'
import Input from '../components/Input.tsx'
import MessageStudent from '../components/MessageStudent.tsx'
import MicButton from '../components/MicButton.tsx'
import { suggestionsFor } from '../data/answers.ts'
import { placeholderTitle } from '../services/titles.ts'
import { useStore } from '../state/storeContext.ts'
import { newId, type Chat, type Message, type Profile } from '../state/types.ts'
import styles from './Conversation.module.css'
import { useListening } from './useListening.ts'

const MISSED = 'I didn’t catch that. Try again.'

const studentMessage = (text: string): Message => ({ id: newId(), role: 'student', text, at: Date.now() })

type Props = {
  profile: Profile
  // Nothing yet on an empty chat: it is made when the first question is sent.
  chat?: Chat
  onCreated: (chatId: string) => void
}

// One chat: the empty state with the big mic, or the messages with the
// composer docked under them.
export default function Conversation({ profile, chat, onCreated }: Props) {
  const { dispatch } = useStore()
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

  // New messages are always in view.
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight
  }, [messages.length])

  function send(text: string) {
    const question = text.trim()
    if (!question) return
    const message = studentMessage(question)
    if (chat) {
      dispatch({ type: 'chat/message', chatId: chat.id, message })
    } else {
      // The chat joins Recent chats now, named after its first question.
      const id = newId()
      dispatch({
        type: 'chat/add',
        chat: { id, profileId: profile.id, title: placeholderTitle(question), titled: false, messages: [message], createdAt: message.at, updatedAt: message.at },
      })
      onCreated(id)
    }
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
            <MicButton size="empty" listening={mic.listening} onClick={mic.toggle} />
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
        <div className={styles.column}>
          <ol className={styles.messages}>
            {messages.map((message) =>
              message.role === 'student' ? (
                <li key={message.id}>
                  <MessageStudent small={message.small}>{message.text}</MessageStudent>
                </li>
              ) : null,
            )}
          </ol>
          {/* TEMPORARY: the thinking steps and the answer take this place in Phase 6. */}
          <p className={`caption ${styles.note}`}>Prototype note: the tutor starts answering in Phase 6.</p>
        </div>
      </div>
      <div className={styles.dock}>
        <Composer
          value={draft}
          onChange={setDraft}
          onSend={() => send(draft)}
          onMic={mic.toggle}
          onCancel={mic.cancel}
          listening={mic.listening}
          transcript={mic.transcript}
          hint={mic.missed ? MISSED : undefined}
          inputRef={composerField}
        />
      </div>
    </>
  )
}
