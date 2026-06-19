"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

// The last line has a typo (prnt) so the interpreter stops there.
const LINES = [
  { code: "name = \"Ada\"", out: null, error: false },
  { code: "print(name)", out: "Ada", error: false },
  { code: "prnt(\"bye\")", out: "NameError: 'prnt'", error: true },
];

const STAGES = ["read", "check", "run"];

/**
 * What an interpreter actually does: take one line, read it, check it, run it,
 * then move to the next — translating on the fly. When it reaches a line it
 * can't understand it stops there, and the lines after never run. Plays in view.
 */
export default function InterpreterLoop() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const pointer = root.querySelector(".int-pointer");
      const lineEls = gsap.utils.toArray<HTMLElement>(".int-line");
      const stageEls = gsap.utils.toArray<HTMLElement>(".int-stage");
      const outEls = gsap.utils.toArray<HTMLElement>(".int-out");
      // Output rows aren't index-aligned with code lines (line 0 prints nothing),
      // so look them up by the data-line they belong to.
      const outFor = (i: number) =>
        root.querySelector<HTMLElement>(`.int-out[data-line="${i}"]`);
      const lit = "color-mix(in srgb, var(--accent) 18%, transparent)";
      const ok = "color-mix(in srgb, var(--brand) 18%, transparent)";
      const bad = "color-mix(in srgb, var(--danger) 20%, transparent)";

      const resetStages = () =>
        gsap.set(stageEls, { backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--muted)" });

      if (reducedMotion) {
        gsap.set(pointer, { opacity: 1, top: lineEls[2].offsetTop });
        gsap.set(outEls, { opacity: 1, y: 0 });
        gsap.set(lineEls[2], { opacity: 1 });
        resetStages();
        return;
      }

      gsap.set(pointer, { opacity: 0, top: 0 });
      gsap.set(outEls, { opacity: 0, y: 6 });
      resetStages();

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(pointer, { opacity: 1, duration: 0.2 });

      LINES.forEach((ln, i) => {
        const lineEl = lineEls[i];
        tl.to(pointer, { top: lineEl.offsetTop, duration: 0.3 }, i === 0 ? ">" : ">+=0.25");
        tl.add(resetStages, "<");

        // read + check always light up.
        tl.to(stageEls[0], { backgroundColor: lit, color: "var(--foreground)", duration: 0.2 });
        tl.to(stageEls[1], { backgroundColor: lit, color: "var(--foreground)", duration: 0.2 }, "+=0.1");

        if (ln.error) {
          // check fails — flash run red and stop.
          tl.to(stageEls[2], { backgroundColor: bad, borderColor: "var(--danger)", color: "var(--foreground)", duration: 0.2 }, "+=0.1");
          tl.to(outFor(i), { opacity: 1, y: 0, duration: 0.3 });
          tl.to(lineEl, { color: "var(--danger)", duration: 0.2 }, "<");
        } else {
          tl.to(stageEls[2], { backgroundColor: ok, borderColor: "var(--brand)", color: "var(--foreground)", duration: 0.2 }, "+=0.1");
          if (ln.out) tl.to(outFor(i), { opacity: 1, y: 0, duration: 0.3 });
        }
      });

      // The line after the error never runs — dim it.
      tl.to(pointer, { opacity: 0, duration: 0.3 }, "+=0.2");
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
        <code className="font-mono text-sm text-muted">interpreter</code>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* source */}
        <div className="relative rounded-xl border border-border bg-background p-4 pl-7">
          <span className="int-pointer absolute left-2 text-accent">▸</span>
          <pre className="font-mono text-sm leading-8 sm:text-[15px]">
            {LINES.map((ln, i) => (
              <div key={i} className="int-line text-foreground">
                {ln.code}
              </div>
            ))}
          </pre>
        </div>

        {/* engine + output */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2">
            {STAGES.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="int-stage rounded-lg border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                  {s}
                </span>
                {i < STAGES.length - 1 && <span className="text-muted">→</span>}
              </span>
            ))}
          </div>
          <div className="font-mono text-sm leading-7">
            {LINES.map((ln, i) =>
              ln.out ? (
                <div
                  key={i}
                  data-line={i}
                  className={`int-out ${ln.error ? "text-danger" : "text-foreground"}`}
                >
                  {ln.out}
                </div>
              ) : null,
            )}
          </div>
          <p className="mt-auto text-xs text-muted">
            It stops at the first line it can&apos;t understand.
          </p>
        </div>
      </div>
    </div>
  );
}
