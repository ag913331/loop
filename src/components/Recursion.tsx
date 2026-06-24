"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// frames top→bottom: fact(4), fact(3), fact(2), fact(1)=base
const FRAMES = [
  { n: 4, body: "4 * fact(3)" },
  { n: 3, body: "3 * fact(2)" },
  { n: 2, body: "2 * fact(1)" },
];
// return phase, bottom-up: fact(2)=2, fact(3)=6, fact(4)=24
const RETURNS = [
  { idx: 2, val: "2", expr: "2 × 1" },
  { idx: 1, val: "6", expr: "3 × 2" },
  { idx: 0, val: "24", expr: "4 × 6" },
];

/**
 * Recursion as a call stack. factorial(4) calls deeper and deeper, pushing a
 * frame each time, until fact(1) hits the base case. Then the results flow back
 * UP — 1 → 2 → 6 → 24 — each frame finishing as its inner call returns. The
 * centerpiece of the section. Plays in view, with a replay.
 */
export default function Recursion() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const frames = gsap.utils.toArray<HTMLElement>(".rc-frame");
      const base = root.querySelector<HTMLElement>(".rc-base");
      const resSlots = gsap.utils.toArray<HTMLElement>(".rc-res");
      const status = root.querySelector<HTMLElement>(".rc-status");

      const hit = "color-mix(in srgb, var(--brand) 20%, transparent)";

      if (reducedMotion) {
        gsap.set([...frames, base], { opacity: 1, y: 0 });
        RETURNS.forEach((r) => (resSlots[r.idx].textContent = r.val));
        if (status) status.textContent = "factorial(4) = 24";
        return;
      }

      gsap.set([...frames, base], { opacity: 0, y: -10 });
      resSlots.forEach((s) => (s.textContent = "?"));
      if (status) status.textContent = "factorial(4) — calling deeper…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // PUSH: reveal each frame going down, then the base
      frames.forEach((f, i) => {
        tl.to(f, { opacity: 1, y: 0, duration: 0.35 }, "+=0.45");
        tl.call(() => status && (status.textContent = `fact(${FRAMES[i].n}) needs fact(${FRAMES[i].n - 1})…`), [], "<");
      });
      tl.to(base, { opacity: 1, y: 0, duration: 0.4 }, "+=0.45");
      tl.call(() => status && (status.textContent = "fact(1) = 1 — base case! now return up"), [], "<");
      tl.to(base, { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.1");

      // RETURN: fill results bottom-up
      RETURNS.forEach((r) => {
        tl.call(() => status && (status.textContent = `fact(${FRAMES[r.idx].n}) = ${r.expr} = ${r.val}`), [], "+=0.6");
        tl.to(frames[r.idx], { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.05");
        tl.call(() => (resSlots[r.idx].textContent = r.val));
        tl.fromTo(resSlots[r.idx], { scale: 1.4, color: "var(--brand)" }, { scale: 1, duration: 0.35 }, "<");
      });
      tl.call(() => status && (status.textContent = "factorial(4) = 24"), [], "+=0.3");
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
          Down to the base case, then back up
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-sm flex-col gap-2">
        {FRAMES.map((f, i) => (
          <div
            key={f.n}
            className="rc-frame flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
            style={{ marginLeft: i * 14 }}
          >
            <span className="text-foreground">
              fact({f.n}) = {f.body}
            </span>
            <span className="rc-res ml-2 flex h-7 min-w-9 items-center justify-center rounded-md border border-brand/50 bg-brand/10 px-1 text-brand">
              ?
            </span>
          </div>
        ))}
        <div
          className="rc-base rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground"
          style={{ marginLeft: FRAMES.length * 14 }}
        >
          fact(1) = 1 &nbsp;<span className="text-muted"># base case</span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="rc-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
