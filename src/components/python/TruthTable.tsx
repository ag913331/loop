"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

type Row = { a: string; b?: string; r: boolean };

const TABLES: { op: string; rows: Row[] }[] = [
  {
    op: "and",
    rows: [
      { a: "True", b: "True", r: true },
      { a: "True", b: "False", r: false },
      { a: "False", b: "True", r: false },
      { a: "False", b: "False", r: false },
    ],
  },
  {
    op: "or",
    rows: [
      { a: "True", b: "True", r: true },
      { a: "True", b: "False", r: true },
      { a: "False", b: "True", r: true },
      { a: "False", b: "False", r: false },
    ],
  },
  {
    op: "not",
    rows: [
      { a: "True", r: false },
      { a: "False", r: true },
    ],
  },
];

/**
 * The three logical operators as truth tables. and is True only when both are;
 * or is True when either is; not just flips. Rows reveal with the result
 * coloured by truth. Plays in view, with a replay.
 */
export default function TruthTable() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const rows = gsap.utils.toArray<HTMLElement>(".tt-row");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        return;
      }
      gsap.set(rows, { opacity: 0, x: -10 });
      gsap.to(rows, { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" });
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
          The three logical operators
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TABLES.map((t) => (
          <div key={t.op} className="rounded-xl border border-border bg-background p-3">
            <div className="mb-2 text-center font-mono text-sm font-semibold text-accent">
              {t.op}
            </div>
            <div className="space-y-1">
              {t.rows.map((row, i) => (
                <div
                  key={i}
                  className="tt-row flex items-center justify-center gap-1.5 font-mono text-xs"
                >
                  {t.op === "not" ? (
                    <span className="text-muted">not {row.a}</span>
                  ) : (
                    <span className="text-muted">
                      {row.a} {t.op} {row.b}
                    </span>
                  )}
                  <span className="text-muted">=</span>
                  <span
                    className={`rounded px-1.5 ${
                      row.r
                        ? "bg-brand/10 text-brand"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {row.r ? "True" : "False"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
