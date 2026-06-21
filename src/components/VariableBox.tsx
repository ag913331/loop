"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// The same box, holding different kinds of value in turn.
const STATES = [
  { value: "25", type: "int" },
  { value: '"Ada"', type: "str" },
  { value: "True", type: "bool" },
];

/**
 * A variable as a labelled box: it has a name on the outside and a value
 * inside. The same box swaps between an int, a string and a boolean — Python
 * doesn't mind what shape the data is. Plays in view, with a replay.
 */
export default function VariableBox() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const value = root.querySelector<HTMLElement>(".vb-value");
      const type = root.querySelector<HTMLElement>(".vb-type");
      if (!value || !type) return;

      const set = (i: number) => {
        value.textContent = STATES[i].value;
        type.textContent = STATES[i].type;
      };

      if (reducedMotion) {
        set(0);
        gsap.set(value, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(value, { opacity: 0, y: -22 });
      set(0);

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // value drops into the box
      tl.to(value, { opacity: 1, y: 0, duration: 0.5, ease: "bounce.out" }, "+=0.2");
      // then it swaps to other types
      STATES.slice(1).forEach((_, i) => {
        tl.to(value, { opacity: 0, y: -10, duration: 0.25 }, "+=0.7");
        tl.call(() => set(i + 1));
        tl.fromTo(
          value,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" },
        );
        tl.fromTo(type, { scale: 1.3 }, { scale: 1, duration: 0.3 }, "<");
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
          One box, any kind of data
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
          data
        </span>
        <div className="flex h-24 w-40 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
          <span className="vb-value font-mono text-2xl text-warn">25</span>
        </div>
        <span className="font-mono text-xs text-muted">
          type: <span className="vb-type text-accent">int</span>
        </span>
      </div>
    </div>
  );
}
