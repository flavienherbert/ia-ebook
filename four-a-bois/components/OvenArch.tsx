export default function OvenArch() {
  return (
    <svg
      viewBox="0 0 800 460"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-3xl -translate-x-1/2 opacity-90"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <radialGradient id="braise-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#EA7A4A" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#D9531E" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#D9531E" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="400"
        cy="180"
        rx="260"
        ry="200"
        fill="url(#braise-glow)"
        className="motion-safe:animate-ember"
      />

      {/* Bouche du four : une arche pleine cintre, comme celle d'un four à pain traditionnel. */}
      <path
        d="M 140 460 L 140 220 A 260 260 0 0 1 660 220 L 660 460"
        fill="none"
        stroke="#F0E9DD"
        strokeOpacity="0.18"
        strokeWidth="10"
      />
      <path
        d="M 180 460 L 180 230 A 220 220 0 0 1 620 230 L 620 460"
        fill="none"
        stroke="#F0E9DD"
        strokeOpacity="0.32"
        strokeWidth="3"
      />
    </svg>
  );
}
