"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [12, 7, 23, 4];
const APPENDED = 99;

const CELL_W = 78;
const CELL_H = 78;
const GAP = 14;
const START_X = 24;
const ROW_Y = 70;

function cellX(i: number) {
  return START_X + i * (CELL_W + GAP);
}

/**
 * Animated explanation of a Python list: it draws the cells, walks the index
 * pointer across them, then appends a new element — choreographed as a GSAP
 * timeline that plays when scrolled into view. Not interactive by design; the
 * only control is a courtesy replay.
 */
export default function AnimatedArray() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<SVGSVGElement>(null);

  const totalCells = VALUES.length + 1; // include the appended slot

  useGSAP(
    () => {
      if (!inView) return;

      const root = scope.current;
      if (!root) return;
      const cells = gsap.utils.toArray<SVGGElement>(".cell");
      const appendCell = root.querySelector<SVGGElement>(".cell-append");
      const pointer = root.querySelector<SVGGElement>(".pointer");
      const label = root.querySelector<SVGTextElement>(".index-label");
      if (!appendCell || !pointer || !label) return;

      // Reduced motion: jump straight to the final, fully-revealed state.
      if (reducedMotion) {
        gsap.set([...cells, appendCell], { opacity: 1, y: 0, scale: 1 });
        gsap.set(pointer, { opacity: 0 });
        return;
      }

      gsap.set(cells.slice(0, VALUES.length), { opacity: 0, y: -24, scale: 0.8 });
      gsap.set(appendCell, { opacity: 0, scale: 0.4 });
      gsap.set(pointer, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Cells drop in one after another.
      tl.to(cells.slice(0, VALUES.length), {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.12,
      });

      // 2. Index pointer walks across each element.
      tl.set(pointer, { opacity: 1, x: cellX(0) }, "+=0.2");
      for (let i = 0; i < VALUES.length; i++) {
        tl.to(pointer, { x: cellX(i), duration: 0.3 }, i === 0 ? "<" : ">");
        tl.set(label, { textContent: String(i) }, "<");
        tl.to(
          cells[i],
          { keyframes: { scale: [1, 1.12, 1] }, duration: 0.3 },
          "<",
        );
      }

      // 3. Append a new value at the end.
      tl.to(pointer, { opacity: 0, duration: 0.25 }, "+=0.2");
      tl.to(appendCell, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
      });
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const width = START_X * 2 + totalCells * CELL_W + (totalCells - 1) * GAP;

  return (
    <div ref={ref} className="not-prose my-8 rounded-2xl border border-border bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <code className="font-mono text-sm text-brand">
          nums = [12, 7, 23, 4] &nbsp;→&nbsp; nums.append(99)
        </code>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <svg
        ref={scope}
        viewBox={`0 0 ${width} 180`}
        className="w-full"
        role="img"
        aria-label="A Python list with values 12, 7, 23 and 4. An index pointer moves across each element, then the value 99 is appended to the end."
      >
        {/* existing cells */}
        {VALUES.map((v, i) => (
          <g
            className="cell"
            key={i}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect
              x={cellX(i)}
              y={ROW_Y}
              width={CELL_W}
              height={CELL_H}
              rx="12"
              fill="var(--surface-2)"
              stroke="var(--border)"
            />
            <text
              x={cellX(i) + CELL_W / 2}
              y={ROW_Y + CELL_H / 2 + 7}
              textAnchor="middle"
              fontSize="26"
              fontFamily="var(--font-mono), monospace"
              fill="var(--foreground)"
            >
              {v}
            </text>
            <text
              x={cellX(i) + CELL_W / 2}
              y={ROW_Y + CELL_H + 22}
              textAnchor="middle"
              fontSize="14"
              fontFamily="var(--font-mono), monospace"
              fill="var(--muted)"
            >
              [{i}]
            </text>
          </g>
        ))}

        {/* appended cell */}
        <g
          className="cell-append"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <rect
            x={cellX(VALUES.length)}
            y={ROW_Y}
            width={CELL_W}
            height={CELL_H}
            rx="12"
            fill="color-mix(in srgb, var(--brand) 22%, var(--surface-2))"
            stroke="var(--brand)"
          />
          <text
            x={cellX(VALUES.length) + CELL_W / 2}
            y={ROW_Y + CELL_H / 2 + 7}
            textAnchor="middle"
            fontSize="26"
            fontFamily="var(--font-mono), monospace"
            fill="var(--brand)"
          >
            {APPENDED}
          </text>
          <text
            x={cellX(VALUES.length) + CELL_W / 2}
            y={ROW_Y + CELL_H + 22}
            textAnchor="middle"
            fontSize="14"
            fontFamily="var(--font-mono), monospace"
            fill="var(--muted)"
          >
            [{VALUES.length}]
          </text>
        </g>

        {/* index pointer */}
        <g className="pointer">
          <path
            d={`M ${CELL_W / 2 - 8} 30 L ${CELL_W / 2 + 8} 30 L ${CELL_W / 2} 46 Z`}
            fill="var(--accent)"
          />
          <text
            className="index-label"
            x={CELL_W / 2}
            y={22}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fontFamily="var(--font-mono), monospace"
            fill="var(--accent)"
          >
            0
          </text>
        </g>
      </svg>
    </div>
  );
}
