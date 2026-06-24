"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimationCard from "@/components/anim/AnimationCard";
import { useAnimation } from "@/components/anim/useAnimation";

const STEPS = [
  { call: '.upper()', from: '"hi"', to: '"HI"' },
  { call: '.strip()', from: '"  hi  "', to: '"hi"' },
  { call: '.replace("i","ey")', from: '"hi"', to: '"hey"' },
];

/**
 * String methods return a BRAND-NEW string — the original is never changed
 * (strings are immutable). Each step shows the original, the method, and the
 * fresh result dropping out below. Plays in view, with a replay.
 */
export default function StringMethods() {
  const { rootRef, scope, inView, replay, replayCount, reducedMotion } =
    useAnimation<HTMLDivElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const outs = gsap.utils.toArray<HTMLElement>(".sm-out");
      const status = root.querySelector<HTMLElement>(".sm-status");
      if (outs.length !== STEPS.length) return;

      if (reducedMotion) {
        gsap.set(outs, { opacity: 1, y: 0 });
        if (status) status.textContent = "each call returns a new string";
        return;
      }

      gsap.set(outs, { opacity: 0, y: -10 });
      if (status) status.textContent = "the original is never changed";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      STEPS.forEach((s, i) => {
        tl.to(outs[i], { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, "+=0.5");
        tl.call(() => status && (status.textContent = `${s.from}${s.call} → ${s.to}`), [], "<");
      });
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <AnimationCard rootRef={rootRef} label="A method makes a new string" onReplay={replay}>
      <div className="mx-auto flex max-w-md flex-col gap-3">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center justify-between gap-2 font-mono text-sm">
            <span className="rounded-md border border-border bg-background px-2 py-1 text-foreground">
              {s.from}
            </span>
            <span className="text-accent">{s.call}</span>
            <span className="text-muted">→</span>
            <span className="sm-out rounded-md border border-brand/50 bg-brand/10 px-2 py-1 text-brand">
              {s.to}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="sm-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </AnimationCard>
  );
}
