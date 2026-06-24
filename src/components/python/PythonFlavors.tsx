"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const FLAVORS = [
  { name: "CPython", runs: "The standard, written in C", tag: "default" },
  { name: "PyPy", runs: "A faster, just-in-time engine", tag: "speed" },
  { name: "Jython", runs: "Runs on the Java JVM", tag: "java" },
  { name: "IronPython", runs: "Runs on Microsoft .NET", tag: ".net" },
  { name: "MicroPython", runs: "Runs on tiny microcontrollers", tag: "chips" },
];

/**
 * "Python" is the language; the thing that runs it is an implementation, and
 * there are several. The same code at the top fans out to a row of engines that
 * stagger in. Plays in view, with a replay.
 */
export default function PythonFlavors() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const source = root.querySelector(".fl-source");
      const cards = gsap.utils.toArray<HTMLElement>(".fl-card");

      if (reducedMotion) {
        gsap.set(source, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(source, { opacity: 0, y: -8 });
      gsap.set(cards, { opacity: 0, y: 16, scale: 0.9 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(source, { opacity: 1, y: 0, duration: 0.45 });
      tl.to(
        cards,
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
        "+=0.15",
      );
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
          One language, many engines
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="fl-source rounded-xl border border-brand/40 bg-background px-4 py-2 font-mono text-sm text-foreground">
          <span className="text-brand">print</span>(
          <span className="text-warn">&quot;Hi&quot;</span>)
          <span className="ml-2 text-xs text-muted">your Python code</span>
        </div>
        <div className="my-3 text-muted">↓ can be run by ↓</div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FLAVORS.map((f) => (
          <div
            key={f.name}
            className="fl-card rounded-xl border border-border bg-background p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-foreground">
                {f.name}
              </span>
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                {f.tag}
              </span>
            </div>
            <div className="mt-1 text-xs leading-relaxed text-muted">{f.runs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
