import { Check, Copy, TriangleAlert, X } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import Button from '../components/Button.tsx'
import IconButton from '../components/IconButton.tsx'
import { useInspect } from './inspectContext.ts'
import { inspect, type Row, type Value } from './measure.ts'
import styles from './Inspect.module.css'

function ValueLine({ value }: { value: Value }) {
  return (
    <span className={value.missing ? `${styles.value} ${styles.missing}` : styles.value}>
      {value.swatch && <span className={styles.swatch} style={{ background: value.swatch }} />}
      {value.missing && <TriangleAlert aria-hidden="true" />}
      <span>
        {value.text}
        {value.tokens.length > 0 && <span className={styles.token}> · {value.tokens.join(', ')}</span>}
        {value.missing && ' · not a token'}
      </span>
    </span>
  )
}

function Rows({ rows }: { rows: Row[] }) {
  return (
    <dl className={styles.rows}>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <dt className={styles.term}>{row.label}</dt>
          <dd className={styles.detail}>
            {row.summary && <span className={styles.summary}>{row.summary}</span>}
            {row.values.map((value, index) => (
              <ValueLine key={index} value={value} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.group}>
      <h3 className={`label ${styles.groupTitle}`}>{title}</h3>
      {children}
    </section>
  )
}

// Margin, border, padding and content as nested boxes, like Figma's.
function BoxDiagram({ box, size }: { box: { margin: string[]; border: string[]; padding: string[] }; size: string }) {
  const ring = (label: string, sides: string[], className: string, inner: ReactNode) => (
    <div className={`${styles.ring} ${className}`}>
      <span className={styles.ringLabel}>{label}</span>
      <span className={styles.ringTop}>{sides[0]}</span>
      <span className={styles.ringLeft}>{sides[3]}</span>
      {inner}
      <span className={styles.ringRight}>{sides[1]}</span>
      <span className={styles.ringBottom}>{sides[2]}</span>
    </div>
  )
  return ring(
    'margin',
    box.margin,
    styles.ringMargin,
    ring('border', box.border, styles.ringBorder, ring('padding', box.padding, styles.ringPadding, <span className={styles.content}>{size}</span>)),
  )
}

const shortcuts = [
  ['Hover', 'Outline with name and size'],
  ['Click', 'Pin the component'],
  ['Shift + click', 'Pin the exact element'],
  ['Alt + hover', 'Distances from the pinned one'],
  ['Arrow up', 'Select the parent'],
  ['Esc', 'Clear the selection'],
  ['Alt + I', 'Inspect on or off'],
]

export default function InspectPanel() {
  const { enabled, setEnabled, pinned, revision, map } = useInspect()
  // Remembers which element was copied, so "Copied" never shows for another.
  const [copiedFrom, setCopiedFrom] = useState<Element | null>(null)
  const copied = copiedFrom !== null && copiedFrom === pinned

  // `revision` is a dependency on purpose: it changes when the pinned element
  // moves or resizes, and the reading has to be taken again.
  // oxlint-disable-next-line react-hooks/exhaustive-deps
  const details = useMemo(() => (pinned && map ? inspect(pinned, map) : null), [pinned, map, revision])

  if (!enabled) return null

  async function copyCss() {
    if (!details) return
    try {
      await navigator.clipboard.writeText(details.css)
    } catch {
      // Clipboard access can be blocked: fall back to a hidden text field.
      const field = document.createElement('textarea')
      field.value = details.css
      document.body.append(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopiedFrom(pinned)
    setTimeout(() => setCopiedFrom(null), 1600)
  }

  return (
    <aside className={styles.panel} data-inspector-ui aria-label="Inspect">
      <header className={styles.panelHeader}>
        <h2 className="h6">Inspect</h2>
        <IconButton label="Turn Inspect Off" onClick={() => setEnabled(false)}>
          <X aria-hidden="true" />
        </IconButton>
      </header>

      {!details ? (
        <div className={styles.panelBody}>
          <p className="text-sm">Click anything in the app to see its size, spacing, type and colours, each with its token.</p>
          <p className={`caption ${styles.note}`}>While Inspect is on, clicks select things instead of pressing them. Switch it off to use the app.</p>
          <dl className={styles.rows}>
            {shortcuts.map(([keys, action]) => (
              <div key={keys} className={styles.row}>
                <dt className={styles.term}>{keys}</dt>
                <dd className={styles.detail}>{action}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className={styles.panelBody}>
          <Group title="Identity">
            <p className="h5">{details.name}</p>
            <p className={`caption ${styles.note}`}>
              &lt;{details.tag}&gt;
              {details.component && ` inside ${details.component}`}
            </p>
            {details.text && <p className={`text-sm ${styles.quote}`}>“{details.text}”</p>}
          </Group>

          <Group title="Size and position">
            <Rows
              rows={[
                { label: 'Width', values: [details.width] },
                { label: 'Height', values: [details.height] },
                { label: 'In parent', values: [{ text: `x ${details.x} · y ${details.y}`, tokens: [], missing: false, css: '' }] },
              ]}
            />
          </Group>

          <Group title="Box model">
            <BoxDiagram box={details.box} size={`${details.width.text} × ${details.height.text}`} />
            <Rows rows={details.boxRows} />
          </Group>

          <Group title="Layout">
            <Rows rows={details.layout} />
          </Group>

          {details.type.length > 0 && (
            <Group title="Typography">
              <Rows rows={details.type} />
            </Group>
          )}

          {details.colour.length > 0 && (
            <Group title="Colour">
              <Rows rows={details.colour} />
            </Group>
          )}

          <Group title="Shape">
            <Rows rows={details.shape} />
          </Group>

          {details.contrast && (
            <Group title="Contrast">
              <p className={details.contrast.pass ? `text-sm ${styles.verdict} ${styles.pass}` : `text-sm ${styles.verdict} ${styles.fail}`}>
                {details.contrast.pass ? <Check aria-hidden="true" /> : <TriangleAlert aria-hidden="true" />}
                {details.contrast.ratio} to 1 · {details.contrast.pass ? 'passes' : 'fails'} AA
              </p>
              <p className={`caption ${styles.note}`}>
                Text on {details.contrast.on}. {details.contrast.large ? 'Large text needs 3 to 1.' : 'Text this size needs 4.5 to 1.'}
              </p>
            </Group>
          )}

          <Button variant="outline" block icon={copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} onClick={copyCss}>
            {copied ? 'Copied' : 'Copy CSS'}
          </Button>
          <p className={`caption ${styles.note}`}>Sizes are in px. Arrow up selects the parent. Esc clears. Hold Alt and hover to measure.</p>
        </div>
      )}
    </aside>
  )
}
