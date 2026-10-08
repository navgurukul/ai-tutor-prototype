import { BookAndGlobeParts } from './BookAndGlobe.tsx'
import styles from './Welcome.module.css'

// The picture on the centred Welcome: a shelf of school books along the
// bottom of the window, with the things the books are about standing on
// them. Decoration only, so it is hidden from screen readers. Numbers here
// are positions inside the viewBox, not px on screen. Everything stands on
// the bottom edge, where the screen draws the shelf line.
export default function WelcomeShelf({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -12 1920 440"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-inspect="WelcomeShelf"
    >
      {/* Sparks */}
      <path d="M206 84h30M221 69v30M775 100h26M788 87v26M1152 70h32M1168 54v32M1602 68h32M1618 52v32" />
      <g fill="var(--white)" strokeWidth="6">
        <circle cx="20" cy="236" r="10" />
        <circle cx="604" cy="236" r="10" />
        <circle cx="826" cy="206" r="10" />
        <circle cx="1262" cy="190" r="10" />
        <circle cx="1612" cy="236" r="12" fill="var(--orange-tint)" />
      </g>

      {/* Books lying flat, with a set square for Maths */}
      <rect x="20" y="376" width="250" height="48" rx="8" fill="var(--coral)" />
      <rect x="44" y="335" width="218" height="41" rx="8" fill="var(--blue)" />
      <rect x="30" y="297" width="206" height="38" rx="8" fill="var(--green)" />
      <g fill="var(--white)" strokeWidth="6">
        <rect x="238" y="386" width="18" height="28" rx="3" />
        <rect x="56" y="343" width="16" height="25" rx="3" />
        <rect x="208" y="304" width="16" height="24" rx="3" />
      </g>
      <path fill="var(--blue)" d="M63 133l32 128 128-33z" />
      <path fill="var(--blue-tint)" strokeWidth="6" d="M98 182l13 49 48-13z" />
      <path strokeWidth="5" d="M116 255l-3-11M138 250l-2-7M159 244l-3-11M180 239l-2-7M201 233l-3-11" />

      {/* Books standing up, with a magnet for Science */}
      <rect x="305" y="173" width="65" height="251" rx="6" fill="var(--orange)" />
      <rect x="370" y="218" width="52" height="206" rx="6" fill="var(--blue)" />
      <rect x="422" y="150" width="73" height="274" rx="6" fill="var(--green)" />
      <g strokeWidth="6">
        <path fill="var(--orange-tint)" d="M305 198h65v16h-65zM305 384h65v14h-65z" />
        <path fill="var(--blue-tint)" d="M370 242h52v15h-52z" />
        <path fill="var(--green-tint)" d="M422 182h73v15h-73zM422 380h73v13h-73z" />
      </g>
      <path strokeWidth="6" d="M264 24l9 17M291 17l-1 18M326 4l10 16M353-2l-1 17" />
      <g transform="translate(345 117) rotate(-15)">
        <path fill="var(--green)" d="M-54-74h34V0a20 20 0 0 0 40 0v-74h34V0a54 54 0 0 1-108 0z" />
        <path fill="var(--white)" d="M-54-74h34v24h-34zM20-74h34v24H20z" />
      </g>

      {/* A clay pot */}
      <path
        fill="var(--orange)"
        d="M557 343c-17 12-25 32-21 49 4 18 16 32 26 32h36c10 0 22-14 26-32 4-17-4-37-21-49z"
      />
      <rect x="549" y="327" width="62" height="16" rx="8" fill="var(--orange-tint)" />
      <path strokeWidth="6" d="M538 386q42 14 84 0" />

      {/* Social Science: a globe coming up out of the open book */}
      <BookAndGlobeParts drift />

      {/* More standing books, with Hindi and English letters for Languages */}
      <rect x="1305" y="202" width="60" height="222" rx="6" fill="var(--coral)" />
      <rect x="1365" y="160" width="70" height="264" rx="6" fill="var(--blue)" />
      <rect x="1435" y="233" width="53" height="191" rx="6" fill="var(--orange)" />
      <rect x="1488" y="183" width="65" height="241" rx="6" fill="var(--green)" />
      <g strokeWidth="6">
        <path fill="var(--coral-tint)" d="M1305 228h60v16h-60z" />
        <path fill="var(--blue-tint)" d="M1365 190h70v15h-70zM1365 384h70v13h-70z" />
        <path fill="var(--orange-tint)" d="M1435 258h53v15h-53z" />
        <path fill="var(--green-tint)" d="M1488 214h65v15h-65z" />
      </g>
      <g transform="translate(1396 100) rotate(7)">
        <rect x="-52" y="-52" width="104" height="104" rx="18" fill="var(--coral)" />
        <text className={styles.letter} x="0" y="18" fontSize="56" textAnchor="middle" stroke="none">
          अ
        </text>
      </g>
      <g transform="translate(1508 131) rotate(-8)">
        <rect x="-44" y="-44" width="88" height="88" rx="16" fill="var(--coral-tint)" />
        <text className={styles.letter} x="0" y="13" fontSize="37" textAnchor="middle" stroke="none">
          Aa
        </text>
      </g>

      {/* The other flat pile, with a leaf for Science */}
      <rect x="1643" y="376" width="257" height="48" rx="8" fill="var(--blue)" />
      <rect x="1663" y="335" width="219" height="41" rx="8" fill="var(--orange)" />
      <rect x="1675" y="297" width="200" height="38" rx="8" fill="var(--coral)" />
      <g fill="var(--white)" strokeWidth="6">
        <rect x="1655" y="386" width="18" height="28" rx="3" />
        <rect x="1854" y="343" width="16" height="25" rx="3" />
        <rect x="1687" y="304" width="16" height="24" rx="3" />
      </g>
      <g transform="translate(1705 236) scale(0.72) translate(-716 -722)" strokeWidth="10">
        <path fill="var(--green)" d="M716 722c6-82 74-152 222-154 7 82-58 167-222 154z" />
        <path d="M686 755l234-171M795 668l-10-50M853 629l25 43" />
      </g>
    </svg>
  )
}
