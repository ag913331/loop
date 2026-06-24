"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * A comparison's answer is just a value, so you can store it. `age >= 18`
 * works out to True, and that True is dropped into the variable is_adult for
 * later use. Plays in view, with a replay.
 */
export default function BooleanVariable() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const expr = root.querySelector(".bv-expr");
      const arrow = root.querySelector(".bv-arrow");
      const result = root.querySelector(".bv-result");
      const boxVal = root.querySelector(".bv-box-val");

      if (reducedMotion) {
        gsap.set([arrow, result, boxVal], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([arrow, result], { opacity: 0, y: 8 });
      gsap.set(boxVal, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(expr, { keyframes: { scale: [1, 1.08, 1] }, duration: 0.4 }, "+=0.3");
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.35 }, "+=0.1");
      tl.to(result, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, "+=0.1");
      tl.to(boxVal, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, "+=0.3");
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
      <div className="mb-6 flex items-center justify-between">
        <code className="font-mono text-sm text-foreground">
          is_adult = age &gt;= 18
        </code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-5 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <span className="bv-expr font-mono text-base text-foreground">
            <span className="text-muted">age</span> &gt;= 18{" "}
            <span className="text-muted">(age = 20)</span>
          </span>
          <span className="bv-arrow text-sm text-muted">evaluates to ↓</span>
          <span className="bv-result rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-base text-brand">
            True
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
            is_adult
          </span>
          <div className="flex h-16 w-28 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
            <span className="bv-box-val font-mono text-lg text-brand">True</span>
          </div>
        </div>
      </div>
    </div>
  );
}
