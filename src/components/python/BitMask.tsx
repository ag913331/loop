"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

// x = 0001 (1); mask = 1 << 2 = 0100; x | mask = 0101 (5) — bit 2 switched on.
const X = [0, 0, 0, 1];
const MASK = [0, 1, 0, 0];
const RES = X.map((b, i) => b | MASK[i]);
const CHANGED = 1; // index in the 4-bit row that flips on

/**
 * A bit mask targets one bit. To switch bit 2 on, OR the value with 1 << 2 —
 * a mask with a single 1 in that spot. The masked column flips on; the rest are
 * untouched. Plays in view, with a replay.
 */
export default function BitMask() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const maskRow = root.querySelector(".bm-mask");
      const resBits = gsap.utils.toArray<HTMLElement>(".bm-res");

      if (reducedMotion) {
        gsap.set(maskRow, { opacity: 1, y: 0 });
        gsap.set(resBits, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(maskRow, { opacity: 0, y: -8 });
      gsap.set(resBits, { opacity: 0, scale: 0 });

      const tl = gsap.timeline();
      tl.to(maskRow, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.3");
      tl.to(resBits, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.15, ease: "back.out(2)" }, "+=0.3");
      // emphasise the bit that changed
      tl.to(resBits[CHANGED], { keyframes: { scale: [1, 1.35, 1] }, duration: 0.5 }, "+=0.1");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const row = (label: string, bits: number[], onCls: string, bitCls = "") =>
    bits.map((b, i) => (
      <span
        key={`${label}-${i}`}
        className={`${bitCls} flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${
          b ? onCls : "border-border text-muted"
        }`}
      >
        {b}
      </span>
    ));

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
          Switch on bit 2 with a mask
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <code className="w-24 text-right font-mono text-xs text-muted">x</code>
          <div className="flex gap-1">{row("x", X, "border-border text-foreground")}</div>
        </div>
        <div className="bm-mask flex items-center gap-2">
          <code className="w-24 text-right font-mono text-xs text-accent">1 &lt;&lt; 2</code>
          <div className="flex gap-1">{row("m", MASK, "border-accent/50 bg-accent/10 text-accent")}</div>
        </div>
        <div className="my-1 h-px w-56 bg-border" />
        <div className="flex items-center gap-2">
          <code className="w-24 text-right font-mono text-xs text-brand">x | (1&lt;&lt;2)</code>
          <div className="flex gap-1">
            {RES.map((b, i) => (
              <span
                key={i}
                className={`bm-res flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${
                  b ? "border-brand/50 bg-brand/10 text-brand" : "border-border text-muted"
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Same trick, different operator:{" "}
        <span className="font-mono text-foreground">&amp;</span> a mask to{" "}
        <em>check</em> a bit, <span className="font-mono text-foreground">&amp; ~mask</span>{" "}
        to <em>clear</em> it, <span className="font-mono text-foreground">^</span>{" "}
        to <em>flip</em> it.
      </p>
    </div>
  );
}
