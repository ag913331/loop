"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const VALUES = [3, 8, 1, 6, 9];
const TARGET = 6;
const TARGET_I = VALUES.indexOf(TARGET);

/**
 * `6 in nums` — the membership test, shown as a scan. A check sweeps left to
 * right, lighting each box as Python compares it to 6; mismatches dim, the match
 * locks green and the scan stops early with True. Plays in view, with a replay.
 */
export default function InOperator() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const boxes = gsap.utils.toArray<HTMLElement>(".in-box");
      const status = root.querySelector<HTMLElement>(".in-status");
      if (!status || boxes.length !== VALUES.length) return;

      const lit = "color-mix(in srgb, var(--accent) 20%, transparent)";
      const hit = "color-mix(in srgb, var(--brand) 22%, transparent)";

      gsap.set(boxes, { borderColor: "var(--border)", backgroundColor: "var(--background)" });

      if (reducedMotion) {
        gsap.set(boxes[TARGET_I], { borderColor: "var(--brand)", backgroundColor: hit });
        status.textContent = "6 in nums  →  True";
        return;
      }

      status.textContent = "6 in nums  ?";
      const tl = gsap.timeline();

      for (let i = 0; i <= TARGET_I; i++) {
        const match = VALUES[i] === TARGET;
        tl.to(boxes[i], { borderColor: "var(--accent)", backgroundColor: lit, duration: 0.25 }, "+=0.4");
        tl.call(
          () =>
            (status.textContent = match
              ? `${VALUES[i]} == 6  →  found it`
              : `${VALUES[i]} == 6 ?  no`),
          [],
          "<",
        );
        if (!match) {
          tl.to(boxes[i], { borderColor: "var(--border)", backgroundColor: "var(--background)", duration: 0.25 }, "+=0.3");
        }
      }

      tl.to(boxes[TARGET_I], { borderColor: "var(--brand)", backgroundColor: hit, duration: 0.3 }, "+=0.05");
      tl.call(() => (status.textContent = "6 in nums  →  True"), [], "+=0.2");
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
        <code className="font-mono text-sm text-foreground">6 in nums</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex justify-center">
        <div className="flex gap-2">
          {VALUES.map((v, i) => (
            <span
              key={i}
              className="in-box flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="in-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
