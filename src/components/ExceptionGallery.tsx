"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const KINDS = [
  { name: "ZeroDivisionError", code: "10 / 0", why: "dividing by zero" },
  { name: "ValueError", code: 'int("abc")', why: "right type, impossible value" },
  { name: "TypeError", code: '"3" + 5', why: "wrong type for the operation" },
  { name: "AttributeError", code: "[1].depend(2)", why: "no such method/attribute" },
];

/**
 * A gallery of the exceptions you'll meet most. Each card reveals with the line
 * that triggers it and a one-line reason. Plays in view, with a replay.
 */
export default function ExceptionGallery() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cards = gsap.utils.toArray<HTMLElement>(".eg-card");
      if (!cards.length) return;

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 12 });
      gsap.timeline().to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.18,
        ease: "back.out(1.8)",
        delay: 0.3,
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
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          The ones you&apos;ll meet most
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {KINDS.map((k) => (
          <div key={k.name} className="eg-card rounded-xl border border-border bg-background p-4">
            <div className="font-mono text-sm font-semibold text-danger">{k.name}</div>
            <div className="mt-2 rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-foreground">
              {k.code}
            </div>
            <div className="mt-2 text-xs text-muted">{k.why}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
