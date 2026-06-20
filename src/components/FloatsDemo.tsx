"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Floats are numbers with a decimal point — and `2` (int) vs `2.0` (float) are
 * different types even though the value matches. Closes with the classic
 * 0.1 + 0.2 surprise. Plays in view, with a replay.
 */
export default function FloatsDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const intChip = root.querySelector(".fl-int");
      const floatChip = root.querySelector(".fl-float");
      const dot = root.querySelector(".fl-dot");
      const sum = root.querySelector(".fl-sum");
      const result = root.querySelector(".fl-result");

      if (reducedMotion) {
        gsap.set([intChip, floatChip, sum, result], { opacity: 1, y: 0, scale: 1 });
        gsap.set(dot, { backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)" });
        return;
      }

      gsap.set([intChip, floatChip], { opacity: 0, y: 8 });
      gsap.set([sum, result], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(intChip, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
      tl.to(floatChip, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
      tl.to(dot, {
        backgroundColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
        duration: 0.3,
      });
      tl.to(dot, { keyframes: { scale: [1, 1.4, 1] }, duration: 0.4 }, "<");
      tl.to(sum, { opacity: 1, y: 0, duration: 0.4 }, "+=0.4");
      tl.to(result, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, "+=0.2");
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
          The dot makes the difference
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="fl-int flex flex-col items-center gap-1">
          <span className="rounded-lg border border-border bg-background px-4 py-2 font-mono text-lg text-foreground">
            2
          </span>
          <span className="font-mono text-xs text-muted">int</span>
        </div>
        <span className="text-muted">vs</span>
        <div className="fl-float flex flex-col items-center gap-1">
          <span className="rounded-lg border border-accent/40 bg-background px-4 py-2 font-mono text-lg text-foreground">
            2<span className="fl-dot rounded">.0</span>
          </span>
          <span className="font-mono text-xs text-accent">float</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4 text-center font-mono text-sm">
        <span className="fl-sum text-foreground">0.1 + 0.2</span>
        <span className="mx-2 text-muted">=</span>
        <span className="fl-result inline-block text-warn">
          0.30000000000000004
        </span>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Not a bug — computers store floats in binary, so some decimals land a
        hair off. Every language does this.
      </p>
    </div>
  );
}
