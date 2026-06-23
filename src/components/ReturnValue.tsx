"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * return hands a value back to the caller: the call expression square(5) is
 * replaced by its result, 25, which then lands in the variable. The function
 * computes, a value chip travels back up the return arrow into result. Plays in
 * view, with a replay.
 */
export default function ReturnValue() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const call = root.querySelector<HTMLElement>(".rv-call");
      const ret = root.querySelector<HTMLElement>(".rv-ret");
      const arrow = root.querySelector<HTMLElement>(".rv-arrow");
      const resultVal = root.querySelector<HTMLElement>(".rv-result-val");
      const status = root.querySelector<HTMLElement>(".rv-status");
      if (!resultVal) return;

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([ret, arrow], { opacity: 1 });
        resultVal.textContent = "25";
        gsap.set(resultVal, { opacity: 1 });
        if (status) status.textContent = "result = 25";
        return;
      }

      gsap.set([ret, arrow], { opacity: 0 });
      resultVal.textContent = "?";
      if (status) status.textContent = "calling square(5)…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (call) tl.to(call, { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.4");
      tl.call(() => status && (status.textContent = "n = 5, so return 5 * 5"), [], "+=0.4");
      tl.fromTo(ret, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.1");
      tl.call(() => status && (status.textContent = "the value 25 is handed back"), [], "+=0.4");
      tl.to(arrow, { opacity: 1, duration: 0.3 }, "+=0.05");
      tl.call(() => (resultVal.textContent = "25"));
      tl.fromTo(resultVal, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, "<");
      tl.call(() => status && (status.textContent = "result = 25"), [], "+=0.2");
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
          The call becomes its returned value
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 font-mono text-sm">
        {/* the call site */}
        <div className="flex items-center gap-2">
          <span className="text-foreground">result =</span>
          <span className="rv-call rounded-md border border-border bg-background px-2 py-1 text-foreground">
            square(5)
          </span>
        </div>

        {/* the function */}
        <div className="rounded-xl border border-border bg-background p-3 leading-6">
          <div>
            <span className="text-accent">def</span>
            <span className="text-foreground"> square(n):</span>
          </div>
          <div className="flex items-center gap-2 pl-4">
            <span className="text-accent">return</span>
            <span className="text-foreground">n * n</span>
            <span className="rv-ret rounded-md border border-brand/50 bg-brand/10 px-2 py-0.5 text-brand">
              25
            </span>
          </div>
        </div>

        <span className="rv-arrow text-lg text-brand">↑ returns 25</span>

        {/* the result variable */}
        <div className="flex items-center gap-2">
          <span className="text-muted">result</span>
          <span className="rounded-lg border border-border bg-background px-3 py-1.5">
            <span className="rv-result-val text-brand">?</span>
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="rv-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
