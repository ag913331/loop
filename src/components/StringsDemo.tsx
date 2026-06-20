"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * A string is text wrapped in quotes. The quotes are markers — they show where
 * the text begins and ends but aren't part of the value. The quotes pulse, the
 * text is spotlit, and single vs double is shown equal. Plays in view, replay.
 */
export default function StringsDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const quotes = gsap.utils.toArray<HTMLElement>(".str-quote");
      const text = root.querySelector(".str-text");
      const label = root.querySelector(".str-label");
      const equal = root.querySelector(".str-equal");

      if (reducedMotion) {
        gsap.set([label, equal], { opacity: 1, y: 0 });
        gsap.set(text, { backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)" });
        return;
      }

      gsap.set([label, equal], { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(quotes, { color: "var(--accent)", keyframes: { scale: [1, 1.5, 1] }, duration: 0.5, stagger: 0.15 }, "+=0.3");
      tl.to(text, {
        backgroundColor: "color-mix(in srgb, var(--brand) 18%, transparent)",
        duration: 0.3,
      }, "+=0.1");
      tl.to(label, { opacity: 1, y: 0, duration: 0.4 });
      tl.to(equal, { opacity: 1, y: 0, duration: 0.4 }, "+=0.3");
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
          Text between quotes
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-border bg-background px-6 py-4 font-mono text-2xl">
          <span className="str-quote inline-block text-muted">&quot;</span>
          <span className="str-text rounded px-1 text-foreground">hello</span>
          <span className="str-quote inline-block text-muted">&quot;</span>
        </div>
        <span className="str-label max-w-sm text-center text-xs text-muted">
          The quotes mark where the text starts and ends — they&apos;re not part
          of the value. The string is just <span className="text-brand">hello</span>.
        </span>

        <div className="str-equal mt-2 flex items-center gap-3 font-mono text-sm">
          <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-foreground">
            &apos;hi&apos;
          </span>
          <span className="text-muted">is the same as</span>
          <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-foreground">
            &quot;hi&quot;
          </span>
        </div>
        <span className="str-equal text-xs text-muted">
          single or double quotes — your choice, just match them
        </span>
      </div>
    </div>
  );
}
