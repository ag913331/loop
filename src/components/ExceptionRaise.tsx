"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Why we need exceptions: a tiny, "obviously fine" program meets bad input and
 * crashes. The first line runs, the risky line flashes red, and a traceback
 * slides up with the exception name on the last line. Plays in view, with a replay.
 */
export default function ExceptionRaise() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const l1 = root.querySelector<HTMLElement>('[data-ln="1"]');
      const l2 = root.querySelector<HTMLElement>('[data-ln="2"]');
      const trace = root.querySelector<HTMLElement>(".er-trace");
      const status = root.querySelector<HTMLElement>(".er-status");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";
      const bad = "color-mix(in srgb, var(--danger) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(trace, { opacity: 1, y: 0 });
        if (l2) gsap.set(l2, { backgroundColor: bad });
        if (status) status.textContent = "ValueError — the program stops";
        return;
      }

      gsap.set(trace, { opacity: 0, y: 12 });
      gsap.set([l1, l2], { backgroundColor: "transparent" });
      if (status) status.textContent = 'the user types "ten" instead of 10…';

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(l1, { backgroundColor: lit, duration: 0.3 }, "+=0.4");
      tl.call(() => status && (status.textContent = "int(\"ten\") can't work…"), [], "+=0.4");
      tl.to(l1, { backgroundColor: bad, duration: 0.3 }, "+=0.1");
      tl.fromTo(l1, { x: -4 }, { x: 0, duration: 0.3, ease: "elastic.out(1.5, 0.4)" }, "<");
      tl.call(() => status && (status.textContent = "exception raised → execution halts"), [], "+=0.3");
      tl.to(trace, { opacity: 1, y: 0, duration: 0.45 }, "+=0.1");
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
          One bad input, and it all stops
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <pre className="overflow-x-auto rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
        <span data-ln="1" className="block rounded px-1">
          <span className="text-foreground">value = </span>
          <span className="text-brand">int</span>
          <span className="text-foreground">(</span>
          <span className="text-brand">input</span>
          <span className="text-foreground">(</span>
          <span className="text-warn">&quot;Enter a number: &quot;</span>
          <span className="text-foreground">))</span>
        </span>
        <span data-ln="2" className="block rounded px-1">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span className="text-warn">&quot;Reciprocal:&quot;</span>
          <span className="text-foreground">, 1 / value)</span>
        </span>
      </pre>

      <div className="er-trace mt-3 rounded-xl border border-danger/40 bg-danger/10 p-4 font-mono text-xs leading-6 text-danger">
        <div className="text-muted">Traceback (most recent call last):</div>
        <div className="text-muted">&nbsp;&nbsp;File &quot;main.py&quot;, line 1, in &lt;module&gt;</div>
        <div className="text-muted">&nbsp;&nbsp;&nbsp;&nbsp;value = int(input(&quot;Enter a number: &quot;))</div>
        <div className="font-semibold">ValueError: invalid literal for int() with base 10: &apos;ten&apos;</div>
      </div>

      <div className="mt-4 text-center">
        <span className="er-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
