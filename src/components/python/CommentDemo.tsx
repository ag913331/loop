"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * A comment is text Python skips. Everything from `#` to the end of the line is
 * spotlit, then fades to "ignored"; only the real code runs and produces output.
 * Plays in view, with a replay.
 */
export default function CommentDemo() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const comments = gsap.utils.toArray<HTMLElement>(".cm-comment");
      const codeLine = root.querySelector(".cm-codeline");
      const out = root.querySelector(".cm-out");
      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(comments, { opacity: 0.4 });
        gsap.set(out, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(out, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // spotlight the comments...
      tl.to(comments, {
        backgroundColor: "color-mix(in srgb, var(--muted) 22%, transparent)",
        duration: 0.3,
        stagger: 0.15,
      }, "+=0.3");
      // ...then dim them away — Python ignores them
      tl.to(comments, { opacity: 0.35, backgroundColor: "transparent", duration: 0.5 }, "+=0.3");
      // run the real code
      tl.to(codeLine, { backgroundColor: lit, duration: 0.25 }, "+=0.2");
      tl.to(out, { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      tl.to(codeLine, { backgroundColor: "transparent", duration: 0.25 }, "+=0.2");
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
          Everything after # is ignored
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
          <div className="cm-comment -mx-1 rounded px-1 text-muted">
            # Greet the user
          </div>
          <div className="cm-codeline -mx-1 rounded px-1">
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;Hi&quot;</span>
            <span className="text-foreground">)</span>
            <span className="cm-comment ml-2 rounded px-1 text-muted">
              # show it on screen
            </span>
          </div>
        </pre>

        <div className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <div className="mb-2 text-xs text-muted">output</div>
          <div className="cm-out text-brand">Hi</div>
        </div>
      </div>
    </div>
  );
}
