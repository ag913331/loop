"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const A = [1, 1, 0, 0]; // 12
const B = [1, 0, 1, 0]; // 10
const AND = A.map((a, i) => a & B[i]); // 1000 = 8
const OR = A.map((a, i) => a | B[i]); //  1110 = 14
const XOR = A.map((a, i) => a ^ B[i]); // 0110 = 6

/**
 * Bitwise &, | and ^ line two numbers up in binary and combine them one column
 * at a time. With 12 and 10, the AND result reveals column by column, then OR
 * and XOR follow. Plays in view, with a replay.
 */
export default function BitwiseOps() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const andBits = gsap.utils.toArray<HTMLElement>(".bw-and");
      const orRow = root.querySelector(".bw-or");
      const xorRow = root.querySelector(".bw-xor");

      if (reducedMotion) {
        gsap.set(andBits, { opacity: 1, scale: 1 });
        gsap.set([orRow, xorRow], { opacity: 1, x: 0 });
        return;
      }

      gsap.set(andBits, { opacity: 0, scale: 0 });
      gsap.set([orRow, xorRow], { opacity: 0, x: -10 });

      const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
      tl.to(andBits, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2 }, "+=0.3");
      tl.to(orRow, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "+=0.3");
      tl.to(xorRow, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "+=0.25");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Bit = ({ b, cls = "" }: { b: number; cls?: string }) => (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${cls} ${
        b ? "text-foreground" : "text-muted"
      }`}
    >
      {b}
    </span>
  );

  const opnd = (label: string, bits: number[]) => (
    <div className="flex items-center gap-2">
      <span className="w-12 text-right font-mono text-sm text-muted">{label}</span>
      <div className="flex gap-1">
        {bits.map((b, i) => (
          <Bit key={i} b={b} cls="border-border" />
        ))}
      </div>
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
          12 and 10, bit by bit
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        {opnd("12 =", A)}
        {opnd("10 =", B)}
        <div className="my-1 h-px w-56 bg-border" />

        <div className="flex items-center gap-2">
          <span className="w-12 text-right font-mono text-sm text-accent">&amp; =</span>
          <div className="flex gap-1">
            {AND.map((b, i) => (
              <span
                key={i}
                className={`bw-and flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${
                  b ? "border-brand/50 bg-brand/10 text-brand" : "border-border text-muted"
                }`}
              >
                {b}
              </span>
            ))}
          </div>
          <span className="font-mono text-sm text-brand">= 8</span>
        </div>

        <div className="bw-or flex items-center gap-2">
          <span className="w-12 text-right font-mono text-sm text-accent">| =</span>
          <div className="flex gap-1">
            {OR.map((b, i) => (
              <Bit key={i} b={b} cls={b ? "border-brand/40 text-brand" : "border-border"} />
            ))}
          </div>
          <span className="font-mono text-sm text-brand">= 14</span>
        </div>

        <div className="bw-xor flex items-center gap-2">
          <span className="w-12 text-right font-mono text-sm text-accent">^ =</span>
          <div className="flex gap-1">
            {XOR.map((b, i) => (
              <Bit key={i} b={b} cls={b ? "border-brand/40 text-brand" : "border-border"} />
            ))}
          </div>
          <span className="font-mono text-sm text-brand">= 6</span>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        <span className="font-mono text-foreground">&amp;</span> needs both 1 ·{" "}
        <span className="font-mono text-foreground">|</span> needs either 1 ·{" "}
        <span className="font-mono text-foreground">^</span> needs exactly one 1
      </p>
    </div>
  );
}
