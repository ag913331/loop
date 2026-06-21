"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Type casting: pass the string "5" through int() and it comes out as the number
 * 5 — the quotes fall away. Now the maths works: int("5") + 2 is 7. Plays in
 * view, with a replay.
 */
export default function TypeCast() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const strVal = root.querySelector<HTMLElement>(".tc-str");
      const machine = root.querySelector(".tc-machine");
      const intVal = root.querySelector(".tc-int");
      const result = root.querySelector(".tc-result");

      if (reducedMotion) {
        gsap.set([machine, intVal, result], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set([machine, intVal], { opacity: 0 });
      gsap.set(result, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(machine, { opacity: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.3");
      // string slides into the machine
      tl.to(strVal, { x: 70, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2");
      // integer pops out
      tl.to(intVal, { opacity: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.05");
      tl.fromTo(intVal, { scale: 1.4 }, { scale: 1, duration: 0.35 }, "<");
      // the maths now works
      tl.to(result, { opacity: 1, y: 0, duration: 0.4 }, "+=0.3");
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
          int() turns text into a number
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <span className="tc-str font-mono text-xl text-warn">&quot;5&quot;</span>
        <span className="text-muted">→</span>
        <span className="tc-machine rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 font-mono text-base text-accent">
          int( )
        </span>
        <span className="text-muted">→</span>
        <span className="tc-int font-mono text-xl text-foreground">5</span>
      </div>

      <div className="tc-result mt-6 text-center font-mono text-sm">
        <span className="text-foreground">int(&quot;5&quot;) + 2</span>
        <span className="mx-2 text-muted">=</span>
        <span className="rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 text-brand">
          7
        </span>
        <span className="ml-2 text-muted">— it works now</span>
      </div>
    </div>
  );
}
