"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const MILESTONES = [
  { year: "1989", text: "Guido van Rossum starts Python as a holiday project." },
  { year: "1991", text: "The first version is released to the world (0.9.0)." },
  { year: "1994", text: "Python 1.0 arrives." },
  { year: "2000", text: "Python 2.0 — a big step for the language." },
  { year: "2008", text: "Python 3.0, the version everyone uses today." },
  { year: "Today", text: "One of the most popular languages on Earth." },
];

/**
 * A vertical timeline of Python's history: the line draws downward and each
 * milestone slides in. Closes with the origin of the name. Plays in view.
 */
export default function PythonTimeline() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const line = root.querySelector(".tl-line");
      const items = gsap.utils.toArray<HTMLElement>(".tl-item");
      const dots = gsap.utils.toArray<HTMLElement>(".tl-dot");
      const note = root.querySelector(".tl-note");

      if (reducedMotion) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(items, { opacity: 1, x: 0 });
        gsap.set(dots, { scale: 1 });
        gsap.set(note, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(line, { scaleY: 0, transformOrigin: "top" });
      gsap.set(items, { opacity: 0, x: 16 });
      gsap.set(dots, { scale: 0 });
      gsap.set(note, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(line, { scaleY: 1, duration: 0.9, ease: "none" });
      tl.to(dots, { scale: 1, duration: 0.3, stagger: 0.15, ease: "back.out(2.5)" }, 0.1);
      tl.to(items, { opacity: 1, x: 0, duration: 0.4, stagger: 0.15 }, 0.15);
      tl.to(note, { opacity: 1, y: 0, duration: 0.5 }, "+=0.1");
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
          A short history
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="relative pl-8">
        {/* the spine */}
        <div className="tl-line absolute left-[7px] top-1 h-[calc(100%-1rem)] w-0.5 bg-brand/50" />

        <ul className="space-y-5">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative">
              <span className="tl-dot absolute -left-[27px] top-1 h-4 w-4 rounded-full border-2 border-brand bg-background" />
              <div className="tl-item">
                <span className="font-mono text-sm font-semibold text-brand">
                  {m.year}
                </span>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">
                  {m.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="tl-note mt-6 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted">
        🎬 The name comes from{" "}
        <span className="text-foreground">Monty Python&apos;s Flying Circus</span>{" "}
        — the comedy show, not the snake.
      </p>
    </div>
  );
}
