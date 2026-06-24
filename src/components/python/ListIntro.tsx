"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimationCard from "@/components/anim/AnimationCard";
import { useAnimation } from "@/components/anim/useAnimation";

const VALUES = [85, 92, 78, 64];
const SCATTER = [
  { x: -90, y: -40, r: -12 },
  { x: 70, y: -55, r: 9 },
  { x: -50, y: 45, r: 14 },
  { x: 95, y: 35, r: -8 },
];

/**
 * Why lists exist: instead of juggling four separate variables, four loose
 * values gather into one ordered, numbered collection. The scattered chips fly
 * into line and the brackets and indices appear. Plays in view, with a replay.
 */
export default function ListIntro() {
  const { rootRef, scope, inView, replay, replayCount, reducedMotion } =
    useAnimation<HTMLDivElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const chips = gsap.utils.toArray<HTMLElement>(".li-chip");
      const frame = gsap.utils.toArray<HTMLElement>(".li-frame");
      const idx = gsap.utils.toArray<HTMLElement>(".li-idx");

      if (reducedMotion) {
        gsap.set(chips, { x: 0, y: 0, rotate: 0 });
        gsap.set([...frame, ...idx], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(frame, { opacity: 0 });
      gsap.set(idx, { opacity: 0, y: 8 });
      chips.forEach((c, i) => gsap.set(c, { ...SCATTER[i], opacity: 0 }));

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(chips, { opacity: 1, duration: 0.3, stagger: 0.1 }, "+=0.2");
      tl.to(chips, { x: 0, y: 0, rotate: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.4)" }, "+=0.3");
      tl.to(frame, { opacity: 1, duration: 0.4 }, "-=0.2");
      tl.to(idx, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, "+=0.1");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <AnimationCard rootRef={rootRef} label="Four values, one name" onReplay={replay}>
      <div className="flex min-h-[7rem] items-center justify-center">
        <div className="flex items-center gap-1 font-mono text-lg">
          <span className="li-frame text-2xl text-muted">[</span>
          {VALUES.map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="li-chip flex h-12 w-12 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 text-brand">
                {v}
              </span>
              <span className="li-idx font-mono text-xs text-muted">{i}</span>
            </div>
          ))}
          <span className="li-frame text-2xl text-muted">]</span>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        <span className="font-mono text-foreground">
          scores = [85, 92, 78, 64]
        </span>
      </p>
    </AnimationCard>
  );
}
