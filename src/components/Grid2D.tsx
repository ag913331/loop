"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const GRID = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
const R = 1; // target row
const C = 2; // target col

/**
 * A two-dimensional list is a list of rows. Indexing happens in two steps:
 * `grid[1]` picks a whole row, then `[2]` picks an element in it. The row tints,
 * then the single cell locks green. A status line narrates. Plays in view, replay.
 */
export default function Grid2D() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cell = (r: number, c: number) =>
        root.querySelector<HTMLElement>(`.g2-cell[data-r="${r}"][data-c="${c}"]`);
      const status = root.querySelector<HTMLElement>(".g2-status");
      if (!status) return;

      const rowLit = "color-mix(in srgb, var(--accent) 16%, transparent)";
      const hit = "color-mix(in srgb, var(--brand) 22%, transparent)";
      const all = gsap.utils.toArray<HTMLElement>(".g2-cell");
      gsap.set(all, { backgroundColor: "var(--background)", borderColor: "var(--border)" });

      if (reducedMotion) {
        const t = cell(R, C);
        if (t) gsap.set(t, { backgroundColor: hit, borderColor: "var(--brand)" });
        status.textContent = `grid[${R}][${C}]  →  ${GRID[R][C]}`;
        return;
      }

      status.textContent = "grid[1][2]  ?";
      const rowCells = GRID[R].map((_, c) => cell(R, c)).filter(Boolean) as HTMLElement[];
      const target = cell(R, C);
      const tl = gsap.timeline();

      // grid[1] -> the whole middle row
      tl.call(() => (status.textContent = `grid[${R}]  →  row ${R}`), [], "+=0.5");
      tl.to(rowCells, { backgroundColor: rowLit, borderColor: "var(--accent)", duration: 0.3, stagger: 0.08 }, "+=0.1");

      // [2] -> one element within that row
      tl.call(() => (status.textContent = `grid[${R}][${C}]  →  ${GRID[R][C]}`), [], "+=0.6");
      tl.to(rowCells.filter((el) => el !== target), { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.3 }, "+=0.1");
      if (target) tl.to(target, { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.3 }, "<");
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
        <code className="font-mono text-sm text-foreground">grid[1][2]</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex justify-center">
        <div className="inline-grid grid-cols-[auto_repeat(4,3rem)] gap-1">
          {/* column header */}
          <span />
          {GRID[0].map((_, c) => (
            <span key={c} className="text-center text-xs text-muted">
              {c}
            </span>
          ))}

          {GRID.map((row, r) => (
            <div key={r} className="contents">
              <span className="flex items-center pr-1 text-xs text-muted">{r}</span>
              {row.map((v, c) => (
                <span
                  key={c}
                  data-r={r}
                  data-c={c}
                  className="g2-cell flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground"
                >
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="g2-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
