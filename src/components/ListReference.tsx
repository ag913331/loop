"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The aliasing surprise: `list_2 = list_1` copies the *name*, not the contents,
 * so both names point at the same list in memory. Changing one changes the
 * other. Two labelled arrows converge on a single memory box; the box's value
 * flips from [1] to [2] and both names "see" it. Plays in view, with a replay.
 */
export default function ListReference() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const name2 = root.querySelector<SVGElement>(".lr-name2");
      const arr1 = root.querySelector<SVGElement>(".lr-arr1");
      const arr2 = root.querySelector<SVGElement>(".lr-arr2");
      const box = root.querySelector<SVGElement>(".lr-box");
      const val = root.querySelector<SVGTextElement>(".lr-val");
      const status = root.querySelector<HTMLElement>(".lr-status");
      if (!name2 || !arr1 || !arr2 || !box || !val || !status) return;

      const flash = "color-mix(in srgb, var(--accent) 22%, transparent)";

      if (reducedMotion) {
        gsap.set([name2, arr2], { opacity: 1 });
        val.textContent = "[2]";
        status.textContent = "list_1 and list_2 share one list → both are [2]";
        return;
      }

      gsap.set([name2, arr2], { opacity: 0 });
      gsap.set(arr1, { opacity: 1 });
      val.textContent = "[1]";
      status.textContent = "list_1 = [1]";

      const tl = gsap.timeline();

      // list_2 = list_1 — a second arrow appears, pointing at the SAME box
      tl.call(() => (status.textContent = "list_2 = list_1  → same list!"), [], "+=0.8");
      tl.to([name2, arr2], { opacity: 1, duration: 0.5, stagger: 0.15 }, "+=0.1");

      // list_1[0] = 2 — the one shared box changes
      tl.call(() => (status.textContent = "list_1[0] = 2"), [], "+=0.8");
      tl.to(box, { backgroundColor: flash, fill: flash, duration: 0.25 }, "+=0.1");
      tl.call(() => (val.textContent = "[2]"));
      tl.to(box, { fill: "var(--background)", duration: 0.4 }, "+=0.1");

      // print(list_2) — it sees the change too
      tl.call(() => (status.textContent = "print(list_2)  →  [2]   (not [1]!)"), [], "+=0.6");
      tl.to([arr1, arr2], { stroke: "var(--brand)", duration: 0.3 }, "<");
      tl.to(val, { fill: "var(--brand)", duration: 0.3 }, "<");
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          One list, two names
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <svg viewBox="0 0 400 200" className="w-full" role="img" aria-label="Two variable names pointing at the same list in memory">
        <defs>
          <marker id="lr-head" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>

        {/* name chips */}
        <g fontFamily="monospace" fontSize="15">
          <g>
            <rect x="6" y="32" width="96" height="40" rx="9" fill="var(--surface-2)" stroke="var(--border)" />
            <text x="54" y="57" textAnchor="middle" fill="var(--foreground)">list_1</text>
          </g>
          <g className="lr-name2">
            <rect x="6" y="128" width="96" height="40" rx="9" fill="var(--surface-2)" stroke="var(--border)" />
            <text x="54" y="153" textAnchor="middle" fill="var(--foreground)">list_2</text>
          </g>
        </g>

        {/* arrows, name -> box */}
        <g fill="none" stroke="var(--muted)" strokeWidth="2">
          <line className="lr-arr1" x1="106" y1="52" x2="262" y2="92" markerEnd="url(#lr-head)" color="var(--muted)" />
          <line className="lr-arr2" x1="106" y1="148" x2="262" y2="108" markerEnd="url(#lr-head)" color="var(--muted)" />
        </g>

        {/* the single shared list in memory */}
        <text x="322" y="62" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="var(--muted)">
          memory
        </text>
        <rect className="lr-box" x="270" y="70" width="104" height="60" rx="11" fill="var(--background)" stroke="var(--brand)" strokeWidth="2" />
        <text className="lr-val" x="322" y="107" textAnchor="middle" fontFamily="monospace" fontSize="18" fill="var(--foreground)">
          [1]
        </text>
      </svg>

      <div className="mt-4 text-center">
        <span className="lr-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
