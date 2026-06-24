"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimationCard from "@/components/anim/AnimationCard";
import { useAnimation } from "@/components/anim/useAnimation";

const FACTORS = [1, 2, 3, 4];

/**
 * Factorial as a running product, built iteratively. Each factor is multiplied
 * into an accumulator: 1 → 2 → 6 → 24. The current factor lights up and the
 * total updates with a pop. Plays in view, with a replay.
 */
export default function Factorial() {
  const { rootRef, scope, inView, replay, replayCount, reducedMotion } =
    useAnimation<HTMLDivElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cells = gsap.utils.toArray<HTMLElement>(".ft-factor");
      const total = root.querySelector<HTMLElement>(".ft-total");
      const status = root.querySelector<HTMLElement>(".ft-status");
      if (!total) return;

      const lit = "color-mix(in srgb, var(--accent) 18%, transparent)";
      const products = [1, 2, 6, 24];

      if (reducedMotion) {
        gsap.set(cells, { borderColor: "var(--brand)" });
        total.textContent = "24";
        if (status) status.textContent = "4! = 24";
        return;
      }

      gsap.set(cells, { borderColor: "var(--border)", backgroundColor: "var(--background)" });
      total.textContent = "1";
      if (status) status.textContent = "result starts at 1";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      FACTORS.forEach((f, i) => {
        tl.to(cells[i], { backgroundColor: lit, borderColor: "var(--accent)", duration: 0.3 }, "+=0.5");
        tl.call(() => status && (status.textContent = `result = ${i === 0 ? 1 : products[i - 1]} × ${f} = ${products[i]}`), [], "<");
        tl.call(() => (total.textContent = String(products[i])), [], "+=0.25");
        tl.fromTo(total, { scale: 1.35, color: "var(--brand)" }, { scale: 1, duration: 0.35 }, "<");
        tl.to(cells[i], { backgroundColor: "var(--background)", borderColor: "var(--brand)", duration: 0.3 }, "+=0.15");
      });
      tl.call(() => status && (status.textContent = "4! = 24"), [], "+=0.2");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <AnimationCard
      rootRef={rootRef}
      code="factorial(4) = 1·2·3·4"
      onReplay={replay}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {FACTORS.map((f, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="ft-factor flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground">
                {f}
              </span>
              {i < FACTORS.length - 1 && <span className="text-muted">×</span>}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-muted">result =</span>
          <span className="ft-total flex h-12 min-w-16 items-center justify-center rounded-lg border border-brand bg-brand/10 px-3 text-lg text-brand">
            1
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="ft-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </AnimationCard>
  );
}
