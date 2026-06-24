"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const START = [1, 2, 3];

/**
 * Because a list is passed by reference, a function can change the caller's own
 * list. grow(nums) appends to the SAME list nums points at — so after the call,
 * the caller sees the new element too. A fourth box pops into the original row.
 * Callback to the aliasing lesson. Plays in view, with a replay.
 */
export default function ListInFunction() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const machine = root.querySelector<HTMLElement>(".lif-fn");
      const added = root.querySelector<HTMLElement>(".lif-added");
      const status = root.querySelector<HTMLElement>(".lif-status");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(added, { opacity: 1, scale: 1 });
        if (status) status.textContent = "nums is now [1, 2, 3, 4]";
        return;
      }

      gsap.set(added, { opacity: 0, scale: 0.6 });
      if (status) status.textContent = "nums = [1, 2, 3]";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.call(() => status && (status.textContent = "grow(nums) — pass the list in"), [], "+=0.6");
      tl.to(machine, { scale: 1.05, borderColor: "var(--brand)", backgroundColor: lit, duration: 0.25 }, "+=0.1");
      tl.call(() => status && (status.textContent = "lst.append(4) — same list!"), [], "+=0.4");
      tl.to(added, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.2)" }, "+=0.05");
      tl.to(machine, { scale: 1, borderColor: "var(--border)", backgroundColor: "var(--surface-2)", duration: 0.3 }, "<");
      tl.call(() => status && (status.textContent = "nums is now [1, 2, 3, 4]"), [], "+=0.3");
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
          A function can change the list you pass it
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="lif-fn rounded-xl border-2 border-border bg-surface-2 px-4 py-2 font-mono text-xs text-foreground">
          def grow(lst): lst.append(4)
        </div>

        <span className="text-xs text-muted">↓ the caller&apos;s list</span>

        <div className="flex items-end gap-2">
          <span className="mr-1 font-mono text-sm text-muted">nums =</span>
          {START.map((v) => (
            <span
              key={v}
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground"
            >
              {v}
            </span>
          ))}
          <span className="lif-added flex h-12 w-12 items-center justify-center rounded-lg border border-brand/50 bg-brand/10 font-mono text-base text-brand">
            4
          </span>
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="lif-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
