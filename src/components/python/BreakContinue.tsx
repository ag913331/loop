"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const NUMS = [1, 2, 3, 4, 5];

/**
 * Two ways to steer a loop, shown side by side over 1..5 with a stop at 3.
 * break abandons the whole loop (4 and 5 never run); continue only skips the
 * current round (3 is skipped, 4 and 5 carry on). Plays in view, with a replay.
 */
export default function BreakContinue() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const brk = gsap.utils.toArray<HTMLElement>(".bc-break .bc-cell");
      const cont = gsap.utils.toArray<HTMLElement>(".bc-cont .bc-cell");
      const done = "color-mix(in srgb, var(--brand) 20%, transparent)";
      const stop = "color-mix(in srgb, var(--danger) 24%, transparent)";

      const reset = (cells: HTMLElement[]) =>
        gsap.set(cells, { opacity: 0.3, backgroundColor: "transparent", borderColor: "var(--border)" });

      const light = (tl: gsap.core.Timeline, el: HTMLElement, color: string, border: string) => {
        tl.to(el, { opacity: 1, backgroundColor: color, borderColor: border, duration: 0.3 }, "+=0.35");
        tl.fromTo(el, { scale: 1.2 }, { scale: 1, duration: 0.25 }, "<");
      };

      if (reducedMotion) {
        gsap.set([brk[0], brk[1]], { opacity: 1, backgroundColor: done, borderColor: "var(--brand)" });
        gsap.set(brk[2], { opacity: 1, backgroundColor: stop, borderColor: "var(--danger)" });
        gsap.set([brk[3], brk[4]], { opacity: 0.3 });
        gsap.set([cont[0], cont[1], cont[3], cont[4]], { opacity: 1, backgroundColor: done, borderColor: "var(--brand)" });
        gsap.set(cont[2], { opacity: 0.3 });
        return;
      }

      reset(brk);
      reset(cont);

      const tl = gsap.timeline();
      // break: 1, 2 printed, 3 breaks, 4 & 5 never reached
      light(tl, brk[0], done, "var(--brand)");
      light(tl, brk[1], done, "var(--brand)");
      light(tl, brk[2], stop, "var(--danger)");
      // continue: 1, 2 printed, 3 skipped, 4, 5 printed
      light(tl, cont[0], done, "var(--brand)");
      light(tl, cont[1], done, "var(--brand)");
      tl.to(cont[2], { opacity: 0.25, duration: 0.3 }, "+=0.35"); // skipped
      light(tl, cont[3], done, "var(--brand)");
      light(tl, cont[4], done, "var(--brand)");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Row = (cls: string) =>
    NUMS.map((n) => (
      <span
        key={n}
        className={`bc-cell ${cls === "x" ? "" : ""} flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-sm text-foreground`}
      >
        {n}
      </span>
    ));

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
          Stop at 3 — two different ways
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-5">
        <div className="bc-break">
          <div className="mb-2 font-mono text-xs text-danger">
            if n == 3: break
          </div>
          <div className="flex flex-wrap gap-2">{Row("x")}</div>
          <div className="mt-1 text-xs text-muted">
            leaves the loop entirely — 4 and 5 never run.
          </div>
        </div>

        <div className="bc-cont">
          <div className="mb-2 font-mono text-xs text-accent">
            if n == 3: continue
          </div>
          <div className="flex flex-wrap gap-2">{Row("x")}</div>
          <div className="mt-1 text-xs text-muted">
            skips just this round — 3 is jumped, then it carries on.
          </div>
        </div>
      </div>
    </div>
  );
}
