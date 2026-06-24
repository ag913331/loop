"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const PATHS = [
  { cond: "value > 0", test: "+5", buggy: false },
  { cond: "value < 0", test: "-5", buggy: false },
  { cond: "else", test: "0", buggy: true },
];

/**
 * Why you must test every path. An if/elif/else has three routes; only test data
 * that drives each one will reach the bug hiding on the path no test exercised.
 * Each test value lights its branch; the untested branch keeps its ⚠. Plays in
 * view, with a replay.
 */
export default function ExecutionPaths() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".ep-path");
      const chips = gsap.utils.toArray<HTMLElement>(".ep-chip");
      const status = root.querySelector<HTMLElement>(".ep-status");
      if (rows.length !== PATHS.length) return;

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([rows[0], rows[1]], { backgroundColor: lit, borderColor: "var(--brand)" });
        gsap.set(chips, { opacity: 1 });
        if (status) status.textContent = "test all three paths — or miss the bug";
        return;
      }

      gsap.set(rows, { backgroundColor: "var(--background)", borderColor: "var(--border)" });
      gsap.set([chips[0], chips[1]], { opacity: 0 }); // the "untested" chip stays visible
      if (status) status.textContent = "run your tests, one value per path…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // only test the first two paths — the third stays unexercised
      [0, 1].forEach((i) => {
        tl.to(chips[i], { opacity: 1, duration: 0.3 }, "+=0.5");
        tl.to(rows[i], { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "<");
        tl.call(() => status && (status.textContent = `test ${PATHS[i].test} → covers "${PATHS[i].cond}" ✓`), [], "<");
      });
      tl.call(() => status && (status.textContent = 'never tested value = 0 → the bug here is missed!'), [], "+=0.6");
      tl.to(rows[2], { borderColor: "var(--danger)", duration: 0.4 }, "+=0.1");
      tl.fromTo(rows[2], { x: -4 }, { x: 0, duration: 0.3, ease: "elastic.out(1.5,0.4)" }, "<");
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
          Every branch is a path to test
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-md flex-col gap-2">
        {PATHS.map((p, i) => (
          <div
            key={p.cond}
            className="ep-path flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
          >
            <span className="text-foreground">
              <span className="text-accent">{i === 0 ? "if" : i === 1 ? "elif" : "else"}</span>
              {p.cond === "else" ? ":" : ` ${p.cond}:`}
              {p.buggy && <span className="text-danger"> ⚠ hidden bug</span>}
            </span>
            <span className="ep-chip rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-muted">
              {p.buggy ? "untested" : `test ${p.test}`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <span className="ep-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
