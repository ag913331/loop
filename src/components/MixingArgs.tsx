"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The one rule for mixing: positional arguments must come BEFORE any keyword
 * argument. A valid call lights up and earns a check; the invalid one (a bare
 * value after a named one) flashes red with the real SyntaxError. Plays in view.
 */
export default function MixingArgs() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const okMark = root.querySelector<HTMLElement>(".ma-ok");
      const badMark = root.querySelector<HTMLElement>(".ma-bad");
      const err = root.querySelector<HTMLElement>(".ma-err");
      const badTok = root.querySelector<HTMLElement>(".ma-badtok");

      const litOk = "color-mix(in srgb, var(--brand) 16%, transparent)";
      const litBad = "color-mix(in srgb, var(--danger) 18%, transparent)";

      if (reducedMotion) {
        gsap.set([okMark, badMark, err], { opacity: 1 });
        if (badTok) gsap.set(badTok, { backgroundColor: litBad, borderColor: "var(--danger)" });
        return;
      }

      gsap.set([okMark, badMark, err], { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // valid call earns its check
      tl.to(".ma-good .ma-tok", { backgroundColor: litOk, borderColor: "var(--brand)", duration: 0.25, stagger: 0.18 }, "+=0.4");
      tl.to(okMark, { opacity: 1, duration: 0.3 }, "+=0.1");

      // invalid call: the trailing positional is the problem
      tl.to(".ma-bad-row .ma-tok", { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.25, stagger: 0.18 }, "+=0.5");
      if (badTok) tl.to(badTok, { backgroundColor: litBad, borderColor: "var(--danger)", duration: 0.3 }, "+=0.1");
      tl.to(badMark, { opacity: 1, duration: 0.3 }, "<");
      tl.to(err, { opacity: 1, duration: 0.4 }, "+=0.1");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const tok =
    "ma-tok rounded-md border border-border bg-background px-2 py-1 font-mono text-sm text-foreground";

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Positional first, keyword after
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4">
        {/* valid */}
        <div className="ma-good flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-sm text-muted">greet(</span>
          <span className={tok}>&quot;Ada&quot;</span>
          <span className="font-mono text-sm text-muted">,</span>
          <span className={tok}>greeting=&quot;Hi&quot;</span>
          <span className="font-mono text-sm text-muted">)</span>
          <span className="ma-ok ml-2 font-mono text-sm text-brand">✓ positional, then keyword</span>
        </div>

        {/* invalid */}
        <div className="ma-bad-row flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-sm text-muted">greet(</span>
          <span className={tok}>name=&quot;Ada&quot;</span>
          <span className="font-mono text-sm text-muted">,</span>
          <span className={`${tok} ma-badtok`}>&quot;Hi&quot;</span>
          <span className="font-mono text-sm text-muted">)</span>
          <span className="ma-bad ml-2 font-mono text-sm text-danger">✗ positional after keyword</span>
        </div>

        <div className="ma-err rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 font-mono text-xs text-danger">
          SyntaxError: positional argument follows keyword argument
        </div>
      </div>
    </div>
  );
}
