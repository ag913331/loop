"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [10, 20, 30, 40];
const TARGET = 1;
const NEW_VALUE = 99;

/**
 * Lists are mutable: assign to a position and only that slot changes, in place.
 * nums[1] = 99 spotlights the second cell, swaps 20 for 99, and leaves the rest
 * untouched. Plays in view, with a replay.
 */
export default function ListMutate() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cell = root.querySelector<HTMLElement>(".lm-target");
      const val = root.querySelector<HTMLElement>(".lm-val");
      if (!cell || !val) return;

      if (reducedMotion) {
        val.textContent = String(NEW_VALUE);
        gsap.set(cell, { borderColor: "var(--brand)" });
        return;
      }

      val.textContent = String(VALUES[TARGET]);

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(cell, {
        backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)",
        borderColor: "var(--brand)",
        duration: 0.3,
      }, "+=0.4");
      tl.to(val, { opacity: 0, y: -14, duration: 0.25 }, "+=0.2");
      tl.call(() => (val.textContent = String(NEW_VALUE)));
      tl.fromTo(val, { opacity: 0, y: 14, scale: 1.4 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" });
      tl.to(cell, { backgroundColor: "transparent", duration: 0.4 }, "+=0.4");
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
        <code className="font-mono text-sm text-foreground">nums[1] = 99</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {VALUES.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted">{i}</span>
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground ${
                i === TARGET ? "lm-target" : ""
              }`}
            >
              {i === TARGET ? <span className="lm-val inline-block">{v}</span> : v}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        Only slot <span className="font-mono text-foreground">[1]</span> changes —
        the list stays the same length, the same object.
      </p>
    </div>
  );
}
