"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * What an argument is: the value you place inside a function's parentheses. The
 * argument is spotlit, labelled, and then "flows" into print to become output.
 * Plays in view, with a replay.
 */
export default function PrintArgument() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const arg = root.querySelector(".pa-arg");
      const label = root.querySelector(".pa-label");
      const arrow = root.querySelector(".pa-arrow");
      const out = root.querySelector(".pa-out");

      if (reducedMotion) {
        gsap.set([label, arrow, out], { opacity: 1, y: 0 });
        gsap.set(arg, { backgroundColor: "color-mix(in srgb, var(--warn) 22%, transparent)" });
        return;
      }

      gsap.set([label, arrow, out], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(arg, {
        backgroundColor: "color-mix(in srgb, var(--warn) 22%, transparent)",
        duration: 0.3,
      });
      tl.to(arg, { keyframes: { scale: [1, 1.15, 1] }, duration: 0.4 });
      tl.to(label, { opacity: 1, y: 0, duration: 0.35 }, "<");
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.3 }, "+=0.25");
      tl.to(out, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
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
          What goes in the parentheses
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-1">
        <pre className="rounded-xl border border-border bg-background px-5 py-4 font-mono text-base sm:text-lg">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span
            className="pa-arg inline-block rounded px-1"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <span className="text-warn">&quot;Hello&quot;</span>
          </span>
          <span className="text-foreground">)</span>
        </pre>

        <span className="pa-label text-xs text-warn">
          ↑ the argument — the data you give it
        </span>

        <span className="pa-arrow mt-2 text-sm text-muted">runs ↓</span>

        <div className="pa-out mt-1 rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 font-mono text-base text-brand">
          Hello
        </div>
      </div>
    </div>
  );
}
