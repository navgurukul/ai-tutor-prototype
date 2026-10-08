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

**Frame** in the bar draws the app at a fixed size (1366 × 768, 1280 × 720, 1920 × 1080 or 1024 × 640) at true pixels. A frame bigger than the window scrolls.

## What works so far

The app opens on the launch flow from flow board 1.

- **First launch:** Welcome, then three profile steps (animal, name, class), then the chat.
- **Every launch after that:** the profile picker. Reloading the page counts as a new launch.
- **Names:** a made-up name like "Brave Owl" is offered, and two profiles on one laptop can never have the same name.
- **Low memory:** switch on **Scenarios → Memory low** to see the warning on whatever screen is up. Switch it off and press "Check again" to clear it.

The chat is a stand-in until Phase 5. To see the first launch again, use **Scenarios → Reset prototype**.

## Simulated services and scenarios

Nothing real runs behind the prototype. Each real system is faked by one file in `src/services/`, with the interface the real app will have, so swapping in the real thing later touches one file.

| File | Stands in for | What it does here |
| --- | --- | --- |
| `model.ts` | The model, loaded through Ollama | A 5.5 s load, then answers picked by keyword from `src/data/answers.ts` |
| `memory.ts` | The free-memory check | Reports low only when the scenario says so |
| `retrieval.ts` | Search in the class's textbooks | Keyword match against `src/data/textbooks.ts`, inside one class only |
| `speech.ts` | Local speech-to-text and the tutor's voice | The browser's speech recognition and speech synthesis |
| `titles.ts` | The model writing a chat title | The matched topic's title, after 1.5 s, and it can be cancelled |
| `scenarios.ts` | Nothing: prototype only | The switches below, and the timing every service waits on |

Timings copy an 8 GB laptop and vary by 20% either way. Speech recognition in Chrome and Edge needs internet; when it isn't available, a sample question is typed out word by word.

**Scenarios** in the dark bar forces the hard paths: Slow laptop, Memory low, Next search finds nothing, Next answer fails, Fake mic, Short idle timer, Cold model and Reset prototype. Choices are saved in `localStorage`.

**Services** in the dark bar is a temporary test bench that calls each service and logs the result. It will be removed once the real screens use the services.

Profiles, chats and settings live in a React context with a reducer (`src/state/`) and are saved to `localStorage`.

### Content still to check

- The chapter names in `textbooks.ts` are the real ones from the current NCERT books, but the **page ranges and page numbers are placeholders** and have not been checked against the printed books.
- The answers in `answers.ts` have been fact-checked, but not against the textbooks' own wording.

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
| 5 to 8 | Not started |

## Fonts

Baloo 2, Mukta and JetBrains Mono come from `@fontsource`. Synonym comes from Fontshare and is stored in `src/assets/fonts/`. Synonym is under the ITF Free Font License; the credit it asks for still has to be confirmed and added before the real app ships.
