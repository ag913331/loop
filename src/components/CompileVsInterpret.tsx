"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const SRC = ["x = 2", "y = 3", "print(x + y)"];

/**
 * Compilation vs interpretation, as two pipelines. The compiler translates the
 * whole program once into a runnable file, then runs it. The interpreter walks
 * the source line by line, running each as it goes. Plays in view, with replay.
 */
export default function CompileVsInterpret() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cScan = root.querySelector(".c-scan");
      const cExe = root.querySelector(".c-exe");
      const cOut = root.querySelector(".c-out");
      const iPointer = root.querySelector(".i-pointer");
      const iLines = gsap.utils.toArray<HTMLElement>(".i-line");
      const iOuts = gsap.utils.toArray<HTMLElement>(".i-out");
      const litBody = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([cExe, cOut], { opacity: 1, scale: 1 });
        gsap.set(cScan, { opacity: 0 });
        gsap.set(iPointer, { opacity: 0 });
        gsap.set(iOuts, { opacity: 1, y: 0 });
        return;
      }

      gsap.set([cExe, cOut], { opacity: 0, scale: 0.7 });
      gsap.set(cScan, { opacity: 0, top: 0 });
      gsap.set(iPointer, { opacity: 0, top: 0 });
      gsap.set(iLines, { backgroundColor: "transparent" });
      gsap.set(iOuts, { opacity: 0, y: 6 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Compiler: one sweep over the whole source, then a runnable file, then run.
      tl.to(cScan, { opacity: 1, duration: 0.2 });
      tl.to(cScan, { top: "100%", duration: 1, ease: "none" });
      tl.to(cScan, { opacity: 0, duration: 0.2 }, "<+=0.85");
      tl.to(cExe, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.1");
      tl.to(cOut, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.3");

      // Interpreter: step each line and print its result immediately. Run in
      // parallel with the compiler so the difference in rhythm is visible.
      tl.to(iPointer, { opacity: 1, duration: 0.2 }, 0.2);
      SRC.forEach((_, i) => {
        const line = iLines[i];
        const isLast = i === SRC.length - 1;
        tl.to(iPointer, { top: line.offsetTop, duration: 0.3 }, i === 0 ? 0.3 : ">+=0.2");
        tl.to(line, { backgroundColor: litBody, duration: 0.2 }, "<");
        // Only the final print line produces visible output.
        if (isLast) tl.to(iOuts[0], { opacity: 1, y: 0, duration: 0.3 }, ">");
        tl.to(line, { backgroundColor: "transparent", duration: 0.2 }, ">");
      });
      tl.to(iPointer, { opacity: 0, duration: 0.2 });
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
        {/* Compiler */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 text-xs font-medium uppercase tracking-wide text-accent">
            Compiler · translate all, then run
          </div>
          <div className="relative overflow-hidden rounded-lg border border-border p-3">
            <div className="c-scan pointer-events-none absolute inset-x-0 h-6 bg-accent/15" />
            <pre className="font-mono text-sm leading-7 text-foreground">
              {SRC.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </pre>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="c-exe inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-sm text-accent">
              ⚙ program.exe
            </span>
            <span className="c-out inline-flex rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 font-mono text-sm text-brand">
              ▶ 5
            </span>
          </div>
        </div>

        {/* Interpreter */}
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="mb-4 text-xs font-medium uppercase tracking-wide text-brand">
            Interpreter · run line by line
          </div>
          <div className="relative rounded-lg border border-border p-3 pl-6">
            <span className="i-pointer absolute left-1.5 text-brand">▸</span>
            <pre className="font-mono text-sm leading-7 text-foreground">
              {SRC.map((l, i) => (
                <div key={i} className="i-line -ml-2 rounded px-2">
                  {l}
                </div>
              ))}
            </pre>
          </div>
          <div className="mt-3 font-mono text-sm">
            {/* only the last line produces visible output */}
            <span className="i-out inline-flex rounded-lg border border-brand/40 bg-brand/10 px-3 py-1.5 text-brand">
              ▶ 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
