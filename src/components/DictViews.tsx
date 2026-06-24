"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const ENTRIES = [
  { key: "Ada", value: 36 },
  { key: "Alan", value: 41 },
  { key: "Grace", value: 29 },
];

/**
 * The three views a dictionary hands back: .keys(), .values() and .items().
 * Each reveals in turn, highlighting which part of the dict it pulls out — the
 * keys, the values, or both as (key, value) tuples. Plays in view, with a replay.
 */
export default function DictViews() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".dv-out");
      const status = root.querySelector<HTMLElement>(".dv-status");
      if (!rows.length) return;

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, x: 0 });
        if (status) status.textContent = "keys · values · items";
        return;
      }

      gsap.set(rows, { opacity: 0, x: -10 });
      const msgs = [
        ".keys() → just the keys",
        ".values() → just the values",
        ".items() → (key, value) tuples",
      ];
      if (status) status.textContent = "three ways to look at a dict";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      rows.forEach((r, i) => {
        tl.to(r, { opacity: 1, x: 0, duration: 0.4 }, "+=0.5");
        tl.call(() => status && (status.textContent = msgs[i]), [], "<");
      });
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const keys = ENTRIES.map((e) => `"${e.key}"`).join(", ");
  const values = ENTRIES.map((e) => e.value).join(", ");
  const items = ENTRIES.map((e) => `("${e.key}", ${e.value})`).join(", ");

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
          keys() · values() · items()
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <code className="mb-4 block font-mono text-xs text-muted">
        ages = {"{"}&quot;Ada&quot;: 36, &quot;Alan&quot;: 41, &quot;Grace&quot;: 29{"}"}
      </code>

      <div className="space-y-2">
        {[
          { call: "ages.keys()", body: `[${keys}]`, accent: "text-warn" },
          { call: "ages.values()", body: `[${values}]`, accent: "text-foreground" },
          { call: "ages.items()", body: `[${items}]`, accent: "text-brand" },
        ].map((row) => (
          <div
            key={row.call}
            className="dv-out flex flex-col gap-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="shrink-0 text-accent">{row.call}</span>
            <span className="text-muted">→</span>
            <span className={`break-all ${row.accent}`}>{row.body}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="dv-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
