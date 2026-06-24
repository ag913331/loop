"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * There are exactly two boolean values: True and False. A switch flips between
 * them, then two comparisons show where booleans come from. Plays in view.
 */
export default function BooleanDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const track = root.querySelector<HTMLElement>(".bool-track");
      const knob = root.querySelector<HTMLElement>(".bool-knob");
      const label = root.querySelector<HTMLElement>(".bool-label");
      const cmps = gsap.utils.toArray<HTMLElement>(".bool-cmp");
      if (!track || !knob || !label) return;

      const on = "color-mix(in srgb, var(--brand) 30%, transparent)";
      const off = "color-mix(in srgb, var(--danger) 28%, transparent)";
      const setTrue = () => {
        label.textContent = "True";
        label.style.color = "var(--brand)";
      };
      const setFalse = () => {
        label.textContent = "False";
        label.style.color = "var(--danger)";
      };

      if (reducedMotion) {
        gsap.set(knob, { x: 28 });
        gsap.set(track, { backgroundColor: on });
        setTrue();
        gsap.set(cmps, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(knob, { x: 0 });
      gsap.set(track, { backgroundColor: off });
      setFalse();
      gsap.set(cmps, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(knob, { x: 28, duration: 0.35 }, "+=0.4");
      tl.to(track, { backgroundColor: on, duration: 0.35 }, "<");
      tl.call(setTrue, [], "<");
      tl.to(knob, { x: 0, duration: 0.35 }, "+=0.6");
      tl.to(track, { backgroundColor: off, duration: 0.35 }, "<");
      tl.call(setFalse, [], "<");
      tl.to(knob, { x: 28, duration: 0.35 }, "+=0.6");
      tl.to(track, { backgroundColor: on, duration: 0.35 }, "<");
      tl.call(setTrue, [], "<");

      tl.to(cmps, { opacity: 1, y: 0, duration: 0.4, stagger: 0.25 }, "+=0.3");
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
          Only two values
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bool-track relative h-8 w-16 rounded-full border border-border">
            <div className="bool-knob absolute left-1 top-1 h-6 w-6 rounded-full bg-foreground" />
          </div>
          <span className="bool-label font-mono text-lg font-semibold text-danger">
            False
          </span>
        </div>

        <div className="flex flex-col gap-2 font-mono text-sm">
          <div className="bool-cmp flex items-center gap-2">
            <span className="text-foreground">5 &gt; 3</span>
            <span className="text-muted">→</span>
            <span className="rounded border border-brand/40 bg-brand/10 px-2 py-0.5 text-brand">
              True
            </span>
          </div>
          <div className="bool-cmp flex items-center gap-2">
            <span className="text-foreground">2 == 5</span>
            <span className="text-muted">→</span>
            <span className="rounded border border-danger/40 bg-danger/10 px-2 py-0.5 text-danger">
              False
            </span>
          </div>
        </div>
        <span className="text-xs text-muted">
          Booleans are what comparisons give back — the start of every decision
          your code makes.
        </span>
      </div>
    </div>
  );
}
