import styles from './BookAndGlobe.module.css'

// The open book with a globe coming up out of it. It is the middle of the
// shelf on Welcome, and it stands on its own on top of the profile steps so
// the two screens feel like one app. Numbers here are positions inside the
// shelf's viewBox, not px on screen.
export function BookAndGlobeParts({ drift = false }: { drift?: boolean }) {
  return (
    <>
      <path d="M960 242v44M872 250l22 34M1048 250l-22 34" />
      {/* On Welcome the globe drifts slowly up and down. */}
      <g className={drift ? styles.drift : undefined}>
        <circle cx="960" cy="150" r="76" fill="var(--orange)" />
        <g transform="translate(960 150) scale(0.576) translate(-533 -318)">
          <g fill="var(--orange-tint)" strokeWidth="10">
            <path d="M455 262c15-27 85-30 103 13 8 25-18 40-40 37-6 10-23 12-40 6-18-13-26-33-23-56z" />
            <path d="M560 352c20-12 65-7 68 23 0 20-28 27-50 21-10-11-18-28-18-44z" />
          </g>
          <path stroke="var(--white)" strokeWidth="15" d="M584 212q34 16 46 51" />
        </g>
      </g>
      <path fill="var(--ink)" d="M654 300v118c112-18 230-16 306 6 76-22 194-24 306-6V300z" />
      <path
        fill="var(--white)"
        d="M674 282c92-20 208-18 286 10 78-28 194-30 286-10v114c-92-18-208-16-286 14-78-30-194-32-286-14z"
      />
      <path d="M960 292v118" />
      <path
        stroke="var(--gray-300)"
        d="M726 310q94-16 184 6M726 338q94-16 184 5M726 366q60-10 120-3M1010 316q90-22 184-6M1010 343q90-21 184-5M1074 363q60-6 120 3"
      />
    </>
  )
}

// On its own. Decoration only, so it is hidden from screen readers.
export default function BookAndGlobe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="646 66 628 362"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-inspect="BookAndGlobe"
    >
      <BookAndGlobeParts />
    </svg>
  )
}
