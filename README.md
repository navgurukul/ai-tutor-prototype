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
| Screenshots of the earlier POC and other apps, for context only | `docs/reference/`, kept out of the repo on purpose |

In the running prototype, the dark bar at the top links to the same material: **Flows** shows the four boards, **Tokens** shows every token with its name and value, and **Components** shows every component in every state, with hover, pressed and focus pinned so they can be seen without a mouse.

## Rules for the code

- Every visual value comes from `src/styles/tokens.css`. Component CSS uses only `var(--…)`. A raw hex or px value in a component file is a bug.
- All tokens live on `:root` in that one file. The Tokens page and Inspect mode read them from there.
- No requests at runtime. Fonts and icons are bundled.
- `src/prototype/` and `src/inspect/` are prototype tools. Nothing in them should be copied into the real Electron app.
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
| 2 to 8 | Not started |

## Fonts

Baloo 2, Mukta and JetBrains Mono come from `@fontsource`. Synonym comes from Fontshare and is stored in `src/assets/fonts/`. Synonym is under the ITF Free Font License; the credit it asks for still has to be confirmed and added before the real app ships.
