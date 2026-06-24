"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "@/components/anim/useInViewReplay";

const ENTRIES = [
  { key: "Ada", value: 36 },
  { key: "Alan", value: 41 },
  { key: "Grace", value: 29 },
];
const TARGET = 1; // look up "Alan"

/**
 * A dictionary maps keys to values — and you look things up by key, not by
 * position. ages["Alan"] jumps straight to Alan's row and lifts out 41. The
 * matching row lights green and its value pops. Plays in view, with a replay.
 */
export default function DictLookup() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const rows = gsap.utils.toArray<HTMLElement>(".dl-row");
      const out = root.querySelector<HTMLElement>(".dl-out");
      const status = root.querySelector<HTMLElement>(".dl-status");
      if (rows.length !== ENTRIES.length) return;

      const hit = "color-mix(in srgb, var(--brand) 16%, transparent)";

      if (reducedMotion) {
        gsap.set(rows[TARGET], { backgroundColor: hit, borderColor: "var(--brand)" });
        gsap.set(out, { opacity: 1 });
        if (status) status.textContent = 'ages["Alan"] → 41';
        return;
      }

      gsap.set(rows, { backgroundColor: "var(--background)", borderColor: "var(--border)" });
      gsap.set(out, { opacity: 0 });
      if (status) status.textContent = 'look up ages["Alan"]';

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(rows[TARGET], { backgroundColor: hit, borderColor: "var(--brand)", duration: 0.35 }, "+=0.5");
      tl.call(() => status && (status.textContent = 'key "Alan" found → take its value'), [], "<");
      tl.to(out, { opacity: 1, duration: 0.4, ease: "back.out(2)" }, "+=0.2");
      tl.call(() => status && (status.textContent = 'ages["Alan"] → 41'), [], "+=0.2");
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
        <code className="font-mono text-sm text-foreground">ages[&quot;Alan&quot;]</code>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="mx-auto flex max-w-sm flex-col gap-2">
        <div className="mb-1 font-mono text-xs text-muted">ages = {"{"}</div>
        {ENTRIES.map((e) => (
          <div
            key={e.key}
            className="dl-row flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
          >
            <span className="text-warn">&quot;{e.key}&quot;</span>
            <span className="text-muted">→</span>
            <span className="text-foreground">{e.value}</span>
          </div>
        ))}
        <div className="font-mono text-xs text-muted">{"}"}</div>

        <div className="dl-out mt-2 text-center font-mono text-sm text-brand">
          → 41
        </div>
      </div>

      <div className="mt-4 text-center">
        <span className="dl-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
