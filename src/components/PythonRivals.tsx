"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const RIVALS = [
  { name: "JavaScript", niche: "Runs the web, in every browser" },
  { name: "Java", niche: "Big enterprise apps & Android" },
  { name: "C / C++", niche: "Raw speed & systems programming" },
  { name: "C#", niche: "The .NET world & game dev" },
  { name: "R", niche: "Statistics & academic research" },
  { name: "Go", niche: "Fast cloud & network services" },
];

/**
 * Python's rivals: the languages it's most often weighed against, each with the
 * niche it's known for. Cards stagger in beneath the subject. Plays in view.
 */
export default function PythonRivals() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const subject = root.querySelector(".rv-subject");
      const cards = gsap.utils.toArray<HTMLElement>(".rv-card");

      if (reducedMotion) {
        gsap.set(subject, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(subject, { opacity: 0, y: -8 });
      gsap.set(cards, { opacity: 0, y: 14, scale: 0.92 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(subject, { opacity: 1, y: 0, duration: 0.4 });
      tl.to(
        cards,
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
        "+=0.1",
      );
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
          Python vs the field
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="rv-subject mb-4 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5">
        <span className="h-2 w-2 rounded-full bg-brand" />
        <span className="font-mono text-sm font-semibold text-brand">Python</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RIVALS.map((r) => (
          <div
            key={r.name}
            className="rv-card rounded-xl border border-border bg-background p-4"
          >
            <div className="font-mono text-sm font-semibold text-foreground">
              {r.name}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-muted">
              {r.niche}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
