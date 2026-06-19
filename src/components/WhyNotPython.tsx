"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const CONS = [
  "Slower for heavy number-crunching",
  "Not made for mobile apps",
  "Uses more memory",
  "Some errors only show at runtime",
];

/**
 * The honest downside, shown as a race: compiled C reaches the finish well
 * before Python, because Python is translated as it runs. The other common
 * trade-offs follow as chips. Plays in view, with a replay.
 */
export default function WhyNotPython() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cFill = root.querySelector<HTMLElement>(".race-c-fill");
      const pFill = root.querySelector<HTMLElement>(".race-p-fill");
      const cRunner = root.querySelector<HTMLElement>(".race-c-runner");
      const pRunner = root.querySelector<HTMLElement>(".race-p-runner");
      const cTrack = root.querySelector<HTMLElement>(".race-c-track");
      const pTrack = root.querySelector<HTMLElement>(".race-p-track");
      const cFlag = root.querySelector<HTMLElement>(".race-c-flag");
      const pFlag = root.querySelector<HTMLElement>(".race-p-flag");
      const chips = gsap.utils.toArray<HTMLElement>(".wn-chip");
      if (!cRunner || !pRunner || !cTrack || !pTrack) return;

      const cDist = cTrack.offsetWidth - cRunner.offsetWidth;
      const pDist = pTrack.offsetWidth - pRunner.offsetWidth;
      const C = 1.0;
      const P = 2.4;

      if (reducedMotion) {
        gsap.set([cFill, pFill], { width: "100%" });
        gsap.set(cRunner, { x: cDist });
        gsap.set(pRunner, { x: pDist });
        gsap.set([cFlag, pFlag], { opacity: 1, scale: 1 });
        gsap.set(chips, { opacity: 1, y: 0 });
        return;
      }

      gsap.set([cFill, pFill], { width: 0 });
      gsap.set([cRunner, pRunner], { x: 0 });
      gsap.set([cFlag, pFlag], { opacity: 0, scale: 0.4 });
      gsap.set(chips, { opacity: 0, y: 10 });

      const tl = gsap.timeline();
      tl.to(cFill, { width: "100%", duration: C, ease: "power1.in" }, 0);
      tl.to(cRunner, { x: cDist, duration: C, ease: "power1.in" }, 0);
      tl.to(pFill, { width: "100%", duration: P, ease: "power1.inOut" }, 0);
      tl.to(pRunner, { x: pDist, duration: P, ease: "power1.inOut" }, 0);
      tl.to(cFlag, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, C);
      tl.to(pFlag, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, P);
      tl.to(chips, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, P + 0.1);
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Track = (who: "c" | "p", label: string, runner: string, color: string) => (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-sm text-muted">{label}</span>
      <div
        className={`race-${who}-track relative h-8 flex-1 overflow-hidden rounded-lg border border-border bg-background`}
      >
        <div
          className={`race-${who}-fill absolute inset-y-0 left-0`}
          style={{ background: `color-mix(in srgb, ${color} 18%, transparent)` }}
        />
        <span className={`race-${who}-runner absolute left-1 top-1/2 -translate-y-1/2 text-lg`}>
          {runner}
        </span>
        <span
          className={`race-${who}-flag absolute right-1.5 top-1/2 -translate-y-1/2 text-base`}
        >
          🏁
        </span>
      </div>
    </div>
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
          Same task, raw speed
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-3">
        {Track("c", "C (compiled)", "⚡", "var(--accent)")}
        {Track("p", "Python", "🐍", "var(--brand)")}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {CONS.map((c) => (
          <span
            key={c}
            className="wn-chip rounded-full border border-danger/40 bg-danger/5 px-3 py-1.5 text-xs font-medium text-muted"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
