"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Assignment reads right-to-left: `score = 100` takes the value on the right and
 * stores it in the name on the left. The 100 literally slides into the box.
 * Plays in view, with a replay.
 */
export default function Assignment() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const flyer = root.querySelector<HTMLElement>(".as-flyer");
      const slotVal = root.querySelector<HTMLElement>(".as-slot-val");
      const eq = root.querySelector(".as-eq");
      if (!flyer || !slotVal) return;

      if (reducedMotion) {
        gsap.set(slotVal, { opacity: 1 });
        gsap.set(flyer, { opacity: 0 });
        return;
      }

      gsap.set(slotVal, { opacity: 0 });
      gsap.set(flyer, { opacity: 0, x: 120 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(eq, { keyframes: { scale: [1, 1.3, 1] }, duration: 0.4 }, "+=0.3");
      tl.to(flyer, { opacity: 1, x: 120, duration: 0.2 });
      tl.to(flyer, { x: 0, duration: 0.7, ease: "power2.inOut" });
      tl.to(flyer, { opacity: 0, duration: 0.2 }, ">-0.1");
      tl.to(slotVal, { opacity: 1, duration: 0.01 }, "<");
      tl.fromTo(slotVal, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
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
        <code className="font-mono text-sm text-foreground">score = 100</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="relative flex items-center justify-center gap-4">
        {/* the box */}
        <div className="flex flex-col items-center gap-2">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
            score
          </span>
          <div className="flex h-16 w-20 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
            <span className="as-slot-val font-mono text-xl text-warn">100</span>
          </div>
        </div>

        <span className="as-eq font-mono text-2xl text-accent">=</span>

        {/* the value that flies into the box */}
        <div className="flex h-16 w-20 items-center justify-center">
          <span className="as-flyer font-mono text-xl text-warn">100</span>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        <span className="font-mono text-foreground">=</span> isn&apos;t
        &ldquo;equals&rdquo; — it means &ldquo;put the value on the right into the
        name on the left.&rdquo;
      </p>
    </div>
  );
}
