"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const PARTS = [
  { label: "x", value: "3" },
  { label: "y", value: "4" },
];

/**
 * Tuple unpacking: x, y = point spreads the tuple's items into separate
 * variables by position. Each value drops from the tuple into its variable box.
 * Plays in view, with a replay.
 */
export default function TupleUnpack() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const links = gsap.utils.toArray<HTMLElement>(".tu-link");
      const vals = gsap.utils.toArray<HTMLElement>(".tu-val");
      const status = root.querySelector<HTMLElement>(".tu-status");
      if (vals.length !== PARTS.length) return;

      if (reducedMotion) {
        gsap.set(links, { opacity: 1 });
        gsap.set(vals, { opacity: 1, y: 0 });
        if (status) status.textContent = "x = 3, y = 4";
        return;
      }

      gsap.set(links, { opacity: 0 });
      gsap.set(vals, { opacity: 0, y: -10 });
      if (status) status.textContent = "x, y = point";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      PARTS.forEach((p, i) => {
        tl.to(links[i], { opacity: 1, duration: 0.3 }, "+=0.45");
        tl.to(vals[i], { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, "<");
        tl.call(() => status && (status.textContent = `${p.label} = ${p.value}`), [], "<");
      });
      tl.call(() => status && (status.textContent = "x = 3, y = 4"), [], "+=0.2");
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
        <code className="font-mono text-sm text-foreground">x, y = point</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
        {/* the tuple */}
        <div className="flex items-center gap-1 font-mono text-sm">
          <span className="text-muted">point =</span>
          <span className="rounded-md border border-border bg-background px-2 py-1 text-foreground">
            ({PARTS.map((p) => p.value).join(", ")})
          </span>
        </div>

        {/* connectors */}
        <div className="flex w-full justify-around">
          {PARTS.map((_, i) => (
            <span key={i} className="tu-link text-lg text-brand">↓</span>
          ))}
        </div>

        {/* the variables */}
        <div className="flex w-full justify-around">
          {PARTS.map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted">{p.label}</span>
              <span className="tu-val flex h-12 w-12 items-center justify-center rounded-lg border border-brand/50 bg-brand/10 font-mono text-base text-brand">
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        The same trick powers the one-line swap{" "}
        <span className="font-mono text-foreground">a, b = b, a</span>{" "}— pack on the
        right, unpack on the left.
      </p>
    </div>
  );
}
