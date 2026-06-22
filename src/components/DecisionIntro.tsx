"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const QA = [
  { q: "7 > 3", a: "True", ok: true },
  { q: "2 > 5", a: "False", ok: false },
];

/**
 * A program makes decisions by asking yes/no questions. Each question is a
 * comparison, and the answer is a boolean — True or False. Two questions resolve
 * to their answers. Plays in view, with a replay.
 */
export default function DecisionIntro() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".di-row");
      const marks = gsap.utils.toArray<HTMLElement>(".di-q");
      const answers = gsap.utils.toArray<HTMLElement>(".di-a");

      if (reducedMotion) {
        gsap.set([...rows, ...marks, ...answers], { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0, y: 10 });
      gsap.set(marks, { opacity: 0 });
      gsap.set(answers, { opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, y: 0, duration: 0.4 }, i === 0 ? "+=0.2" : "+=0.5");
        tl.to(marks[i], { opacity: 1, keyframes: { scale: [1, 1.3, 1] }, duration: 0.4 }, "+=0.1");
        tl.to(answers[i], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "+=0.2");
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
          Ask a question, get True or False
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4">
        {QA.map((item) => (
          <div
            key={item.q}
            className="di-row flex flex-wrap items-center justify-center gap-3 font-mono text-lg"
          >
            <span className="text-foreground">{item.q}</span>
            <span className="di-q text-warn">?</span>
            <span className="text-muted">→</span>
            <span
              className={`di-a rounded-lg border px-3 py-1 ${
                item.ok
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-danger/40 bg-danger/10 text-danger"
              }`}
            >
              {item.a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
