"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const SEQ = [0, 1, 1, 2, 3, 5, 8, 13];

/**
 * Each Fibonacci number is the sum of the two before it. The first two are
 * given; every later box lights its two predecessors, then pops in as their sum.
 * Plays in view, with a replay.
 */
export default function Fibonacci() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const boxes = gsap.utils.toArray<HTMLElement>(".fib-box");
      const status = root.querySelector<HTMLElement>(".fib-status");
      if (boxes.length !== SEQ.length) return;

      const lit = "color-mix(in srgb, var(--accent) 20%, transparent)";
      const dim = (el: HTMLElement) =>
        gsap.to(el, { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.25 });

      if (reducedMotion) {
        gsap.set(boxes, { opacity: 1, scale: 1 });
        if (status) status.textContent = "each = sum of the two before it";
        return;
      }

      boxes.forEach((b, i) => gsap.set(b, i < 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }));
      if (status) status.textContent = "start with 0 and 1";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      for (let i = 2; i < SEQ.length; i++) {
        tl.to([boxes[i - 1], boxes[i - 2]], { backgroundColor: lit, borderColor: "var(--accent)", duration: 0.3 }, "+=0.45");
        tl.call(() => status && (status.textContent = `${SEQ[i - 2]} + ${SEQ[i - 1]} = ${SEQ[i]}`), [], "<");
        tl.to(boxes[i], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.05");
        tl.add(() => {
          dim(boxes[i - 1]);
          dim(boxes[i - 2]);
        }, "+=0.15");
      }
      tl.call(() => status && (status.textContent = "0, 1, 1, 2, 3, 5, 8, 13, …"), [], "+=0.2");
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
        <code className="font-mono text-sm text-foreground">fib(n) = fib(n-1) + fib(n-2)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {SEQ.map((v, i) => (
          <span
            key={i}
            className="fib-box flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground"
          >
            {v}
          </span>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="fib-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
