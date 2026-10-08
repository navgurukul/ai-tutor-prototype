import { ArrowUp, BookOpen, Hourglass, PenLine, Plus, Search, Volume2, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Avatar, AvatarOption } from '../components/Avatar.tsx'
import Button from '../components/Button.tsx'
import Card from '../components/Card.tsx'
import { Chip, ClassChip } from '../components/Chip.tsx'
import Composer from '../components/Composer.tsx'
import Dialog, { DialogPanel } from '../components/Dialog.tsx'
import Drawer from '../components/Drawer.tsx'
import HistoryRow from '../components/HistoryRow.tsx'
import IconButton from '../components/IconButton.tsx'
import Input from '../components/Input.tsx'
import MessageStudent from '../components/MessageStudent.tsx'
import MicButton from '../components/MicButton.tsx'
import NameInput from '../components/NameInput.tsx'
import { AddProfileCard, ProfileCard } from '../components/ProfileCard.tsx'
import Sidebar from '../components/Sidebar.tsx'
import SourceChip from '../components/SourceChip.tsx'
import StatusBanner from '../components/StatusBanner.tsx'
import ThinkingSteps from '../components/ThinkingSteps.tsx'
import TutorAnswer from '../components/TutorAnswer.tsx'
import VoiceControl from '../components/VoiceControl.tsx'
import { animals } from '../data/animals.ts'
import PageShell from './PageShell.tsx'
import { enablePseudoStates } from './pseudoStates.ts'
import styles from './ComponentsPage.module.css'

type Force = 'hover' | 'pressed' | 'focus'

const sections = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'icon-button', label: 'Icon button' },
  { id: 'mic', label: 'Mic' },
  { id: 'chips', label: 'Chips' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'cards', label: 'Cards' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'messages', label: 'Messages' },
  { id: 'composer', label: 'Composer' },
  { id: 'voice', label: 'Voice control' },
  { id: 'thinking', label: 'Thinking steps' },
  { id: 'status', label: 'Status banner' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'inspect-test', label: 'Inspect test' },
]

const [lion, , , panda, , , owl, , dolphin, butterfly] = animals

// Sample content only. Phase 3 brings the real textbook list and checked answers.
const sampleChats = [
  { id: '1', title: 'Planets in the solar system' },
  { id: '2', title: 'What plants need to make food' },
  { id: '3', title: 'Adding fractions' },
  { id: '4', title: 'Why the Moon seems to change shape' },
]

const sampleAnswer = `The **solar system** is the Sun and everything that travels around it.

Eight **planets** go around the Sun. In order from the Sun, they are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.

## Why planets stay in their paths

The Sun pulls on every planet. This pull is called **gravity**. It keeps each planet moving in its own path, called an **orbit**.`

// The page number is a placeholder until the real book list arrives in Phase 3.
const sampleSource = {
  label: 'NCERT · Class 6 Science · Ch 12 · p. 215',
  detail: 'Curiosity, Class 6 Science · Chapter 12: Beyond Earth · page 215',
}

function jumpTo(id: string) {
  const heading = document.getElementById(`${id}-title`)
  heading?.scrollIntoView({ block: 'start' })
  heading?.focus({ preventScroll: true })
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 className={`h3 ${styles.sectionTitle}`} id={`${id}-title`} tabIndex={-1}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Specimen({ name, spec, children, stack }: { name: string; spec: string; children: ReactNode; stack?: boolean }) {
  return (
    <div className={styles.specimen}>
      <div className={styles.specimenHeader}>
        <h3 className="h5">{name}</h3>
        <p className={`text-sm ${styles.spec}`}>{spec}</p>
      </div>
      <div className={stack ? `${styles.states} ${styles.stack}` : styles.states}>{children}</div>
    </div>
  )
}

// One state of a component. `force` pins hover, pressed or focus on the
// component (or on `target` inside it) so it can be seen without a pointer.
function State(props: { label: string; force?: Force; target?: string; wide?: boolean; children: ReactNode }) {
  const holder = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!props.force) return
    const element = props.target ? holder.current?.querySelector(props.target) : holder.current?.firstElementChild
    element?.setAttribute('data-pseudo', props.force)
  })

  return (
    <div className={props.wide ? `${styles.state} ${styles.wide}` : styles.state}>
      <p className={`label ${styles.stateLabel}`}>{props.label}</p>
      <div className={styles.holder} ref={holder}>
        {props.children}
      </div>
    </div>
  )
}

function ComposerDemo(props: { text?: string; listening?: boolean; transcript?: string; busy?: boolean; hint?: string }) {
  const [value, setValue] = useState(props.text ?? '')
  const [listening, setListening] = useState(props.listening ?? false)
  return (
    <Composer
      value={value}
      onChange={setValue}
      onSend={() => setValue('')}
      onMic={() => setListening(!listening)}
      onCancel={() => setListening(false)}
      listening={listening}
      transcript={props.transcript}
      busy={props.busy}
      hint={props.hint}
    />
  )
}

function NameDemo({ start, error }: { start: string; error?: string }) {
  const [name, setName] = useState(start)
  return <NameInput value={name} onChange={(event) => setName(event.target.value)} error={error} />
}

function ClassPickerDemo() {
  const [picked, setPicked] = useState(6)
  return (
    <div className={styles.row} role="group" aria-label="Your class">
      {[6, 7, 8, 9, 10, 11, 12].map((number) => (
        <ClassChip key={number} selected={picked === number} onClick={() => setPicked(number)}>
          Class {number}
        </ClassChip>
      ))}
    </div>
  )
}

function AnimalGridDemo() {
  const [picked, setPicked] = useState('owl')
  return (
    <div className={styles.animalGrid} role="group" aria-label="Pick an animal">
      {animals.map((animal) => (
        <AvatarOption key={animal.id} animal={animal} selected={picked === animal.id} onClick={() => setPicked(animal.id)} />
      ))}
    </div>
  )
}

function VoiceDemo(props: { voiceOn: boolean; speed: 'normal' | 'slow'; live?: boolean }) {
  const [voiceOn, setVoiceOn] = useState(props.voiceOn)
  const [speed, setSpeed] = useState(props.speed)
  if (!props.live) return <VoiceControl voiceOn={props.voiceOn} speed={props.speed} onVoice={() => {}} onSpeed={() => {}} />
  return <VoiceControl voiceOn={voiceOn} speed={speed} onVoice={setVoiceOn} onSpeed={setSpeed} />
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open the drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} label="Chats and profile">
        <Sidebar
          profile={{ name: 'Brave Owl', animal: owl }}
          chats={sampleChats}
          activeChatId="1"
          onNewChat={() => setOpen(false)}
          onOpenChat={() => setOpen(false)}
          onSwitch={() => setOpen(false)}
        />
      </Drawer>
    </>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open the dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Start again?"
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Keep everything
            </Button>
            <Button onClick={() => setOpen(false)}>Start again</Button>
          </>
        }
      >
        This clears every profile and chat on this laptop.
      </Dialog>
    </>
  )
}

export default function ComponentsPage() {
  useEffect(enablePseudoStates, [])

  return (
    <PageShell
      eyebrow="Reference"
      title="Components"
      intro="Every component from section 11 of the tokens file, in every state. Hover, pressed and focus are pinned so you can see them without a mouse. The live ones still respond."
    >
      <nav className={styles.jump} aria-label="Jump to a section">
        {sections.map((section) => (
          <Chip key={section.id} onClick={() => jumpTo(section.id)}>
            {section.label}
          </Chip>
        ))}
      </nav>

      <Section id="buttons" title="Buttons">
        <Specimen name="Primary button" spec="Height 48 · radius-pill · purple · text 700 white · padding 0 24 · hover purple-dark">
          <State label="Default">
            <Button>Get started</Button>
          </State>
          <State label="Hover" force="hover">
            <Button>Get started</Button>
          </State>
          <State label="Pressed" force="pressed">
            <Button>Get started</Button>
          </State>
          <State label="Focus" force="focus">
            <Button>Get started</Button>
          </State>
          <State label="Disabled">
            <Button disabled>Next</Button>
          </State>
          <State label="With icon">
            <Button icon={<Plus aria-hidden="true" />}>New chat</Button>
          </State>
        </Specimen>

        <Specimen name="Outline button" spec="Height 48 · radius-pill · white · border-1 gray-300 · text 700 gray-900 · elevation-1">
          <State label="Default">
            <Button variant="outline">Surprise me</Button>
          </State>
          <State label="Hover" force="hover">
            <Button variant="outline">Surprise me</Button>
          </State>
          <State label="Pressed" force="pressed">
            <Button variant="outline">Surprise me</Button>
          </State>
          <State label="Focus" force="focus">
            <Button variant="outline">Surprise me</Button>
          </State>
          <State label="Disabled">
            <Button variant="outline" disabled>
              Surprise me
            </Button>
          </State>
          <State label="With icon">
            <Button variant="outline" icon={<Plus aria-hidden="true" />}>
              New chat
            </Button>
          </State>
        </Specimen>

        <Specimen name="Ghost button" spec="Height 40 · radius-pill · no fill · border-1 gray-300 · text-sm 700 gray-700">
          <State label="Default">
            <Button variant="ghost">Switch</Button>
          </State>
          <State label="Hover" force="hover">
            <Button variant="ghost">Switch</Button>
          </State>
          <State label="Pressed" force="pressed">
            <Button variant="ghost">Switch</Button>
          </State>
          <State label="Focus" force="focus">
            <Button variant="ghost">Switch</Button>
          </State>
          <State label="Disabled">
            <Button variant="ghost" disabled>
              Explain simpler
            </Button>
          </State>
          <State label="With icon">
            <Button variant="ghost" icon={<Volume2 aria-hidden="true" />}>
              Hear again
            </Button>
          </State>
        </Specimen>
      </Section>

      <Section id="icon-button" title="Icon button">
        <Specimen name="Icon button" spec="40 circle · icon 24 · hover gray-100">
          <State label="Default">
            <IconButton label="Close">
              <X aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Hover" force="hover">
            <IconButton label="Close">
              <X aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Pressed" force="pressed">
            <IconButton label="Close">
              <X aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Focus" force="focus">
            <IconButton label="Close">
              <X aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Disabled">
            <IconButton label="Close" disabled>
              <X aria-hidden="true" />
            </IconButton>
          </State>
        </Specimen>

        <Specimen name="Icon button, filled" spec="Not in the tokens file. The Send button once there is something to send: purple, white icon, hover purple-dark">
          <State label="Default">
            <IconButton variant="filled" label="Send">
              <ArrowUp aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Hover" force="hover">
            <IconButton variant="filled" label="Send">
              <ArrowUp aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Focus" force="focus">
            <IconButton variant="filled" label="Send">
              <ArrowUp aria-hidden="true" />
            </IconButton>
          </State>
          <State label="Disabled">
            <IconButton variant="filled" label="Send" disabled>
              <ArrowUp aria-hidden="true" />
            </IconButton>
          </State>
        </Specimen>
      </Section>

      <Section id="mic" title="Mic">
        <Specimen name="Mic, composer" spec="64 circle · ink · icon 24 white · elevation-4 · listening: purple-dark + white-60 rings">
          <State label="Default">
            <MicButton />
          </State>
          <State label="Hover" force="hover">
            <MicButton />
          </State>
          <State label="Pressed" force="pressed">
            <MicButton />
          </State>
          <State label="Focus" force="focus">
            <MicButton />
          </State>
          <State label="Listening">
            <MicButton listening />
          </State>
          <State label="Disabled">
            <MicButton disabled />
          </State>
        </Specimen>

        <Specimen name="Mic, empty state" spec="112 circle · icon 32 · same styling">
          <State label="Default">
            <MicButton size="empty" />
          </State>
          <State label="Focus" force="focus">
            <MicButton size="empty" />
          </State>
          <State label="Listening">
            <MicButton size="empty" listening />
          </State>
          <State label="Disabled">
            <MicButton size="empty" disabled />
          </State>
        </Specimen>
      </Section>

      <Section id="chips" title="Chips">
        <Specimen name="Chip" spec="Height 32 · radius-pill · border-1 gray-200 · text-sm 500 gray-700 · padding 0 16">
          <State label="Default">
            <Chip>What are the components of food?</Chip>
          </State>
          <State label="Hover" force="hover">
            <Chip>What are the components of food?</Chip>
          </State>
          <State label="Pressed" force="pressed">
            <Chip>What are the components of food?</Chip>
          </State>
          <State label="Focus" force="focus">
            <Chip>What are the components of food?</Chip>
          </State>
          <State label="Disabled">
            <Chip disabled>What are the components of food?</Chip>
          </State>
          <State label="With icon">
            <Chip icon={<BookOpen aria-hidden="true" />}>Science</Chip>
          </State>
        </Specimen>

        <Specimen name="Source chip" spec="Chip style · book icon · tooltip with the full book and page (radius-8, ink)">
          <State label="Default">
            <SourceChip {...sampleSource} />
          </State>
          <State label="Focus" force="focus" target="button">
            <SourceChip {...sampleSource} />
          </State>
          <State label="Hover, with its tooltip" force="hover">
            <SourceChip {...sampleSource} />
          </State>
        </Specimen>

        <Specimen name="Class chip" spec="Height 48 · radius-pill · selected purple with white text">
          <State label="Default">
            <ClassChip>Class 6</ClassChip>
          </State>
          <State label="Hover" force="hover">
            <ClassChip>Class 6</ClassChip>
          </State>
          <State label="Focus" force="focus">
            <ClassChip>Class 6</ClassChip>
          </State>
          <State label="Selected">
            <ClassChip selected>Class 6</ClassChip>
          </State>
          <State label="Disabled">
            <ClassChip disabled>Class 6</ClassChip>
          </State>
          <State label="As a picker (live)" wide>
            <ClassPickerDemo />
          </State>
        </Specimen>
      </Section>

      <Section id="inputs" title="Inputs">
        <Specimen name="Input" spec="Height 48 · radius-8 · border-1 gray-300 · focus border-2 purple · padding 0 16">
          <State label="Default">
            <Input placeholder="Or type your question" aria-label="Sample input" />
          </State>
          <State label="Hover" force="hover">
            <Input placeholder="Or type your question" aria-label="Sample input" />
          </State>
          <State label="Focus" force="focus">
            <Input defaultValue="Why is the sky blue?" aria-label="Sample input" />
          </State>
          <State label="Filled">
            <Input defaultValue="Why is the sky blue?" aria-label="Sample input" />
          </State>
          <State label="Error">
            <Input defaultValue="Why is the sky blue?" invalid aria-label="Sample input" />
          </State>
          <State label="Disabled">
            <Input placeholder="Or type your question" disabled aria-label="Sample input" />
          </State>
        </Specimen>

        <Specimen name="Name input" spec="h3 Baloo 2 purple · centred · border-3 pink bottom · up to 20 characters">
          <State label="Default (live)">
            <NameDemo start="Brave Owl" />
          </State>
          <State label="Focus" force="focus" target="input">
            <NameDemo start="Brave Owl" />
          </State>
          <State label="Name taken">
            <NameDemo start="Kind Dolphin" error="Someone on this laptop already has this name." />
          </State>
        </Specimen>
      </Section>

      <Section id="cards" title="Cards">
        <Specimen name="Card" spec="radius-24 · white · border-1 gray-200 · padding 24">
          <State label="Default">
            <Card className={styles.cardSample}>
              <h4 className="h4">Card title</h4>
              <p className="text-sm">Cards hold a group of things that belong together.</p>
            </Card>
          </State>
        </Specimen>
      </Section>

      <Section id="profiles" title="Profiles">
        <Specimen name="Profile card" spec="160 × 192 · radius-16 · white · avatar 96 circle on a tint · name h5">
          <State label="Default">
            <ProfileCard name="Brave Owl" animal={owl} />
          </State>
          <State label="Hover" force="hover">
            <ProfileCard name="Happy Lion" animal={lion} />
          </State>
          <State label="Pressed" force="pressed">
            <ProfileCard name="Calm Panda" animal={panda} />
          </State>
          <State label="Focus" force="focus">
            <ProfileCard name="Kind Dolphin" animal={dolphin} />
          </State>
          <State label="Longest name">
            <ProfileCard name="Curious Butterfly" animal={butterfly} />
          </State>
        </Specimen>

        <Specimen name="Add profile card" spec="Same size · border-2 dashed gray-300 · icon 32">
          <State label="Default">
            <AddProfileCard />
          </State>
          <State label="Hover" force="hover">
            <AddProfileCard />
          </State>
          <State label="Focus" force="focus">
            <AddProfileCard />
          </State>
        </Specimen>

        <Specimen name="Avatar" spec="Not in the tokens file as its own row. Circle on a tint · 96 on cards, 40 in the sidebar · emoji are placeholders">
          <State label="Large">
            <Avatar animal={owl} />
          </State>
          <State label="Small">
            <Avatar animal={owl} size="sm" />
          </State>
        </Specimen>

        <Specimen name="Avatar option" spec="The animal picker · 96 circle on a tint · selected: lilac fill and border-2 purple">
          <State label="Default">
            <AvatarOption animal={lion} />
          </State>
          <State label="Hover" force="hover">
            <AvatarOption animal={lion} />
          </State>
          <State label="Focus" force="focus">
            <AvatarOption animal={lion} />
          </State>
          <State label="Selected">
            <AvatarOption animal={lion} selected />
          </State>
          <State label="As a picker (live)" wide>
            <AnimalGridDemo />
          </State>
        </Specimen>
      </Section>

      <Section id="sidebar" title="Sidebar">
        <Specimen name="History row" spec="Height 40 · radius-8 · padding 0 16 · text-sm · hover gray-100 · active lilac with purple-dark text">
          <div className={styles.onWhite}>
            <State label="Default">
              <HistoryRow title="Planets in the solar system" />
            </State>
            <State label="Hover" force="hover">
              <HistoryRow title="Planets in the solar system" />
            </State>
            <State label="Pressed" force="pressed">
              <HistoryRow title="Planets in the solar system" />
            </State>
            <State label="Focus" force="focus">
              <HistoryRow title="Planets in the solar system" />
            </State>
            <State label="Active">
              <HistoryRow title="Planets in the solar system" active />
            </State>
            <State label="Long title">
              <HistoryRow title="Why the Moon seems to change shape every night" />
            </State>
          </div>
        </Specimen>

        <Specimen name="Sidebar" spec="280 wide · white · border-1 gray-200 on the right · padding 16 · rail 72 wide from 1024 to 1199">
          <State label="Full">
            <div className={styles.sidebarStage}>
              <Sidebar profile={{ name: 'Brave Owl', animal: owl }} chats={sampleChats} activeChatId="1" />
            </div>
          </State>
          <State label="Full, no chats yet">
            <div className={styles.sidebarStage}>
              <Sidebar profile={{ name: 'Curious Butterfly', animal: butterfly }} chats={[]} />
            </div>
          </State>
          <State label="Rail">
            <div className={styles.sidebarStage}>
              <Sidebar variant="rail" profile={{ name: 'Brave Owl', animal: owl }} chats={sampleChats} />
            </div>
          </State>
        </Specimen>

        <Specimen name="Drawer" spec="Not in the tokens file. The full sidebar over the chat, from the rail or below 1024: scrim behind · elevation-4 · Esc or a click outside closes it">
          <State label="Live">
            <DrawerDemo />
          </State>
        </Specimen>
      </Section>

      <Section id="messages" title="Messages">
        <Specimen name="Student message" spec="lilac · radius 16 16 8 16 · padding 16 · text" stack>
          <State label="Default" wide>
            <div className={styles.column}>
              <MessageStudent>What is the solar system?</MessageStudent>
            </div>
          </State>
          <State label="Long question" wide>
            <div className={styles.column}>
              <MessageStudent>
                My teacher said the planets go around the Sun but I do not understand why they do not fly away into space
              </MessageStudent>
            </div>
          </State>
          <State label="Small follow-up" wide>
            <div className={styles.column}>
              <MessageStudent small>Explain it simpler</MessageStudent>
            </div>
          </State>
        </Specimen>

        <Specimen name="Tutor answer" spec="No bubble · text 400 · h5 and h6 for headings · max 68ch · key terms with a 3px pink bottom border" stack>
          <State label="Default" wide>
            <div className={styles.column}>
              <TutorAnswer text={sampleAnswer} source={sampleSource} onHearAgain={() => {}} onExplainSimpler={() => {}} />
            </div>
          </State>
          <State label="While the tutor is speaking" wide>
            <div className={styles.column}>
              <TutorAnswer
                text="The **solar system** is the Sun and everything that travels around it."
                source={sampleSource}
                speaking
                onHearAgain={() => {}}
                onStop={() => {}}
                onExplainSimpler={() => {}}
              />
            </div>
          </State>
          <State label="Not found (plain answer, no source)" wide>
            <div className={styles.column}>
              <TutorAnswer text="I couldn’t find this in your Class 6 books. Try asking it another way, or ask your teacher." onHearAgain={() => {}} />
            </div>
          </State>
        </Specimen>
      </Section>

      <Section id="composer" title="Composer">
        <Specimen name="Composer" spec="radius-24 · white · elevation-3 · padding 16 · max width 720" stack>
          <State label="Empty (live)" wide>
            <ComposerDemo />
          </State>
          <State label="With a typed question" wide>
            <ComposerDemo text="How many planets are there?" />
          </State>
          <State label="Listening" wide>
            <ComposerDemo listening transcript="How many planets are there in" />
          </State>
          <State label="Nothing was heard" wide>
            <ComposerDemo hint="I didn’t catch that. Try again." />
          </State>
          <State label="While an answer is being worked on" wide>
            <ComposerDemo text="And which one is the biggest?" busy />
          </State>
        </Specimen>
      </Section>

      <Section id="voice" title="Voice control">
        <Specimen name="Voice control" spec="Not in the tokens file. Ghost button with a white fill, then a speed choice: height 40 · radius-pill · border-1 gray-300 · text-sm 700 · selected lilac with purple-dark text">
          <State label="Voice on, normal">
            <VoiceDemo voiceOn speed="normal" />
          </State>
          <State label="Voice off, slow">
            <VoiceDemo voiceOn={false} speed="slow" />
          </State>
          <State label="Speed, hover" force="hover" target="[aria-pressed=false]">
            <VoiceDemo voiceOn speed="normal" />
          </State>
          <State label="Speed, focus" force="focus" target="[aria-pressed=false]">
            <VoiceDemo voiceOn speed="normal" />
          </State>
          <State label="Live">
            <VoiceDemo voiceOn speed="normal" live />
          </State>
        </Specimen>
      </Section>

      <Section id="thinking" title="Thinking steps">
        <Specimen name="Thinking steps" spec="Not in the tokens file. One line per step: icon 20, then text-sm. Finished steps show a check in gray-500">
          <State label="Getting ready">
            <ThinkingSteps steps={[{ label: 'Getting ready', state: 'current', icon: Hourglass }]} />
          </State>
          <State label="Searching">
            <ThinkingSteps steps={[{ label: 'Searching your Class 6 books', state: 'current', icon: Search }]} />
          </State>
          <State label="Writing">
            <ThinkingSteps
              steps={[
                { label: 'Searching your Class 6 books', state: 'done' },
                { label: 'Writing the answer', state: 'current', icon: PenLine },
              ]}
            />
          </State>
          <State label="After 10 seconds">
            <ThinkingSteps
              slow
              steps={[
                { label: 'Getting ready', state: 'done' },
                { label: 'Searching your Class 6 books', state: 'current', icon: Search },
              ]}
            />
          </State>
        </Specimen>
      </Section>

      <Section id="status" title="Status banner">
        <Specimen name="Status banner" spec="Not in the tokens file. Status pair · icon 24 · text 500 · radius-16 · optional ghost button" stack>
          <State label="Warning, with a button" wide>
            <StatusBanner tone="warning" action={{ label: 'Check again', onClick: () => {} }}>
              Your laptop is running low on memory. Close other apps, like Chrome, so your tutor runs smoothly.
            </StatusBanner>
          </State>
          <State label="Error, with a button" wide>
            <StatusBanner tone="error" action={{ label: 'Try again', onClick: () => {} }}>
              Something went wrong.
            </StatusBanner>
          </State>
          <State label="Info" wide>
            <StatusBanner tone="info">Works without internet</StatusBanner>
          </State>
          <State label="Success" wide>
            <StatusBanner tone="success">Your profile is ready.</StatusBanner>
          </State>
        </Specimen>
      </Section>

      <Section id="dialog" title="Dialog">
        <Specimen name="Dialog" spec="radius-24 · white · padding 32 · elevation-4 · scrim behind" stack>
          <State label="On the scrim" wide>
            <div className={styles.scrimStage}>
             <div className={styles.scrimFill}>
              <DialogPanel
                title="Start again?"
                actions={
                  <>
                    <Button variant="outline">Keep everything</Button>
                    <Button>Start again</Button>
                  </>
                }
              >
                This clears every profile and chat on this laptop.
              </DialogPanel>
             </div>
            </div>
          </State>
          <State label="Live">
            <DialogDemo />
          </State>
        </Specimen>
      </Section>

      <Section id="inspect-test" title="Inspect test">
        <Specimen
          name="Off-system box"
          spec="Wrong on purpose. Turn Inspect on and click the box: its colour, padding, radius and type size should each show “not a token”."
        >
          <State label="Hard-coded values">
            {/* The only raw values in the app, here to prove Inspect catches them. */}
            <p style={{ padding: 13, borderRadius: 5, background: '#FFD9F0', color: '#5A0B3C', fontSize: 15 }}>
              Padding 13, radius 5, pink #FFD9F0, text 15
            </p>
          </State>
        </Specimen>
      </Section>
    </PageShell>
  )
}
