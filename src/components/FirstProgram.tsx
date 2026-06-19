"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The classic first program: save one line in hello.py, run it from the
 * terminal, and watch it greet you back. The file is written, the run command
 * appears, then the output. Plays in view, with a replay.
 */
export default function FirstProgram() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const code = root.querySelector(".fp-code");
      const caret = root.querySelector(".fp-caret");
      const cmd = root.querySelector(".fp-cmd");
      const output = root.querySelector(".fp-output");

      if (reducedMotion) {
        gsap.set([code, cmd, output], { opacity: 1, y: 0 });
        gsap.set(caret, { opacity: 0 });
        return;
      }

      gsap.set(code, { opacity: 0, y: 6 });
      gsap.set([cmd, output], { opacity: 0, y: 6 });
      gsap.set(caret, { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(code, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
      tl.to(caret, { opacity: 0, duration: 0.4, repeat: 3, yoyo: true, ease: "steps(1)" }, "<");
      tl.to(cmd, { opacity: 1, y: 0, duration: 0.4 }, "+=0.6");
      tl.to(output, { opacity: 1, y: 0, duration: 0.4 }, "+=0.4");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Chrome = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
      <span className="ml-2 text-xs text-muted">{label}</span>
    </div>
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
          Write it, save it, run it
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* editor */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="hello.py" />
          <div className="p-4 font-mono text-sm leading-7">
            <span className="select-none pr-3 text-muted">1</span>
            <span className="fp-code">
              <span className="text-brand">print</span>
              <span className="text-foreground">(</span>
              <span className="text-warn">&quot;Hello, World!&quot;</span>
              <span className="text-foreground">)</span>
            </span>
            <span className="fp-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-foreground" />
          </div>
        </div>

        {/* terminal */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="Terminal" />
          <div className="p-4 font-mono text-sm leading-7">
            <div className="fp-cmd">
              <span className="text-muted">$</span> python hello.py
            </div>
            <div className="fp-output text-brand">Hello, World!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
