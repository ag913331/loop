"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

// insert 15 at index 1 of [10, 20, 30] -> [10, 15, 20, 30]
// final cells, flagged: which ones shift right, which one is new.
const CELLS = [
  { v: 10, shift: false, isNew: false },
  { v: 15, shift: false, isNew: true },
  { v: 20, shift: true, isNew: false },
  { v: 30, shift: true, isNew: false },
];
const SLOT = 56; // cell width (48) + gap (8)

/**
 * insert() opens a gap. To put 15 at index 1, every element from there on slides
 * one place right to make room, then 15 drops into the space. Plays in view.
 */
export default function ListInsert() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const shifters = gsap.utils.toArray<HTMLElement>(".lin-shift");
      const fresh = root.querySelector(".lin-new");

      if (reducedMotion) {
        gsap.set(shifters, { x: 0 });
        gsap.set(fresh, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(shifters, { x: -SLOT }); // start one slot to the left (pre-insert)
      gsap.set(fresh, { opacity: 0, scale: 0, y: -20 });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(shifters, { x: 0, duration: 0.6, stagger: 0.05 }, "+=0.6"); // slide right
      tl.to(fresh, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(2)" }, "-=0.2"); // drop in
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
          nums.insert(1, 15)
        </code>
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
              className={`flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-base ${
                c.isNew
                  ? "lin-new border-brand/60 bg-brand/15 text-brand"
                  : "border-border bg-background text-foreground"
              } ${c.shift ? "lin-shift" : ""}`}
            >
              {c.v}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        <span className="font-mono text-foreground">append(x)</span> is the easy
        cousin — it just drops a value on the end, no shifting required.
      </p>
    </div>
  );
}
