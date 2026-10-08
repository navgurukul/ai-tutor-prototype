import styles from './Welcome.module.css'

// The picture on Welcome: the things a student's books are about, coming up
// out of an open book. Decoration only, so it is hidden from screen readers.
// Numbers here are positions inside the viewBox, not px on screen.
export default function WelcomeArt({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1080 1060"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-inspect="WelcomeArt"
    >
      <circle className={styles.backdrop} cx="533" cy="530" r="504" stroke="none" />

      {/* Sparks */}
      <path d="M349 142h50M374 117v50M736 150h44M758 128v44" />
      <g fill="var(--white)" strokeWidth="6">
        <circle cx="1022" cy="245" r="12" />
        <circle cx="62" cy="421" r="12" />
        <circle cx="402" cy="481" r="14" />
        <circle cx="686" cy="500" r="18" fill="var(--orange-tint)" />
      </g>

      {/* Science: a magnet */}
      <path strokeWidth="7" d="M133 218l17 28M178 205l2 32M262 177l18 28M307 162l3 33" />
      <g transform="translate(280 394) rotate(-15)">
        <path
          fill="var(--green)"
          d="M-102-140h64V0a38 38 0 0 0 76 0v-140h64V0a102 102 0 0 1-204 0z"
        />
        <path fill="var(--white)" d="M-102-140h64v46h-64zM38-140h64v46H38z" />
      </g>

      {/* Social Science: a globe */}
      <circle cx="533" cy="318" r="132" fill="var(--orange)" />
      <g fill="var(--orange-tint)" strokeWidth="6">
        <path d="M455 262c15-27 85-30 103 13 8 25-18 40-40 37-6 10-23 12-40 6-18-13-26-33-23-56z" />
        <path d="M560 352c20-12 65-7 68 23 0 20-28 27-50 21-10-11-18-28-18-44z" />
      </g>
      <path stroke="var(--white)" strokeWidth="9" d="M584 212q34 16 46 51" />

      {/* Languages: Hindi and English letters */}
      <g transform="translate(822 342) rotate(7)">
        <rect x="-85" y="-85" width="170" height="170" rx="30" fill="var(--coral)" />
        <text className={styles.letter} x="0" y="30" fontSize="92" textAnchor="middle" stroke="none">
          अ
        </text>
      </g>
      <g transform="translate(926 450) rotate(-8)">
        <rect x="-75" y="-75" width="150" height="150" rx="28" fill="var(--coral-tint)" />
        <text className={styles.letter} x="0" y="22" fontSize="62" textAnchor="middle" stroke="none">
          Aa
        </text>
      </g>

      {/* Maths: a set square */}
      <path fill="var(--blue)" d="M97 520l38 213 217-36z" />
      <path fill="var(--blue-tint)" strokeWidth="6" d="M152 607l14 80 81-14z" />
      <path strokeWidth="6" d="M165 728l-3-17M197 723l-2-11M229 717l-3-17M261 712l-2-11M293 707l-3-17M325 701l-2-11" />

      {/* Science again: a leaf */}
      <path fill="var(--green)" d="M716 722c6-82 74-152 222-154 7 82-58 167-222 154z" />
      <path strokeWidth="7" d="M686 755l234-171M795 668l-10-50M853 629l25 43" />

      {/* The book they come out of */}
      <path strokeWidth="7" d="M534 593v107M402 633l44 80M666 633l-44 80" />
      <path fill="var(--ink)" d="M82 808v184c168-30 338-27 452 25 114-52 284-55 452-25V808z" />
      <path
        fill="var(--white)"
        d="M112 778c138-33 308-28 422 17 114-45 284-50 422-17v177c-138-30-308-25-422 23-114-48-284-53-422-23z"
      />
      <path d="M534 795v183" />
      <path
        stroke="var(--gray-300)"
        d="M190 821q140-26 272 9M190 866q140-26 272 6M190 908q90-16 177-6M606 830q134-35 272-9M606 872q134-32 272-6M702 902q88-10 176 6"
      />
    </svg>
  )
}
