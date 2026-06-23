"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Effect vs result, sharpened: a function with no return still DOES something
 * (its effect — text on screen) but hands back the special value None (its
 * result). The printed line appears, then the captured variable fills with a
 * ghostly None. Plays in view, with a replay.
 */
export default function NoneValue() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const effect = root.querySelector<HTMLElement>(".nv-effect");
      const result = root.querySelector<HTMLElement>(".nv-result");
      const status = root.querySelector<HTMLElement>(".nv-status");

      if (reducedMotion) {
        gsap.set([effect, result], { opacity: 1, y: 0 });
        if (status) status.textContent = "x = None";
        return;
      }

      gsap.set([effect, result], { opacity: 0, y: 8 });
      if (status) status.textContent = "calling log(\"hi\")…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.call(() => status && (status.textContent = "it prints — that's the EFFECT"), [], "+=0.5");
      tl.to(effect, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      tl.call(() => status && (status.textContent = "no return → the RESULT is None"), [], "+=0.6");
      tl.to(result, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, "+=0.1");
      tl.call(() => status && (status.textContent = "x = None"), [], "+=0.3");
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
        <code className="font-mono text-sm text-foreground">x = log(&quot;hi&quot;)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 font-mono text-sm">
        <div className="rounded-xl border border-border bg-background p-3 leading-6">
          <div>
            <span className="text-accent">def</span>
            <span className="text-foreground"> log(msg):</span>
          </div>
          <div className="pl-4">
            <span className="text-brand">print</span>
            <span className="text-foreground">(msg)</span>
            <span className="text-muted">   # no return statement</span>
          </div>
        </div>

        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <div className="text-center">
            <div className="mb-1 text-xs uppercase tracking-wide text-muted">effect (on screen)</div>
            <div className="nv-effect rounded-lg border border-border bg-background px-3 py-2 text-foreground">
              hi
            </div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-xs uppercase tracking-wide text-muted">result (handed back)</div>
            <div className="nv-result rounded-lg border border-dashed border-border bg-background px-3 py-2 text-muted">
              None
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="nv-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
