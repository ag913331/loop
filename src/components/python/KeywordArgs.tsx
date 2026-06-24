"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Keyword arguments reshape print without adding more values. `sep` sets what
 * goes between the values, `end` sets what comes after them. They appear in the
 * call one at a time and the output updates to match. Plays in view, with replay.
 */
export default function KeywordArgs() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const sepCode = root.querySelector(".kw-sep-code");
      const endCode = root.querySelector(".kw-end-code");
      const outSep = root.querySelector<HTMLElement>(".kw-out-sep");
      const outEnd = root.querySelector<HTMLElement>(".kw-out-end");
      const flash = "color-mix(in srgb, var(--accent) 30%, transparent)";

      if (reducedMotion) {
        gsap.set([sepCode, endCode], { opacity: 1 });
        if (outSep) outSep.textContent = "-";
        if (outEnd) outEnd.textContent = "!";
        return;
      }

      gsap.set([sepCode, endCode], { opacity: 0 });
      if (outSep) outSep.textContent = "·";
      if (outEnd) outEnd.textContent = "";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // sep="-" appears, the separator becomes a dash.
      tl.to(sepCode, { opacity: 1, duration: 0.4 }, "+=0.6");
      tl.call(() => {
        if (outSep) outSep.textContent = "-";
      });
      tl.fromTo(outSep, { backgroundColor: flash }, { backgroundColor: "transparent", duration: 0.6 }, "<");

      // end="!" appears, the line now ends with !.
      tl.to(endCode, { opacity: 1, duration: 0.4 }, "+=0.6");
      tl.call(() => {
        if (outEnd) outEnd.textContent = "!";
      });
      tl.fromTo(outEnd, { backgroundColor: flash, scale: 1.4 }, { backgroundColor: "transparent", scale: 1, duration: 0.5, ease: "back.out(2)" }, "<");
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
          sep and end
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <pre className="rounded-xl border border-border bg-background px-5 py-4 font-mono text-sm sm:text-base">
          <span className="text-brand">print</span>
          <span className="text-foreground">(</span>
          <span className="text-warn">&quot;a&quot;</span>
          <span className="text-foreground">, </span>
          <span className="text-warn">&quot;b&quot;</span>
          <span className="kw-sep-code text-accent">
            <span className="text-foreground">, </span>sep=
            <span className="text-warn">&quot;-&quot;</span>
          </span>
          <span className="kw-end-code text-accent">
            <span className="text-foreground">, </span>end=
            <span className="text-warn">&quot;!&quot;</span>
          </span>
          <span className="text-foreground">)</span>
        </pre>

        <span className="text-sm text-muted">↓</span>

        <div className="rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 font-mono text-base text-brand">
          a
          <span className="kw-out-sep mx-px inline-block rounded px-0.5">·</span>
          b<span className="kw-out-end inline-block rounded px-0.5" />
        </div>
        <span className="text-xs text-muted">
          <span className="font-mono text-foreground">sep</span> sits between
          values · <span className="font-mono text-foreground">end</span> comes
          after them (it&apos;s normally a new line)
        </span>
      </div>
    </div>
  );
}
