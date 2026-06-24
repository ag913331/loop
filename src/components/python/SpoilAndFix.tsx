"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

/**
 * Everyone breaks their code — the skill is reading the error and fixing it.
 * A typo (prnt) triggers a NameError traceback; then the word is corrected and
 * the program runs cleanly. Spoil, read, fix, done. Plays in view, with replay.
 */
export default function SpoilAndFix() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const word = root.querySelector<HTMLElement>(".sf-word");
      const errorBlock = root.querySelector(".sf-error");
      const fixNote = root.querySelector(".sf-fixnote");
      const successBlock = root.querySelector(".sf-success");
      if (!word) return;

      const setWord = (t: string) => (word.textContent = t);

      if (reducedMotion) {
        setWord("print");
        gsap.set(word, { color: "var(--brand)" });
        gsap.set(errorBlock, { opacity: 0.4 });
        gsap.set([fixNote, successBlock], { opacity: 1, y: 0 });
        return;
      }

      setWord("prnt");
      gsap.set(word, { color: "var(--danger)" });
      gsap.set([errorBlock, fixNote, successBlock], { opacity: 0, y: 6 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Spoil: run it and get a traceback.
      tl.to(errorBlock, { opacity: 1, y: 0, duration: 0.4 }, "+=0.3");
      tl.to(word, { keyframes: { x: [0, -3, 3, -2, 2, 0] }, duration: 0.4 }, "<");

      // Read + fix: correct the typo.
      tl.to(fixNote, { opacity: 1, y: 0, duration: 0.4 }, "+=0.6");
      tl.call(() => setWord("print"), [], "+=0.3");
      tl.fromTo(
        word,
        { color: "var(--danger)", scale: 1.3 },
        { color: "var(--brand)", scale: 1, duration: 0.45, ease: "back.out(2)" },
        "<",
      );
      tl.to(errorBlock, { opacity: 0.35, duration: 0.4 }, "<");

      // Done: it runs.
      tl.to(successBlock, { opacity: 1, y: 0, duration: 0.4 }, "+=0.3");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const Chrome = ({ label }: { label: string }) => (
    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
      <span className="ml-2 text-xs text-muted">{label}</span>
    </div>
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
          Break it, read the error, fix it
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* editor */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="hello.py" />
          <div className="p-4 font-mono text-sm leading-7">
            <span className="select-none pr-3 text-muted">1</span>
            <span className="sf-word inline-block font-semibold">prnt</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;Hello, World!&quot;</span>
            <span className="text-foreground">)</span>
          </div>
        </div>

        {/* terminal */}
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="Terminal" />
          <div className="space-y-2 p-4 font-mono text-[13px] leading-6">
            <div className="sf-error text-danger">
              <div className="text-muted">$ python hello.py</div>
              <div>Traceback (most recent call last):</div>
              <div className="text-muted">
                &nbsp;&nbsp;File &quot;hello.py&quot;, line 1, in &lt;module&gt;
              </div>
              <div>NameError: name &apos;prnt&apos; is not defined</div>
            </div>
            <div className="sf-fixnote text-xs text-warn">
              ↑ Python points at the typo — fix it.
            </div>
            <div className="sf-success">
              <div className="text-muted">$ python hello.py</div>
              <div className="text-brand">Hello, World!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
