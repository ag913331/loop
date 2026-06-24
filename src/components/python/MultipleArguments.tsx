"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const ARGS = ["Python", "is", "fun"];

/**
 * Passing several arguments at once. Each comma-separated value drops into the
 * call, then assembles in the output with a space automatically placed between
 * them — print's default separator. Plays in view, with a replay.
 */
export default function MultipleArguments() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const args = gsap.utils.toArray<HTMLElement>(".ma-arg");
      const outWords = gsap.utils.toArray<HTMLElement>(".ma-word");
      const seps = gsap.utils.toArray<HTMLElement>(".ma-sep");

      if (reducedMotion) {
        gsap.set([...args, ...outWords, ...seps], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(args, { opacity: 0, y: -8 });
      gsap.set(outWords, { opacity: 0, y: 8 });
      gsap.set(seps, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(args, { opacity: 1, y: 0, duration: 0.35, stagger: 0.2 });
      outWords.forEach((w, i) => {
        tl.to(w, { opacity: 1, y: 0, duration: 0.3 }, i === 0 ? "+=0.3" : ">");
        if (seps[i]) tl.to(seps[i], { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, ">-0.1");
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
          Many values, one print
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <pre className="rounded-xl border border-border bg-background px-5 py-4 font-mono text-base">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          {ARGS.map((a, i) => (
            <span key={i}>
              <span className="ma-arg inline-block text-warn">&quot;{a}&quot;</span>
              {i < ARGS.length - 1 && <span className="text-foreground">, </span>}
            </span>
          ))}
          <span className="text-foreground">)</span>
        </pre>

        <span className="text-sm text-muted">↓</span>

        <div className="rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 font-mono text-base text-brand">
          {ARGS.map((a, i) => (
            <span key={i}>
              <span className="ma-word inline-block">{a}</span>
              {i < ARGS.length - 1 && (
                <span className="ma-sep inline-block rounded bg-warn/30 px-0.5 text-warn">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted">
          the <span className="text-warn">·</span> marks the space print adds
          between values
        </span>
      </div>
    </div>
  );
}
