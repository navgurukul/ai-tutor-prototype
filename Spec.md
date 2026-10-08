# AI Tutor Prototype Spec

Oct 8, 2026 · @Narendra Singh

## How to use this spec

This spec tells a coding agent (Claude Code or Codex) how to build a clickable prototype of AI Tutor in React and Vite, one phase at a time. The prototype exists to test the flow with students and to give developers a reference they can inspect down to the pixel. It does not run a real model.

1. Export this doc as Markdown and save it as `SPEC.md` in the repo root.
2. Save the style tokens file as `docs/style-tokens.md` and the four flow images in `docs/flows/` (names in References below).
3. Start each agent session with the prompt below, one phase per session, and review before moving on.

```
Read SPEC.md, docs/style-tokens.md and the images in docs/flows/.
Build Phase N only (see "Build phases"). Do not start the next phase.
When you finish, list what you built, how to see it, and anything in
the spec you could not follow or had to guess.
```

When this spec and the flow images disagree, the spec wins, because it is newer and more detailed. When this spec and `docs/style-tokens.md` disagree on a visual value, the tokens file wins. Anything neither covers: pick the simplest option and list it as a guess in the phase report.

## References

Five files ship with this spec. The agent should open every one of them before Phase 0.

| File | Save it as | What it covers |
| --- | --- | --- |
| Flow board 1 | `docs/flows/1-launch-and-profiles.png` | App launch, background model load and memory check, welcome, profile creation, profile picker |
| Flow board 2 | `docs/flows/2-asking-a-question.png` | Empty chat, speaking or typing, Cancel, suggestion chips |
| Flow board 3 | `docs/flows/3-thinking-and-answer.png` | Thinking steps, not-found fallback, answer, speech, Hear again, Explain simpler, interrupting |
| Flow board 4 | `docs/flows/4-coming-back-to-chats.png` | New chat, old chats, Switch, 15-minute idle return, chat titles |
| Style tokens | `docs/style-tokens.md` | Every colour, gray, overlay, type step, spacing, border, radius, elevation, icon size and component spec |

How to read the boards: white boxes are screens the student sees, purple boxes are things the app does on its own, orange diamonds are decisions, and coral boxes are warnings or fallbacks. Each board's notes in grey text are part of the spec.

Screenshots of the earlier POC and the AFE app can go in `docs/reference/` for context. They show what existed before, not what to build, so the agent must not copy their look.

## Product and constraints

AI Tutor is an offline desktop app where school students ask doubts about any subject and get answers from their own class's textbooks, spoken aloud and shown as text. The real app runs a small model through Ollama on refurbished laptops with 8 GB of RAM and will ship as an Electron app; this prototype fakes all of that in the browser.

Who and where:

- Students from Class 6 to 12, mostly Class 6 and 7. Write every line of copy so an 11-year-old understands it on first read.
- 3 to 5 students share one laptop. Each has a profile (animal avatar, name, class). No locks or PINs. Only an admin, working remotely, can delete a profile or change a class.
- Answers are in English only. No language picker.
- Search stays inside the student's own class.
- Voice comes first: tap the mic to speak, tap again to send. Typing is always one step away.

Rules the prototype must follow:

| Area | Rule |
| --- | --- |
| Window | Design frame 1366 × 768. Also works at 1280 × 720 and 1920 × 1080. Minimum 1024 × 640. |
| Network | No requests at runtime. Fonts and icons are bundled. The one exception is browser speech recognition (see Simulated services). |
| Motion | 200 ms ease-out, animating only `transform` and `opacity`. Respect `prefers-reduced-motion`. |
| Performance | No shadows on items inside long scrolling lists. No animation libraries. |
| Access | Every action works by keyboard. Visible focus ring on everything focusable. Text can be zoomed to 150% without breaking layout. |
| Wording | "Class", not "Grade". No jargon like "model", "tokens" or "TTFT" anywhere a student can see. |

The working name is "AI Tutor". Keep it in one constant, `APP_NAME`, because the real name is still open (Samjho and Kyun are candidates).

## Tech setup

Use Vite with the React and TypeScript template, plain CSS with CSS variables, and as few dependencies as possible. Plain CSS keeps every value traceable to a token, which Inspect mode depends on, so no Tailwind and no UI kit.

```
npm create vite@latest ai-tutor-prototype -- --template react-ts
npm i react-router-dom lucide-react
npm i @fontsource/baloo-2 @fontsource/mukta @fontsource/jetbrains-mono
```

| Need | Choice | Why |
| --- | --- | --- |
| Routing | `react-router-dom` with `HashRouter` | Works on GitHub Pages without server rewrites |
| State | React context plus `useReducer`, saved to `localStorage` | Small app; no store library needed |
| Styles | One `tokens.css`, one `base.css`, CSS Modules per component | Every value maps back to a token |
| Icons | `lucide-react`, 2 px stroke, outline | Matches the icon rules in the tokens file; still an open choice for the real app |
| Fonts | Baloo 2, Mukta and JetBrains Mono from `@fontsource`; Synonym as local `woff2` files | Bundled, so nothing loads from the web |

Synonym isn't on npm. Download it from Fontshare, put the 400, 500 and 700 `woff2` files in `src/assets/fonts/`, and declare them with `@font-face` in `base.css`. If the files aren't there yet, the text stack falls back to Mukta and nothing breaks.

Folder layout:

```
src/
  main.tsx, App.tsx
  styles/        tokens.css, base.css, type.css
  state/         store.tsx, types.ts, storage.ts
  services/      model.ts, retrieval.ts, speech.ts, memory.ts, titles.ts, scenarios.ts
  data/          textbooks.ts, answers.ts, names.ts, animals.ts
  components/    Button, IconButton, Chip, Input, NameInput, MicButton, Composer,
                 Sidebar, HistoryRow, ProfileCard, MessageStudent, TutorAnswer,
                 SourceChip, ThinkingSteps, StatusBanner, Dialog
  screens/       Welcome, CreateProfile, ProfilePicker, Chat
  prototype/     PrototypeBar, ScenarioPanel, FrameSizer, FlowsPage, TokensPage, ComponentsPage
  inspect/       InspectProvider, InspectOverlay, InspectPanel, tokenMap.ts, measure.ts
```

Deployment: GitHub Pages through a GitHub Actions workflow that runs `npm ci && npm run build` and publishes `dist/`. Set `base` in `vite.config.ts` to the repo name. Add a README with the live link, how to run locally (`npm i`, `npm run dev`), and where the flows and tokens live.

The prototype bar, scenario panel, flows page, tokens page, components page and Inspect mode are prototype tools. Keep them in `src/prototype/` and `src/inspect/` so none of it gets copied into the real Electron app.

## Design tokens

Every visual value comes from `docs/style-tokens.md`, turned into CSS custom properties on `:root` in one file, `src/styles/tokens.css`. Component CSS uses only `var(--…)`; a raw hex or px value in a component file counts as a bug.

Naming: the variable is the token name from the tokens file with `--` in front. Composite tokens split into parts.

```css
:root {
  /* colour */
  --purple: #9347DD;
  --purple-dark: #7E3CBE;
  --lilac: #EDE2FA;
  --gray-500: #676767;
  --warning-text: #9A4A00;
  --warning-bg: #FFE9D4;
  /* type: one step = size, line height, family */
  --text-sm-size: 14px;
  --text-sm-line: 20px;
  --font-text: 'Synonym', 'Mukta', 'Nirmala UI', system-ui, sans-serif;
  /* space, border, radius, elevation */
  --space-3: 16px;
  --border-1: 1px;
  --radius-24: 24px;
  --elevation-3: 0 8px 16px rgba(38,38,38,0.12);
  --motion: 200ms ease-out;
}
```

What to build from the tokens file:

1. `tokens.css` with every token in sections 1 to 9: brand palette, tints and washes, status pairs, grays, overlays, type scale, spacing, borders, radii, elevations, icon sizes.
2. `type.css` with one class per type step (`.h1` to `.h6`, `.text-lg`, `.text`, `.text-sm`, `.caption`, `.label`), each setting family, size, line height and weight from the table in section 4.
3. One React component per row of section 11 (Components in tokens), matching its spec exactly, with hover, pressed, focus, disabled and selected states where they apply.

Rules from the tokens file the agent tends to miss:

- Text never goes lighter than `gray-500`; `gray-400` is only for disabled things.
- Nothing smaller than 12 px.
- White text only on `purple`, `purple-dark`, `ink` and `green-text`. Never white on `green` or `orange`.
- Status messages always pair colour with an icon and words.
- Focus ring: 3 px `purple`, 2 px offset, on every focusable element, using `:focus-visible`.
- Key terms in answers get a 3 px `pink` bottom border, not an underline.
- Answers max out at 68ch; the reading column at 720 px.
- Titles use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
- Motion is parked until the mascot decision, so stick to the 200 ms rule above and add no character animation.

Inspect mode reads token names straight from `tokens.css` at runtime, so every token must live on `:root` in that one file and nowhere else.

## Simulated services

Each real system is faked by one module in `src/services/` with the async interface the real app will have, so swapping in the real thing later touches one file. Timings mimic an 8 GB laptop, not a MacBook.

| Service | Interface | Fake behaviour | Default timing |
| --- | --- | --- | --- |
| Model load | `model.load(): Promise<void>`, `model.status` | Starts on app open; status goes `loading` → `ready` | 5.5 s |
| Memory check | `memory.check(): Promise<{ low: boolean }>` | Returns `low: false` unless the scenario says otherwise | 300 ms |
| Retrieval | `retrieval.search(q, classNum)` → `{ found, source? }` | Keyword match against `data/textbooks.ts`; `source` = book, chapter number and name, page | 1.5 to 2.5 s |
| Generation | `model.generate(q, source, { simpler })` → `string` | Picks a canned answer from `data/answers.ts` by keyword; arrives whole, like the real app today | 2 to 4 s |
| Listening | `speech.listen({ onInterim, onFinal })`, `speech.stopListening()` | Browser `SpeechRecognition` with `continuous` and `interimResults` on, `en-IN` | Live |
| Speaking | `speech.speak(text, rate)`, `speech.cancel()`, events `start` and `end` | Browser `speechSynthesis` | Live |
| Titles | `titles.generate(question, answer, signal)` → `string` | 3 to 5 words built from the matched topic; cancellable with `AbortSignal` | 1.5 s |

Every timing gets a random spread of ±20% so waits don't feel scripted.

Speech recognition caveat: in Chrome and Edge, the Web Speech API sends audio to a cloud service, so it needs internet. That's fine for a prototype; the real app will use local speech-to-text. If the API is missing or the Fake mic scenario is on, `listen` types out a sample question word by word over about 3 seconds, which also makes demos repeatable.

Fake content in `src/data/`:

- `textbooks.ts`: for Class 6 and 7, about 6 chapters each in Science and Mathematics, with real NCERT chapter names, a page range, and keywords. Chips on the empty chat come from this list.
- `answers.ts`: about 10 canned answers for the likeliest demo questions (solar system, planets, dwarf planets, exoplanets, components of food, fractions, photosynthesis, speed). Mark key terms with `**`. Check every answer for facts before shipping. The POC said exoplanets were unconfirmed and that Pluto is the only dwarf planet, and both claims are wrong.
- `names.ts`: 20 friendly adjectives (Brave, Clever, Curious, Kind, Bright, Calm, Happy, Quick, Gentle, Bold and so on), nothing that could read as an insult.
- `animals.ts`: lion, elephant, tiger, panda, eagle, parrot, owl, penguin, dolphin, butterfly, each with a tint from the tokens file.

### Scenarios

A Scenarios panel, opened from the prototype bar, lets anyone force the hard paths without waiting for them. Store choices in `localStorage`.

| Scenario | Effect |
| --- | --- |
| Slow laptop | Multiplies every delay by 3, so waits reach 15 to 20 s |
| Cold model | Restarts the 5.5 s model load, to test asking before it's ready |
| Memory low | `memory.check` returns `low: true` |
| Next search finds nothing | The next `retrieval.search` returns `found: false` |
| Next answer fails | The next `model.generate` rejects |
| Fake mic | Uses the scripted transcript instead of real recognition |
| Short idle timer | The 15-minute idle return happens after 30 s |
| Reset prototype | Clears all profiles, chats and settings, back to first launch |

## Screens and behaviour

This section walks the four flow boards in order. Copy in quotes is the actual text to use.

### Launch (board 1)

On app start, call `model.load()` and `memory.check()` at once, before any screen renders, and keep their status in the store. No profiles saved means first launch, so show Welcome. Otherwise show the Profile picker.

Low memory: if the check says low, show a `warning` StatusBanner at the top of whatever screen is up, never a blocking dialog. Copy: "Your laptop is running low on memory. Close other apps, like Chrome, so your tutor runs smoothly." Button: "Check again", which re-runs the check and hides the banner when memory is fine. Say nothing when memory is fine.

### Welcome

Shown only on the first launch on a laptop. Centred: `APP_NAME` as h1, the tagline "Ask anything from your books.", a small line with an icon, "Works without internet", and a primary button "Get started" that opens profile step 1.

### Create profile (three steps)

One step per screen, a "Step 1 of 3" caption, Back on steps 2 and 3. Back on step 1 returns to Welcome or the picker, wherever the student came from. The model keeps loading in the background the whole time.

1. Pick an animal. Grid of the 10 animals in tinted circles. Selected: `lilac` fill and a 2 px `purple` border. "Next" is disabled until one is picked. When the student arrives from the picker, show one intro line above the grid: "Let's make your profile. It takes three steps."
2. Name. The Name input comes prefilled with adjective plus animal, like "Brave Owl", with no digits and never a name another profile on this laptop already has. "Surprise me" makes a new one. The student can type their own, up to 20 characters. A typed name that already exists shows the helper "Someone on this laptop already has this name." and disables Next.
3. Class. Class chips from 6 to 12, 48 px tall. Helper caption: "Your teacher can change this later." Primary button: "Start learning", which saves the profile and opens an empty chat.

Animal avatars can be emoji inside the tinted circle for the prototype. Mark them as placeholders in the code; illustrated avatars come later.

### Profile picker

Heading "Who's learning today?" (h1). One Profile card per student, then the dashed "New profile" card. With 3 to 5 profiles everything fits on one screen without scrolling. Clicking a card opens a new empty chat for that profile. No delete, rename or lock anywhere.

### Chat screen layout

The sidebar is 280 px at 1200 px and wider, a 72 px icon rail from 1024 to 1199 px, and a drawer below 1024 px. Top to bottom: "New chat" button, the "RECENT CHATS" label, this profile's chats newest first (History rows, active one in `lilac`), and at the bottom the profile's avatar, name and a "Switch" ghost button.

The main area has a reading column, max 720 px, centred. Top right: a voice control with "Voice on" or "Voice off" and a speed choice, "Normal" or "Slow" (rate 1.0 or 0.85).

### Empty chat (board 2)

Every profile entry and every New chat starts here. Centred: "Hi, Brave Owl" (h2), "What do you want to understand today?" (text-lg), the 112 px empty-state mic with the caption "Tap to speak", then 3 or 4 suggestion chips drawn from the student's class chapters (for example "What are the components of food?"), then a quiet text input with the placeholder "Or type your question". Tapping a chip sends its text as the question.

An empty chat isn't added to Recent chats until its first question is sent.

### Listening

Tapping the mic starts listening. The mic turns `purple-dark` with `white-60` pulse rings, the caption becomes "Listening. Tap again to send.", the live transcript shows above it in text-lg, and a "Cancel" ghost button appears.

- Tap again: stop and send the final transcript.
- Cancel or Esc: throw the transcript away and go back to the idle mic.
- Empty transcript on send: don't send; show "I didn't catch that. Try again." under the mic.
- 60 seconds of listening: stop, put the transcript into the text input, and focus it so the student can fix it and press Enter, or clear it.
- No silence detection. Listening only ends by tap, Cancel or the time limit.

After the first question, the empty state goes away. Messages fill the column and the Composer docks at the bottom: 64 px mic, a text field and a Send icon button. The composer mic behaves exactly like the big one. Enter sends; Shift+Enter adds a line. Send and the mic are disabled while an answer is being worked on, but the student can still type.

### Thinking steps (board 3)

Right after the student's message, a ThinkingSteps block appears where the answer will go. Steps stack vertically, one line each: an icon, then text-sm. The current step has a gentle animated icon, finished steps show a check in `gray-500`, and upcoming steps don't show yet.

1. "Getting ready". Shown only if the model isn't loaded when the question is sent; done when the load finishes.
2. "Searching your Class 6 books", with the profile's class number. Done when retrieval returns.
3. "Writing the answer". Done when generation returns.

Steps change only when a service call finishes, never on a timer. If the whole wait passes 10 seconds, add the caption "Still working. This laptop may take a little longer." under the steps. At 45 seconds, treat it as a failure.

Not found: replace the steps with a tutor message in plain answer style (not an error): "I couldn't find this in your Class 6 books. Try asking it another way, or ask your teacher." It is spoken too. There is no "answer anyway" option.

Failure: replace the steps with an `error` StatusBanner: "Something went wrong." and a "Try again" button that resends the same question.

All step changes and the answer's arrival go through an `aria-live="polite"` region.

### Answer

The tutor answer has no bubble: `text` at weight 400, h5 and h6 for any headings, key terms with the pink border, max 68ch. Under it sits the Source chip, for example "NCERT · Class 6 Science · Ch 8 · p. 74", then a row of three controls:

- "Hear again" (volume icon). While the tutor is speaking, this button becomes "Stop" (square icon).
- "Explain simpler". Adds a small student message, "Explain it simpler", then runs the steps again, skipping search and showing only "Writing the answer", and gives a new, simpler answer with the same source.
- The Source chip itself counts as the third control. In the prototype it shows a tooltip with the full book and page; in the real app it will open the page.

If Voice is on, the newest answer starts speaking as soon as it appears. Older answers only speak through Hear again. Tapping the mic while the tutor is speaking stops the speech at once and starts listening. Switching profiles, opening another chat or New chat also stops speech.

### History, titles and switching (board 4)

Chats are stored per profile. Opening an old chat shows its full history and the student can keep asking in it.

Titles: when the first question is sent, the chat's title is that question, cut to 40 characters at a word boundary with an ellipsis. Once the first answer has finished speaking (or has appeared, if Voice is off), call `titles.generate` and swap in the 3 to 5 word result. If the student sends another question while the title is being made, abort it and try again after that answer.

Switch goes to the profile picker. Idle return: after 15 minutes with no pointer, keyboard or listening activity, stop any speech and go to the profile picker. Time spent while the tutor is speaking doesn't count as idle.

### Keyboard

Tab reaches every control in visual order. Space or Enter on the focused mic starts and stops listening. Esc cancels listening, closes the drawer, or closes a dialog. Icon-only buttons have an `aria-label`. With `prefers-reduced-motion`, the pulse rings and step animations become static icons.

## Inspect mode and the prototype bar

An "Inspect" toggle in the prototype bar turns on a Figma-style inspector. Hovering outlines an element, clicking pins it, and a side panel shows its size, spacing, type and colours, with each value named by its token. It's off by default, and the on/off choice is saved in `localStorage`.

### Prototype bar

A 40 px strip above the app, in `ink` with white text, so nobody mistakes it for product UI. Left: "AI Tutor prototype" and the version. Right, in order:

- Frame: "Fit window", "1366 × 768", "1280 × 720", "1920 × 1080", "1024 × 640". Any fixed size renders the app inside a frame of exactly that size, centred, so layouts can be checked at each size.
- "Inspect" toggle, also Alt+I.
- "Scenarios", which opens the Scenarios panel.
- "Flows", "Tokens" and "Components", which open the reference pages: the four flow images, every token as a swatch with its name and value, and every component in every state.

### What the inspector does

While Inspect is on, clicks inside the app select elements instead of pressing buttons. To use the app, switch Inspect off.

| Action | Result |
| --- | --- |
| Hover | 1 px outline in an inspector blue (`#0D99FF`, deliberately outside the palette), with a badge showing the component name and size, like "PrimaryButton · 160 × 48" |
| Click | Pins the selection and opens the panel |
| Shift + click | Selects the exact DOM element under the pointer instead of its component |
| Alt + hover while something is pinned | Red distance lines in px between the pinned element and the hovered one |
| Arrow up | Selects the parent |
| Esc | Clears the selection |

The panel is 320 px wide, fixed to the right edge, and shows these groups for the pinned element:

1. Identity: component name, HTML tag, and the first 40 characters of its text.
2. Size and position: width × height, x and y relative to its parent.
3. Box model: a small Figma-style diagram with margin, border, padding and content, every number in px with its token ("16 · space-3").
4. Layout: display, direction, gap, alignment, with tokens.
5. Typography: family actually rendered, size / line height, weight, letter spacing, and the matching type step ("text-sm · 14/20 · 700").
6. Colour: text colour, fill, border and shadow, each as hex plus token ("#4A4A4A · gray-700").
7. Shape: radius and border width with tokens.
8. Contrast: the text's ratio against its real background, marked pass or fail for WCAG AA.
9. A "Copy CSS" button that copies the element's styles written with `var(--token)` names.

A value that matches no token shows in `warning` colour labelled "not a token". That makes the inspector a design QA tool too: anything off-system stands out.

### How to build it

- No library. An `InspectProvider` context holds `enabled`, `hovered` and `pinned`.
- Mark each component's root with `data-inspect="ComponentName"`. Hover and click resolve to the nearest ancestor with that attribute unless Shift is held.
- Use capture-phase `pointermove` and `click` listeners on `document` while enabled, calling `preventDefault` and `stopPropagation` on clicks inside the app frame. Ignore anything inside elements marked `data-inspector-ui`, which covers the bar, panel and outlines.
- Draw outlines, badges and distance lines in a portal layer with `pointer-events: none`, positioned from `getBoundingClientRect()`, and redraw on scroll and resize.
- Read values with `getComputedStyle`.
- Token map: on start, walk `document.styleSheets`, collect every custom property declared on `:root`, and build a lookup from normalised value to token names. Normalise colours to uppercase hex and lengths to px. One value can match several tokens (`ink` and `gray-900`); show all of them.
- Contrast: walk up the tree to the first ancestor with a non-transparent background, then use the WCAG relative luminance formula.

## Build phases

Nine phases, each small enough for one agent session and each ending in something you can open and check. Inspect mode comes early on purpose, so it can be used to check everything built after it.

| Phase | Build | Done when |
| --- | --- | --- |
| 0 · Setup | Vite project, folders, fonts, `tokens.css`, `type.css`, `base.css`, prototype bar shell, Tokens page, GitHub Pages workflow, README | The deployed link shows the Tokens page with every token from the tokens file as a named swatch |
| 1 · Components | Every component in section 11 of the tokens file, plus the Components page | Each component shows all its states (default, hover, pressed, focus, disabled, selected) on one page |
| 2 · Inspect | Inspector, panel, token map, distances, Copy CSS, Frame sizes | Clicking any component on the Components page shows its values with token names, and a hard-coded test value shows "not a token" |
| 3 · Services | Store, `localStorage`, all simulated services, `data/` files, Scenarios panel | A temporary debug page can call each service and every scenario changes its result |
| 4 · Launch and profiles | Background load and memory check, low-memory banner, Welcome, the three profile steps, Profile picker | First launch runs Welcome to empty chat; a second launch opens the picker; names never repeat |
| 5 · Asking | Chat layout, sidebar (full, rail, drawer), empty chat, chips, typing, listening, Cancel, 60 s limit, docked composer | A question can be sent by voice, Fake mic, chip and keyboard |
| 6 · Thinking and answer | Thinking steps, slow-wait caption, not-found message, failure with Try again, answer, Source chip, Hear again, Stop, Explain simpler, speed, interrupting | Every scenario in the Scenarios panel produces the behaviour on board 3 |
| 7 · History | Recent chats per profile, reopening and continuing, placeholder and generated titles, Switch, idle return | Board 4 works end to end, including the 30 s Short idle timer |
| 8 · Polish and QA | Keyboard pass, 150% zoom, reduced motion, all frame sizes, contrast check with Inspect, README update | Every item in the checklist below is ticked |

After each phase, ask the agent to commit with a message naming the phase, so any phase can be rolled back on its own.

## Acceptance checklist

The prototype is done when every box below is ticked on the deployed link in Chrome or Edge on Windows.

- [ ] First launch: Welcome, three profile steps, empty chat, with the model loading in the background the whole time
- [ ] Second launch opens the picker; New profile skips Welcome and shows the intro line
- [ ] Two profiles on one laptop can never end up with the same name
- [ ] Memory low scenario shows the banner on the current screen, and Check again clears it
- [ ] A question asked during Cold model shows "Getting ready" first
- [ ] Voice, Fake mic, chip and typed questions all send; Cancel and Esc discard; the 60 s limit moves the transcript into the text field
- [ ] Thinking steps change only when services finish; Slow laptop shows the 10 s caption
- [ ] Not-found and failure each look and read as specified; Try again resends
- [ ] The newest answer speaks on its own; Stop, Hear again, Explain simpler and Slow speed all work
- [ ] Tapping the mic mid-speech stops the speech and starts listening
- [ ] Titles start as the trimmed question and swap to a short title after the first answer
- [ ] Old chats reopen and continue; Switch and idle return both land on the picker with speech stopped
- [ ] The sidebar becomes a rail below 1200 px and a drawer below 1024 px
- [ ] Everything works by keyboard, with a visible focus ring
- [ ] Layout holds at 150% text zoom and at all four frame sizes
- [ ] Inspect shows token names for every element, and "not a token" appears nowhere in product UI
- [ ] No text a student can see fails AA contrast

Out of scope for this prototype: the real model, Ollama, real retrieval, local speech-to-text, speech that starts sentence by sentence, Electron packaging, Hindi, admin tools, the final app name and logo, illustrated avatars, and any mascot or motion beyond the 200 ms rule.

Still open, to decide before the real build: the app name, the Synonym licence credit, the icon library (Lucide is used here as a stand-in), and whether the team can pull chapter names per class for the suggestion chips.
