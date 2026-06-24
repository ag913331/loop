"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * The newline escape. The `\n` inside a string isn't printed literally — it
 * tells print to break to a new line. The `\n` is spotlit in the code, then the
 * output splits in two right where it sits. Plays in view, with a replay.
 */
export default function EscapeChars() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const nl = root.querySelector(".ec-nl");
      const line1 = root.querySelector(".ec-l1");
      const line2 = root.querySelector(".ec-l2");

      if (reducedMotion) {
        gsap.set([line1, line2], { opacity: 1, y: 0 });
        gsap.set(nl, { backgroundColor: "color-mix(in srgb, var(--accent) 28%, transparent)" });
        return;
      }

      gsap.set([line1, line2], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(nl, {
        backgroundColor: "color-mix(in srgb, var(--accent) 28%, transparent)",
        duration: 0.3,
      }, "+=0.3");
      tl.to(nl, { keyframes: { scale: [1, 1.2, 1] }, duration: 0.4 });
      tl.to(line1, { opacity: 1, y: 0, duration: 0.35 }, "+=0.2");
      tl.to(line2, { opacity: 1, y: 0, duration: 0.35 }, "+=0.15");
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
          \n means &ldquo;new line&rdquo;
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <pre className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span className="text-warn">&quot;Line 1</span>
          <span
            className="ec-nl inline-block rounded px-0.5 text-accent"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            \n
          </span>
          <span className="text-warn">Line 2&quot;</span>
          <span className="text-foreground">)</span>
        </pre>

        <div className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <div className="mb-2 text-xs text-muted">output</div>
          <div className="ec-l1 text-foreground">Line 1</div>
          <div className="ec-l2 text-foreground">Line 2</div>
        </div>
      </div>
    </div>
  );
}
