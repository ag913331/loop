// Donation mark: a coffee mug whose steam curls into the infinity loop — the
// "buy me a coffee" idea fused with the brand logo. The steam reuses the same
// travelling glint as the hero logo (.loop-pulse). Pure SVG, no client JS.

const STEAM =
  "M40,24 C45,15 56,15 56,24 C56,33 45,33 40,24 C35,15 24,15 24,24 C24,33 35,33 40,24 Z";
const CUP = "M24,47 H56 L52,67 Q51,70 48,70 H32 Q29,70 28,67 Z";
const HANDLE = "M56,50 C63,50 63,62 56,62";

export default function CoffeeInfinity({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="steamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      {/* steam = the loop */}
      <path
        d={STEAM}
        stroke="url(#steamGrad)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="loop-pulse"
        d={STEAM}
        pathLength={100}
        stroke="var(--foreground)"
        strokeOpacity={0.8}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* the mug */}
      <path
        d={CUP}
        stroke="var(--foreground)"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={HANDLE}
        stroke="var(--foreground)"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
