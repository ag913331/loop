"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const BRANCHES = ["ValueError", "ZeroDivisionError", "except: (any)"];
const MATCH = 1; // the raised error is a ZeroDivisionError

/**
 * Several except branches, one raised error. Python checks the handlers top to
 * bottom and the FIRST matching one runs; the rest stay idle. A ZeroDivisionError
 * chip is tested against each branch until it matches (green); the bare default
 * would catch anything left over. Plays in view, with a replay.
 */
export default function ExceptRouting() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".rt-branch");
      const status = root.querySelector<HTMLElement>(".rt-status");
      if (rows.length !== BRANCHES.length) return;

      const miss = "color-mix(in srgb, var(--danger) 12%, transparent)";
      const hit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        gsap.set(rows[MATCH], { backgroundColor: hit, borderColor: "var(--brand)" });
        gsap.set(rows.filter((_, i) => i !== MATCH), { opacity: 0.5 });
        if (status) status.textContent = "ZeroDivisionError → 2nd branch handles it";
        return;
      }

      gsap.set(rows, { backgroundColor: "var(--background)", borderColor: "var(--border)", opacity: 1 });
      if (status) status.textContent = "raised: ZeroDivisionError";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      for (let i = 0; i < BRANCHES.length; i++) {
        if (i < MATCH) {
          tl.to(rows[i], { backgroundColor: miss, borderColor: "var(--danger)", duration: 0.3 }, "+=0.45");
          tl.call(() => status && (status.textContent = `${BRANCHES[i]}? no — skip`), [], "<");
          tl.to(rows[i], { backgroundColor: "var(--background)", borderColor: "var(--border)", opacity: 0.5, duration: 0.3 }, "+=0.25");
        } else if (i === MATCH) {
          tl.to(rows[i], { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.35 }, "+=0.45");
          tl.call(() => status && (status.textContent = `${BRANCHES[i]}? yes — this one runs`), [], "<");
        } else {
          tl.to(rows[i], { opacity: 0.5, duration: 0.3 }, "+=0.3");
        }
      }
      tl.call(() => status && (status.textContent = "only the first match runs"), [], "+=0.3");
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
          First matching handler wins
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-sm flex-col gap-2">
        <div className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-center font-mono text-sm text-danger">
          ⚠ ZeroDivisionError raised
        </div>
        <div className="text-center text-muted">↓</div>
        {BRANCHES.map((b, i) => (
          <div
            key={b}
            className="rt-branch rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground"
          >
            <span className="text-accent">except</span> {i === BRANCHES.length - 1 ? b : `${b}:`}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        The bare <span className="font-mono text-foreground">except:</span> catches
        anything not named above — so it must always come <strong className="text-foreground">last</strong>.
      </p>

      <div className="mt-3 text-center">
        <span className="rt-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
