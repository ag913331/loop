"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * A first program that actually does something: it remembers a value in a
 * variable, then uses it. As each line runs, the highlight steps down, the
 * `name` box fills, and the output appears — showing that a program can store
 * data and reuse it, not just print fixed text. Plays in view, with a replay.
 */
export default function FirstProgramBuild() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const lines = gsap.utils.toArray<HTMLElement>(".fpb-line");
      const val = root.querySelector(".fpb-val");
      const outs = gsap.utils.toArray<HTMLElement>(".fpb-out");
      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([val, ...outs], { opacity: 1, scale: 1, y: 0 });
        gsap.set(lines, { backgroundColor: "transparent" });
        return;
      }

      gsap.set(val, { opacity: 0, scale: 0.5 });
      gsap.set(outs, { opacity: 0, y: 6 });
      gsap.set(lines, { backgroundColor: "transparent" });

      const runLine = (tl: gsap.core.Timeline, i: number) => {
        tl.to(lines[i], { backgroundColor: lit, duration: 0.25 }, "+=0.25");
        tl.to(lines[i], { backgroundColor: "transparent", duration: 0.25 }, "+=0.45");
      };

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Line 1: store "Ada" in name — the box fills.
      tl.to(lines[0], { backgroundColor: lit, duration: 0.25 }, "+=0.3");
      tl.to(val, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.15");
      tl.to(lines[0], { backgroundColor: "transparent", duration: 0.25 }, "+=0.3");

      // Line 2: greet using name.
      tl.to(lines[1], { backgroundColor: lit, duration: 0.25 }, "+=0.25");
      tl.to(outs[0], { opacity: 1, y: 0, duration: 0.35 }, "+=0.15");
      tl.to(lines[1], { backgroundColor: "transparent", duration: 0.25 }, "+=0.3");

      // Line 3: a second line of output.
      tl.to(lines[2], { backgroundColor: lit, duration: 0.25 }, "+=0.25");
      tl.to(outs[1], { opacity: 1, y: 0, duration: 0.35 }, "+=0.15");
      tl.to(lines[2], { backgroundColor: "transparent", duration: 0.25 }, "+=0.3");
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
          A program that remembers
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
          <Chrome label="greet.py" />
          <pre className="p-4 font-mono text-sm leading-7">
            <div className="fpb-line -mx-2 rounded px-2">
              <span className="text-foreground">name</span>
              <span className="text-muted"> = </span>
              <span className="text-warn">&quot;Ada&quot;</span>
            </div>
            <div className="fpb-line -mx-2 rounded px-2">
              <span className="text-brand">print</span>
              <span className="text-foreground">(</span>
              <span className="text-warn">&quot;Hello,&quot;</span>
              <span className="text-foreground">, name)</span>
            </div>
            <div className="fpb-line -mx-2 rounded px-2">
              <span className="text-brand">print</span>
              <span className="text-foreground">(</span>
              <span className="text-warn">&quot;Welcome to Python!&quot;</span>
              <span className="text-foreground">)</span>
            </div>
          </pre>
        </div>

        {/* memory + terminal */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-muted">
              Memory
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-foreground">name</span>
              <span className="text-muted">→</span>
              <span className="fpb-val rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-brand">
                &quot;Ada&quot;
              </span>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            <Chrome label="Terminal" />
            <div className="p-4 font-mono text-sm leading-7">
              <div className="text-muted">$ python greet.py</div>
              <div className="fpb-out text-brand">Hello, Ada</div>
              <div className="fpb-out text-brand">Welcome to Python!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
