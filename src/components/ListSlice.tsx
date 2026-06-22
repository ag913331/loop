"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const VALUES = [10, 20, 30, 40, 50];
const START = 1;
const STOP = 4; // exclusive -> indices 1, 2, 3

/**
 * Slicing copies a stretch of a list into a new one. nums[1:4] lights up indices
 * 1, 2 and 3 (the stop, 4, is left out) and they drop down into a fresh list.
 * Plays in view, with a replay.
 */
export default function ListSlice() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const inRange = gsap.utils.toArray<HTMLElement>(".lsl-in");
      const result = gsap.utils.toArray<HTMLElement>(".lsl-res");
      const arrow = root.querySelector(".lsl-arrow");
      const lit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        gsap.set(inRange, { backgroundColor: lit, borderColor: "var(--brand)" });
        gsap.set([arrow, ...result], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([arrow], { opacity: 0 });
      gsap.set(result, { opacity: 0, y: -16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(inRange, { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3, stagger: 0.12 }, "+=0.3");
      tl.to(arrow, { opacity: 1, duration: 0.3 }, "+=0.2");
      tl.to(result, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }, "+=0.1");
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
        <code className="font-mono text-sm text-foreground">nums[1:4]</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {VALUES.map((v, i) => {
            const inSlice = i >= START && i < STOP;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted">{i}</span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground ${
                    inSlice ? "lsl-in" : "opacity-50"
                  }`}
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>

        <span className="lsl-arrow text-sm text-muted">↓ new list</span>

        <div className="flex gap-2">
          {VALUES.slice(START, STOP).map((v, i) => (
            <span
              key={i}
              className="lsl-res flex h-12 w-12 items-center justify-center rounded-lg border border-brand/50 bg-brand/10 font-mono text-base text-brand"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Like <span className="font-mono text-foreground">range</span>, the stop{" "}
        <span className="font-mono text-foreground">4</span> is excluded — you get
        indices 1, 2 and 3.
      </p>
    </div>
  );
}
