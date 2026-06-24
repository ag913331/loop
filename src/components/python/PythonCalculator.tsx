"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * print() doesn't just echo what you give it — if you give it an expression, it
 * works the answer out first. `2 + 2` is spotlit, collapses to `4`, and that's
 * what gets printed. Plays in view, with a replay.
 */
export default function PythonCalculator() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const expr = root.querySelector(".calc-expr");
      const arrow = root.querySelector(".calc-arrow");
      const result = root.querySelector(".calc-result");
      const out = root.querySelector(".calc-out");

      if (reducedMotion) {
        gsap.set([arrow, result, out], { opacity: 1, y: 0, scale: 1 });
        gsap.set(expr, { backgroundColor: "color-mix(in srgb, var(--warn) 20%, transparent)" });
        return;
      }

      gsap.set([arrow, result, out], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(expr, {
        backgroundColor: "color-mix(in srgb, var(--warn) 20%, transparent)",
        duration: 0.3,
      }, "+=0.3");
      tl.to(expr, { keyframes: { scale: [1, 1.12, 1] }, duration: 0.4 });
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.3 }, "+=0.1");
      tl.to(result, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(2)" }, "+=0.05");
      tl.to(out, { opacity: 1, y: 0, duration: 0.4 }, "+=0.3");
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
          It works the answer out first
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <pre className="rounded-xl border border-border bg-background px-5 py-4 font-mono text-base sm:text-lg">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span className="calc-expr inline-block rounded px-1 text-foreground">
            2 + 2
          </span>
          <span className="text-foreground">)</span>
        </pre>

        <span className="calc-arrow text-sm text-muted">
          Python evaluates <span className="font-mono text-warn">2 + 2</span> ↓
        </span>

        <div className="calc-result rounded-lg border border-warn/40 bg-warn/10 px-4 py-2 font-mono text-lg text-warn">
          4
        </div>

        <div className="calc-out rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 font-mono text-base text-brand">
          4
        </div>
        <span className="text-xs text-muted">
          …so print shows the <em>value</em>, not the text &ldquo;2 + 2&rdquo;.
        </span>
      </div>
    </div>
  );
}
