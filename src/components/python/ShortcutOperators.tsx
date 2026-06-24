"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const SHORTCUTS = [
  { short: "x += 5", long: "x = x + 5" },
  { short: "x -= 5", long: "x = x - 5" },
  { short: "x *= 5", long: "x = x * 5" },
  { short: "x /= 5", long: "x = x / 5" },
  { short: "x //= 5", long: "x = x // 5" },
  { short: "x %= 5", long: "x = x % 5" },
  { short: "x **= 5", long: "x = x ** 5" },
];

/**
 * The compound-assignment shortcuts. The headline `x += 5` expands into its full
 * form `x = x + 5`, then the rest of the family slides in. Plays in view.
 */
export default function ShortcutOperators() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const expand = root.querySelector(".sc-expand");
      const rows = gsap.utils.toArray<HTMLElement>(".sc-row");

      if (reducedMotion) {
        gsap.set([expand, ...rows], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(expand, { opacity: 0, y: 8 });
      gsap.set(rows, { opacity: 0, x: -12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(expand, { opacity: 1, y: 0, duration: 0.45 }, "+=0.3");
      tl.to(rows, { opacity: 1, x: 0, duration: 0.3, stagger: 0.08 }, "+=0.3");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Same thing, less typing
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-background p-4 font-mono text-lg">
        <span className="text-brand">x += 5</span>
        <span className="sc-expand text-muted">
          is exactly{" "}
          <span className="text-foreground">x = x + 5</span>
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {SHORTCUTS.map((s) => (
          <div
            key={s.short}
            className="sc-row flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
          >
            <span className="text-brand">{s.short}</span>
            <span className="text-muted">→</span>
            <span className="text-foreground">{s.long}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
