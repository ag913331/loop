"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * "Commenting out": all three lines run at first, then a `#` slides in front of
 * the middle one. That line dims to a comment, and its output disappears — the
 * code is switched off without being deleted. Plays in view, with a replay.
 */
export default function CommentOut() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const hash = root.querySelector(".co-hash");
      const line2 = root.querySelector(".co-line2");
      const out2 = root.querySelector(".co-out2");

      if (reducedMotion) {
        gsap.set(hash, { opacity: 1, x: 0 });
        gsap.set(line2, { opacity: 0.4 });
        gsap.set(out2, { height: 0, opacity: 0 });
        return;
      }

      gsap.set(hash, { opacity: 0, x: -8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // the # slides in
      tl.to(hash, { opacity: 1, x: 0, duration: 0.4 }, "+=0.8");
      // the line dims to a comment
      tl.to(line2, { opacity: 0.4, color: "var(--muted)", duration: 0.4 }, ">-0.1");
      // its output collapses away
      tl.to(out2, { height: 0, opacity: 0, duration: 0.45, ease: "power2.inOut" }, "+=0.2");
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
          Switch a line off, keep it around
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
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;one&quot;</span>
            <span className="text-foreground">)</span>
          </div>
          <div className="co-line2 -ml-3 pl-3">
            <span className="co-hash text-muted">#&nbsp;</span>
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;two&quot;</span>
            <span className="text-foreground">)</span>
          </div>
          <div>
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;three&quot;</span>
            <span className="text-foreground">)</span>
          </div>
        </pre>

        <div className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <div className="mb-2 text-xs text-muted">output</div>
          <div className="text-brand">one</div>
          <div className="co-out2 overflow-hidden text-brand">two</div>
          <div className="text-brand">three</div>
        </div>
      </div>
    </div>
  );
}
