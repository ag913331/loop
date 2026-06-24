"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const NUMS = [1, 2, 3, 4, 5];

/**
 * A list comprehension as a transformation line. Each input number is lifted
 * through the expression `n * n` and lands as a squared value in the new list.
 * Inputs light up one by one; results pop in below. Plays in view, with replay.
 */
export default function ListComprehension() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const ins = gsap.utils.toArray<HTMLElement>(".lc-in");
      const outs = gsap.utils.toArray<HTMLElement>(".lc-out");
      if (ins.length !== NUMS.length || outs.length !== NUMS.length) return;

      const lit = "color-mix(in srgb, var(--accent) 20%, transparent)";

      if (reducedMotion) {
        gsap.set(outs, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(outs, { opacity: 0, y: -18 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      NUMS.forEach((_, i) => {
        tl.to(ins[i], { backgroundColor: lit, borderColor: "var(--accent)", duration: 0.25 }, "+=0.35");
        tl.to(outs[i], { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, "-=0.05");
        tl.to(ins[i], { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.25 }, "+=0.15");
      });
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
        <code className="font-mono text-sm text-foreground">
          [n * n <span className="text-accent">for</span> n{" "}
          <span className="text-accent">in</span> nums]
        </code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {NUMS.map((v, i) => (
            <span
              key={i}
              className="lc-in flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground"
            >
              {v}
            </span>
          ))}
        </div>

        <span className="text-sm text-muted">↓ each one squared</span>

        <div className="flex gap-2">
          {NUMS.map((v, i) => (
            <span
              key={i}
              className="lc-out flex h-12 w-12 items-center justify-center rounded-lg border border-brand/50 bg-brand/10 font-mono text-base text-brand"
            >
              {v * v}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Read it aloud: &ldquo;<span className="font-mono text-foreground">n * n</span>{" "}
        for each <span className="font-mono text-foreground">n</span> in{" "}
        <span className="font-mono text-foreground">nums</span>.&rdquo; One line
        builds the whole new list.
      </p>
    </div>
  );
}
