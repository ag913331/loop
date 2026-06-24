"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Whatever the user types, input() hands it back as text. They type the digits
 * 123, but what you get is the string "123" — quotes and all, type str. The
 * quotes appear to drive the point home. Plays in view, with a replay.
 */
export default function InputReturnsString() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const arrow = root.querySelector(".rs-arrow");
      const result = root.querySelector(".rs-result");
      const quotes = gsap.utils.toArray<HTMLElement>(".rs-quote");
      const type = root.querySelector(".rs-type");

      if (reducedMotion) {
        gsap.set([arrow, result, type], { opacity: 1, y: 0 });
        gsap.set(quotes, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set([arrow, type], { opacity: 0, y: 8 });
      gsap.set(result, { opacity: 0, y: 8 });
      gsap.set(quotes, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.35 }, "+=0.4");
      tl.to(result, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      tl.to(quotes, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(3)" }, "+=0.2");
      tl.to(type, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
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
          Digits in, text out
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-border bg-background px-5 py-3 font-mono text-sm text-muted">
          you type:{" "}
          <span className="text-2xl text-foreground">123</span>
        </div>

        <span className="rs-arrow text-sm text-muted">input() gives you ↓</span>

        <div className="rs-result rounded-xl border border-warn/40 bg-warn/10 px-5 py-3 font-mono text-2xl text-warn">
          <span className="rs-quote">&quot;</span>123<span className="rs-quote">&quot;</span>
        </div>

        <span className="rs-type font-mono text-xs text-muted">
          type: <span className="text-accent">str</span> — not a number
        </span>
      </div>
    </div>
  );
}
