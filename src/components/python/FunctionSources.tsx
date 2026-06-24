"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const SOURCES = [
  { from: "built into Python", example: "print()  len()  input()" },
  { from: "from a module", example: "math.sqrt()  random.randint()" },
  { from: "written by you", example: "def greet(): ..." },
];

/**
 * The three places functions come from — built in, imported from a module, or
 * written by you — all leading to the same thing: something you can call. Each
 * source lights up in turn and flows to the shared "call it" box. Plays in view.
 */
export default function FunctionSources() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".fs-row");
      const target = root.querySelector<HTMLElement>(".fs-call");
      if (!target || rows.length !== SOURCES.length) return;

      const lit = "color-mix(in srgb, var(--accent) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        gsap.set(target, { borderColor: "var(--brand)" });
        return;
      }

      gsap.set(rows, { opacity: 0.35, x: -10 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      rows.forEach((rowEl) => {
        tl.to(rowEl, { opacity: 1, x: 0, backgroundColor: lit, borderColor: "var(--accent)", duration: 0.35 }, "+=0.4");
        tl.to(target, { scale: 1.04, borderColor: "var(--brand)", duration: 0.2 }, "-=0.05");
        tl.to(target, { scale: 1, duration: 0.2 });
        tl.to(rowEl, { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.3 }, "+=0.2");
      });
      tl.to(target, { borderColor: "var(--brand)", duration: 0.3 });
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
          Three sources, one way to call
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_auto]">
        <div className="flex flex-col gap-2">
          {SOURCES.map((s) => (
            <div
              key={s.from}
              className="fs-row rounded-lg border border-border bg-background px-3 py-2"
            >
              <div className="text-xs text-muted">{s.from}</div>
              <div className="font-mono text-sm text-foreground">{s.example}</div>
            </div>
          ))}
        </div>

        <span className="hidden text-muted sm:block">→</span>

        <div className="fs-call rounded-xl border-2 border-border bg-surface-2 px-5 py-4 text-center">
          <div className="text-2xl">📞</div>
          <div className="mt-1 font-mono text-xs text-foreground">call it!</div>
        </div>
      </div>
    </div>
  );
}
