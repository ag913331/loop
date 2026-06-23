"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The global keyword. Two panels: WITHOUT it, assigning inside a function makes a
 * brand-new local and the global is untouched; WITH it, the assignment reaches
 * out and changes the real global. The global box stays 1 in the first, flips to
 * 5 in the second. Plays in view, with a replay.
 */
export default function GlobalKeyword() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const localBox = root.querySelector<HTMLElement>(".gk-local");
      const aGlobalVal = root.querySelector<HTMLElement>(".gk-a-val");
      const bArrow = root.querySelector<HTMLElement>(".gk-b-arrow");
      const bGlobalVal = root.querySelector<HTMLElement>(".gk-b-val");
      const bGlobalBox = root.querySelector<HTMLElement>(".gk-b-box");
      const status = root.querySelector<HTMLElement>(".gk-status");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([localBox, bArrow], { opacity: 1 });
        if (aGlobalVal) aGlobalVal.textContent = "1";
        if (bGlobalVal) bGlobalVal.textContent = "5";
        if (status) status.textContent = "without global: local copy · with global: real one changes";
        return;
      }

      gsap.set([localBox, bArrow], { opacity: 0 });
      if (aGlobalVal) aGlobalVal.textContent = "1";
      if (bGlobalVal) bGlobalVal.textContent = "1";
      if (status) status.textContent = "two functions, both write x = 5";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // Panel A: a new local appears, global stays 1
      tl.call(() => status && (status.textContent = "without global → x = 5 makes a LOCAL"), [], "+=0.6");
      tl.fromTo(localBox, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.1");
      tl.call(() => status && (status.textContent = "global x is untouched — still 1"), [], "+=0.5");

      // Panel B: arrow reaches the global, value flips to 5
      tl.call(() => status && (status.textContent = "with global x → the assignment reaches OUT"), [], "+=0.7");
      tl.to(bArrow, { opacity: 1, duration: 0.3 }, "+=0.1");
      tl.to(bGlobalBox, { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "<");
      tl.call(() => bGlobalVal && (bGlobalVal.textContent = "5"));
      tl.fromTo(bGlobalVal, { scale: 1.4, color: "var(--brand)" }, { scale: 1, duration: 0.4 }, "<");
      tl.call(() => status && (status.textContent = "now the real global x is 5"), [], "+=0.3");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const panel = "rounded-xl border border-border bg-background/40 p-4";
  const globalChip =
    "inline-block rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-sm text-foreground";

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
          global: reach the real one
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Panel A: without global */}
        <div className={panel}>
          <div className="mb-2 text-xs font-medium text-muted">without global</div>
          <span className={globalChip}>
            x = <span className="gk-a-val text-foreground">1</span>
          </span>
          <div className="mt-3 rounded-xl border-2 border-dashed border-border bg-surface-2/60 p-3">
            <div className="mb-1 font-mono text-xs text-muted">def f():</div>
            <div className="pl-3 font-mono text-xs text-muted">x = 5</div>
            <span className="gk-local mt-2 inline-block rounded-lg border border-brand/50 bg-brand/10 px-3 py-1 font-mono text-xs text-brand">
              local x = 5
            </span>
          </div>
        </div>

        {/* Panel B: with global */}
        <div className={panel}>
          <div className="mb-2 text-xs font-medium text-muted">with global</div>
          <span className={`gk-b-box ${globalChip}`}>
            x = <span className="gk-b-val text-foreground">1</span>
          </span>
          <div className="mt-3 rounded-xl border-2 border-dashed border-border bg-surface-2/60 p-3">
            <div className="mb-1 font-mono text-xs text-muted">def g():</div>
            <div className="pl-3 font-mono text-xs text-accent">global x</div>
            <div className="pl-3 font-mono text-xs text-muted">x = 5</div>
            <div className="gk-b-arrow mt-2 font-mono text-xs text-brand">↑ changes the global</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className="gk-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
