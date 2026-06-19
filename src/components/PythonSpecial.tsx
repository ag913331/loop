"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const JAVA = [
  "public class Main {",
  "  public static void main(String[] args) {",
  '    System.out.println("Hello!");',
  "  }",
  "}",
];

const TRAITS = [
  "Reads almost like English",
  "Free & open source",
  "Batteries included",
  "Runs on every OS",
  "Huge, friendly community",
];

/**
 * Why Python feels special: the same "Hello!" that takes a wall of Java is a
 * single readable line in Python. The Java version appears, Python answers with
 * one line, then its standout traits pop in. Plays in view, with a replay.
 */
export default function PythonSpecial() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const javaLines = gsap.utils.toArray<HTMLElement>(".ps-java-line");
      const py = root.querySelector(".ps-python");
      const traits = gsap.utils.toArray<HTMLElement>(".ps-trait");

      if (reducedMotion) {
        gsap.set(javaLines, { opacity: 1, y: 0 });
        gsap.set(py, { opacity: 1, scale: 1 });
        gsap.set(traits, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(javaLines, { opacity: 0, y: 6 });
      gsap.set(py, { opacity: 0, scale: 0.7 });
      gsap.set(traits, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(javaLines, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 });
      tl.to(py, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "+=0.3");
      tl.to(traits, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, "+=0.2");
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
          Print “Hello!” — same task, two languages
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid items-center gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-2 text-xs text-muted">Java</div>
          <pre className="font-mono text-[13px] leading-6 text-foreground">
            {JAVA.map((l, i) => (
              <div key={i} className="ps-java-line">
                {l}
              </div>
            ))}
          </pre>
        </div>

        <div className="rounded-xl border border-brand/40 bg-background p-4">
          <div className="mb-2 text-xs text-brand">Python</div>
          <pre className="ps-python font-mono text-[15px] leading-6">
            <span className="text-brand">print</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">&quot;Hello!&quot;</span>
            <span className="text-foreground">)</span>
          </pre>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {TRAITS.map((t) => (
          <span
            key={t}
            className="ps-trait rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
