"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const FIVE = [0, 0, 0, 0, 0, 1, 0, 1]; // 5
const LEFT = [0, 0, 0, 0, 1, 0, 1, 0]; // 5 << 1 = 10
const RIGHT = [0, 0, 0, 0, 0, 0, 1, 0]; // 5 >> 1 = 2

/**
 * Shifts slide every bit one place. << moves them left (and doubles the value);
 * >> moves them right (and halves it). The result bits slide in from the shift's
 * direction. Plays in view, with a replay.
 */
export default function BitShift() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const leftBits = gsap.utils.toArray<HTMLElement>(".bs-left");
      const rightBits = gsap.utils.toArray<HTMLElement>(".bs-right");

      if (reducedMotion) {
        gsap.set([...leftBits, ...rightBits], { opacity: 1, x: 0 });
        return;
      }

      gsap.set(leftBits, { opacity: 0, x: 26 }); // come from the right, moving left
      gsap.set(rightBits, { opacity: 0, x: -26 }); // come from the left, moving right

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(leftBits, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 }, "+=0.3");
      tl.to(rightBits, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 }, "+=0.4");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Bits = ({ bits, cls = "" }: { bits: number[]; cls?: string }) => (
    <div className="flex gap-1">
      {bits.map((b, i) => (
        <span
          key={i}
          className={`flex h-7 w-7 items-center justify-center rounded border border-border font-mono text-xs ${cls} ${
            b ? "text-foreground" : "text-muted"
          }`}
        >
          {b}
        </span>
      ))}
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
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Slide the bits, scale the number
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* left shift */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-3 font-mono text-xs text-accent">5 &lt;&lt; 1 — left</div>
          <div className="flex flex-col items-center gap-2">
            <Bits bits={FIVE} />
            <span className="text-xs text-muted">↓ everything moves left</span>
            <div className="flex gap-1">
              {LEFT.map((b, i) => (
                <span
                  key={i}
                  className={`bs-left flex h-7 w-7 items-center justify-center rounded border font-mono text-xs ${
                    b ? "border-brand/50 bg-brand/10 text-brand" : "border-border text-muted"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm text-brand">= 10 (5 × 2)</span>
          </div>
        </div>

        {/* right shift */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-3 font-mono text-xs text-accent">5 &gt;&gt; 1 — right</div>
          <div className="flex flex-col items-center gap-2">
            <Bits bits={FIVE} />
            <span className="text-xs text-muted">↓ everything moves right</span>
            <div className="flex gap-1">
              {RIGHT.map((b, i) => (
                <span
                  key={i}
                  className={`bs-right flex h-7 w-7 items-center justify-center rounded border font-mono text-xs ${
                    b ? "border-brand/50 bg-brand/10 text-brand" : "border-border text-muted"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <span className="font-mono text-sm text-brand">= 2 (5 ÷ 2)</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Each left shift doubles, each right shift halves (dropping any remainder)
        — and it&apos;s far faster than multiplying.
      </p>
    </div>
  );
}
