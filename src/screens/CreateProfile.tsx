import { ArrowLeft, Dices } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarOption } from '../components/Avatar.tsx'
import Button from '../components/Button.tsx'
import Card from '../components/Card.tsx'
import { ClassChip } from '../components/Chip.tsx'
import NameInput from '../components/NameInput.tsx'
import { animalOf, animals } from '../data/animals.ts'
import { cleanName, makeName, sameName } from '../data/names.ts'
import { useStore } from '../state/storeContext.ts'
import { classNums, newId, type ClassNum } from '../state/types.ts'
import BookAndGlobe from './BookAndGlobe.tsx'
import styles from './CreateProfile.module.css'
import screen from './Screen.module.css'

const titles = ['Choose your avatar', 'Pick a name', 'Pick your class']

// Three steps, one per screen: animal, name, class. The model keeps loading
// in the background the whole time.
export default function CreateProfile() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const stepId = useId()

  // With profiles on the laptop already, the student came from the picker.
  const [fromPicker] = useState(state.profiles.length > 0)
  const [step, setStep] = useState(1)
  const [animalId, setAnimalId] = useState<string>()
  const [name, setName] = useState('')
  // A name the student typed is kept when they go back and change the animal.
  const [typed, setTyped] = useState(false)
  const [classNum, setClassNum] = useState<ClassNum>()

  const taken = state.profiles.map((profile) => profile.name)
  const nameTaken = taken.some((other) => sameName(other, name))
  const canGoOn = step === 1 ? animalId !== undefined : step === 2 ? cleanName(name) !== '' && !nameTaken : classNum !== undefined

  // Each step starts at its heading, for keyboards and screen readers.
  const heading = useRef<HTMLHeadingElement>(null)
  const firstStep = useRef(true)
  useEffect(() => {
    if (firstStep.current) firstStep.current = false
    else heading.current?.focus()
  }, [step])

  function pickAnimal(id: string) {
    if (id === animalId) return
    setAnimalId(id)
    if (!typed) setName(makeName(animalOf(id).name, taken))
  }

  function surprise() {
    if (!animalId) return
    setName(makeName(animalOf(animalId).name, taken, name))
    setTyped(false)
  }

  function back() {
    // Welcome on a first launch, the picker after that: both live at the start.
    if (step === 1) navigate('/')
    else setStep(step - 1)
  }

  function next(event: FormEvent) {
    event.preventDefault()
    if (!canGoOn) return
    if (step < 3) {
      setStep(step + 1)
      return
    }
    const profile = { id: newId(), name: cleanName(name), animalId: animalId!, classNum: classNum!, createdAt: Date.now() }
    dispatch({ type: 'profile/add', profile })
    dispatch({ type: 'profile/enter', profileId: profile.id })
    navigate('/chat', { replace: true })
  }

  return (
    <main className={screen.centred}>
      {/* The book from Welcome, standing on the card. */}
      <div className={state.memoryLow ? `${styles.stack} ${styles.tight}` : styles.stack}>
        <BookAndGlobe className={styles.art} />
        <Card className={styles.card}>
          <form className={styles.form} onSubmit={next}>
            <header className={styles.header}>
              <p className={`caption ${styles.step}`} id={stepId}>
                Step {step} of 3
              </p>
              <h1 className="h2" tabIndex={-1} ref={heading} aria-describedby={stepId}>
                {titles[step - 1]}
              </h1>
              {step === 1 && fromPicker && <p className={`text ${styles.intro}`}>Let&rsquo;s make your profile. It takes three steps.</p>}
            </header>

            <div className={styles.body} key={step}>
              {step === 1 && (
                <div className={styles.animals} role="group" aria-label="Animals">
                  {animals.map((animal) => (
                    <AvatarOption key={animal.id} animal={animal} selected={animal.id === animalId} onClick={() => pickAnimal(animal.id)} />
                  ))}
                </div>
              )}

              {step === 2 && animalId && (
                <>
                  <Avatar animal={animalOf(animalId)} />
                  <NameInput
                    value={name}
                    error={nameTaken ? 'Someone on this laptop already has this name.' : undefined}
                    onChange={(event) => {
                      setName(event.target.value)
                      setTyped(true)
                    }}
                  />
                  <Button variant="ghost" icon={<Dices aria-hidden="true" />} onClick={surprise}>
                    Surprise Me
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className={styles.classes} role="group" aria-label="Class">
                    {classNums.map((number) => (
                      <ClassChip key={number} selected={number === classNum} onClick={() => setClassNum(number)}>
                        Class {number}
                      </ClassChip>
                    ))}
                  </div>
                  <p className={`caption ${styles.helper}`}>Your teacher can change this later.</p>
                </>
              )}
            </div>

            <div className={styles.actions}>
              <Button variant="outline" icon={<ArrowLeft aria-hidden="true" />} onClick={back}>
                Back
              </Button>
              <Button type="submit" disabled={!canGoOn}>
                {step === 3 ? 'Start Learning' : 'Next'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}
