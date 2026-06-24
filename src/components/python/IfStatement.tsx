"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * if/else as a fork in the road. The condition (temperature > 30) is checked,
 * found True, so the indented if-block runs and the else-block is skipped —
 * "Hot!" is printed. Plays in view, with a replay.
 */
export default function IfStatement() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cond = root.querySelector(".if-cond");
      const badge = root.querySelector(".if-badge");
      const thenLine = root.querySelector(".if-then");
      const elseBlock = gsap.utils.toArray<HTMLElement>(".if-else");
      const out = root.querySelector(".if-out");
      const litCond = "color-mix(in srgb, var(--accent) 20%, transparent)";
      const litThen = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        gsap.set([badge, out], { opacity: 1, y: 0, scale: 1 });
        gsap.set(elseBlock, { opacity: 0.35 });
        return;
      }

      gsap.set(badge, { opacity: 0, scale: 0.5 });
      gsap.set(out, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // check the condition
      tl.to(cond, { backgroundColor: litCond, duration: 0.3 }, "+=0.3");
      tl.to(badge, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "+=0.2");
      // True -> run the if-block, skip the else
      tl.to(thenLine, { backgroundColor: litThen, duration: 0.3 }, "+=0.3");
      tl.to(elseBlock, { opacity: 0.3, duration: 0.4 }, "<");
      tl.to(out, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      tl.to(cond, { backgroundColor: "transparent", duration: 0.3 }, "<");
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
          temperature = 35
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7">
          <div>
            <span className="text-accent">if</span>{" "}
            <span className="if-cond -mx-1 rounded px-1 text-foreground">
              temperature &gt; 30
            </span>
            <span className="text-foreground">:</span>
            <span className="if-badge ml-2 rounded bg-brand/15 px-1.5 text-xs text-brand">
              True
            </span>
          </div>
          <div className="if-then -mx-1 rounded px-1 pl-6">
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;Hot!&quot;</span>
            <span className="text-foreground">)</span>
          </div>
          <div className="if-else">
            <span className="text-accent">else</span>
            <span className="text-foreground">:</span>
          </div>
          <div className="if-else pl-6">
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;Nice.&quot;</span>
            <span className="text-foreground">)</span>
          </div>
        </pre>

        <div className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <div className="mb-2 text-xs text-muted">output</div>
          <div className="if-out text-brand">Hot!</div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        The condition is True, so only the indented{" "}
        <span className="font-mono text-foreground">if</span> block runs — the{" "}
        <span className="font-mono text-foreground">else</span> is skipped.
      </p>
    </div>
  );
}
