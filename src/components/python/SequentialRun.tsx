"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

// Each line of the program and the text it prints to the console.
const LINES = ["Hello!", "Welcome to loop", "Let's begin"];

/**
 * The first idea any programmer meets: a program is a list of instructions that
 * the computer runs one at a time, top to bottom. A highlight steps down the
 * code and each line's output appears in the console as it executes. Plays in
 * view, with a replay; reduced motion shows the finished run.
 */
export default function SequentialRun() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const codeLines = gsap.utils.toArray<HTMLElement>(".code-line");
      const outLines = gsap.utils.toArray<HTMLElement>(".out-line");
      const cursor = root.querySelector<HTMLElement>(".out-cursor");
      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(outLines, { opacity: 1, y: 0 });
        gsap.set(codeLines, { backgroundColor: "transparent" });
        gsap.set(cursor, { opacity: 0 });
        return;
      }

      gsap.set(outLines, { opacity: 0, y: 8 });
      gsap.set(codeLines, { backgroundColor: "transparent" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      LINES.forEach((_, i) => {
        tl.to(codeLines[i], { backgroundColor: lit, duration: 0.25 }, i === 0 ? "+=0.3" : ">");
        tl.to(outLines[i], { opacity: 1, y: 0, duration: 0.35 }, "+=0.15");
        tl.to(codeLines[i], { backgroundColor: "transparent", duration: 0.25 }, "+=0.35");
      });

      // Blink the prompt cursor once the program has finished.
      tl.to(cursor, { opacity: 1, duration: 0.2 });
      tl.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
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
        <code className="font-mono text-sm text-muted">hello.py</code>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* code */}
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7 sm:text-[15px]">
          {LINES.map((text, i) => (
            <div key={i} className="code-line -mx-2 rounded px-2">
              <span className="text-brand">print</span>
              <span className="text-foreground">(</span>
              <span className="text-warn">&quot;{text}&quot;</span>
              <span className="text-foreground">)</span>
            </div>
          ))}
        </pre>

        {/* console */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="ml-2 text-xs text-muted">output</span>
          </div>
          <div className="font-mono text-sm leading-7 text-foreground sm:text-[15px]">
            {LINES.map((text, i) => (
              <div key={i} className="out-line">
                {text}
              </div>
            ))}
            <span className="out-cursor inline-block opacity-0">
              <span className="text-brand">$</span>{" "}
              <span className="inline-block h-4 w-2 translate-y-0.5 bg-foreground" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
