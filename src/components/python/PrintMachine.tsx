"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * print() as a little machine: an argument goes in, and two things come out —
 * its *effect* (text on the screen) and its *returned value* (the special value
 * None). Drawing the difference between doing something and giving something
 * back. Plays in view, with a replay.
 */
export default function PrintMachine() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const arg = root.querySelector(".pm-arg");
      const box = root.querySelector(".pm-box");
      const effect = root.querySelector(".pm-effect");
      const ret = root.querySelector(".pm-return");

      if (reducedMotion) {
        gsap.set([arg, effect, ret], { opacity: 1, x: 0 });
        return;
      }

      gsap.set(arg, { opacity: 0, x: -20 });
      gsap.set([effect, ret], { opacity: 0, x: -12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(arg, { opacity: 1, x: 0, duration: 0.4 }, "+=0.2");
      tl.to(box, { keyframes: { scale: [1, 1.06, 1] }, duration: 0.45 }, "+=0.2");
      tl.to(effect, { opacity: 1, x: 0, duration: 0.4 }, "+=0.05");
      tl.to(ret, { opacity: 1, x: 0, duration: 0.4 }, "+=0.2");
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
          What goes in, what comes out
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {/* argument in */}
        <div className="pm-arg rounded-lg border border-warn/40 bg-warn/10 px-3 py-2 font-mono text-sm text-warn">
          &quot;Hello&quot;
        </div>
        <span className="text-muted">→</span>

        {/* the function */}
        <div
          className="pm-box rounded-xl border border-border bg-background px-5 py-4 font-mono text-base text-brand"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          print()
        </div>
        <span className="text-muted">→</span>

        {/* the two outputs */}
        <div className="flex flex-col gap-2">
          <div className="pm-effect rounded-lg border border-brand/40 bg-brand/10 px-3 py-2">
            <div className="font-mono text-sm text-brand">Hello</div>
            <div className="text-[11px] text-muted">effect — shown on screen</div>
          </div>
          <div className="pm-return rounded-lg border border-border bg-background px-3 py-2">
            <div className="font-mono text-sm text-accent">None</div>
            <div className="text-[11px] text-muted">
              returned value — nothing useful
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
