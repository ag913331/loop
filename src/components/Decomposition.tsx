"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const PARTS = ["brew_coffee()", "toast_bread()", "fry_egg()"];

/**
 * Decomposition: one big, daunting job splits into a few small, named steps —
 * each its own function. The big box divides and the smaller boxes drop into
 * place beneath it. Plays in view, with a replay.
 */
export default function Decomposition() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const big = root.querySelector<HTMLElement>(".dc-big");
      const parts = gsap.utils.toArray<HTMLElement>(".dc-part");
      const connector = root.querySelector<HTMLElement>(".dc-conn");
      if (!big || parts.length !== PARTS.length) return;

      if (reducedMotion) {
        gsap.set([connector, ...parts], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([connector, ...parts], { opacity: 0, y: -16 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(big, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: "back.out(1.6)" }, "+=0.3");
      tl.to(connector, { opacity: 1, y: 0, duration: 0.3 }, "+=0.3");
      tl.to(parts, { opacity: 1, y: 0, duration: 0.4, stagger: 0.18, ease: "back.out(2)" }, "+=0.05");
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
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          One big job → small named steps
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="dc-big rounded-xl border-2 border-border bg-surface-2 px-6 py-3 font-mono text-sm text-foreground">
          make_breakfast()
        </div>

        <span className="dc-conn text-sm text-muted">↓ broken into</span>

        <div className="flex flex-wrap justify-center gap-2">
          {PARTS.map((p) => (
            <span
              key={p}
              className="dc-part rounded-lg border border-brand/50 bg-brand/10 px-4 py-2 font-mono text-sm text-brand"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Each small step is easy to write, name, test and reuse — and the big job
        becomes just a list of calls.
      </p>
    </div>
  );
}
