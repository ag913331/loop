"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * The three steps from "no Python" to "working Python", as little illustrated
 * windows: download it from python.org, run the installer (ticking the crucial
 * Add-to-PATH box), then confirm it in a terminal. Each step reveals and plays
 * its key action in turn. Plays in view, with a replay.
 */
export default function InstallSteps() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const steps = gsap.utils.toArray<HTMLElement>(".is-step");
      const dlClick = root.querySelector(".is-dl-click");
      const tick = root.querySelector(".is-tick");
      const checkbox = root.querySelector(".is-checkbox");
      const bar = root.querySelector(".is-bar");
      const status = root.querySelector<HTMLElement>(".is-status");
      const ver = root.querySelector(".is-ver");

      if (reducedMotion) {
        gsap.set(steps, { opacity: 1, y: 0 });
        gsap.set([tick, ver], { opacity: 1, scale: 1 });
        gsap.set(checkbox, { borderColor: "var(--brand)" });
        gsap.set(bar, { width: "100%" });
        if (status) status.textContent = "Installed ✓";
        gsap.set(dlClick, { opacity: 0 });
        return;
      }

      gsap.set(steps, { opacity: 0, y: 14 });
      gsap.set(dlClick, { opacity: 0, scale: 0.4 });
      gsap.set([tick, ver], { opacity: 0, scale: 0.4 });
      gsap.set(bar, { width: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Step 1 — download.
      tl.to(steps[0], { opacity: 1, y: 0, duration: 0.45 });
      tl.to(dlClick, { opacity: 1, scale: 1, duration: 0.25 }, "+=0.2");
      tl.to(dlClick, { keyframes: { scale: [1, 0.8, 1.15, 1] }, duration: 0.5 });

      // Step 2 — install, tick Add-to-PATH, progress.
      tl.to(steps[1], { opacity: 1, y: 0, duration: 0.45 }, "+=0.2");
      tl.to(checkbox, { borderColor: "var(--brand)", duration: 0.2 }, "+=0.1");
      tl.to(tick, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, "<");
      tl.to(bar, { width: "100%", duration: 1, ease: "power1.inOut" }, "+=0.1");
      tl.call(() => {
        if (status) status.textContent = "Installed ✓";
      });

      // Step 3 — verify in the terminal.
      tl.to(steps[2], { opacity: 1, y: 0, duration: 0.45 }, "+=0.2");
      tl.to(ver, { opacity: 1, scale: 1, duration: 0.4 }, "+=0.2");
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
          From nothing to a working Python — 3 steps
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1 — python.org */}
        <div className="is-step overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="python.org/downloads" />
          <div className="flex items-center justify-between gap-4 p-4">
            <div>
              <div className="text-xs text-accent">1 · Download</div>
              <div className="mt-1 text-sm text-foreground">
                Get the latest <span className="font-mono">Python 3.14</span> for
                your system.
              </div>
            </div>
            <div className="relative">
              <a
                href="https://www.python.org/downloads/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                ⬇ Download
              </a>
              <span className="is-dl-click absolute -bottom-2 -right-2 text-lg">
                👆
              </span>
            </div>
          </div>
        </div>

        {/* Step 2 — installer */}
        <div className="is-step overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="Install Python 3.14" />
          <div className="space-y-3 p-4">
            <div className="text-xs text-accent">2 · Install</div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <span className="is-checkbox relative flex h-5 w-5 items-center justify-center rounded border border-border">
                <span className="is-tick text-brand">✓</span>
              </span>
              Add Python to PATH{" "}
              <span className="text-xs text-warn">← important!</span>
            </label>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="is-bar h-full rounded-full bg-brand" />
            </div>
            <div className="is-status font-mono text-xs text-muted">
              Installing…
            </div>
          </div>
        </div>

        {/* Step 3 — verify */}
        <div className="is-step overflow-hidden rounded-xl border border-border bg-background">
          <Chrome label="Terminal" />
          <div className="p-4">
            <div className="mb-1 text-xs text-accent">3 · Verify</div>
            <pre className="font-mono text-sm leading-7 text-foreground">
              <span className="text-muted">$</span> python --version
              {"\n"}
              <span className="is-ver inline-block text-brand">
                Python 3.14.0
              </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
