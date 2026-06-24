"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * A two-parameter function at work: bmi(weight, height). The two arguments drop
 * into the formula weight / height², which evaluates to a number, which maps to
 * a category. Each stage reveals in turn. Plays in view, with a replay.
 */
export default function BMIFormula() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const stages = gsap.utils.toArray<HTMLElement>(".bmi-stage");
      const status = root.querySelector<HTMLElement>(".bmi-status");
      if (!stages.length) return;

      if (reducedMotion) {
        gsap.set(stages, { opacity: 1, y: 0 });
        if (status) status.textContent = "BMI 22.9 → Normal";
        return;
      }

      gsap.set(stages, { opacity: 0, y: 10 });
      const msgs = [
        "two inputs: weight and height",
        "weight / height²",
        "70 / (1.75 × 1.75)",
        "BMI = 22.9 → Normal",
      ];
      if (status) status.textContent = msgs[0];

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      stages.forEach((s, i) => {
        tl.to(s, { opacity: 1, y: 0, duration: 0.4 }, "+=0.5");
        tl.call(() => status && (status.textContent = msgs[Math.min(i + 1, msgs.length - 1)]), [], "<");
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
        <code className="font-mono text-sm text-foreground">bmi(70, 1.75)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-2 font-mono text-sm">
        {/* inputs */}
        <div className="bmi-stage flex gap-3">
          <span className="rounded-lg border border-border bg-background px-3 py-2 text-foreground">
            weight = <span className="text-brand">70</span> kg
          </span>
          <span className="rounded-lg border border-border bg-background px-3 py-2 text-foreground">
            height = <span className="text-brand">1.75</span> m
          </span>
        </div>

        <span className="bmi-stage text-muted">↓</span>

        {/* formula */}
        <div className="bmi-stage rounded-lg border border-border bg-background px-4 py-2 text-foreground">
          weight / (height * height)
        </div>

        <span className="bmi-stage text-muted">↓</span>

        {/* result + category */}
        <div className="bmi-stage flex items-center gap-2">
          <span className="rounded-lg border border-brand/50 bg-brand/10 px-4 py-2 text-lg text-brand">
            22.9
          </span>
          <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">
            Normal
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="bmi-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
