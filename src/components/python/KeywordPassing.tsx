"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Keyword passing: each argument names its target parameter, so position stops
 * mattering. The call lists them in reversed order, yet the connecting lines
 * cross to land each value on the right slot by name. Plays in view, with replay.
 */
export default function KeywordPassing() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const links = gsap.utils.toArray<SVGElement>(".kp-link");
      const params = gsap.utils.toArray<SVGElement>(".kp-param");
      const out = root.querySelector<HTMLElement>(".kp-out");
      if (!links.length) return;

      if (reducedMotion) {
        gsap.set(links, { opacity: 1 });
        gsap.set(params, { stroke: "var(--brand)" });
        if (out) gsap.set(out, { opacity: 1 });
        return;
      }

      gsap.set(links, { opacity: 0 });
      gsap.set(params, { stroke: "var(--border)" });
      if (out) gsap.set(out, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      links.forEach((link, i) => {
        tl.to(link, { opacity: 1, duration: 0.4 }, "+=0.45");
        if (params[i]) tl.to(params[i], { stroke: "var(--brand)", duration: 0.3 }, "<");
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
      <div className="mb-4 flex items-center justify-between">
        <code className="font-mono text-sm text-foreground">area(height=4, width=3)</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <svg viewBox="0 0 300 160" className="mx-auto w-full max-w-sm" role="img" aria-label="Keyword arguments matching parameters by name, with crossing lines">
        <g fontFamily="monospace" fontSize="13">
          {/* arguments (reversed order) */}
          <rect x="20" y="10" width="110" height="36" rx="8" fill="var(--background)" stroke="var(--border)" />
          <text x="75" y="33" textAnchor="middle" fill="var(--foreground)">height=4</text>
          <rect x="170" y="10" width="110" height="36" rx="8" fill="var(--background)" stroke="var(--border)" />
          <text x="225" y="33" textAnchor="middle" fill="var(--foreground)">width=3</text>

          {/* crossing links: height -> right slot, width -> left slot */}
          <line className="kp-link" x1="75" y1="48" x2="225" y2="112" stroke="var(--brand)" strokeWidth="2" />
          <line className="kp-link" x1="225" y1="48" x2="75" y2="112" stroke="var(--brand)" strokeWidth="2" />

          {/* parameters */}
          <rect className="kp-param" x="20" y="114" width="110" height="36" rx="8" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="2" />
          <text x="75" y="137" textAnchor="middle" fill="var(--foreground)">width</text>
          <rect className="kp-param" x="170" y="114" width="110" height="36" rx="8" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="2" />
          <text x="225" y="137" textAnchor="middle" fill="var(--foreground)">height</text>
        </g>
      </svg>

      <div className="kp-out mt-4 text-center font-mono text-sm text-brand">
        width = 3, height = 4 → area 12  (same as before!)
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Named at the call, each value finds its own parameter — so the order you
        write them no longer matters.
      </p>
    </div>
  );
}
