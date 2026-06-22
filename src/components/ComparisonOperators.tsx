"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const OPS = [
  { sym: "==", name: "equal to", ex: "5 == 5", res: "True" },
  { sym: "!=", name: "not equal to", ex: "5 != 3", res: "True" },
  { sym: ">", name: "greater than", ex: "5 > 3", res: "True" },
  { sym: "<", name: "less than", ex: "5 < 3", res: "False" },
  { sym: ">=", name: "greater or equal", ex: "5 >= 5", res: "True" },
  { sym: "<=", name: "less or equal", ex: "3 <= 5", res: "True" },
];

/**
 * The six comparison operators, each with a worked example and its boolean
 * result. Rows slide in; the result is coloured by truth. Plays in view.
 */
export default function ComparisonOperators() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const rows = gsap.utils.toArray<HTMLElement>(".cmp-row");

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        return;
      }
      gsap.set(rows, { opacity: 0, x: -14 });
      gsap.to(rows, { opacity: 1, x: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" });
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
          The six comparison operators
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-2">
        {OPS.map((op) => (
          <div
            key={op.sym}
            className="cmp-row grid grid-cols-[3rem_1fr] items-center gap-3 rounded-xl border border-border bg-background p-3 sm:grid-cols-[3rem_1fr_auto]"
          >
            <span className="text-center font-mono text-lg font-semibold text-accent">
              {op.sym}
            </span>
            <span className="text-sm text-foreground">{op.name}</span>
            <span className="col-span-2 font-mono text-sm sm:col-span-1">
              <span className="text-muted">{op.ex}</span>
              <span className="mx-2 text-muted">→</span>
              <span className={op.res === "True" ? "text-brand" : "text-danger"}>
                {op.res}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-warn/30 bg-warn/5 px-4 py-3 text-sm text-muted">
        ⚠ Don&apos;t confuse them:{" "}
        <span className="font-mono text-foreground">==</span> asks{" "}
        <em>&ldquo;are these equal?&rdquo;</em>, while a single{" "}
        <span className="font-mono text-foreground">=</span> <em>assigns</em> a
        value. Mixing them up is a classic bug.
      </p>
    </div>
  );
}
