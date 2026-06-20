"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const LITERALS = [
  { value: "42", type: "int", note: "a whole number" },
  { value: "3.14", type: "float", note: "has a decimal point" },
  { value: '"hi"', type: "str", note: "text in quotes" },
  { value: "True", type: "bool", note: "true or false" },
];

/**
 * A literal is a value written straight into your code. Four of them appear,
 * each tagged with the type Python recognises it as — a preview of the rest of
 * the section. Plays in view, with a replay.
 */
export default function LiteralTypes() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const cards = gsap.utils.toArray<HTMLElement>(".lt-card");
      const tags = gsap.utils.toArray<HTMLElement>(".lt-tag");

      if (reducedMotion) {
        gsap.set([...cards, ...tags], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(cards, { opacity: 0, y: 14, scale: 0.9 });
      gsap.set(tags, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      cards.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, i === 0 ? 0 : ">-0.15");
        tl.to(tags[i], { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, ">-0.05");
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
          Four literals, four types
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {LITERALS.map((lit) => (
          <div
            key={lit.type}
            className="lt-card flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
          >
            <span className="font-mono text-lg text-warn">{lit.value}</span>
            <span className="lt-tag rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
              {lit.type}
            </span>
            <span className="text-[11px] leading-tight text-muted">
              {lit.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
