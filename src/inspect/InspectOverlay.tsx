import { createPortal } from 'react-dom'
import { useInspect } from './inspectContext.ts'
import { distances, nameOf } from './measure.ts'
import styles from './Inspect.module.css'

const round = (number: number) => Math.round(number * 100) / 100

function Outline({ element, pinned, bare }: { element: Element; pinned?: boolean; bare?: boolean }) {
  const rect = element.getBoundingClientRect()
  // The hover badge sits above the element and the pinned one below it, so
  // the two never cover each other. Near a window edge they move inside.
  const outside = pinned ? rect.bottom < window.innerHeight - 24 : rect.top > 72
  const place = pinned ? styles.badgeBelow : styles.badgeAbove
  return (
    <div
      className={pinned ? `${styles.outline} ${styles.pinned}` : styles.outline}
      style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
    >
      {!bare && (
        <span className={outside ? `${styles.badge} ${place}` : styles.badge}>
          {nameOf(element)} · {round(rect.width)} × {round(rect.height)}
        </span>
      )}
    </div>
  )
}

// Outlines, badges and distance lines, drawn above everything and never in
// the way of the pointer.
export default function InspectOverlay() {
  const { enabled, hovered, pinned, measuring } = useInspect()
  if (!enabled) return null

  const segments = measuring && pinned && hovered && hovered !== pinned ? distances(pinned.getBoundingClientRect(), hovered.getBoundingClientRect()) : []

  return createPortal(
    <div className={styles.overlay} data-inspector-ui aria-hidden="true">
      {hovered && hovered !== pinned && <Outline element={hovered} bare={segments.length > 0} />}
      {pinned && <Outline element={pinned} pinned />}
      {segments.map((segment, index) => (
        <div
          key={index}
          className={segment.y1 === segment.y2 ? `${styles.segment} ${styles.across}` : `${styles.segment} ${styles.down}`}
          style={{
            left: Math.min(segment.x1, segment.x2),
            top: Math.min(segment.y1, segment.y2),
            width: Math.abs(segment.x2 - segment.x1),
            height: Math.abs(segment.y2 - segment.y1),
          }}
        >
          <span className={styles.distance}>{segment.length}</span>
        </div>
      ))}
    </div>,
    document.body,
  )
}
