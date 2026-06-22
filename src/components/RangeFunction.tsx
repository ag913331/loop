"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const ROWS = [
  { call: "range(5)", nums: [0, 1, 2, 3, 4], note: "stop only — starts at 0" },
  { call: "range(2, 6)", nums: [2, 3, 4, 5], note: "start, stop" },
  { call: "range(1, 10, 2)", nums: [1, 3, 5, 7, 9], note: "start, stop, step" },
];

/**
 * range() builds a sequence of numbers to loop over. Three calls reveal their
 * numbers in turn — showing how start, stop (excluded) and step shape the run.
 * Plays in view, with a replay.
 */
export default function RangeFunction() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const nums = gsap.utils.toArray<HTMLElement>(".rg-num");

      if (reducedMotion) {
        gsap.set(nums, { opacity: 1, scale: 1 });
        return;
      }
      gsap.set(nums, { opacity: 0, scale: 0.4 });
      gsap.to(nums, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.12,
        ease: "back.out(2.5)",
      });
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
          Numbers on demand
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4">
        {ROWS.map((row) => (
          <div key={row.call} className="rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <code className="font-mono text-sm text-accent">{row.call}</code>
              <span className="text-xs text-muted">{row.note}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {row.nums.map((n) => (
                <span
                  key={n}
                  className="rg-num flex h-9 w-9 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 font-mono text-sm text-brand"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        The <strong className="text-foreground">stop</strong> value is never
        included — <span className="font-mono text-foreground">range(5)</span>{" "}
        stops <em>before</em> 5.
      </p>
    </div>
  );
}
