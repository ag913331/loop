"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const CHECKS = ["3 + 4 > 5", "3 + 5 > 4", "4 + 5 > 3"];

/**
 * Three sides make a triangle only if each pair is longer than the third side
 * (the triangle inequality). The three checks turn green one by one, then the
 * 3-4-5 triangle draws itself. Plays in view, with a replay.
 */
export default function TriangleCheck() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const checks = gsap.utils.toArray<HTMLElement>(".tc-check");
      const tri = root.querySelector<SVGElement>(".tc-tri");
      const status = root.querySelector<HTMLElement>(".tc-status");

      const ok = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(checks, { backgroundColor: ok, borderColor: "var(--brand)" });
        gsap.set(tri, { opacity: 1 });
        if (status) status.textContent = "all three hold → it's a triangle";
        return;
      }

      gsap.set(checks, { backgroundColor: "var(--background)", borderColor: "var(--border)" });
      gsap.set(tri, { opacity: 0 });
      if (status) status.textContent = "test the triangle inequality…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      checks.forEach((c, i) => {
        tl.to(c, { backgroundColor: ok, borderColor: "var(--brand)", duration: 0.3 }, "+=0.45");
        tl.call(() => status && (status.textContent = `${CHECKS[i]} ✓`), [], "<");
      });
      tl.call(() => status && (status.textContent = "all three hold → draw it"), [], "+=0.3");
      tl.to(tri, { opacity: 1, duration: 0.5 }, "+=0.1");
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
        <code className="font-mono text-sm text-foreground">is_triangle(3, 4, 5)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-5 sm:grid-cols-2">
        {/* the three inequality checks */}
        <div className="flex flex-col gap-2">
          {CHECKS.map((c) => (
            <span
              key={c}
              className="tc-check rounded-lg border border-border bg-background px-3 py-2 text-center font-mono text-sm text-foreground"
            >
              {c}
            </span>
          ))}
        </div>

        {/* the triangle */}
        <svg viewBox="0 0 160 130" className="mx-auto w-40" role="img" aria-label="A 3-4-5 triangle">
          <polygon
            className="tc-tri"
            points="20,110 140,110 20,20"
            fill="color-mix(in srgb, var(--brand) 12%, transparent)"
            stroke="var(--brand)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <g fontFamily="monospace" fontSize="12" fill="var(--muted)" className="tc-tri">
            <text x="78" y="125" textAnchor="middle">4</text>
            <text x="8" y="68" textAnchor="middle">3</text>
            <text x="88" y="60">5</text>
          </g>
        </svg>
      </div>

      <div className="mt-5 text-center">
        <span className="tc-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
