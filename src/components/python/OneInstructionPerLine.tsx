"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Python's one-instruction-per-line rule. Two print calls jammed onto a single
 * line raise a SyntaxError; split across two lines they run fine. The wrong way
 * appears first with its error, then the right way with its output. In view.
 */
export default function OneInstructionPerLine() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const badErr = root.querySelector(".oip-bad-err");
      const good = root.querySelector(".oip-good");
      const goodOut = root.querySelector(".oip-good-out");

      if (reducedMotion) {
        gsap.set([badErr, good, goodOut], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([badErr, good, goodOut], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(badErr, { opacity: 1, y: 0, duration: 0.4 }, "+=0.4");
      tl.to(good, { opacity: 1, y: 0, duration: 0.4 }, "+=0.7");
      tl.to(goodOut, { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");
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
          One line, one instruction
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* the wrong way */}
        <div className="rounded-xl border border-danger/40 bg-background p-4">
          <div className="mb-2 text-xs font-semibold text-danger">
            ✗ Two on one line
          </div>
          <pre className="font-mono text-[13px] leading-6 text-foreground">
            <span className="text-brand">print</span>(
            <span className="text-warn">&quot;Hi&quot;</span>){" "}
            <span className="text-brand">print</span>(
            <span className="text-warn">&quot;Bye&quot;</span>)
          </pre>
          <div className="oip-bad-err mt-3 font-mono text-xs text-danger">
            SyntaxError: invalid syntax
          </div>
        </div>

        {/* the right way */}
        <div className="oip-good rounded-xl border border-brand/40 bg-background p-4">
          <div className="mb-2 text-xs font-semibold text-brand">
            ✓ One per line
          </div>
          <pre className="font-mono text-[13px] leading-6 text-foreground">
            <div>
              <span className="text-brand">print</span>(
              <span className="text-warn">&quot;Hi&quot;</span>)
            </div>
            <div>
              <span className="text-brand">print</span>(
              <span className="text-warn">&quot;Bye&quot;</span>)
            </div>
          </pre>
          <div className="oip-good-out mt-3 font-mono text-xs text-brand">
            Hi
            <br />
            Bye
          </div>
        </div>
      </div>
    </div>
  );
}
