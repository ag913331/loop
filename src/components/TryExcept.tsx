"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * try/except control flow. The try block runs until a line raises; control then
 * leaps to the except handler (skipping the rest of try), runs it, and execution
 * continues below as if nothing crashed. The active line lights up, the risky
 * line flashes red, and a jump arrow shows the detour. Plays in view, replay.
 */
export default function TryExcept() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const line = (id: string) => root.querySelector<HTMLElement>(`[data-ln="${id}"]`);
      const arrow = root.querySelector<HTMLElement>(".te-arrow");
      const status = root.querySelector<HTMLElement>(".te-status");
      const all = gsap.utils.toArray<HTMLElement>(".te-line");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";
      const bad = "color-mix(in srgb, var(--danger) 16%, transparent)";
      const clear = () =>
        gsap.to(all, { backgroundColor: "transparent", opacity: 1, duration: 0.2 });

      gsap.set(all, { backgroundColor: "transparent", opacity: 1 });
      gsap.set(arrow, { opacity: 0 });

      if (reducedMotion) {
        const e = line("e1");
        if (e) gsap.set(e, { backgroundColor: lit });
        if (status) status.textContent = "error → jump to except, then carry on";
        return;
      }

      const tl = gsap.timeline();
      const step = (id: string, msg: string, color = lit) => {
        tl.add(clear, "+=0.55");
        const el = line(id);
        if (el) tl.to(el, { backgroundColor: color, duration: 0.3 }, "<");
        tl.call(() => status && (status.textContent = msg), [], "<");
      };

      step("t1", "try block: read the number");
      step("t2", "1 / 0 raises ZeroDivisionError", bad);
      // jump to handler, skip rest of try
      tl.to(arrow, { opacity: 1, duration: 0.3 }, "+=0.1");
      tl.call(() => status && (status.textContent = "control leaps to except →"), [], "<");
      step("e1", "the handler runs — no crash");
      tl.to(arrow, { opacity: 0, duration: 0.3 }, "<");
      step("a1", "execution continues below, as normal");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const ln = "te-line block rounded px-1";

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
          Catch the error, keep running
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <span className="block px-1 text-accent">try:</span>
          <span data-ln="t1" className={ln}>
            <span className="pl-4 text-foreground">n = int(input())</span>
          </span>
          <span data-ln="t2" className={ln}>
            <span className="pl-4 text-foreground">print(1 / n)</span>
          </span>
          <span className="block px-1 text-accent">except ZeroDivisionError:</span>
          <span data-ln="e1" className={ln}>
            <span className="pl-4 text-foreground">print(</span>
            <span className="text-warn">&quot;can&apos;t divide by zero&quot;</span>
            <span className="text-foreground">)</span>
          </span>
          <span data-ln="a1" className={ln}>
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;done&quot;</span>
            <span className="text-foreground">)</span>
          </span>
        </pre>

        <span className="te-arrow pointer-events-none absolute left-1 top-[4.2rem] text-lg text-brand">
          ↳
        </span>
      </div>

      <div className="mt-4 text-center">
        <span className="te-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
