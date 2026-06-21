"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const NAMES = [
  { name: "age", ok: true, note: "plain and clear" },
  { name: "user_name", ok: true, note: "underscores are fine" },
  { name: "_count", ok: true, note: "may start with _" },
  { name: "x2", ok: true, note: "digits allowed — just not first" },
  { name: "2cool", ok: false, note: "can't start with a digit" },
  { name: "my-var", ok: false, note: "no hyphens or spaces" },
  { name: "class", ok: false, note: "it's a reserved keyword" },
];

/**
 * Valid vs. invalid variable names. Each name reveals with a ✓ or ✗ and the
 * reason — the naming rules, shown by example. Plays in view, with a replay.
 */
export default function VariableNames() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const rows = gsap.utils.toArray<HTMLElement>(".vn-row");
      const marks = gsap.utils.toArray<HTMLElement>(".vn-mark");

      if (reducedMotion) {
        gsap.set([...rows, ...marks], { opacity: 1, x: 0, scale: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0, x: -14 });
      gsap.set(marks, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, x: 0, duration: 0.3 }, i === 0 ? 0 : ">-0.12");
        tl.to(marks[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, ">-0.1");
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
          Legal names, and a few that aren&apos;t
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-2">
        {NAMES.map((n) => (
          <div
            key={n.name}
            className="vn-row flex items-center gap-3 rounded-xl border border-border bg-background p-3"
          >
            <span
              className={`vn-mark flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${
                n.ok
                  ? "bg-brand/15 text-brand"
                  : "bg-danger/15 text-danger"
              }`}
            >
              {n.ok ? "✓" : "✗"}
            </span>
            <span
              className={`w-28 font-mono text-sm ${n.ok ? "text-foreground" : "text-muted line-through"}`}
            >
              {n.name}
            </span>
            <span className="text-xs text-muted">{n.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
