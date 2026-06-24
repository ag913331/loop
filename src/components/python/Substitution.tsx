"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Using a variable just means Python swaps the name for its value. With
 * `score = 100`, the expression `print(score * 2)` becomes `print(100 * 2)`,
 * which is `200`. The name visibly turns into its value. Plays in view.
 */
export default function Substitution() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const name = root.querySelector<HTMLElement>(".su-name");
      const arrow = root.querySelector(".su-arrow");
      const out = root.querySelector(".su-out");
      if (!name) return;

      if (reducedMotion) {
        name.textContent = "100";
        gsap.set(name, { color: "var(--warn)" });
        gsap.set([arrow, out], { opacity: 1, y: 0 });
        return;
      }

      name.textContent = "score";
      gsap.set(name, { color: "var(--foreground)" });
      gsap.set([arrow, out], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(name, {
        backgroundColor: "color-mix(in srgb, var(--brand) 22%, transparent)",
        duration: 0.3,
      }, "+=0.4");
      tl.to(name, { opacity: 0, y: -8, duration: 0.25 }, "+=0.3");
      tl.call(() => {
        name.textContent = "100";
        name.style.color = "var(--warn)";
      });
      tl.fromTo(name, { opacity: 0, y: 10, scale: 1.3 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)", backgroundColor: "transparent" });
      tl.to(arrow, { opacity: 1, y: 0, duration: 0.35 }, "+=0.3");
      tl.to(out, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, "+=0.1");
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
      <div className="mb-6 flex items-center justify-between">
        <code className="font-mono text-sm text-muted">score = 100</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <pre className="rounded-xl border border-border bg-background px-5 py-4 font-mono text-base sm:text-lg">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span className="su-name inline-block rounded px-1">score</span>
          <span className="text-foreground"> * </span>
          <span className="text-warn">2</span>
          <span className="text-foreground">)</span>
        </pre>

        <span className="su-arrow text-sm text-muted">↓</span>

        <div className="su-out rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 font-mono text-base text-brand">
          200
        </div>
      </div>
    </div>
  );
}
