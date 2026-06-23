"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const CALLS = [
  { in: "Ada", out: "Hi, Ada!" },
  { in: "Alan", out: "Hi, Alan!" },
  { in: "Grace", out: "Hi, Grace!" },
];

/**
 * A function as a reusable machine: write it once, feed it different inputs, get
 * matching outputs each time. Each call highlights its argument, pulses the
 * machine, and reveals the result. Plays in view, with a replay.
 */
export default function FunctionMachine() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const args = gsap.utils.toArray<HTMLElement>(".fm-arg");
      const outs = gsap.utils.toArray<HTMLElement>(".fm-out");
      const machine = root.querySelector<HTMLElement>(".fm-machine");
      if (!machine || args.length !== CALLS.length) return;

      const lit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        gsap.set(outs, { opacity: 1, x: 0 });
        return;
      }

      gsap.set(outs, { opacity: 0, x: -12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      CALLS.forEach((_, i) => {
        tl.to(args[i], { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.4");
        tl.to(machine, { scale: 1.05, borderColor: "var(--brand)", duration: 0.2 }, "+=0.05");
        tl.to(machine, { scale: 1, borderColor: "var(--border)", duration: 0.25 });
        tl.to(outs[i], { opacity: 1, x: 0, duration: 0.35, ease: "back.out(2)" }, "-=0.1");
        tl.to(args[i], { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.3 }, "+=0.25");
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
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          One machine, called again and again
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[auto_auto_1fr]">
        {/* the calls (arguments) */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted">calls</span>
          {CALLS.map((c, i) => (
            <span
              key={i}
              className="fm-arg rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-sm text-foreground"
            >
              greet(&quot;{c.in}&quot;)
            </span>
          ))}
        </div>

        {/* the machine */}
        <div className="fm-machine flex flex-col items-center justify-center rounded-xl border-2 border-border bg-surface-2 px-5 py-4">
          <span className="text-2xl">⚙️</span>
          <span className="mt-1 font-mono text-xs text-foreground">greet()</span>
        </div>

        {/* the outputs */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted">output</span>
          {CALLS.map((c, i) => (
            <span
              key={i}
              className="fm-out rounded-lg border border-brand/50 bg-brand/10 px-3 py-2 text-center font-mono text-sm text-brand"
            >
              {c.out}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
