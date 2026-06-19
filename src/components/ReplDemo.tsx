"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// prompt, text, and whether it's program output (vs something you typed).
const LINES = [
  { prompt: "$", text: "python", out: false },
  { prompt: "", text: "Python 3.14.0  (type Ctrl-D to exit)", out: true },
  { prompt: ">>>", text: "2 + 2", out: false },
  { prompt: "", text: "4", out: true },
  { prompt: ">>>", text: 'name = "Ada"', out: false },
  { prompt: ">>>", text: 'print("Hi,", name)', out: false },
  { prompt: "", text: "Hi, Ada", out: true },
];

/**
 * The interactive shell — the quickest way to "start your work with Python".
 * You type, it answers, immediately. Lines appear one after another with a live
 * cursor blinking at the prompt. Plays in view, with a replay.
 */
export default function ReplDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const lines = gsap.utils.toArray<HTMLElement>(".repl-line");
      const cursor = root.querySelector(".repl-cursor");

      if (reducedMotion) {
        gsap.set(lines, { opacity: 1, y: 0 });
        gsap.set(cursor, { opacity: 1 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 6 });
      gsap.set(cursor, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(lines, { opacity: 1, y: 0, duration: 0.3, stagger: 0.45 });
      tl.set(cursor, { opacity: 1 });
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          The interactive shell
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          <span className="ml-2 text-xs text-muted">Python — Terminal</span>
        </div>
        <div className="p-4 font-mono text-sm leading-7">
          {LINES.map((l, i) => (
            <div key={i} className="repl-line">
              {l.prompt && <span className="mr-2 text-accent">{l.prompt}</span>}
              <span className={l.out ? "text-muted" : "text-foreground"}>
                {l.text}
              </span>
            </div>
          ))}
          <div>
            <span className="mr-2 text-accent">&gt;&gt;&gt;</span>
            <span className="repl-cursor inline-block h-4 w-2 translate-y-0.5 bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
