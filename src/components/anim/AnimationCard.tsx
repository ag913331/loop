"use client";

/**
 * Shared chrome for every animated lesson component: the bordered card, the
 * header (an uppercase `label` or a monospace `code` snippet) and the ↻ Replay
 * button. The animation's own markup is passed as children. Pair with
 * useAnimation() — its `rootRef` goes on this card so the in-view observer and
 * the GSAP scope share one element.
 */
export default function AnimationCard({
  rootRef,
  label,
  code,
  onReplay,
  children,
}: {
  rootRef: (node: HTMLDivElement | null) => void;
  /** Uppercase caption on the left of the header. */
  label?: string;
  /** Monospace code snippet on the left of the header (use instead of label). */
  code?: string;
  onReplay: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={rootRef}
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        {code ? (
          <code className="font-mono text-sm text-foreground">{code}</code>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </span>
        )}
        <button
          onClick={onReplay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>
      {children}
    </div>
  );
}
