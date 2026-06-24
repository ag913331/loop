"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [10, 20, 30, 40];
// expr, the cell index it lands on, and the value
const ACCESS = [
  { expr: "nums[0]", i: 0 },
  { expr: "nums[2]", i: 2 },
  { expr: "nums[-1]", i: 3 },
];

/**
 * Indexing: every element has a position. Positive indices count from the front
 * (0, 1, 2…), negative ones from the back (-1 is the last). A pointer hops to
 * each access and reads its value. Plays in view, with a replay.
 */
export default function ListIndexing() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const pointer = root.querySelector<HTMLElement>(".lix-pointer");
      const cells = gsap.utils.toArray<HTMLElement>(".lix-cell");
      const result = root.querySelector<HTMLElement>(".lix-result");
      if (!pointer || !result) return;
      const lit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      const centerOf = (el: HTMLElement) =>
        el.offsetLeft + el.offsetWidth / 2 - pointer.offsetWidth / 2;

      if (reducedMotion) {
        gsap.set(pointer, { opacity: 1, x: centerOf(cells[3]) });
        result.textContent = "nums[-1] = 40";
        return;
      }

      gsap.set(pointer, { opacity: 0, x: centerOf(cells[0]) });
      result.textContent = "";

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(pointer, { opacity: 1, duration: 0.3 }, "+=0.3");
      ACCESS.forEach((a) => {
        tl.to(pointer, { x: centerOf(cells[a.i]), duration: 0.4 }, "+=0.5");
        tl.to(cells[a.i], { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.25 }, "<");
        tl.call(() => (result.textContent = `${a.expr} = ${VALUES[a.i]}`), [], "<");
        tl.to(cells[a.i], { backgroundColor: "transparent", borderColor: "var(--border)", duration: 0.25 }, "+=0.5");
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
      <div className="mb-6 flex items-center justify-between">
        <code className="font-mono text-sm text-muted">
          nums = [10, 20, 30, 40]
        </code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="relative mx-auto w-fit">
        <div className="lix-pointer absolute -top-5 left-0 text-brand">▼</div>
        <div className="flex gap-2">
          {VALUES.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted">{i}</span>
              <span className="lix-cell flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground">
                {v}
              </span>
              <span className="text-xs text-danger/70">{i - VALUES.length}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="lix-result rounded-lg border border-brand/40 bg-brand/10 px-4 py-1.5 font-mono text-sm text-brand" />
      </div>
    </div>
  );
}
