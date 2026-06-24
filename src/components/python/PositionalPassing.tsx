"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

// def area(width, height) called as area(3, 4) — matched by position
const PARAMS = ["width", "height"];
const ARGS = ["3", "4"];

/**
 * Positional passing: arguments fill parameters strictly left-to-right, by their
 * position. Index badges line up arg 0 → first parameter, arg 1 → second, and a
 * line connects each pair. The order is the whole meaning. Plays in view, replay.
 */
export default function PositionalPassing() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const argEls = gsap.utils.toArray<HTMLElement>(".pp-arg");
      const paramEls = gsap.utils.toArray<HTMLElement>(".pp-param");
      const links = gsap.utils.toArray<HTMLElement>(".pp-link");
      const out = root.querySelector<HTMLElement>(".pp-out");
      if (argEls.length !== ARGS.length) return;

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(links, { opacity: 1 });
        gsap.set(paramEls, { borderColor: "var(--brand)", backgroundColor: lit });
        if (out) gsap.set(out, { opacity: 1 });
        return;
      }

      gsap.set(links, { opacity: 0 });
      gsap.set(paramEls, { borderColor: "var(--border)", backgroundColor: "var(--background)" });
      if (out) gsap.set(out, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      ARGS.forEach((_, i) => {
        tl.to(argEls[i], { borderColor: "var(--brand)", backgroundColor: lit, duration: 0.3 }, "+=0.45");
        tl.to(links[i], { opacity: 1, duration: 0.3 }, "<");
        tl.to(paramEls[i], { borderColor: "var(--brand)", backgroundColor: lit, duration: 0.3 }, "<");
      });
      if (out) tl.to(out, { opacity: 1, duration: 0.4 }, "+=0.3");
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
      <div className="mb-6 flex items-center justify-between">
        <code className="font-mono text-sm text-foreground">area(3, 4)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-sm flex-col gap-2">
        {/* arguments row */}
        <div className="flex justify-around">
          {ARGS.map((a, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted">position {i}</span>
              <span className="pp-arg flex h-11 w-16 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground">
                {a}
              </span>
            </div>
          ))}
        </div>

        {/* connectors */}
        <div className="flex justify-around">
          {ARGS.map((_, i) => (
            <span key={i} className="pp-link font-mono text-lg text-brand">
              ↓
            </span>
          ))}
        </div>

        {/* parameters row */}
        <div className="flex justify-around">
          {PARAMS.map((p, i) => (
            <span
              key={p}
              className="pp-param flex h-11 w-16 items-center justify-center rounded-lg border border-border bg-background font-mono text-sm text-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="pp-out mt-5 text-center font-mono text-sm text-brand">
        width = 3, height = 4 → area 12
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Swap the call to <span className="font-mono text-foreground">area(4, 3)</span>{" "}
        and now width is 4 — position <em>is</em> the meaning.
      </p>
    </div>
  );
}
