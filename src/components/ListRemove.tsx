"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// del nums[1] from [10, 15, 20, 30] -> [10, 20, 30]
const CELLS = [
  { v: 10, shift: false, removed: false },
  { v: 15, shift: false, removed: true },
  { v: 20, shift: true, removed: false },
  { v: 30, shift: true, removed: false },
];
const SLOT = 56;

/**
 * Removing leaves no hole. del nums[1] lifts the 15 out, and everything after it
 * slides one place left to close the gap — the exact reverse of an insert.
 * Plays in view, with a replay.
 */
export default function ListRemove() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const removed = root.querySelector(".lrm-removed");
      const shifters = gsap.utils.toArray<HTMLElement>(".lrm-shift");

      if (reducedMotion) {
        gsap.set(removed, { opacity: 0, scale: 0 });
        gsap.set(shifters, { x: -SLOT });
        return;
      }

      gsap.set(removed, { opacity: 1, scale: 1 });
      gsap.set(shifters, { x: 0 });

      const tl = gsap.timeline();
      // highlight the doomed element
      tl.to(removed, {
        borderColor: "var(--danger)",
        backgroundColor: "color-mix(in srgb, var(--danger) 18%, transparent)",
        duration: 0.3,
      }, "+=0.5");
      // lift it out
      tl.to(removed, { opacity: 0, scale: 0.5, y: -24, duration: 0.4, ease: "power2.in" }, "+=0.2");
      // close the gap
      tl.to(shifters, { x: -SLOT, duration: 0.55, stagger: 0.05, ease: "power2.inOut" }, "-=0.15");
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
        <code className="font-mono text-sm text-foreground">del nums[1]</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex min-h-[5rem] justify-center">
        <div className="flex gap-2">
          {CELLS.map((c, i) => (
            <span
              key={i}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground ${
                c.removed ? "lrm-removed" : ""
              } ${c.shift ? "lrm-shift" : ""}`}
            >
              {c.v}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        <span className="font-mono text-foreground">pop()</span> does the same to
        the last element — but hands the value back to you on the way out.
      </p>
    </div>
  );
}
