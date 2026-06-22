"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * while True never becomes False, so the loop runs forever — the cycle spins on
 * and the counter never stops climbing. The point is visceral: without a break,
 * it never lets go. Plays in view (continuously); static under reduced motion.
 */
export default function InfiniteLoop() {
  const { ref, inView, reducedMotion } = useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const spin = root.querySelector<HTMLElement>(".il-spin");
      const count = root.querySelector<HTMLElement>(".il-count");
      if (!spin || !count) return;

      if (reducedMotion) {
        count.textContent = "∞";
        return;
      }

      let n = 0;
      count.textContent = "0";
      gsap.to(spin, {
        rotate: "+=360",
        duration: 0.85,
        repeat: -1,
        ease: "none",
        onRepeat: () => {
          n += 1;
          count.textContent = String(n);
        },
      });
    },
    { scope, dependencies: [inView, reducedMotion] },
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
          A loop that never ends
        </span>
        <span className="flex items-center gap-2 text-xs font-medium text-warn">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-warn" />
          running… forever
        </span>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7">
          <div>
            <span className="text-accent">while</span>{" "}
            <span className="text-warn">True</span>
            <span className="text-foreground">:</span>
          </div>
          <div className="pl-6">
            <span className="text-foreground">i += </span>
            <span className="text-warn">1</span>
          </div>
          <div className="pl-6 text-muted"># nothing ever stops this…</div>
        </pre>

        <div className="flex items-center justify-center gap-5">
          <span className="il-spin inline-block text-5xl text-brand">↻</span>
          <div className="text-center">
            <div className="text-xs uppercase tracking-wide text-muted">i</div>
            <div className="il-count font-mono text-3xl font-semibold text-foreground">
              0
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-xl border border-warn/30 bg-warn/5 px-4 py-3 text-sm text-muted">
        ⚠ <span className="font-mono text-foreground">while True:</span> won&apos;t
        stop on its own. You escape it with a{" "}
        <span className="font-mono text-foreground">break</span> inside the loop —
        or, if it&apos;s really stuck, by pressing{" "}
        <span className="font-mono text-foreground">Ctrl-C</span>.
      </p>
    </div>
  );
}
