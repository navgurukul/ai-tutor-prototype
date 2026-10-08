# AI Tutor prototype

A clickable prototype of AI Tutor, an offline desktop app where school students ask doubts and get answers from their own class's textbooks. It is built in React and Vite to test the flow with students and to give developers a reference they can inspect. It does not run a real model: every service is simulated in the browser.

**Live link:** https://navgurukul.github.io/ai-tutor-prototype/

## Run it locally

You need Node 20 or newer.

```
npm i
npm run dev
```

Then open the address Vite prints, usually http://localhost:5173.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Type-checks, then builds to `dist/` |
| `npm run preview` | Serves the built `dist/` folder |
| `npm run lint` | Runs oxlint |

## Where things live

| What | Where |
| --- | --- |
| The spec, with build phases and the acceptance checklist | `Spec.md` |
| Design tokens, as written by design | `docs/style-tokens.md` |
| Design tokens, in code | `src/styles/tokens.css` |
| The four flow boards | `docs/flows/` |
| The screens a student sees | `src/screens/` |
| The components those screens are made of | `src/components/` |
| Prototype tools that never ship: the dark bar, Scenarios, Inspect and the reference pages | `src/prototype/`, `src/inspect/` |
| Screenshots of the earlier POC and other apps, for context only | `docs/reference/`, kept out of the repo on purpose |

In the running prototype, **App** in the dark bar at the top opens the app itself. The other links show the reference material: **Flows** shows the four boards, **Tokens** shows every token with its name and value, and **Components** shows every component in every state, with hover, pressed and focus pinned so they can be seen without a mouse.

## Inspect mode

Switch **Inspect** on in the dark bar, or press Alt + I. While it is on, clicks select things instead of pressing them.

| Action | Result |
| --- | --- |
| Hover | Outline with the component name and size |
| Click | Pins the component and fills the panel on the right |
| Shift + click | Pins the exact element under the pointer |
| Alt + hover, with something pinned | Red distance lines in px |
| Arrow up | Selects the parent |
| Esc | Clears the selection |

The panel shows size, box model, layout, type, colour, shape and contrast. Every value is shown with the token that produces it, like `48 · size-48`. A value that should come from a token but matches none is shown in orange as "not a token". **Copy CSS** copies the element's styles written with `var(--token)` names. The last section of the Components page has a box with hard-coded values to try this on.

**Welcome** in the bar picks which of the four Welcome looks is shown. **Frame** draws the app at a fixed size (1366 × 768, 1280 × 720, 1920 × 1080 or 1024 × 640) at true pixels. A frame bigger than the window scrolls.

## What works so far

All four flow boards work end to end.

- **First launch:** Welcome, then three profile steps (animal, name, class), then an empty chat.
- **Welcome, four looks:** two layouts, each in two colours. Centred puts everything on one centre line with a shelf of books along the bottom and a globe that drifts slowly over the open book (mock-up in `docs/feedback/`). Two Panel puts the words on the left and a picture on the right (mock-ups in `docs/welcome-screen/`). Bold fills the window with purple; Calm sits on the app background. Centred Bold is the default. The book and globe from the shelf also stand on the card on the profile steps. **Welcome** in the dark bar switches between them and opens the screen, even on a laptop that already has profiles.
- **Every launch after that:** the profile picker. Reloading the page counts as a new launch.
- **Names:** a made-up name like "Brave Owl" is offered, and two profiles on one laptop can never have the same name.
- **Low memory:** switch on **Scenarios → Memory low** to see the warning on whatever screen is up. Switch it off and the warning goes away by itself: there is no button, the app keeps checking while the warning is up.
- **Asking:** the mic leads, on the empty chat and under the messages. Tap it to listen and tap again to send. Cancel or Esc throws the words away, and after 60 seconds they move into the text box instead. To type, press "Type Your Question" under the mic; the small mic in the text box goes back to speaking.
- **Fake mic:** switch on **Scenarios → Fake mic** to have a sample question typed out instead of using the microphone. The real microphone needs Chrome or Edge, internet, and permission.
- **Answering:** thinking steps show under the question and change only when a service finishes. When the search is done, its step says where the answer was found, like "Found it in Science, Chapter 12, page 215". Then the answer appears with its book, chapter and page, and is read aloud if Voice is on.
- **Not in the books:** when the search finds nothing, the tutor says "I couldn't find this in your Class 6 books. Try asking it another way, or ask your teacher." It never answers from outside the books.
- **After an answer:** "Hear Again" reads it again and turns into "Stop" while the tutor speaks. "Make It Simpler" gives the same answer in easier words. Tapping the mic stops the voice and starts listening.
- **Hard paths:** every switch in **Scenarios** changes what happens here: Slow laptop (a "Still working on it" line after 10 seconds), Cold model ("Getting ready" first), Next search finds nothing, and Next answer fails ("Something went wrong." with "Try Again").
- **Recent chats:** each profile sees only its own chats, most recently used first. Any of them can be opened and continued. "New Chat" starts an empty one, which joins the list with its first question.
- **Chat titles:** a chat is first named after its question, cut to 40 characters. Once the first answer has been read aloud (or has appeared, with Voice off) a short title replaces it. A new question asked while the title is being written cancels that job, and it runs again after the next answer.
- **Switch and idle return:** "Switch" goes back to the profile picker and stops the voice. So does 15 minutes with no pointer, keyboard, listening, speaking or waiting for an answer. Switch on **Scenarios → Short idle timer** to make that 30 seconds.
- **Sidebar:** full at 1200 px and wider, an icon rail from 1024 to 1199 px, and a drawer below 1024 px. Use **Frame** in the dark bar, or resize the window, to see each.
- **Keyboard:** Tab reaches every control, in the order it is on screen, with a purple focus ring. Space or Enter on the mic starts and stops listening. Esc cancels listening and closes the drawer or a dialog. Focus is never left on a control that has gone away: an empty chat starts on the mic, a spoken question keeps focus on the mic, and a typed one keeps it in the text field.
- **Reduced motion:** with the system setting on, the mic's rings and the thinking icon stay still and nothing slides or fades.

About 70 questions have a written answer, all for Class 6 and 7 Science and Mathematics. They are listed in [docs/test-questions.md](docs/test-questions.md), with the words that trigger each one. A Class 8 to 12 profile always gets the "couldn't find this" message. To see the first launch again, use **Scenarios → Reset prototype**.

## Simulated services and scenarios

Nothing real runs behind the prototype. Each real system is faked by one file in `src/services/`, with the interface the real app will have, so swapping in the real thing later touches one file.

| File | Stands in for | What it does here |
| --- | --- | --- |
| `model.ts` | The model, loaded through Ollama | A 5.5 s load, then answers picked by keyword from `src/data/answers6.ts` and `answers7.ts` |
| `memory.ts` | The free-memory check | Reports low only when the scenario says so |
| `retrieval.ts` | Search in the class's textbooks | Keyword match against `src/data/textbooks.ts`, inside one class only |
| `speech.ts` | Local speech-to-text and the tutor's voice | The browser's speech recognition and speech synthesis |
| `titles.ts` | The model writing a chat title | The matched topic's title, after 1.5 s, and it can be cancelled |
| `scenarios.ts` | Nothing: prototype only | The switches below, and the timing every service waits on |

Timings copy an 8 GB laptop and vary by 20% either way. Speech recognition in Chrome and Edge needs internet; when it isn't available, a sample question is typed out word by word.

**Scenarios** in the dark bar forces the hard paths: Slow laptop, Memory low, Next search finds nothing, Next answer fails, Fake mic, Short idle timer, Cold model and Reset prototype. Choices are saved in `localStorage`.

Profiles, chats and settings live in a React context with a reducer (`src/state/`) and are saved to `localStorage`.

### Content still to check

- The chapter names in `textbooks.ts` are the real ones from the current NCERT books, but the **page ranges and page numbers are placeholders** and have not been checked against the printed books.
- The answers in `answers6.ts` and `answers7.ts` have been fact-checked, but not against the textbooks' own wording.

## Rules for the code

- Every visual value comes from `src/styles/tokens.css`. Component CSS uses only `var(--…)`. A raw hex or px value in a component file is a bug.
- All tokens live on `:root` in that one file. The Tokens page and Inspect mode read them from there.
- No requests at runtime. Fonts and icons are bundled.
- `src/prototype/` and `src/inspect/` are prototype tools. Nothing in them should be copied into the real Electron app.
- Layout breakpoints use `@container app (…)`, not `@media`. The app frame is a container named `app`, so a fixed frame size in the prototype bar behaves like a window of that size.
- Icons are sized in CSS with the `--icon-*` tokens, not with a `size` prop, and keep a 2 px stroke at every size.
- The app name lives in one constant, `APP_NAME`, in `src/config.ts`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages. The workflow passes the repository name to Vite as the base path, so the repo can be renamed without changing any code. In the repo settings, Pages must be set to deploy from GitHub Actions.

## Build status

The prototype is built in nine phases, listed in `Spec.md`.

| Phase | Status |
| --- | --- |
| 0 · Setup | Built |
| 1 · Components | Built |
| 2 · Inspect | Built |
| 3 · Services | Built |
| 4 · Launch and profiles | Built |
| 5 · Asking | Built |
| 6 · Thinking and answer | Built |
| 7 · History | Built |
| 8 · Polish and QA | Built |

## QA

Phase 8 checked the build against the acceptance checklist in `Spec.md`. The checks ran on a local build in headless Chrome on a Mac, driven by scripts.

| Check | How | Result |
| --- | --- | --- |
| The 13 behaviour items in the checklist, from first launch to the sidebar breakpoints | Each one driven through the screens on the build | Pass |
| Keyboard | Every screen walked with Tab, Space, Enter and Esc only, from first launch to Switch | Pass |
| Window sizes | 27 screen states, most of them at 1920 × 1080, 1366 × 768, 1280 × 720, 1100 wide and 1024 × 640, checked for clipped, hidden or overflowing content | Pass |
| 150% zoom | The same states at 150% browser zoom of 1366 × 768 and of 1024 × 640 | Pass |
| Tokens | Inspect's own reader run on every element of those states | No "not a token" in product UI |
| Contrast | Every piece of visible text against its real background | No AA failures. Disabled controls are below AA, which WCAG allows |
| Text size | Every piece of visible text | Nothing under 12 px |
| Reduced motion | With the system setting emulated | No animation or transition runs |
| Network | Requests logged across the whole run | None leave the page's own address |

Still to check by hand, because a script can't:

- The real microphone and the real tutor voice, in Chrome or Edge. The scripts used the Fake mic and a stand-in voice.
- The deployed link on Windows, which is where the checklist asks for the final tick.
- The full 15-minute idle return. Only the 30-second version was waited out.

## Fonts

Baloo 2, Mukta and JetBrains Mono come from `@fontsource`. Synonym comes from Fontshare and is stored in `src/assets/fonts/`. Synonym is under the ITF Free Font License; the credit it asks for still has to be confirmed and added before the real app ships.
