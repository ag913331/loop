"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Positional arguments: print uses each value according to its position, so the
 * order you write them in is the order they come out. The same two names in
 * swapped positions produce swapped output. Plays in view, with a replay.
 */
export default function PositionalArgs() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".pos-row");
      const outs = gsap.utils.toArray<HTMLElement>(".pos-out");

      if (reducedMotion) {
        gsap.set([...rows, ...outs], { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(rows, { opacity: 0, x: -12 });
      gsap.set(outs, { opacity: 0, scale: 0.7 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, x: 0, duration: 0.4 }, i === 0 ? "+=0.2" : "+=0.5");
        tl.to(outs[i], { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, ">-0.1");
      });
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Row = (cls: string, a: string, b: string) => (
    <div className={`pos-row flex flex-wrap items-center gap-3 ${cls}`}>
      <pre className="font-mono text-sm text-foreground">
        <span className="text-brand">print</span>(
        <span className="text-warn">&quot;{a}&quot;</span>,{" "}
        <span className="text-warn">&quot;{b}&quot;</span>)
      </pre>
      <span className="text-muted">→</span>
      <span className="pos-out rounded-lg border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-sm text-brand">
        {a} {b}
      </span>
    </div>
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
          Order is everything
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-background p-5">
        {Row("", "Alice", "Bob")}
        {Row("", "Bob", "Alice")}
      </div>
      <p className="mt-3 text-xs text-muted">
        Same two values — swap their <em>positions</em> and the output swaps too.
      </p>
    </div>
  );
}
