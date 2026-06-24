"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Natural language vs a programming language, side by side. The English
 * sentence forks into two conflicting meanings (ambiguous); the line of Python
 * resolves to exactly one result (precise). Plays in view, with a replay.
 */
export default function AmbiguityVsPrecision() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const sentence = root.querySelector(".nl-sentence");
      const meanings = gsap.utils.toArray<HTMLElement>(".nl-meaning");
      const question = root.querySelector(".nl-question");
      const code = root.querySelector(".pl-code");
      const result = root.querySelector(".pl-result");

      const all = [sentence, ...meanings, question, code, result];

      if (reducedMotion) {
        gsap.set(all, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set([sentence, code], { opacity: 0, y: 10 });
      gsap.set(meanings, { opacity: 0, y: 6, scale: 0.9 });
      gsap.set([question, result], { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Both sides receive their input.
      tl.to([sentence, code], { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 });

      // Natural language forks into two conflicting readings.
      tl.to(question, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "+=0.3");
      tl.to(meanings, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.2 }, "+=0.1");

      // Code resolves to a single, unambiguous result.
      tl.to(result, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)" }, "<");
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
      <div className="mb-5 flex items-center justify-end">
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Natural language: ambiguous */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
            Natural language
          </div>
          <p className="nl-sentence text-lg text-foreground">
            “I saw her duck.”
          </p>
          <div className="nl-question my-3 text-2xl text-warn">?</div>
          <div className="space-y-2">
            <div className="nl-meaning rounded-lg border border-warn/30 bg-warn/5 px-3 py-2 text-sm text-muted">
              🦆 her pet duck
            </div>
            <div className="nl-meaning rounded-lg border border-warn/30 bg-warn/5 px-3 py-2 text-sm text-muted">
              🙇 she lowered her head
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">Two meanings — which one?</p>
        </div>

        {/* Programming language: precise */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
            Programming language
          </div>
          <pre className="pl-code font-mono text-sm leading-7 text-foreground sm:text-[15px]">
            <span className="text-brand">print</span>(
            <span className="text-warn">2</span> +{" "}
            <span className="text-warn">3</span>)
          </pre>
          <div className="my-3 text-2xl text-brand">↓</div>
          <div className="pl-result inline-block rounded-lg border border-brand/40 bg-brand/10 px-4 py-2 font-mono text-lg text-brand">
            5
          </div>
          <p className="mt-4 text-xs text-muted">One meaning — always 5.</p>
        </div>
      </div>
    </div>
  );
}
