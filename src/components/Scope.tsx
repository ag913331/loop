"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * Scope: a variable made inside a function is local — it lives only during the
 * call and is invisible outside. The function can still read a global. A dashed
 * bubble holds the local `bonus`; it can reach out to read `score`, then the
 * bubble closes and `bonus` is gone — so using it outside is a NameError.
 * Plays in view, with a replay.
 */
export default function Scope() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const bubble = root.querySelector<HTMLElement>(".sc-bubble");
      const local = root.querySelector<HTMLElement>(".sc-local");
      const read = root.querySelector<HTMLElement>(".sc-read");
      const global = root.querySelector<HTMLElement>(".sc-global");
      const err = root.querySelector<HTMLElement>(".sc-err");
      const status = root.querySelector<HTMLElement>(".sc-status");

      const lit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set([local, read], { opacity: 1 });
        gsap.set(bubble, { opacity: 0.55 });
        gsap.set(err, { opacity: 1 });
        if (status) status.textContent = "bonus is local — gone once play() ends";
        return;
      }

      gsap.set([local, read, err], { opacity: 0 });
      gsap.set(bubble, { opacity: 1 });
      if (status) status.textContent = "call play()…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.call(() => status && (status.textContent = "bonus = 10 — created locally"), [], "+=0.5");
      tl.fromTo(local, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.1");
      tl.call(() => status && (status.textContent = "play() may READ the global score"), [], "+=0.5");
      tl.to(read, { opacity: 1, duration: 0.3 }, "+=0.05");
      tl.to(global, { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "<");
      tl.call(() => status && (status.textContent = "play() ends — bonus disappears"), [], "+=0.6");
      tl.to([local, read], { opacity: 0, duration: 0.4 }, "+=0.1");
      tl.to(bubble, { opacity: 0.4, duration: 0.4 }, "<");
      tl.to(global, { backgroundColor: "var(--background)", borderColor: "var(--border)", duration: 0.3 }, "<");
      tl.call(() => status && (status.textContent = "print(bonus) outside → NameError"), [], "+=0.4");
      tl.to(err, { opacity: 1, duration: 0.4 }, "+=0.05");
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
          Local lives inside; global lives outside
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      {/* global scope */}
      <div className="rounded-xl border border-border bg-background/40 p-4">
        <div className="mb-2 text-xs uppercase tracking-wide text-muted">global scope</div>
        <span className="sc-global inline-block rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-sm text-foreground">
          score = 100
        </span>

        {/* function (local) scope */}
        <div className="sc-bubble mt-4 rounded-xl border-2 border-dashed border-border bg-surface-2/60 p-4">
          <div className="mb-2 font-mono text-xs text-muted">def play():</div>
          <span className="sc-local inline-block rounded-lg border border-brand/50 bg-brand/10 px-3 py-1.5 font-mono text-sm text-brand">
            bonus = 10
          </span>
          <div className="sc-read mt-2 font-mono text-xs text-muted">↑ can read score (100)</div>
        </div>
      </div>

      <div className="sc-err mt-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 font-mono text-xs text-danger">
        print(bonus) &nbsp;# NameError: name &apos;bonus&apos; is not defined
      </div>

      <div className="mt-4 text-center">
        <span className="sc-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
