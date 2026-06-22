"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// 5 = 101, 3 = 011, 5 & 3 = 001 = 1
const A = [1, 0, 1];
const B = [0, 1, 1];
const R = A.map((a, i) => a & B[i]);

/**
 * The same idea — "and" — at two levels. Logical `and` looks at whole True/False
 * values; bitwise `&` lines two numbers up in binary and ands each column
 * separately. 5 & 3 works out bit by bit to 1. Plays in view, with a replay.
 */
export default function LogicVsBits() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const logical = root.querySelector(".lvb-logical");
      const resultBits = gsap.utils.toArray<HTMLElement>(".lvb-rbit");
      const total = root.querySelector(".lvb-total");

      if (reducedMotion) {
        gsap.set([logical, total], { opacity: 1, scale: 1 });
        gsap.set(resultBits, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set([logical, total], { opacity: 0, scale: 0.7 });
      gsap.set(resultBits, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
      tl.to(logical, { opacity: 1, scale: 1, duration: 0.5 }, "+=0.3");
      tl.to(resultBits, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.25 }, "+=0.4");
      tl.to(total, { opacity: 1, scale: 1, duration: 0.4 }, "+=0.1");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const bitRow = (bits: number[], cls = "") =>
    bits.map((b, i) => (
      <span
        key={i}
        className={`flex h-8 w-8 items-center justify-center rounded border border-border font-mono text-sm ${cls} ${
          b ? "text-foreground" : "text-muted"
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
          Same word, two levels
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* logical */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
            Logical — whole values
          </div>
          <div className="lvb-logical flex flex-col items-center gap-2 font-mono">
            <span className="text-foreground">True and True</span>
            <span className="text-muted">→</span>
            <span className="rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 text-brand">
              True
            </span>
          </div>
        </div>

        {/* bitwise */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
            Bitwise — column by column
          </div>
          <div className="flex flex-col items-center gap-1.5 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="w-10 text-right text-muted">5 =</span>
              <div className="flex gap-1">{bitRow(A)}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 text-right text-muted">3 =</span>
              <div className="flex gap-1">{bitRow(B)}</div>
            </div>
            <div className="my-0.5 h-px w-full bg-border" />
            <div className="flex items-center gap-2">
              <span className="w-10 text-right text-accent">&amp; =</span>
              <div className="flex gap-1">
                {R.map((b, i) => (
                  <span
                    key={i}
                    className={`lvb-rbit flex h-8 w-8 items-center justify-center rounded border font-mono text-sm ${
                      b
                        ? "border-brand/50 bg-brand/10 text-brand"
                        : "border-border text-muted"
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <span className="lvb-total mt-1 text-brand">= 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
