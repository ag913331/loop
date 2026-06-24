"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [3, 2, 1]; // n while n > 0

/**
 * A while loop as a cycle: check the condition, run the body, loop back, check
 * again. Counting down from 3, n falls 3 → 2 → 1 → 0; when n > 0 finally turns
 * False, the loop exits. Plays in view, with a replay.
 */
export default function WhileLoop() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const cond = root.querySelector<HTMLElement>(".wl-cond");
      const body = gsap.utils.toArray<HTMLElement>(".wl-body");
      const nVal = root.querySelector<HTMLElement>(".wl-n");
      const badge = root.querySelector<HTMLElement>(".wl-badge");
      const outs = gsap.utils.toArray<HTMLElement>(".wl-out");
      const loopArrow = root.querySelector(".wl-arrow");
      if (!nVal || !badge) return;

      const litC = "color-mix(in srgb, var(--accent) 20%, transparent)";
      const litB = "color-mix(in srgb, var(--brand) 18%, transparent)";
      const setBadge = (t: string, ok: boolean) => {
        badge.textContent = t;
        badge.style.color = ok ? "var(--brand)" : "var(--danger)";
      };

      if (reducedMotion) {
        nVal.textContent = "0";
        setBadge("False", false);
        gsap.set(outs, { opacity: 1 });
        return;
      }

      nVal.textContent = "3";
      setBadge("?", true);
      gsap.set(outs, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      VALUES.forEach((v, i) => {
        // check condition -> True
        tl.to(cond, { backgroundColor: litC, duration: 0.25 }, "+=0.4");
        tl.call(() => setBadge("True", true));
        // run body: print n, then decrease
        tl.to(body[0], { backgroundColor: litB, duration: 0.25 }, "+=0.2");
        tl.to(outs[i], { opacity: 1, duration: 0.3 }, "<");
        tl.to(body[0], { backgroundColor: "transparent", duration: 0.2 }, "+=0.15");
        tl.to(body[1], { backgroundColor: litB, duration: 0.25 });
        tl.call(() => (nVal.textContent = String(v - 1)));
        tl.fromTo(nVal, { scale: 1.4 }, { scale: 1, duration: 0.3 }, "<");
        tl.to(body[1], { backgroundColor: "transparent", duration: 0.2 }, "+=0.15");
        tl.to(cond, { backgroundColor: "transparent", duration: 0.2 }, "<");
        // loop back
        tl.to(loopArrow, { keyframes: { rotate: [0, 360] }, duration: 0.5 }, "<");
      });

      // final check -> False -> exit
      tl.to(cond, { backgroundColor: litC, duration: 0.25 }, "+=0.4");
      tl.call(() => setBadge("False", false));
      tl.to(cond, { backgroundColor: "transparent", duration: 0.3 }, "+=0.4");
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
          Repeat while the condition holds
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7">
          <div>
            <span className="text-muted">n</span>
            <span className="text-foreground"> = </span>
            <span className="text-warn">3</span>
          </div>
          <div>
            <span className="text-accent">while</span>{" "}
            <span className="wl-cond -mx-1 rounded px-1 text-foreground">
              n &gt; 0
            </span>
            <span className="text-foreground">:</span>
            <span className="wl-badge ml-2 rounded bg-surface-2 px-1.5 text-xs">
              ?
            </span>
          </div>
          <div className="wl-body -mx-1 rounded px-1 pl-6">
            <span className="text-brand">print</span>
            <span className="text-foreground">(n)</span>
          </div>
          <div className="wl-body -mx-1 rounded px-1 pl-6">
            <span className="text-foreground">n -= </span>
            <span className="text-warn">1</span>
          </div>
        </pre>

        <div className="flex items-center justify-around gap-3">
          <div className="flex flex-col items-center gap-2">
            <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
              n
            </span>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
              <span className="wl-n font-mono text-2xl text-brand">3</span>
            </div>
            <span className="wl-arrow text-lg text-muted">↻</span>
          </div>
          <div className="rounded-xl border border-border bg-background p-3 font-mono text-sm leading-7">
            <div className="mb-1 text-xs text-muted">output</div>
            {VALUES.map((v) => (
              <div key={v} className="wl-out text-brand">
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
