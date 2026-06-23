"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const LAYERS = 3; // depth
const ROWS = 2;
const COLS = 3;
const TL = 1; // target layer
const TR = 0; // target row
const TC = 2; // target col

/**
 * A three-dimensional list, drawn as stacked layers. Selecting cube[1] lifts the
 * middle layer to the front; cube[1][0][2] then locks a single cell. Shows that
 * each extra dimension is just "a list of the thing below it". Plays in view.
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
      if (!status || layerEls.length !== LAYERS) return;

      const hit = "color-mix(in srgb, var(--brand) 30%, transparent)";

      if (reducedMotion) {
        gsap.set(layerEls[TL], { opacity: 1 });
        if (target) gsap.set(target, { backgroundColor: hit, borderColor: "var(--brand)" });
        status.textContent = `cube[${TL}][${TR}][${TC}]  →  found`;
        return;
      }

      gsap.set(layerEls, { opacity: 0.35 });
      status.textContent = "cube[1][0][2]  ?";
      const tl = gsap.timeline();

      // cube[1] -> spotlight the middle layer
      tl.call(() => (status.textContent = `cube[${TL}]  →  middle layer`), [], "+=0.5");
      tl.to(layerEls[TL], { opacity: 1, duration: 0.45 }, "+=0.1");

      // [0][2] -> a single cell inside it
      tl.call(() => (status.textContent = `cube[${TL}][${TR}][${TC}]  →  one cell`), [], "+=0.6");
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

      <div className="relative mx-auto h-44" style={{ width: 240 }}>
        {/* back-to-front so the lowest index sits in front */}
        {Array.from({ length: LAYERS }).map((_, depth) => {
          const layer = LAYERS - 1 - depth; // render far layers first
          return (
            <div
              key={layer}
              className="g3-layer absolute rounded-xl border border-border bg-surface-2/80 p-1.5 backdrop-blur-sm"
              style={{
                left: layer * 34,
                top: (LAYERS - 1 - layer) * 30,
                zIndex: LAYERS - layer,
              }}
            >
              <div className="mb-1 text-center font-mono text-[10px] text-muted">
                [{layer}]
              </div>
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: ROWS * COLS }).map((_, i) => {
                  const r = Math.floor(i / COLS);
                  const c = i % COLS;
                  const isTarget = layer === TL && r === TR && c === TC;
                  return (
                    <span
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background font-mono text-xs text-muted ${
                        isTarget ? "g3-target" : ""
                      }`}
                    >
                      {r},{c}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <span className="g3-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
