"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const STEPS = [0, 1, 2, 3]; // counter values after each run

/**
 * Reassignment, and the trick of using a variable's old value to make its new
 * one. `counter = counter + 1` reads what's in the box (say 2), adds 1, and
 * writes 3 back — so the box climbs 0 → 1 → 2 → 3. Plays in view, with a replay.
 */
export default function Reassignment() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const boxVal = root.querySelector<HTMLElement>(".re-box-val");
      const calc = root.querySelector<HTMLElement>(".re-calc");
      const code = root.querySelector(".re-code");
      if (!boxVal || !calc) return;

      if (reducedMotion) {
        boxVal.textContent = "3";
        calc.textContent = "2 + 1 = 3";
        gsap.set(calc, { opacity: 1 });
        return;
      }

      boxVal.textContent = "0";
      gsap.set(calc, { opacity: 0 });

      const lit = "color-mix(in srgb, var(--accent) 22%, transparent)";
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      for (let i = 1; i < STEPS.length; i++) {
        const old = STEPS[i - 1];
        const next = STEPS[i];
        // highlight the line running
        tl.to(code, { backgroundColor: lit, duration: 0.2 }, "+=0.5");
        // show it reading the old value and computing
        tl.set(calc, { textContent: `${old} + 1 = ${next}` });
        tl.to(calc, { opacity: 1, duration: 0.3 });
        // write the new value into the box
        tl.call(() => {
          boxVal.textContent = String(next);
        }, [], "+=0.3");
        tl.fromTo(boxVal, { scale: 1.4, color: "var(--brand)" }, { scale: 1, color: "var(--brand)", duration: 0.4, ease: "back.out(2)" });
        tl.to(code, { backgroundColor: "transparent", duration: 0.2 }, "<");
        tl.to(calc, { opacity: 0, duration: 0.3 }, "+=0.4");
      }
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
          Old value in, new value out
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-5 sm:grid-cols-2">
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7">
          <div>
            <span className="text-muted">counter</span>
            <span className="text-foreground"> = </span>
            <span className="text-warn">0</span>
          </div>
          <div className="re-code -mx-2 rounded px-2">
            <span className="text-muted">counter</span>
            <span className="text-foreground"> = counter + </span>
            <span className="text-warn">1</span>
          </div>
        </pre>

        <div className="flex flex-col items-center gap-3">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
            counter
          </span>
          <div className="flex h-20 w-24 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
            <span className="re-box-val font-mono text-3xl text-brand">0</span>
          </div>
          <span className="re-calc font-mono text-xs text-accent">0 + 1 = 1</span>
        </div>
      </div>
    </div>
  );
}
