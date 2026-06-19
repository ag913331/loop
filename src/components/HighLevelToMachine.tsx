"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const ROWS = 4;
const COLS = 8;
const BITS = Array.from({ length: ROWS * COLS });

/**
 * One readable, high-level line of Python translated into the machine code the
 * CPU actually runs: a grid of bits flickers and settles into 0s and 1s. The
 * point is the contrast — one friendly line becomes many bits. Plays in view.
 */
export default function HighLevelToMachine() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const high = root.querySelector(".hl-line");
      const arrow = root.querySelector(".hl-arrow");
      const bits = gsap.utils.toArray<HTMLElement>(".hl-bit");

      const settle = (el: HTMLElement) => {
        el.textContent = Math.random() < 0.5 ? "0" : "1";
      };

      if (reducedMotion) {
        gsap.set([high, arrow], { opacity: 1, y: 0 });
        bits.forEach(settle);
        gsap.set(bits, { opacity: 1 });
        return;
      }

      gsap.set([high, arrow], { opacity: 0, y: 8 });
      gsap.set(bits, { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(high, { opacity: 1, y: 0, duration: 0.5 });
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.35 }, "+=0.2");

      // Bits cascade in...
      tl.to(bits, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.03 }, "+=0.1");

      // ...each churning through a few random digits before settling.
      tl.add(() => {
        bits.forEach((bit, i) => {
          let n = 0;
          const flick = () => {
            settle(bit);
            if (n++ < 3) gsap.delayedCall(0.05, flick);
          };
          gsap.delayedCall(i * 0.03, flick);
        });
      }, "<");
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
        <code className="font-mono text-sm text-muted">what the CPU sees</code>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="hl-line rounded-xl border border-border bg-background px-5 py-3 font-mono text-base text-foreground sm:text-lg">
          <span className="text-brand">print</span>(
          <span className="text-warn">&quot;Hi&quot;</span>)
          <span className="ml-3 text-xs text-muted">high-level — you write this</span>
        </div>

        <div className="hl-arrow text-sm text-muted">translate ↓</div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {BITS.map((_, i) => (
              <span
                key={i}
                className="hl-bit flex h-7 w-7 items-center justify-center rounded bg-surface-2 font-mono text-sm text-accent sm:h-8 sm:w-8"
              >
                0
              </span>
            ))}
          </div>
          <div className="mt-3 text-center text-xs text-muted">
            machine code — what the computer runs
          </div>
        </div>
      </div>
    </div>
  );
}
