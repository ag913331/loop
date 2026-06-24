"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Passing a number: the parameter gets its own copy of the value. Inside, n is
 * bumped to 6, but the caller's x sits in a separate box and stays 5. The value
 * copies across into a fresh parameter box, changes there, and the original is
 * untouched. Plays in view, with a replay.
 */
export default function ArgumentCopy() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const copy = root.querySelector<HTMLElement>(".ac-copy");
      const param = root.querySelector<HTMLElement>(".ac-param");
      const paramVal = root.querySelector<HTMLElement>(".ac-param-val");
      const caller = root.querySelector<HTMLElement>(".ac-caller");
      const status = root.querySelector<HTMLElement>(".ac-status");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([copy, param], { opacity: 1 });
        if (paramVal) paramVal.textContent = "6";
        if (status) status.textContent = "n is 6, but x is still 5";
        return;
      }

      gsap.set([copy, param], { opacity: 0 });
      if (paramVal) paramVal.textContent = "5";
      if (status) status.textContent = "x = 5, then call bump(x)";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.call(() => status && (status.textContent = "the value 5 is COPIED into n"), [], "+=0.6");
      tl.to(copy, { opacity: 1, duration: 0.3 }, "+=0.1");
      tl.fromTo(param, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.05");
      tl.call(() => status && (status.textContent = "n = n + 1 → n becomes 6"), [], "+=0.5");
      tl.to(param, { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.25 }, "+=0.1");
      tl.call(() => paramVal && (paramVal.textContent = "6"));
      tl.fromTo(paramVal, { scale: 1.4 }, { scale: 1, duration: 0.35 }, "<");
      tl.call(() => status && (status.textContent = "x is a separate box — still 5"), [], "+=0.4");
      tl.fromTo(caller, { borderColor: "var(--border)" }, { borderColor: "var(--accent)", duration: 0.3, yoyo: true, repeat: 1 }, "+=0.1");
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
          A number is passed by copy
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* caller */}
        <div className="text-center">
          <div className="mb-1 text-xs uppercase tracking-wide text-muted">caller</div>
          <span className="ac-caller flex h-14 w-20 flex-col items-center justify-center rounded-lg border border-border bg-background font-mono text-foreground">
            <span className="text-[10px] text-muted">x</span>
            <span className="text-lg">5</span>
          </span>
        </div>

        {/* copy arrow */}
        <span className="ac-copy font-mono text-xs text-brand">copy →</span>

        {/* function parameter */}
        <div className="text-center">
          <div className="mb-1 text-xs uppercase tracking-wide text-muted">inside bump()</div>
          <span className="ac-param flex h-14 w-20 flex-col items-center justify-center rounded-lg border border-border bg-background font-mono text-brand">
            <span className="text-[10px] text-muted">n</span>
            <span className="ac-param-val text-lg">5</span>
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="ac-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
