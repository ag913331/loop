"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Precedence in action: `2 + 3 * 4` isn't read left to right. The `*` binds
 * tighter, so `3 * 4` collapses to `12` first, then `2 + 12` gives `14`. The
 * higher-priority step is spotlit before each reduction. Plays in view.
 */
export default function OperatorPrecedence() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const mul = root.querySelector(".pr-mul");
      const step2 = root.querySelector(".pr-step2");
      const add = root.querySelector(".pr-add");
      const step3 = root.querySelector(".pr-step3");
      const lit = "color-mix(in srgb, var(--accent) 22%, transparent)";
      const litB = "color-mix(in srgb, var(--brand) 20%, transparent)";

      if (reducedMotion) {
        gsap.set([step2, step3], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([step2, step3], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // 1. spotlight 3 * 4 (higher precedence)
      tl.to(mul, { backgroundColor: lit, duration: 0.3 }, "+=0.4");
      tl.to(mul, { keyframes: { scale: [1, 1.12, 1] }, duration: 0.4 });
      // 2. it becomes 12
      tl.to(step2, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
      // 3. now the addition
      tl.to(add, { backgroundColor: litB, duration: 0.3 }, "+=0.3");
      tl.to(add, { keyframes: { scale: [1, 1.12, 1] }, duration: 0.4 });
      // 4. final 14
      tl.to(step3, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.8)" }, "+=0.2");
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
          Not left to right — by priority
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 font-mono text-lg">
        <div>
          <span className="text-foreground">2 + </span>
          <span className="pr-mul rounded px-1 text-foreground">3 * 4</span>
        </div>
        <div className="pr-step2">
          <span className="text-foreground">2 + </span>
          <span className="rounded bg-accent/15 px-1 text-accent">12</span>
        </div>
        <div className="pr-step3">
          <span className="pr-add rounded px-1 text-foreground">2 + 12</span>
        </div>
        <div className="pr-step3 rounded-lg border border-brand/40 bg-brand/10 px-4 py-1.5 text-brand">
          14
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        <span className="font-mono text-foreground">*</span> outranks{" "}
        <span className="font-mono text-foreground">+</span>, so it goes first —
        even though it&apos;s written second.
      </p>
    </div>
  );
}
