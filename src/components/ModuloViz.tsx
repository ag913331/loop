"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// 14 items split into groups of 4: three full groups, two left over.
const GROUPS = [4, 4, 4, 2];

/**
 * Modulo, made physical: 14 dots packed into groups of 4. Three groups fill up
 * (that's 12), and the 2 that can't make a fourth group are the remainder —
 * so 14 % 4 = 2. Plays in view, with a replay.
 */
export default function ModuloViz() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const dots = gsap.utils.toArray<HTMLElement>(".mod-dot");
      const remainder = gsap.utils.toArray<HTMLElement>(".mod-rem");
      const result = root.querySelector(".mod-result");

      if (reducedMotion) {
        gsap.set(dots, { opacity: 1, scale: 1 });
        gsap.set(result, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(dots, { opacity: 0, scale: 0 });
      gsap.set(result, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
      tl.to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06 }, "+=0.2");
      tl.to(remainder, { keyframes: { scale: [1, 1.4, 1] }, duration: 0.5, stagger: 0.1 }, "+=0.2");
      tl.to(result, { opacity: 1, scale: 1, duration: 0.45 }, "<");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  let counter = 0;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-sm text-foreground">14 % 4</span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {GROUPS.map((size, g) => {
          const isRemainder = g === GROUPS.length - 1;
          return (
            <div
              key={g}
              className={`flex gap-1.5 rounded-lg border p-2 ${
                isRemainder
                  ? "border-brand/50 bg-brand/10"
                  : "border-border bg-background"
              }`}
            >
              {Array.from({ length: size }).map(() => {
                counter += 1;
                return (
                  <span
                    key={counter}
                    className={`mod-dot h-4 w-4 rounded-full ${
                      isRemainder ? "mod-rem bg-brand" : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>
          );
        })}

        <span className="font-mono text-lg text-muted">=</span>
        <span className="mod-result rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-lg text-brand">
          2
        </span>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Three full groups of 4 (that&apos;s 12), and the 2 that can&apos;t fill a
        fourth group are the remainder.
      </p>
    </div>
  );
}
