"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The trap: text that looks like a number is still text. Adding the string "5"
 * to the integer 2 doesn't give 7 — it gives a TypeError, because Python won't
 * mix the two types. Plays in view, with a replay.
 */
export default function StringMathError() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const expr = root.querySelector(".sme-expr");
      const arrow = root.querySelector(".sme-arrow");
      const error = root.querySelector(".sme-error");

      if (reducedMotion) {
        gsap.set([arrow, error], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([arrow, error], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.35 }, "+=0.5");
      tl.to(error, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      tl.to(expr, { keyframes: { x: [0, -4, 4, -3, 3, 0] }, duration: 0.4 }, "<");
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
          Text + number doesn&apos;t add up
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <pre className="sme-expr rounded-xl border border-border bg-background px-5 py-4 font-mono text-base sm:text-lg">
          <span className="text-warn">&quot;5&quot;</span>
          <span className="text-muted"> (str)</span>
          <span className="text-foreground"> + </span>
          <span className="text-warn">2</span>
          <span className="text-muted"> (int)</span>
        </pre>

        <span className="sme-arrow text-sm text-muted">↓</span>

        <div className="sme-error rounded-xl border border-danger/40 bg-danger/10 px-5 py-3 text-center font-mono text-sm text-danger">
          TypeError: can only concatenate
          <br />
          str (not &quot;int&quot;) to str
        </div>
      </div>
    </div>
  );
}
