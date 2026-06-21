// The "loop" logo: an infinity mark in the brand gradient, echoing the
// never-ending cycle of the DevOps symbol. A faint glint endlessly travels the
// path (see .loop-pulse in globals.css), which falls back to a static mark
// under prefers-reduced-motion. Pure SVG — no client JS needed.

const PATH =
  "M 100,50 C 128,18 172,18 172,50 C 172,82 128,82 100,50 C 72,18 28,18 28,50 C 28,82 72,82 100,50 Z";

export default function LoopMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      role="img"
      aria-label="loop"
    >
      <defs>
        <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      {/* the infinity band */}
      <path
        d={PATH}
        stroke="url(#loopGrad)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* the travelling glint */}
      <path
        className="loop-pulse"
        d={PATH}
        pathLength={100}
        stroke="var(--foreground)"
        strokeOpacity={0.85}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </svg>
  );
}
