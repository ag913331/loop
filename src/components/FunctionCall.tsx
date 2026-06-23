"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * What "calling" a function really does: control runs down the main program,
 * jumps into the function body at the call, runs it, then returns to exactly
 * where it left off. The active line lights up as execution moves — including
 * the jump across to the function and back. Plays in view, with a replay.
 */
export default function FunctionCall() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const line = (id: string) => root.querySelector<HTMLElement>(`[data-ln="${id}"]`);
      const status = root.querySelector<HTMLElement>(".fc-status");
      const arrIn = root.querySelector<HTMLElement>(".fc-arr-in");
      const arrBack = root.querySelector<HTMLElement>(".fc-arr-back");
      const all = gsap.utils.toArray<HTMLElement>(".fc-line");
      if (!status) return;

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";
      const clear = (els: HTMLElement[]) =>
        gsap.to(els, { backgroundColor: "transparent", borderLeftColor: "transparent", duration: 0.2 });

      gsap.set(all, { backgroundColor: "transparent", borderLeftColor: "transparent" });
      gsap.set([arrIn, arrBack], { opacity: 0.2 });

      if (reducedMotion) {
        const f = line("f1");
        if (f) gsap.set(f, { backgroundColor: lit, borderLeftColor: "var(--brand)" });
        status.textContent = "a call jumps into the function, then returns";
        return;
      }

      const tl = gsap.timeline();
      const step = (id: string, msg: string, arrow?: HTMLElement | null) => {
        tl.add(() => clear(all), "+=0.55");
        const el = line(id);
        if (el) tl.to(el, { backgroundColor: lit, borderLeftColor: "var(--brand)", duration: 0.3 }, "<");
        tl.call(() => (status.textContent = msg), [], "<");
        if (arrow) {
          tl.fromTo(arrow, { opacity: 0.2 }, { opacity: 1, duration: 0.25 }, "<");
          tl.to(arrow, { opacity: 0.2, duration: 0.3 }, "+=0.3");
        }
      };

      step("m0", "main program runs, top to bottom");
      step("m1", "greet()  →  jump into the function", arrIn);
      step("f1", "run the function body");
      step("m2", "return  →  back exactly where we left off", arrBack);
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const lineCls =
    "fc-line border-l-2 border-transparent pl-2 py-0.5 rounded-r";

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
          Calling jumps in — and comes back
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        {/* main program */}
        <div className="rounded-xl border border-border bg-background p-3 font-mono text-sm leading-6">
          <div className="mb-1 text-xs text-muted">main program</div>
          <div className={lineCls} data-ln="m0">
            <span className="text-brand">print</span>(<span className="text-warn">&quot;Start&quot;</span>)
          </div>
          <div className={lineCls} data-ln="m1">
            greet()
          </div>
          <div className={lineCls} data-ln="m2">
            <span className="text-brand">print</span>(<span className="text-warn">&quot;End&quot;</span>)
          </div>
        </div>

        {/* jump gutter */}
        <div className="flex flex-row justify-center gap-3 py-1 text-lg sm:flex-col">
          <span className="fc-arr-in text-brand" title="call">↳</span>
          <span className="fc-arr-back text-accent" title="return">↰</span>
        </div>

        {/* the function */}
        <div className="rounded-xl border border-border bg-background p-3 font-mono text-sm leading-6">
          <div className="mb-1 text-xs text-muted">def greet():</div>
          <div className={lineCls} data-ln="f1">
            <span className="pl-2" />
            <span className="text-brand">print</span>(<span className="text-warn">&quot;Hello!&quot;</span>)
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="fc-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
