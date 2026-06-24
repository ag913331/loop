"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * + and * mean something different for text. + glues two strings together
 * (concatenation) and * repeats one (replication). Each result builds in. Plays
 * in view, with a replay.
 */
export default function StringOps() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const results = gsap.utils.toArray<HTMLElement>(".so-result");

      if (reducedMotion) {
        gsap.set(results, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(results, { opacity: 0, scale: 0.6 });
      const tl = gsap.timeline({ defaults: { ease: "back.out(2)" } });
      tl.to(results[0], { opacity: 1, scale: 1, duration: 0.45 }, "+=0.4");
      tl.to(results[1], { opacity: 1, scale: 1, duration: 0.45 }, "+=0.5");
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
          The same symbols, for text
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono">
          <span className="text-warn">&quot;ab&quot;</span>
          <span className="text-foreground">+</span>
          <span className="text-warn">&quot;cd&quot;</span>
          <span className="text-muted">→</span>
          <span className="so-result rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 text-brand">
            &quot;abcd&quot;
          </span>
          <span className="text-xs text-muted">join</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 font-mono">
          <span className="text-warn">&quot;ha&quot;</span>
          <span className="text-foreground">*</span>
          <span className="text-warn">3</span>
          <span className="text-muted">→</span>
          <span className="so-result rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 text-brand">
            &quot;hahaha&quot;
          </span>
          <span className="text-xs text-muted">repeat</span>
        </div>
      </div>
    </div>
  );
}
