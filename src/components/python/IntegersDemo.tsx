"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const TICKS = [-3, -2, -1, 0, 1, 2, 3];

/**
 * Integers are the whole-number positions — no gaps filled in between. A marker
 * hops from one to the next along a number line, then a note shows the
 * underscore trick for big numbers. Plays in view, with a replay.
 */
export default function IntegersDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const ticks = gsap.utils.toArray<HTMLElement>(".int-tick");
      const marker = root.querySelector<HTMLElement>(".int-marker");
      const note = root.querySelector(".int-note");
      if (!marker) return;

      const centerOf = (el: HTMLElement) =>
        el.offsetLeft + el.offsetWidth / 2 - marker.offsetWidth / 2;

      if (reducedMotion) {
        gsap.set(marker, { opacity: 1, x: centerOf(ticks[ticks.length - 1]) });
        gsap.set(note, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(marker, { opacity: 0, x: centerOf(ticks[0]) });
      gsap.set(note, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(marker, { opacity: 1, duration: 0.3 });
      ticks.forEach((t, i) => {
        tl.to(marker, { x: centerOf(t), duration: 0.3, ease: "power1.inOut" }, i === 0 ? "<" : ">");
        tl.to(t, { keyframes: { scale: [1, 1.35, 1] }, color: "var(--brand)", duration: 0.3 }, "<");
      });
      tl.to(note, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
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
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Whole numbers, evenly spaced
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="int-track relative mx-auto max-w-xl">
        {/* the line */}
        <div className="absolute left-0 right-0 top-[7px] h-0.5 bg-border" />
        <span className="absolute -left-1 top-0 text-muted">←</span>
        <span className="absolute -right-1 top-0 text-muted">→</span>

        {/* hopping marker */}
        <div className="int-marker absolute -top-1 left-0 h-4 w-4 rounded-full border-2 border-brand bg-background" />

        {/* ticks */}
        <div className="flex justify-between">
          {TICKS.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <span className="h-3 w-0.5 bg-border" />
              <span
                className="int-tick font-mono text-sm text-muted"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                {n}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="int-note mt-6 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted">
        Big numbers are hard to read, so Python lets you group digits with
        underscores:{" "}
        <span className="font-mono text-foreground">1_000_000</span> means the
        same as <span className="font-mono text-foreground">1000000</span>.
      </div>
    </div>
  );
}
