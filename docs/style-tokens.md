# AI Tutor · Design tokens (v3)

All values in px. Desktop app (Windows first, Mac second), designed at 1366 × 768.

Motion is parked until the team decides whether there will be a mascot.

---

## 1. Colour

### Brand palette

| Token | Hex | Use |
|---|---|---|
| `purple` | `#9347DD` | Primary buttons, active states, links, focus ring |
| `purple-dark` | `#7E3CBE` | Hover and pressed on purple, mic while listening |
| `lilac` | `#EDE2FA` | Selected rows, selected avatar, highlights |
| `pink` | `#FF3181` | Key-term and input underline only |
| `green` | `#68B506` | Success, progress |
| `green-text` | `#3F7A00` | Success text on white |
| `orange` | `#FF7A00` | Accent |
| `blue` | `#5B7DEF` | Accent |
| `coral` | `#FF685B` | Accent |
| `ink` | `#262626` | Primary text, dark fills (same as `gray-900`) |
| `bg` | `#F3F9EB` | App background |
| `white` | `#FFFFFF` | Sidebar, cards, dialogs, composer |

### Tints

| Hue | Tint | Wash |
|---|---|---|
| Green | `#E7F4D6` | `#F2F9E9` |
| Purple | `#EDE2FA` | none |
| Blue | `#E4ECFB` | `#F1F5FD` |
| Orange | `#FFE9D4` | `#FFF6EC` |
| Pink | `#FFE3EE` | none |
| Ink | `#E6E8E0` | none |
| Coral | `#FFE2DA` | `#FFF0ED` |

### Text on a colour fill

| Fill | Text colour |
|---|---|
| `purple`, `purple-dark`, `ink`, `green-text` | `white` |
| `green`, `orange`, `coral`, any tint | `ink` |
| `blue`, `pink` | No text below 24px; use as accents |

(White on green measures 2.56:1 and white on orange 2.61:1, so both fail WCAG AA.)

### Status

For messages like "Couldn't hear you", "Answer saved" or "Model is still loading". Each status has a text/icon colour and a background; both pairs pass 4.5:1.

| Token | Text and icon | Background | Ratio |
|---|---|---|---|
| `success` | `#3F7A00` | `#E7F4D6` | 4.6 |
| `warning` | `#9A4A00` | `#FFE9D4` | 5.3 |
| `error` | `#C42B1C` | `#FFE2DA` | 4.6 |
| `info` | `#3553C7` | `#E4ECFB` | 5.5 |

The backgrounds are the existing tints. On white, every text colour passes too (5.3 to 6.5). Always pair status colour with an icon or words, never colour alone.

---

## 2. Grays

These replace all 17 ink opacities. They are solid, so they look the same on any surface.

| Token | Hex | On white | On `bg` | Use |
|---|---|---|---|---|
| `gray-900` | `#262626` | 15.1 | 14.1 | Primary text, headings, icons |
| `gray-700` | `#4A4A4A` | 8.9 | 8.3 | Secondary text: descriptions, subtitles |
| `gray-500` | `#676767` | 5.7 | 5.3 | Tertiary text: meta, timestamps, placeholders, inactive tabs |
| `gray-400` | `#A3A3A3` | 2.5 | 2.4 | Disabled text and icons only |
| `gray-300` | `#D4D4D4` | | | Strong borders: inputs, outline buttons |
| `gray-200` | `#E5E5E5` | | | Default borders: cards, chips, dividers |
| `gray-100` | `#F0F0F0` | | | Subtle fills: hover, empty tracks, pill backgrounds |

Rule: text never goes lighter than `gray-500`. `gray-400` is only for things that are switched off.

---

## 3. Overlays

Three white overlays for use on colour, plus one scrim.

| Token | Value | Use |
|---|---|---|
| `white-90` | `rgba(255,255,255,0.9)` | Secondary text on `ink` only (on purple it drops to 4.4:1, so use full white there) |
| `white-60` | `rgba(255,255,255,0.6)` | Mic pulse rings, decorative marks on colour |
| `white-20` | `rgba(255,255,255,0.2)` | Tracks and chip fills on colour |
| `scrim` | `rgba(38,38,38,0.4)` | Behind dialogs |

---

## 4. Typography

### Families and roles

| Family | Role |
|---|---|
| Baloo 2 | Headings h1 to h6, big numbers, the name input |
| Synonym | Everything else: body, answers, buttons, chips, the tutor's spoken line |
| Mono | Uppercase labels only (eyebrows like "TODAY", "CLASS 8 · SCIENCE") |

```css
--font-heading: 'Baloo 2', 'Nirmala UI', sans-serif;
--font-text: 'Synonym', 'Mukta', 'Nirmala UI', system-ui, sans-serif;
--font-label: 'JetBrains Mono', Consolas, monospace;
```

Mukta is in the text stack because Synonym has no Hindi glyphs. The label font has to be bundled, because system mono stacks like `ui-monospace` don't work in Chrome or Edge on Windows. All fonts ship inside the app; nothing loads from the web.

### One scale

Every size sits on the 4px grid and line heights are whole numbers. The same steps are shared by both families; the role decides the family.

| Size / line height | Heading (Baloo 2) | Text (Synonym) | Label (Mono) |
|---|---|---|---|
| 40 / 48 | `h1` · 800 | | |
| 32 / 40 | `h2` · 800 | | |
| 28 / 36 | `h3` · 800 | | |
| 24 / 32 | `h4` · 800 | | |
| 20 / 28 | `h5` · 700 | `text-lg` · 400 | |
| 16 / 24 | `h6` · 700 | `text` · 400 / 500 / 700 | |
| 14 / 20 | | `text-sm` · 500 / 700 | |
| 12 / 16 | | `caption` · 500 | `label` · 700, uppercase, 0.08em |

Weights: Baloo 2 uses 800 for h1 to h4 and 700 for h5 and h6. Synonym uses 400 for reading (answers), 500 for UI copy, and 700 for buttons and emphasis.

### Where each step goes

| Token | Examples |
|---|---|
| `h1` 40 | "Who's learning today?", welcome |
| `h2` 32 | Screen titles |
| `h3` 28 | Dialog titles, empty-state headline, name input (in purple) |
| `h4` 24 | Card titles, profile names |
| `h5` 20 | Headings inside an answer, section headings |
| `h6` 16 | Sub-headings inside an answer, small card titles |
| `text-lg` 20 | Live transcript, the tutor's spoken line |
| `text` 16 | Answer body, UI body, buttons (700) |
| `text-sm` 14 | Descriptions, chips, history rows, secondary buttons |
| `caption` 12 | Timestamps, helper text |
| `label` 12 | Eyebrows, sidebar group labels |

### Rules

- Nothing goes below 12.
- Titles use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.
- Key terms in answers get a 3px `pink` bottom border, not an underline.
- Answer text has a max line length of 68ch.
- Hindi text may need 16 / 28 instead of 16 / 24 because of the matras. Set it with `:lang(hi)` once tested.
- Students can zoom text to 1.5× or more.

---

## 5. Spacing

8-point scale, with 4 as the only half step.

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | Icon to label inside small components |
| `space-2` | 8 | Tight stacks, chip groups, between label and field |
| `space-3` | 16 | Default gap, component padding, between paragraphs |
| `space-4` | 24 | Card padding, section gaps |
| `space-5` | 32 | Screen side padding, between messages |
| `space-6` | 40 | Large section breaks |
| `space-7` | 48 | Empty-state spacing |
| `space-8` | 64 | Page-level breathing room |

Padding and margins use only these values. Component heights are multiples of 8 too (32, 40, 48, 64).

---

## 6. Borders

| Token | Value | Use |
|---|---|---|
| `border-1` | 1px | Default: cards, chips, inputs, dividers, outline buttons (`gray-200` or `gray-300`) |
| `border-2` | 2px | Emphasis: focused input, selected card, dashed "Add profile" card, error |
| `border-3` | 3px | Focus ring (`purple`, 2px offset), key-term and name-input underline (`pink`) |

---

## 7. Corner radius

| Token | Value | Use |
|---|---|---|
| `radius-8` | 8 | Inputs, history rows, tooltips, small tags |
| `radius-16` | 16 | Tiles, menus, avatar cards, message bubbles |
| `radius-24` | 24 | Cards, composer, dialogs |
| `radius-pill` | 999 | Buttons, chips, tracks |
| `radius-circle` | 50% | Avatars, mic, icon buttons |

Student message bubble: `16 16 8 16` (the 8 corner points at the student).

---

## 8. Elevation

Four levels, one shadow colour, blur doubling the offset.

| Token | Value | Use |
|---|---|---|
| `elevation-1` | `0 2px 4px rgba(38,38,38,0.08)` | Outline buttons, resting cards |
| `elevation-2` | `0 4px 8px rgba(38,38,38,0.10)` | Hovered cards, raised chips |
| `elevation-3` | `0 8px 16px rgba(38,38,38,0.12)` | Composer, menus, popovers |
| `elevation-4` | `0 12px 24px rgba(38,38,38,0.16)` | Dialogs, mic button |

Keep `elevation-1` and `elevation-2` off long scrolling lists; on low-end laptops running the model locally, many shadows in a scroll area cost paint time.

---

## 9. Icons

| Token | Size | Use |
|---|---|---|
| `icon-16` | 16 | Inside chips, captions, history rows |
| `icon-20` | 20 | Buttons, inputs, sidebar |
| `icon-24` | 24 | Icon buttons, mic in composer, status messages |
| `icon-32` | 32 | Empty states, add-profile card |

Outline style, 2px stroke at every size, colour `gray-900` by default or the colour of the text beside it.

---

## 10. Motion

Parked until the mascot decision. Until then, UI transitions use 200ms ease-out and animate only `transform` and `opacity`.

---

## 11. Components in tokens

| Component | Spec |
|---|---|
| Primary button | Height 48 · `radius-pill` · `purple` · `text` 700 `white` · padding 0 24 · hover `purple-dark` |
| Outline button | Height 48 · `radius-pill` · `white` · `border-1` `gray-300` · `text` 700 `gray-900` · `elevation-1` |
| Ghost button | Height 40 · `radius-pill` · no fill · `border-1` `gray-300` · `text-sm` 700 `gray-700` |
| Icon button | 40 circle · hover `gray-100` |
| Mic, composer | 64 circle · `ink` · icon 24 `white` · `elevation-4` · listening: `purple-dark` + `white-60` rings |
| Mic, empty state | 112 circle, same styling |
| Chip | Height 32 · `radius-pill` · `border-1` `gray-200` · `text-sm` 500 `gray-700` · padding 0 16 |
| Input | Height 48 · `radius-8` · `border-1` `gray-300` · focus `border-2` `purple` · padding 0 16 |
| Name input | `h3` Baloo 2 `purple` · centred · `border-3` `pink` bottom |
| Card | `radius-24` · `white` · `border-1` `gray-200` · padding 24 |
| Profile card | 160 × 192 · `radius-16` · `white` · avatar 96 circle on a tint · name `h5` |
| Add profile card | Same size · `border-2` dashed `gray-300` |
| Grade chip (picker) | Height 48 · `radius-pill` · selected `purple` with `white` text |
| Sidebar | 280 wide · `white` · `border-1` `gray-200` on the right · padding 16 |
| History row | Height 40 · `radius-8` · padding 0 16 · `text-sm` · hover `gray-100` · active `lilac` with `purple-dark` text |
| Student message | `lilac` · `16 16 8 16` · padding 16 · `text` |
| Tutor answer | No bubble · `text` 400 · `h5` and `h6` for headings · max 68ch |
| Source chip | Chip style · book icon · e.g. "NCERT · Class 8 Science · Ch 3" |
| Composer | `radius-24` · `white` · `elevation-3` · padding 16 · max width 720 |
| Dialog | `radius-24` · `white` · padding 32 · `elevation-4` · `scrim` behind |
| Focus ring | `border-3` `purple`, 2px offset, on every focusable element |

---

## 12. Desktop frame

| Item | Value |
|---|---|
| Design frame | 1366 × 768 (usable about 1366 × 700 after taskbar and title bar) |
| Also check | 1280 × 720 and 1920 × 1080 |
| Minimum window | 1024 × 640 |
| Sidebar | 280 at 1200 and wider, 72 rail below, drawer below 1024 |
| Main padding | 24 top · 32 sides |
| Reading column | max 720, centred |

---

## 13. Still to check on real hardware

- 1px borders at Windows 125% and 150% scaling (fractional scaling can make them render unevenly).
- Synonym 400 vs 500 for answer text with ClearType.
- Hindi line height at 16 / 24 vs 16 / 28.
- Contrast of `gray-500` text on a budget laptop screen, not a designer's monitor.

## 14. Decisions still open

- Synonym licence (ITF Free Font License) allows embedding in a distributed desktop app; confirm and add the ITF credit it asks for.
- Label font: JetBrains Mono is a placeholder pick. Confirm, or drop mono and use Synonym 700 uppercase.
- Icon library (Lucide and Phosphor both have outline sets at 2px stroke and open licences).
- Mascot: decides whether section 10 needs anything beyond basic transitions.
