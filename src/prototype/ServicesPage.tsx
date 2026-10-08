// TEMPORARY: a test bench for the simulated services and the store. It goes
// away once the real screens use them (Phases 4 to 7).

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Button from '../components/Button.tsx'
import Card from '../components/Card.tsx'
import { Chip, ClassChip } from '../components/Chip.tsx'
import Input from '../components/Input.tsx'
import { animals } from '../data/animals.ts'
import { suggestionsFor } from '../data/answers.ts'
import { makeName } from '../data/names.ts'
import { model } from '../services/model.ts'
import { retrieval } from '../services/retrieval.ts'
import { speech } from '../services/speech.ts'
import { placeholderTitle, titles } from '../services/titles.ts'
import { chatsOf, useStore } from '../state/storeContext.ts'
import { newId, sourceLabel, speechRate, type ClassNum, type Source } from '../state/types.ts'
import PageShell from './PageShell.tsx'
import { useScenarios } from './useScenarios.ts'
import styles from './ServicesPage.module.css'

type Line = { at: string; text: string }

function Bench({ title, about, children }: { title: string; about: string; children: ReactNode }) {
  return (
    <Card className={styles.bench}>
      <div>
        <h2 className="h5">{title}</h2>
        <p className={`text-sm ${styles.quiet}`}>{about}</p>
      </div>
      {children}
    </Card>
  )
}

export default function ServicesPage() {
  const { state, dispatch, checkMemory } = useStore()
  const scenarios = useScenarios()
  const [lines, setLines] = useState<Line[]>([])
  const [question, setQuestion] = useState('What is the solar system?')
  const [classNum, setClassNum] = useState<ClassNum>(6)
  const [busy, setBusy] = useState(false)
  const [last, setLast] = useState<{ question: string; source?: Source; answer?: string } | null>(null)
  const [heard, setHeard] = useState('')
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [name, setName] = useState('')
  const titleJob = useRef<AbortController | null>(null)
  const started = useRef(0)

  const log = (text: string) =>
    setLines((all) => [...all, { at: `${((performance.now() - started.current) / 1000).toFixed(1)} s`, text }])

  useEffect(() => {
    const stops = [speech.on('start', () => setSpeaking(true)), speech.on('end', () => setSpeaking(false))]
    return () => {
      stops.forEach((stop) => stop())
      speech.cancel()
      speech.cancelListening()
    }
  }, [])

  // The whole path a real question takes: load, search, write, title.
  async function ask(simpler = false) {
    started.current = performance.now()
    setLines([])
    setBusy(true)
    try {
      if (model.status !== 'ready') {
        log('Getting ready (the model is still loading)')
        await model.load()
      }
      let source = simpler ? last?.source : undefined
      if (!simpler) {
        log(`Searching your Class ${classNum} books`)
        const result = await retrieval.search(question, classNum)
        if (!result.found) {
          log(`Not found: “I couldn’t find this in your Class ${classNum} books. Try asking it another way, or ask your teacher.”`)
          return
        }
        source = result.source
        log(`Found: ${source ? sourceLabel(source) : 'no source'}`)
      }
      log(simpler ? 'Writing the answer (simpler)' : 'Writing the answer')
      const answer = await model.generate(question, source, { simpler })
      log(`Answer: ${answer}`)
      setLast({ question, source, answer })
      log(`Placeholder title: ${placeholderTitle(question)}`)
      log(`Written title: ${await titles.generate(question, answer)}`)
    } catch (error) {
      log(`Failed: “Something went wrong.” (${error instanceof Error ? error.message : String(error)})`)
    } finally {
      setBusy(false)
    }
  }

  async function run(label: string, job: () => Promise<unknown>) {
    started.current = performance.now()
    setLines([])
    log(`${label}…`)
    try {
      log(`${label}: ${JSON.stringify(await job())}`)
    } catch (error) {
      log(`${label} stopped: ${error instanceof Error ? error.name : String(error)}`)
    }
  }

  function startListening() {
    setHeard('')
    setListening(true)
    speech.listen({
      onInterim: setHeard,
      onFinal: (transcript) => {
        setListening(false)
        setHeard(`Sent: ${transcript || '(nothing heard)'}`)
      },
      sample: suggestionsFor(classNum)[0],
    })
  }

  function addProfile() {
    const animal = animals[state.profiles.length % animals.length]
    dispatch({
      type: 'profile/add',
      profile: { id: newId(), name: makeName(animal.name, state.profiles.map((profile) => profile.name)), animalId: animal.id, classNum, createdAt: Date.now() },
    })
  }

  function addChat() {
    const profile = state.profiles.at(-1)
    if (!profile) return
    const now = Date.now()
    dispatch({
      type: 'chat/add',
      chat: {
        id: newId(),
        profileId: profile.id,
        title: placeholderTitle(question),
        titled: false,
        messages: [{ id: newId(), role: 'student', text: question, at: now }],
        createdAt: now,
        updatedAt: now,
      },
    })
  }

  const sample = 'Plants make their own food. This is called **photosynthesis**.'

  return (
    <PageShell
      eyebrow="Temporary"
      title="Services"
      intro="A test bench for the simulated services and the store. Open Scenarios in the bar, switch one on, and run a service again to see its result change."
    >
      <p className={`text-sm ${styles.status}`}>
        Model: <strong>{state.modelStatus}</strong> · Memory low: <strong>{String(state.memoryLow)}</strong> · Microphone:{' '}
        <strong>{scenarios.fakeMic ? 'scripted' : speech.micMode}</strong> · Scenarios on:{' '}
        <strong>{Object.entries(scenarios).filter(([, on]) => on).map(([key]) => key).join(', ') || 'none'}</strong>
      </p>

      <div className={styles.layout}>
        <div className={styles.benches}>
          <Bench title="Ask a question" about="The full path: model load, search in one class, the answer, then the chat title.">
            <div className={styles.row} role="group" aria-label="Class">
              {([6, 7, 8] as ClassNum[]).map((number) => (
                <ClassChip key={number} selected={classNum === number} onClick={() => setClassNum(number)}>
                  Class {number}
                </ClassChip>
              ))}
            </div>
            <Input value={question} onChange={(event) => setQuestion(event.target.value)} aria-label="Question" />
            <div className={styles.row}>
              {suggestionsFor(classNum).map((suggestion) => (
                <Chip key={suggestion} onClick={() => setQuestion(suggestion)}>
                  {suggestion}
                </Chip>
              ))}
              {suggestionsFor(classNum).length === 0 && <p className={`caption ${styles.quiet}`}>No sample questions for this class.</p>}
            </div>
            <div className={styles.row}>
              <Button onClick={() => void ask()} disabled={busy || !question.trim()}>
                Ask
              </Button>
              <Button variant="outline" onClick={() => void ask(true)} disabled={busy || !last?.source}>
                Explain simpler
              </Button>
            </div>
          </Bench>

          <Bench title="One service at a time" about="Each button calls one service and logs what came back, with how long it took.">
            <div className={styles.row}>
              <Button variant="ghost" onClick={() => void run('model.load', () => model.load().then(() => model.status))}>
                model.load
              </Button>
              <Button variant="ghost" onClick={() => void run('model.restart', () => model.restart().then(() => model.status))}>
                model.restart
              </Button>
              <Button variant="ghost" onClick={() => void run('memory.check', async () => ({ low: await checkMemory() }))}>
                memory.check
              </Button>
              <Button variant="ghost" onClick={() => void run('retrieval.search', () => retrieval.search(question, classNum))}>
                retrieval.search
              </Button>
              <Button variant="ghost" onClick={() => void run('model.generate', () => model.generate(question, last?.source))}>
                model.generate
              </Button>
              <Button variant="ghost" onClick={() => void run('titles.generate', () => titles.generate(question, last?.answer ?? ''))}>
                titles.generate
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  titleJob.current = new AbortController()
                  setTimeout(() => titleJob.current?.abort(), 400)
                  void run('titles.generate, aborted', () => titles.generate(question, '', titleJob.current?.signal))
                }}
              >
                titles.generate, then abort
              </Button>
            </div>
          </Bench>

          <Bench title="Listening" about="Tap to listen, tap again to send. Cancel throws the words away. Nothing stops on silence.">
            <div className={styles.row}>
              <Button variant="outline" onClick={startListening} disabled={listening}>
                Listen
              </Button>
              <Button
                variant="outline"
                onClick={() => speech.stopListening()}
                disabled={!listening}
              >
                Stop and send
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  speech.cancelListening()
                  setListening(false)
                  setHeard('Cancelled: nothing sent')
                }}
                disabled={!listening}
              >
                Cancel
              </Button>
            </div>
            <p className={`text-lg ${styles.heard}`} aria-live="polite">
              {heard || (listening ? 'Listening…' : 'Nothing heard yet.')}
            </p>
          </Bench>

          <Bench title="Speaking" about="Key-term marks are removed before the text is read out.">
            <div className={styles.row}>
              <Button variant="outline" onClick={() => speech.speak(last?.answer ?? sample, speechRate.normal)}>
                Speak, normal
              </Button>
              <Button variant="outline" onClick={() => speech.speak(last?.answer ?? sample, speechRate.slow)}>
                Speak, slow
              </Button>
              <Button variant="ghost" onClick={() => speech.cancel()} disabled={!speaking}>
                Stop
              </Button>
            </div>
            <p className="text-sm" aria-live="polite">
              {speaking ? 'Speaking (start event received)' : 'Quiet (no speech, or end event received)'}
            </p>
          </Bench>

          <Bench title="Names and the store" about="Profiles, chats and settings are saved. Reload the page and they are still here.">
            <div className={styles.row}>
              <Button variant="outline" onClick={() => setName(makeName('Owl', state.profiles.map((profile) => profile.name), name))}>
                Surprise me
              </Button>
              <Button variant="outline" onClick={addProfile}>
                Add a profile
              </Button>
              <Button variant="outline" onClick={addChat} disabled={state.profiles.length === 0}>
                Add a chat to the last profile
              </Button>
              <Button variant="ghost" onClick={() => dispatch({ type: 'settings/set', settings: { voiceOn: !state.settings.voiceOn } })}>
                Voice {state.settings.voiceOn ? 'on' : 'off'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => dispatch({ type: 'settings/set', settings: { speed: state.settings.speed === 'normal' ? 'slow' : 'normal' } })}
              >
                Speed: {state.settings.speed}
              </Button>
            </div>
            {name && <p className="h4">{name}</p>}
            <ul className={`text-sm ${styles.list}`}>
              {state.profiles.map((profile) => (
                <li key={profile.id}>
                  {animals.find((animal) => animal.id === profile.animalId)?.emoji} {profile.name} · Class {profile.classNum} ·{' '}
                  {chatsOf(state, profile.id).length} chats
                  {chatsOf(state, profile.id).map((chat) => ` · “${chat.title}”`)}
                </li>
              ))}
              {state.profiles.length === 0 && <li className={styles.quiet}>No profiles yet.</li>}
            </ul>
          </Bench>
        </div>

        <Card className={styles.log}>
          <h2 className="h5">Log</h2>
          <ol className={styles.lines} aria-live="polite">
            {lines.map((line, index) => (
              <li key={index} className={styles.line}>
                <span className={`caption ${styles.quiet}`}>{line.at}</span>
                <span className="text-sm">{line.text}</span>
              </li>
            ))}
            {lines.length === 0 && <li className={`text-sm ${styles.quiet}`}>Run something to see what the services do.</li>}
          </ol>
        </Card>
      </div>
    </PageShell>
  )
}
