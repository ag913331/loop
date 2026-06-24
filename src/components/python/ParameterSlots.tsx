"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const PARAMS = [
  { name: "name", value: '"Ada"' },
  { name: "greeting", value: '"Hi"' },
];

/**
 * Parameter vs argument: the def lists empty named slots (parameters); the call
 * supplies the values (arguments) that fill them. Each argument flies up into
 * its slot, then the body runs with real values. Plays in view, with a replay.
 */
export default function ParameterSlots() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const slots = gsap.utils.toArray<HTMLElement>(".ps-slot");
      const vals = gsap.utils.toArray<HTMLElement>(".ps-val");
      const args = gsap.utils.toArray<HTMLElement>(".ps-arg");
      const out = root.querySelector<HTMLElement>(".ps-out");
      if (slots.length !== PARAMS.length) return;

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(vals, { opacity: 1, y: 0 });
        gsap.set(slots, { borderColor: "var(--brand)" });
        if (out) gsap.set(out, { opacity: 1 });
        return;
      }

      gsap.set(vals, { opacity: 0, y: -10 });
      gsap.set(slots, { borderColor: "var(--border)", backgroundColor: "var(--background)" });
      if (out) gsap.set(out, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      PARAMS.forEach((_, i) => {
        tl.to(args[i], { scale: 1.08, color: "var(--brand)", duration: 0.25 }, "+=0.4");
        tl.to(slots[i], { borderColor: "var(--brand)", backgroundColor: lit, duration: 0.3 }, "<");
        tl.to(vals[i], { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, "<");
        tl.to(args[i], { scale: 1, color: "var(--foreground)", duration: 0.2 }, "+=0.1");
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
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Arguments fill parameters
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      {/* the def, with parameter slots */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-end justify-center gap-2 font-mono text-sm">
          <span className="text-accent">def</span>
          <span className="text-foreground">greet(</span>
          {PARAMS.map((p, i) => (
            <span key={p.name} className="flex items-end gap-1">
              <span className="ps-slot flex min-w-20 flex-col items-center rounded-lg border border-border bg-background px-3 py-1.5">
                <span className="text-xs text-muted">{p.name}</span>
                <span className="ps-val text-sm text-brand">{p.value}</span>
              </span>
              {i < PARAMS.length - 1 && <span className="text-foreground">,</span>}
            </span>
          ))}
          <span className="text-foreground">):</span>
        </div>

        <span className="text-xs text-muted">▲ parameters (named slots) · arguments (values) ▼</span>

        {/* the call, with argument values */}
        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-sm text-foreground">
          <span>greet(</span>
          {PARAMS.map((p, i) => (
            <span key={p.name} className="flex items-center gap-1">
              <span className="ps-arg rounded-md border border-border bg-surface-2 px-2 py-1">
                {p.value}
              </span>
              {i < PARAMS.length - 1 && <span>,</span>}
            </span>
          ))}
          <span>)</span>
        </div>
      </div>

      <div className="ps-out mt-5 text-center font-mono text-sm text-brand">
        → prints: Hi, Ada!
      </div>
    </div>
  );
}
