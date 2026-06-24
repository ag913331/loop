"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const OPS = [
  { sym: "**", name: "Exponentiation", ex: "2 ** 3", res: "8" },
  { sym: "*", name: "Multiplication", ex: "7 * 3", res: "21" },
  { sym: "/", name: "Division", ex: "7 / 2", res: "3.5" },
  { sym: "//", name: "Floor division", ex: "7 // 2", res: "3" },
  { sym: "%", name: "Modulo (remainder)", ex: "7 % 2", res: "1" },
  { sym: "+", name: "Addition", ex: "7 + 3", res: "10" },
  { sym: "-", name: "Subtraction", ex: "7 - 3", res: "4" },
];

/**
 * The seven arithmetic operators at a glance, each with a worked example. Rows
 * slide in one after another. Plays in view, with a replay.
 */
export default function OperatorsTable() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const rows = gsap.utils.toArray<HTMLElement>(".op-row");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        return;
      }
      gsap.set(rows, { opacity: 0, x: -14 });
      gsap.to(rows, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" });
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
          The seven arithmetic operators
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-2">
        {OPS.map((op) => (
          <div
            key={op.sym}
            className="op-row grid grid-cols-[3rem_1fr] items-center gap-3 rounded-xl border border-border bg-background p-3 sm:grid-cols-[3rem_1fr_auto]"
          >
            <span className="text-center font-mono text-lg font-semibold text-accent">
              {op.sym}
            </span>
            <span className="text-sm text-foreground">{op.name}</span>
            <span className="col-span-2 font-mono text-sm sm:col-span-1">
              <span className="text-muted">{op.ex}</span>
              <span className="mx-2 text-muted">→</span>
              <span className="text-brand">{op.res}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
