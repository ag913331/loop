"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const ITEMS = ["apple", "banana", "cherry"];

/**
 * A for loop steps through every item in a sequence, one at a time. The loop
 * variable `fruit` takes each value in turn; each is highlighted and printed.
 * Plays in view, with a replay.
 */
export default function ForEach() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const items = gsap.utils.toArray<HTMLElement>(".fe-item");
      const varVal = root.querySelector<HTMLElement>(".fe-var");
      const outs = gsap.utils.toArray<HTMLElement>(".fe-out");
      if (!varVal) return;
      const lit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        varVal.textContent = ITEMS[ITEMS.length - 1];
        gsap.set(outs, { opacity: 1 });
        return;
      }

      varVal.textContent = "—";
      gsap.set(outs, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      ITEMS.forEach((item, i) => {
        tl.to(items[i], { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.4");
        tl.call(() => (varVal.textContent = item), [], "<");
        tl.fromTo(varVal, { scale: 1.3 }, { scale: 1, duration: 0.3 }, "<");
        tl.to(outs[i], { opacity: 1, duration: 0.3 }, "+=0.1");
        tl.to(items[i], { backgroundColor: "transparent", borderColor: "var(--border)", duration: 0.3 }, "+=0.3");
      });
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
          One item at a time
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <pre className="mb-5 overflow-x-auto rounded-xl bg-background p-4 font-mono text-sm leading-7">
        <span className="text-accent">for</span>
        <span className="text-foreground"> fruit </span>
        <span className="text-accent">in</span>
        <span className="text-foreground"> [</span>
        <span className="text-warn">&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;</span>
        <span className="text-foreground">]:</span>
        {"\n"}
        <span className="pl-6" />
        <span className="text-brand">print</span>
        <span className="text-foreground">(fruit)</span>
      </pre>

      <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-2">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="fe-item rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground"
            >
              &quot;{item}&quot;
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wide text-muted">fruit</div>
            <div className="fe-var font-mono text-base text-brand">—</div>
          </div>
          <div className="rounded-xl border border-border bg-background p-3 font-mono text-sm leading-7">
            <div className="mb-1 text-xs text-muted">output</div>
            {ITEMS.map((item) => (
              <div key={item} className="fe-out text-brand">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
