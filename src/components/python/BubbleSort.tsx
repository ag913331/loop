"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [5, 1, 4, 2, 8];
const SLOT = 56; // column width (48) + gap (8)
const MAX_H = 100; // tallest bar, px
const MAX_V = Math.max(...VALUES);

/**
 * Bubble sort, slowed right down so you can follow every step. Adjacent bars are
 * compared; the bigger one swaps rightward, so the largest "bubbles" to the end
 * each pass. Sorted bars lock green. A status line narrates each comparison.
 * Plays in view, with a replay.
 */
export default function BubbleSort() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cols = gsap.utils.toArray<HTMLElement>(".bs-col");
      const barEls = gsap.utils.toArray<HTMLElement>(".bs-bar");
      const status = root.querySelector<HTMLElement>(".bs-status");
      if (!status || cols.length !== VALUES.length) return;

      const litCmp = "color-mix(in srgb, var(--accent) 22%, transparent)";
      const litDone = "color-mix(in srgb, var(--brand) 22%, transparent)";

      // reset
      gsap.set(cols, { x: 0 });
      gsap.set(barEls, { borderColor: "var(--border)", backgroundColor: "var(--surface-2)" });

      const bars = VALUES.map((v, i) => ({ value: v, orig: i, col: cols[i], bar: barEls[i] }));

      if (reducedMotion) {
        const sorted = [...bars].sort((a, b) => a.value - b.value);
        sorted.forEach((b, slot) => {
          gsap.set(b.col, { x: (slot - b.orig) * SLOT });
          gsap.set(b.bar, { borderColor: "var(--brand)", backgroundColor: litDone });
        });
        status.textContent = "sorted ✓";
        return;
      }

      status.textContent = "ready to sort";
      const order = [...bars];
      const n = bars.length;
      const tl = gsap.timeline();

      for (let pass = 0; pass < n - 1; pass++) {
        for (let j = 0; j < n - 1 - pass; j++) {
          const left = order[j];
          const right = order[j + 1];
          const swap = left.value > right.value;

          // spotlight the pair being compared
          tl.to([left.bar, right.bar], { borderColor: "var(--accent)", backgroundColor: litCmp, duration: 0.3 }, "+=0.45");
          tl.call(() => (status.textContent = `compare ${left.value} and ${right.value}`), [], "<");

          if (swap) {
            tl.call(() => (status.textContent = `${left.value} > ${right.value} → swap`), [], "+=0.6");
            tl.to(left.col, { x: (j + 1 - left.orig) * SLOT, duration: 0.65, ease: "power2.inOut" }, "+=0.1");
            tl.to(right.col, { x: (j - right.orig) * SLOT, duration: 0.65, ease: "power2.inOut" }, "<");
            order[j] = right;
            order[j + 1] = left;
          } else {
            tl.call(() => (status.textContent = `${left.value} ≤ ${right.value} → keep`), [], "+=0.6");
          }

          // dim the pair again
          tl.to([left.bar, right.bar], { borderColor: "var(--border)", backgroundColor: "var(--surface-2)", duration: 0.3 }, "+=0.35");
        }
        // the largest unsorted value has bubbled to the end — lock it
        const locked = order[n - 1 - pass];
        tl.to(locked.bar, { borderColor: "var(--brand)", backgroundColor: litDone, duration: 0.3 });
      }
      tl.to(order[0].bar, { borderColor: "var(--brand)", backgroundColor: litDone, duration: 0.3 });
      tl.call(() => (status.textContent = "sorted ✓"));
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
          Bubble sort, step by step
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div
        className="flex justify-center"
        style={{ height: MAX_H + 28 }}
      >
        <div className="flex items-end gap-2">
          {VALUES.map((v, i) => (
            <div key={i} className="bs-col flex flex-col items-center gap-1">
              <span className="font-mono text-xs text-muted">{v}</span>
              <div
                className="bs-bar w-12 rounded-t-lg border border-border bg-surface-2"
                style={{ height: (v / MAX_V) * MAX_H }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className="bs-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
