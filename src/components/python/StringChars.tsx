"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimationCard from "@/components/anim/AnimationCard";
import { useAnimation } from "@/components/anim/useAnimation";

const WORD = "python";

/**
 * A string is an ordered sequence of characters — indexable and sliceable just
 * like a list. Each letter sits in a numbered box; the animation picks word[0],
 * then word[-1], then the slice word[0:3]. Plays in view, with a replay.
 */
export default function StringChars() {
  const { rootRef, scope, inView, replay, replayCount, reducedMotion } =
    useAnimation<HTMLDivElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const box = (i: number) =>
        root.querySelector<HTMLElement>(`.sc-box[data-i="${i}"]`);
      const status = root.querySelector<HTMLElement>(".sc-status");
      const all = gsap.utils.toArray<HTMLElement>(".sc-box");
      if (!status) return;

      const lit = "color-mix(in srgb, var(--accent) 20%, transparent)";
      const hit = "color-mix(in srgb, var(--brand) 20%, transparent)";
      const reset = (els: HTMLElement[]) =>
        gsap.to(els, { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.2 });

      gsap.set(all, { backgroundColor: "var(--background)", borderColor: "var(--border)" });

      if (reducedMotion) {
        [0, 1, 2].forEach((i) => {
          const b = box(i);
          if (b) gsap.set(b, { backgroundColor: hit, borderColor: "var(--brand)" });
        });
        status.textContent = "word[0:3] → 'pyt'";
        return;
      }

      status.textContent = "p-y-t-h-o-n, six characters";
      const tl = gsap.timeline();
      tl.call(() => (status.textContent = "word[0] → 'p'"), [], "+=0.6");
      tl.to(box(0), { backgroundColor: lit, borderColor: "var(--accent)", duration: 0.3 }, "<");
      tl.add(() => reset(all), "+=0.7");
      tl.call(() => (status.textContent = "word[-1] → 'n'  (last)"), [], "<");
      tl.to(box(WORD.length - 1), { backgroundColor: lit, borderColor: "var(--accent)", duration: 0.3 }, "<");
      tl.add(() => reset(all), "+=0.7");
      tl.call(() => (status.textContent = "word[0:3] → 'pyt'  (a slice)"), [], "<");
      tl.to([box(0), box(1), box(2)], { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.3, stagger: 0.1 }, "<");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <AnimationCard rootRef={rootRef} code='word = "python"' onReplay={replay}>
      <div className="flex justify-center">
        <div className="flex gap-1.5">
          {WORD.split("").map((ch, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted">{i}</span>
              <span
                data-i={i}
                className="sc-box flex h-12 w-10 items-center justify-center rounded-lg border border-border bg-background font-mono text-lg text-foreground"
              >
                {ch}
              </span>
              <span className="text-xs text-accent">{i - WORD.length}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="sc-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </AnimationCard>
  );
}
