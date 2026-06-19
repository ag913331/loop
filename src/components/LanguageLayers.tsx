"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// The statement we build up, split into its tokens (and each token's chars).
const TOKENS = ["print", "(", '"Hi"', ")"];

const STAGES = [
  { key: "alphabet", label: "Alphabet", note: "the symbols you may use" },
  { key: "lexis", label: "Lexis", note: "symbols grouped into words" },
  { key: "syntax", label: "Syntax", note: "words arranged by the rules" },
  { key: "semantics", label: "Semantics", note: "what it actually means" },
];

/**
 * Every language is built in four layers — alphabet, lexis, syntax, semantics.
 * Characters appear, group into tokens, lock into a valid statement, then
 * reveal their meaning. The stage list on the left lights up as each layer is
 * reached. Plays in view, with a replay.
 */
export default function LanguageLayers() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const chars = gsap.utils.toArray<HTMLElement>(".ll-char");
      const tokens = gsap.utils.toArray<HTMLElement>(".ll-token");
      const check = root.querySelector(".ll-check");
      const output = root.querySelector(".ll-output");
      const stages = gsap.utils.toArray<HTMLElement>(".ll-stage");
      const activeBg = "color-mix(in srgb, var(--accent) 14%, transparent)";

      const lightStage = (n: number) =>
        gsap.to(stages[n], { backgroundColor: activeBg, color: "var(--foreground)", duration: 0.3 });

      if (reducedMotion) {
        gsap.set(chars, { opacity: 1 });
        gsap.set(tokens, { borderColor: "var(--border)", opacity: 1 });
        gsap.set([check, output], { opacity: 1, scale: 1 });
        gsap.set(stages, { backgroundColor: activeBg, color: "var(--foreground)" });
        return;
      }

      gsap.set(chars, { opacity: 0 });
      gsap.set(tokens, { borderColor: "transparent" });
      gsap.set([check, output], { opacity: 0, scale: 0.6 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Alphabet — individual characters appear.
      tl.add(() => lightStage(0));
      tl.to(chars, { opacity: 1, duration: 0.3, stagger: 0.05 }, "+=0.1");

      // 2. Lexis — boxes form around the characters, grouping them into tokens.
      tl.add(() => lightStage(1), "+=0.3");
      tl.to(tokens, { borderColor: "var(--border)", duration: 0.4, stagger: 0.12 });

      // 3. Syntax — the arrangement is valid; a check confirms it.
      tl.add(() => lightStage(2), "+=0.2");
      tl.to(tokens, { keyframes: { y: [0, -6, 0] }, duration: 0.4, stagger: 0.08 });
      tl.to(check, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, "<");

      // 4. Semantics — the meaning: it prints Hi.
      tl.add(() => lightStage(3), "+=0.3");
      tl.to(output, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
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

      <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
        {/* stage list */}
        <ol className="space-y-2">
          {STAGES.map((s) => (
            <li
              key={s.key}
              className="ll-stage rounded-lg border border-border px-3 py-2 text-muted"
            >
              <span className="block text-sm font-semibold">{s.label}</span>
              <span className="block text-xs text-muted">{s.note}</span>
            </li>
          ))}
        </ol>

        {/* build-up area */}
        <div className="flex flex-col items-start justify-center gap-5 rounded-xl bg-background p-5">
          <div className="flex flex-wrap items-center gap-2">
            {TOKENS.map((tok, t) => (
              <span
                key={t}
                className="ll-token inline-flex rounded-lg border px-2 py-1 font-mono text-base sm:text-lg"
              >
                {tok.split("").map((ch, c) => (
                  <span key={c} className="ll-char text-foreground">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
            <span className="ll-check ml-1 font-semibold text-brand">✓ valid</span>
          </div>

          <div className="ll-output rounded-lg border border-brand/40 bg-brand/10 px-4 py-2 font-mono text-foreground">
            <span className="text-muted">prints </span>
            <span className="text-brand">Hi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
