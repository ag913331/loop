"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const VALUES = [10, 20, 30, 40, 50];
const START = -3; // index 2
const STOP = -1; // exclusive -> indices -3, -2  (2, 3)
const lo = VALUES.length + START; // 2
const hi = VALUES.length + STOP; // 4 (exclusive)

/**
 * Negative indices in a slice count from the end. nums[-3:-1] lights the boxes
 * at -3 and -2 (the stop, -1, is excluded) and they drop into a new list. A dual
 * ruler shows each box's positive and negative index. Plays in view, replay.
 */
export default function ListSliceNegative() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const inRange = gsap.utils.toArray<HTMLElement>(".lsn-in");
      const result = gsap.utils.toArray<HTMLElement>(".lsn-res");
      const arrow = root.querySelector(".lsn-arrow");
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
        <code className="font-mono text-sm text-foreground">nums[-3:-1]</code>
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
            const inSlice = i >= lo && i < hi;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted">{i}</span>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground ${
                    inSlice ? "lsn-in" : "opacity-50"
                  }`}
                >
                  {v}
                </span>
                <span className="text-xs text-accent">{i - VALUES.length}</span>
              </div>
            );
          })}
        </div>

        <span className="lsn-arrow text-sm text-muted">↓ new list</span>

        <div className="flex gap-2">
          {VALUES.slice(lo, hi).map((v, i) => (
            <span
              key={i}
              className="lsn-res flex h-12 w-12 items-center justify-center rounded-lg border border-brand/50 bg-brand/10 font-mono text-base text-brand"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        The blue numbers below are the negative indices.{" "}
        <span className="font-mono text-foreground">-3</span> up to (not
        including) <span className="font-mono text-foreground">-1</span> gives you{" "}
        <span className="font-mono text-foreground">30</span> and{" "}
        <span className="font-mono text-foreground">40</span>.
      </p>
    </div>
  );
}
