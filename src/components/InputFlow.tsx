"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const TYPED = "Ada".split("");

/**
 * input() pauses the program, shows its prompt, and waits. The user types a
 * line, presses Enter, and that text becomes the function's result — stored in
 * the variable. Plays in view, with a replay.
 */
export default function InputFlow() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const prompt = root.querySelector(".in-prompt");
      const chars = gsap.utils.toArray<HTMLElement>(".in-char");
      const cursor = root.querySelector(".in-cursor");
      const boxVal = root.querySelector(".in-box-val");

      if (reducedMotion) {
        gsap.set([prompt, ...chars, boxVal], { opacity: 1 });
        gsap.set(cursor, { opacity: 0 });
        return;
      }

      gsap.set([prompt, ...chars, boxVal], { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(prompt, { opacity: 1, duration: 0.4 }, "+=0.2");
      tl.to(cursor, { opacity: 1, duration: 0.1 });
      // typing
      tl.to(chars, { opacity: 1, duration: 0.08, stagger: 0.18 }, "+=0.3");
      // Enter -> value lands in the box
      tl.to(cursor, { opacity: 0, duration: 0.2 }, "+=0.3");
      tl.to(boxVal, { opacity: 1, duration: 0.4, ease: "back.out(2)" }, "<");
      tl.fromTo(boxVal, { scale: 1.4 }, { scale: 1, duration: 0.35 }, "<");
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
        <code className="font-mono text-sm text-foreground">
          name = input(&quot;What&apos;s your name? &quot;)
        </code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
          <span className="in-prompt text-muted">What&apos;s your name?&nbsp;</span>
          <span className="text-foreground">
            {TYPED.map((c, i) => (
              <span key={i} className="in-char">
                {c}
              </span>
            ))}
          </span>
          <span className="in-cursor ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-foreground align-middle" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-mono text-sm text-foreground">
            name
          </span>
          <div className="flex h-16 w-28 items-center justify-center rounded-xl border-2 border-dashed border-brand/50 bg-background">
            <span className="in-box-val font-mono text-lg text-warn">
              &quot;Ada&quot;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
