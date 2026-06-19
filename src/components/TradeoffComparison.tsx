"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

type Cell = { good: boolean; text: string };
type Row = { label: string; compiler: Cell; interpreter: Cell };

const ROWS: Row[] = [
  {
    label: "Execution speed",
    compiler: { good: true, text: "Fast — already machine code" },
    interpreter: { good: false, text: "Slower — translated each run" },
  },
  {
    label: "Portability",
    compiler: { good: false, text: "Binary tied to one platform" },
    interpreter: { good: true, text: "Same code runs anywhere" },
  },
  {
    label: "Debugging & iteration",
    compiler: { good: false, text: "Recompile to test a change" },
    interpreter: { good: true, text: "Run instantly, edit, repeat" },
  },
  {
    label: "Distribution",
    compiler: { good: true, text: "Ship one file, hide the source" },
    interpreter: { good: false, text: "Needs source + an interpreter" },
  },
  {
    label: "When errors show up",
    compiler: { good: true, text: "Many caught before it runs" },
    interpreter: { good: false, text: "Surface at runtime" },
  },
];

/**
 * The compiler/interpreter trade-offs as an animated comparison: each row
 * slides in with its verdict popping into the compiler and interpreter columns.
 * Neither wins outright — that's the point. Plays in view, with a replay.
 */
export default function TradeoffComparison() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".tr-row");
      const verdicts = gsap.utils.toArray<HTMLElement>(".tr-verdict");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        gsap.set(verdicts, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0, x: -16 });
      gsap.set(verdicts, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, x: 0, duration: 0.4 }, i === 0 ? 0 : ">-0.15");
        const cells = row.querySelectorAll(".tr-verdict");
        tl.to(cells, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12, ease: "back.out(2)" }, "<+=0.1");
      });
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Verdict = ({ cell }: { cell: Cell }) => (
    <div
      className={`tr-verdict flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
        cell.good
          ? "border-brand/40 bg-brand/5 text-foreground"
          : "border-danger/40 bg-danger/5 text-muted"
      }`}
    >
      <span className={cell.good ? "text-brand" : "text-danger"}>
        {cell.good ? "✓" : "✗"}
      </span>
      <span>{cell.text}</span>
    </div>
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
        <div className="grid flex-1 grid-cols-[1fr_1fr] gap-3 pl-0 sm:grid-cols-[140px_1fr_1fr]">
          <span className="hidden text-xs font-medium uppercase tracking-wide text-muted sm:block" />
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">
            Compiler
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            Interpreter
          </span>
        </div>
        <button
          onClick={replay}
          className="ml-3 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-3">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="tr-row grid grid-cols-[1fr_1fr] gap-3 sm:grid-cols-[140px_1fr_1fr] sm:items-center"
          >
            <div className="col-span-2 text-sm font-medium text-foreground sm:col-span-1">
              {row.label}
            </div>
            <Verdict cell={row.compiler} />
            <Verdict cell={row.interpreter} />
          </div>
        ))}
      </div>
    </div>
  );
}
