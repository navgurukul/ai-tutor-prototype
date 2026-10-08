// What each token is for, in the order of docs/style-tokens.md. Values are
// not repeated here: the Tokens page reads them from tokens.css.

export type TokenItem = { name: string; use: string }

export type TypeStep = {
  step: string
  family: 'heading' | 'text' | 'label'
  weights: string
  sample: string
}

export type StatusPair = { name: string; ratio: string; sample: string }

export const brand: TokenItem[] = [
  { name: 'purple', use: 'Primary buttons, the mic, active states, links, focus ring' },
  { name: 'purple-dark', use: 'Hover and pressed on purple, mic while listening, the strip under the Welcome shelf' },
  { name: 'lilac', use: 'Selected rows, selected avatar, highlights' },
  { name: 'pink', use: 'Name-input underline only' },
  { name: 'green', use: 'Success, progress' },
  { name: 'green-text', use: 'Success text on white' },
  { name: 'orange', use: 'Accent' },
  { name: 'blue', use: 'Accent' },
  { name: 'coral', use: 'Accent' },
  { name: 'ink', use: 'Primary text, dark fills (same as gray-900)' },
  { name: 'bg', use: 'App background' },
  { name: 'white', use: 'Sidebar, cards, dialogs, composer' },
]

export const tints: TokenItem[] = [
  { name: 'green-tint', use: 'Green tint, the strip under the shelf on the calm Welcome' },
  { name: 'green-wash', use: 'Green wash' },
  { name: 'purple-tint', use: 'Purple tint (same as lilac)' },
  { name: 'blue-tint', use: 'Blue tint' },
  { name: 'blue-wash', use: 'Blue wash' },
  { name: 'orange-tint', use: 'Orange tint' },
  { name: 'orange-wash', use: 'Orange wash' },
  { name: 'pink-tint', use: 'Pink tint' },
  { name: 'ink-tint', use: 'Ink tint' },
  { name: 'coral-tint', use: 'Coral tint' },
  { name: 'coral-wash', use: 'Coral wash' },
]

export const statuses: StatusPair[] = [
  { name: 'success', ratio: '4.6', sample: 'Answer saved' },
  { name: 'warning', ratio: '5.3', sample: 'Your laptop is running low on memory' },
  { name: 'error', ratio: '4.6', sample: 'Something went wrong' },
  { name: 'info', ratio: '5.5', sample: 'Works without internet' },
]

export const grays: TokenItem[] = [
  { name: 'gray-900', use: 'Primary text, headings, icons' },
  { name: 'gray-700', use: 'Secondary text: descriptions, subtitles' },
  { name: 'gray-500', use: 'Tertiary text: meta, timestamps, placeholders. The lightest text allowed' },
  { name: 'gray-400', use: 'Disabled text and icons only' },
  { name: 'gray-300', use: 'Strong borders: inputs, outline buttons' },
  { name: 'gray-200', use: 'Default borders: cards, chips, dividers' },
  { name: 'gray-100', use: 'Subtle fills: hover, empty tracks, pill backgrounds' },
]

export const overlays: (TokenItem & { on: string })[] = [
  { name: 'white-90', on: 'ink', use: 'Secondary text on ink only' },
  { name: 'white-60', on: 'purple-dark', use: 'Mic pulse rings, decorative marks on colour' },
  { name: 'white-20', on: 'purple', use: 'Tracks and chip fills on colour' },
  { name: 'scrim', on: 'bg', use: 'Behind dialogs' },
]

export const fonts: (TokenItem & { family: string })[] = [
  { name: 'font-heading', family: 'Baloo 2', use: 'Headings display to h6, big numbers, the name input' },
  { name: 'font-text', family: 'Synonym', use: 'Everything else: body, answers, buttons, chips' },
  { name: 'font-label', family: 'JetBrains Mono', use: 'Uppercase labels only' },
]

export const weights: TokenItem[] = [
  { name: 'weight-regular', use: 'Reading text: answers' },
  { name: 'weight-medium', use: 'UI copy' },
  { name: 'weight-bold', use: 'Buttons, emphasis, h5 and h6' },
  { name: 'weight-heavy', use: 'display to h4' },
]

export const typeSteps: TypeStep[] = [
  { step: 'display', family: 'heading', weights: '800', sample: 'Ask anything from your books.' },
  { step: 'h1', family: 'heading', weights: '800', sample: 'Who’s learning today?' },
  { step: 'h2', family: 'heading', weights: '800', sample: 'Hi, Brave Owl' },
  { step: 'h3', family: 'heading', weights: '800', sample: 'Curious Panda' },
  { step: 'h4', family: 'heading', weights: '800', sample: 'Kind Dolphin' },
  { step: 'h5', family: 'heading', weights: '700', sample: 'What plants need to make food' },
  { step: 'h6', family: 'heading', weights: '700', sample: 'Sunlight, water and air' },
  { step: 'text-lg', family: 'text', weights: '400', sample: 'What do you want to understand today?' },
  {
    step: 'text',
    family: 'text',
    weights: '400 / 500 / 700',
    sample: 'Plants make their own food. They use sunlight, water and a gas from the air.',
  },
  { step: 'text-sm', family: 'text', weights: '500 / 700', sample: 'Searching your Class 6 books' },
  { step: 'caption', family: 'text', weights: '500', sample: 'Your teacher can change this later.' },
  { step: 'label', family: 'label', weights: '700 · uppercase', sample: 'Recent chats' },
]

export const typeExtras: TokenItem[] = [{ name: 'label-tracking', use: 'Letter spacing on labels' }]

export const spacing: TokenItem[] = [
  { name: 'space-1', use: 'Icon to label inside small components' },
  { name: 'space-2', use: 'Tight stacks, chip groups, between label and field' },
  { name: 'space-3', use: 'Default gap, component padding, between paragraphs' },
  { name: 'space-4', use: 'Card padding, section gaps' },
  { name: 'space-5', use: 'Screen side padding, between messages' },
  { name: 'space-6', use: 'Large section breaks' },
  { name: 'space-7', use: 'Empty-state spacing, side padding of the Welcome button' },
  { name: 'space-8', use: 'Page-level breathing room' },
]

export const borders: TokenItem[] = [
  { name: 'border-1', use: 'Default: cards, chips, inputs, dividers, outline buttons' },
  { name: 'border-2', use: 'Emphasis: focused input, selected card, dashed New profile card, error' },
  { name: 'border-3', use: 'Focus ring, name-input underline, the Welcome shelf line' },
  { name: 'focus-offset', use: 'Gap between an element and its focus ring' },
]

export const radii: TokenItem[] = [
  { name: 'radius-8', use: 'Inputs, history rows, tooltips, small tags' },
  { name: 'radius-16', use: 'Tiles, menus, avatar cards, message bubbles' },
  { name: 'radius-24', use: 'Cards, composer, dialogs' },
  { name: 'radius-pill', use: 'Buttons, chips, tracks' },
  { name: 'radius-circle', use: 'Avatars, mic, icon buttons' },
]

export const elevations: TokenItem[] = [
  { name: 'elevation-1', use: 'Outline buttons, resting cards' },
  { name: 'elevation-2', use: 'Hovered cards, raised chips' },
  { name: 'elevation-3', use: 'Composer, menus, popovers' },
  { name: 'elevation-4', use: 'Dialogs, mic button' },
]

export const icons: TokenItem[] = [
  { name: 'icon-16', use: 'Inside chips, captions, history rows' },
  { name: 'icon-20', use: 'Buttons, inputs, sidebar' },
  { name: 'icon-24', use: 'Icon buttons, mic under the messages, status messages' },
  { name: 'icon-32', use: 'Empty states, New profile card' },
]

export const iconExtras: TokenItem[] = [{ name: 'icon-stroke', use: 'Outline stroke at every size' }]

export const motion: TokenItem[] = [
  { name: 'motion', use: 'Every UI transition. Animates transform and opacity only' },
  { name: 'motion-pulse', use: 'One loop of the mic rings and the current thinking step. The ripple on the resting mic takes one and a half, the Welcome globe two and a half each way. Not in the tokens file' },
]

export const sizes: TokenItem[] = [
  { name: 'size-32', use: 'Chip height' },
  { name: 'size-40', use: 'Ghost button, icon button, history row, prototype bar' },
  { name: 'size-48', use: 'Primary and outline buttons, input, class chip' },
  { name: 'size-64', use: 'Mic under the messages, the Welcome button' },
  { name: 'size-96', use: 'Avatar on a profile card. Doubled for the book picture on the profile steps' },
  { name: 'size-112', use: 'Unit for the widths of the dialog, name input and class picker' },
  { name: 'size-128', use: 'Empty-state mic, the book picture on the profile steps in a narrow window' },
  { name: 'profile-card-width', use: 'Profile card and New profile card' },
  { name: 'profile-card-height', use: 'Profile card and New profile card' },
  { name: 'sidebar-width', use: 'Sidebar at 1200 and wider' },
  { name: 'rail-width', use: 'Sidebar rail from 1024 to 1199' },
  { name: 'column-max', use: 'Reading column and composer' },
  { name: 'answer-max', use: 'Longest line of answer text' },
]

// Every token name the page shows, used to flag anything in tokens.css that
// the catalogue has missed (and the other way round).
export const cataloguedNames: string[] = [
  ...[brand, tints, grays, overlays, fonts, weights, typeExtras, spacing, borders, radii, elevations, icons, iconExtras, motion, sizes]
    .flat()
    .map((item) => item.name),
  ...statuses.flatMap((status) => [`${status.name}-text`, `${status.name}-bg`]),
  ...typeSteps.flatMap((step) => [`${step.step}-size`, `${step.step}-line`]),
]
