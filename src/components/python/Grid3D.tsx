"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

// cube[layer][row][col] — three 2x3 grids of values
const CUBE = [
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [
    [7, 8, 9],
    [10, 11, 12],
  ],
  [
    [13, 14, 15],
    [16, 17, 18],
  ],
];
const TL = 1; // target layer
const TR = 0; // target row
const TC = 2; // target col

/**
 * A three-dimensional list, drawn as a row of separate grids (one per layer).
 * cube[1] spotlights the middle grid; cube[1][0][2] then locks a single cell —
 * showing that each extra dimension is just "a list of the thing below it".
 * Layers are kept apart so nothing overlaps. Plays in view, with a replay.
 */
export default function Grid3D() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const layerEls = gsap.utils.toArray<HTMLElement>(".g3-layer");
      const status = root.querySelector<HTMLElement>(".g3-status");
      const target = root.querySelector<HTMLElement>(".g3-target");
      if (!status || layerEls.length !== CUBE.length) return;

      const hit = "color-mix(in srgb, var(--brand) 24%, transparent)";

      if (reducedMotion) {
        gsap.set(layerEls, { opacity: 0.45 });
        gsap.set(layerEls[TL], { opacity: 1 });
        if (target) gsap.set(target, { backgroundColor: hit, borderColor: "var(--brand)" });
        status.textContent = `cube[${TL}][${TR}][${TC}]  →  ${CUBE[TL][TR][TC]}`;
        return;
      }

      gsap.set(layerEls, { opacity: 0.45 });
      status.textContent = "cube[1][0][2]  ?";
      const tl = gsap.timeline();

      // cube[1] -> spotlight the middle grid
      tl.call(() => (status.textContent = `cube[${TL}]  →  middle grid`), [], "+=0.5");
      tl.to(layerEls[TL], { opacity: 1, duration: 0.45 }, "+=0.1");

      // [0][2] -> one cell inside it
      tl.call(() => (status.textContent = `cube[${TL}][${TR}][${TC}]  →  ${CUBE[TL][TR][TC]}`), [], "+=0.6");
      if (target) tl.to(target, { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.4 }, "+=0.1");
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
        <code className="font-mono text-sm text-foreground">cube[1][0][2]</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-5">
        {CUBE.map((layer, l) => (
          <div
            key={l}
            className="g3-layer rounded-xl border border-border bg-surface-2 p-2"
            style={{ marginTop: l * 14 }}
          >
            <div className="mb-1.5 text-center font-mono text-[11px] text-muted">
              [{l}]
            </div>
            <div className="grid grid-cols-3 gap-1">
              {layer.flatMap((row, r) =>
                row.map((v, c) => {
                  const isTarget = l === TL && r === TR && c === TC;
                  return (
                    <span
                      key={`${r}-${c}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background font-mono text-sm text-foreground ${
                        isTarget ? "g3-target" : ""
                      }`}
                    >
                      {v}
                    </span>
                  );
                }),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="g3-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
