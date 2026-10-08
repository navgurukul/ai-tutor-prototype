import { CircleCheck, CircleX, Info, Mic, TriangleAlert } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import PageShell from './PageShell.tsx'
import {
  borders,
  brand,
  cataloguedNames,
  elevations,
  fonts,
  grays,
  iconExtras,
  icons,
  motion,
  overlays,
  radii,
  sizes,
  spacing,
  statuses,
  tints,
  typeExtras,
  typeSteps,
  weights,
  type TokenItem,
} from './tokenCatalog.ts'
import { rootTokens, tokenValue } from './tokenSource.ts'
import styles from './TokensPage.module.css'

const sections = [
  { id: 'brand', label: 'Brand palette' },
  { id: 'tints', label: 'Tints' },
  { id: 'status', label: 'Status' },
  { id: 'grays', label: 'Grays' },
  { id: 'overlays', label: 'Overlays' },
  { id: 'type', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'borders', label: 'Borders' },
  { id: 'radius', label: 'Radius' },
  { id: 'elevation', label: 'Elevation' },
  { id: 'icons', label: 'Icons' },
  { id: 'motion', label: 'Motion' },
  { id: 'sizes', label: 'Sizes' },
]

const statusIcons = { success: CircleCheck, warning: TriangleAlert, error: CircleX, info: Info }

const familyNames = { heading: 'Baloo 2', text: 'Synonym', label: 'JetBrains Mono' }

const v = (name: string) => `var(--${name})`

function jumpTo(id: string) {
  const heading = document.getElementById(`${id}-title`)
  heading?.scrollIntoView({ block: 'start' })
  heading?.focus({ preventScroll: true })
}

function Section(props: { id: string; eyebrow: string; title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby={`${props.id}-title`}>
      <header className={styles.sectionHeader}>
        <p className={`label ${styles.eyebrow}`}>{props.eyebrow}</p>
        <h2 className={`h4 ${styles.sectionTitle}`} id={`${props.id}-title`} tabIndex={-1}>
          {props.title}
        </h2>
        {props.note && <p className={`text-sm ${styles.note}`}>{props.note}</p>}
      </header>
      {props.children}
    </section>
  )
}

function Meta({ name, use, value }: { name: string; use?: string; value?: string }) {
  return (
    <div className={styles.meta}>
      <p className="text-sm weight-bold">{name}</p>
      <p className={`caption ${styles.value}`}>{value ?? tokenValue(name) ?? 'missing from tokens.css'}</p>
      {use && <p className={`caption ${styles.use}`}>{use}</p>}
    </div>
  )
}

function Swatches({ items }: { items: (TokenItem & { on?: string })[] }) {
  return (
    <ul className={styles.swatches}>
      {items.map((item) => (
        <li key={item.name} className={styles.swatch}>
          {/* An overlay is shown over the right half of the colour it sits on. */}
          <div className={styles.swatchColour} style={{ background: v(item.on ?? item.name) }}>
            {item.on && <div className={styles.swatchOverlay} style={{ background: v(item.name) }} />}
          </div>
          <Meta name={item.name} use={item.on ? `${item.use}. Shown on ${item.on}` : item.use} />
        </li>
      ))}
    </ul>
  )
}

function Rows({ items, visual }: { items: TokenItem[]; visual?: (name: string) => ReactNode }) {
  return (
    <ul className={styles.rows}>
      {items.map((item) => (
        <li key={item.name} className={styles.row}>
          <Meta name={item.name} use={item.use} />
          <div className={styles.rowVisual}>{visual?.(item.name)}</div>
        </li>
      ))}
    </ul>
  )
}

function Coverage() {
  const missing = cataloguedNames.filter((name) => tokenValue(name) === undefined)
  const extra = rootTokens.filter((token) => !cataloguedNames.includes(token.name)).map((token) => token.name)

  if (missing.length === 0 && extra.length === 0) {
    return (
      <p className={`text-sm ${styles.coverage} ${styles.coverageOk}`}>
        <CircleCheck size={20} aria-hidden="true" />
        All {rootTokens.length} tokens in tokens.css are shown on this page.
      </p>
    )
  }
  return (
    <p className={`text-sm ${styles.coverage} ${styles.coverageBad}`} role="alert">
      <TriangleAlert size={20} aria-hidden="true" />
      <span>
        This page and tokens.css don’t match.
        {extra.length > 0 && ` In the file but not shown here: ${extra.join(', ')}.`}
        {missing.length > 0 && ` Shown here but missing from the file: ${missing.join(', ')}.`}
      </span>
    </p>
  )
}

export default function TokensPage() {
  return (
    <PageShell
      eyebrow="Design tokens · v3"
      title="Tokens"
      intro="Every colour, size and space in the app comes from this list. Names and values are read from tokens.css, so this page always matches the code."
    >
      <div className={styles.top}>
        <Coverage />
        <nav className={styles.jump} aria-label="Jump to a section">
          {sections.map((section) => (
            <button key={section.id} type="button" className={styles.jumpChip} onClick={() => jumpTo(section.id)}>
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <Section id="brand" eyebrow="1 · Colour" title="Brand palette">
        <Swatches items={brand} />
      </Section>

      <Section
        id="tints"
        eyebrow="1 · Colour"
        title="Tints and washes"
        note="Text on any tint is ink. The tint and wash names are a guess: the tokens file lists them by hue only."
      >
        <Swatches items={tints} />
      </Section>

      <Section
        id="status"
        eyebrow="1 · Colour"
        title="Status"
        note="Always pair a status colour with an icon and words, never colour alone."
      >
        <ul className={styles.statuses}>
          {statuses.map((status) => {
            const Icon = statusIcons[status.name as keyof typeof statusIcons]
            const text = `${status.name}-text`
            const bg = `${status.name}-bg`
            return (
              <li key={status.name} className={styles.status}>
                <p className={`text weight-medium ${styles.statusSample}`} style={{ background: v(bg), color: v(text) }}>
                  <Icon size={24} aria-hidden="true" />
                  {status.sample}
                </p>
                <Meta
                  name={status.name}
                  value={`${text} ${tokenValue(text)} on ${bg} ${tokenValue(bg)}`}
                  use={`Contrast ${status.ratio} to 1`}
                />
              </li>
            )
          })}
        </ul>
      </Section>

      <Section
        id="grays"
        eyebrow="2 · Grays"
        title="Grays"
        note="Text never goes lighter than gray-500. gray-400 is only for things that are switched off."
      >
        <Swatches items={grays} />
      </Section>

      <Section id="overlays" eyebrow="3 · Overlays" title="Overlays">
        <Swatches items={overlays} />
      </Section>

      <Section id="type" eyebrow="4 · Typography" title="Typography" note="Nothing goes below 12.">
        <ul className={styles.fonts}>
          {fonts.map((font) => (
            <li key={font.name} className={styles.font}>
              <p className={styles.fontSample} style={{ fontFamily: v(font.name) }}>
                {font.name === 'font-label' ? 'CLASS 6 · SCIENCE' : 'Aa Bb Cc 123'}
              </p>
              <Meta name={`${font.name} · ${font.family}`} value={tokenValue(font.name)} use={font.use} />
            </li>
          ))}
        </ul>

        <ul className={styles.rows}>
          {typeSteps.map((step) => (
            <li key={step.step} className={styles.row}>
              <Meta
                name={step.step}
                value={`${parseInt(tokenValue(`${step.step}-size`) ?? '')} / ${parseInt(tokenValue(`${step.step}-line`) ?? '')} · ${step.weights}`}
                use={familyNames[step.family]}
              />
              <p className={step.step}>{step.sample}</p>
            </li>
          ))}
        </ul>

        <Rows
          items={[...weights, ...typeExtras]}
          visual={(name) =>
            name.startsWith('weight') && (
              <p
                className={styles.weightSample}
                style={{ fontWeight: v(name), fontFamily: v(name === 'weight-heavy' ? 'font-heading' : 'font-text') } as CSSProperties}
              >
                Ask anything from your books.
              </p>
            )
          }
        />
      </Section>

      <Section
        id="spacing"
        eyebrow="5 · Spacing"
        title="Spacing"
        note="Padding and margins use only these values."
      >
        <Rows items={spacing} visual={(name) => <div className={styles.bar} style={{ width: v(name) }} />} />
      </Section>

      <Section id="borders" eyebrow="6 · Borders" title="Borders">
        <Rows
          items={borders}
          visual={(name) =>
            name === 'focus-offset' ? (
              <div className={styles.focusSample} />
            ) : (
              <div className={styles.line} style={{ borderTopWidth: v(name) }} />
            )
          }
        />
      </Section>

      <Section id="radius" eyebrow="7 · Corner radius" title="Corner radius">
        <ul className={styles.tiles}>
          {radii.map((item) => (
            <li key={item.name} className={styles.tile}>
              <div className={styles.tileStage}>
                <div
                  className={item.name === 'radius-circle' ? `${styles.shape} ${styles.shapeSquare}` : styles.shape}
                  style={{ borderRadius: v(item.name) }}
                />
              </div>
              <Meta name={item.name} use={item.use} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="elevation"
        eyebrow="8 · Elevation"
        title="Elevation"
        note="Keep shadows off items inside long scrolling lists."
      >
        <ul className={styles.elevations}>
          {elevations.map((item) => (
            <li key={item.name} className={styles.elevation} style={{ boxShadow: v(item.name) }}>
              <Meta name={item.name} use={item.use} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="icons" eyebrow="9 · Icons" title="Icons" note="Outline style, with the same stroke at every size.">
        <ul className={styles.tiles}>
          {icons.map((item) => (
            <li key={item.name} className={styles.tile}>
              <div className={styles.tileStage}>
                <Mic size={parseInt(tokenValue(item.name) ?? '24')} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
              </div>
              <Meta name={item.name} use={item.use} />
            </li>
          ))}
        </ul>
        <Rows items={iconExtras} />
      </Section>

      <Section
        id="motion"
        eyebrow="10 · Motion"
        title="Motion"
        note="Parked until the mascot decision. No character animation."
      >
        <Rows items={motion} />
      </Section>

      <Section
        id="sizes"
        eyebrow="Not in the tokens file"
        title="Sizes and layout"
        note="The fixed sizes from sections 11 and 12 of the tokens file, named so that component CSS never needs a raw px value. Still to be added to the tokens file."
      >
        <Rows items={sizes} visual={(name) => <div className={styles.bar} style={{ width: v(name) }} />} />
      </Section>
    </PageShell>
  )
}
