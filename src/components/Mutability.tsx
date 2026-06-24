"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const VALUES = [10, 20, 30];

/**
 * Mutable vs immutable, side by side. A list happily accepts nums[1] = 99 (the
 * cell changes, green); a tuple refuses t[1] = 99 with a TypeError (the cell
 * flashes red). Padlocks open/closed reinforce it. Plays in view, with a replay.
 */
export default function Mutability() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const listCell = root.querySelector<HTMLElement>(".mu-list-cell");
      const listVal = root.querySelector<HTMLElement>(".mu-list-val");
      const tupCell = root.querySelector<HTMLElement>(".mu-tup-cell");
      const err = root.querySelector<HTMLElement>(".mu-err");
      const status = root.querySelector<HTMLElement>(".mu-status");

      const ok = "color-mix(in srgb, var(--brand) 18%, transparent)";
      const bad = "color-mix(in srgb, var(--danger) 18%, transparent)";

      if (reducedMotion) {
        if (listVal) listVal.textContent = "99";
        gsap.set(listCell, { backgroundColor: ok, borderColor: "var(--brand)" });
        gsap.set(tupCell, { backgroundColor: bad, borderColor: "var(--danger)" });
        gsap.set(err, { opacity: 1 });
        if (status) status.textContent = "lists change · tuples don't";
        return;
      }

      if (listVal) listVal.textContent = "20";
      gsap.set(err, { opacity: 0 });
      if (status) status.textContent = "try to change index 1 in each…";

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // list: allowed
      tl.call(() => status && (status.textContent = "nums[1] = 99 — allowed"), [], "+=0.6");
      tl.to(listCell, { backgroundColor: ok, borderColor: "var(--brand)", duration: 0.3 }, "+=0.1");
      tl.call(() => listVal && (listVal.textContent = "99"));
      tl.fromTo(listVal, { scale: 1.4, color: "var(--brand)" }, { scale: 1, duration: 0.35 }, "<");
      // tuple: rejected
      tl.call(() => status && (status.textContent = "t[1] = 99 — TypeError"), [], "+=0.7");
      tl.to(tupCell, { backgroundColor: bad, borderColor: "var(--danger)", duration: 0.3 }, "+=0.1");
      tl.fromTo(tupCell, { x: -4 }, { x: 0, duration: 0.3, ease: "elastic.out(1.5, 0.4)" }, "<");
      tl.to(err, { opacity: 1, duration: 0.4 }, "+=0.05");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  const cell =
    "flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-base text-foreground";

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
          Can it change after it&apos;s made?
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* list */}
        <div className="rounded-xl border border-border bg-background/40 p-4 text-center">
          <div className="mb-3 text-xs font-medium text-muted">🔓 list — mutable</div>
          <div className="flex justify-center gap-2">
            {VALUES.map((v, i) => (
              <span key={i} className={i === 1 ? `mu-list-cell ${cell}` : cell}>
                {i === 1 ? <span className="mu-list-val">{v}</span> : v}
              </span>
            ))}
          </div>
          <code className="mt-3 block font-mono text-xs text-muted">nums = [10, 20, 30]</code>
        </div>

        {/* tuple */}
        <div className="rounded-xl border border-border bg-background/40 p-4 text-center">
          <div className="mb-3 text-xs font-medium text-muted">🔒 tuple — immutable</div>
          <div className="flex justify-center gap-2">
            {VALUES.map((v, i) => (
              <span key={i} className={i === 1 ? `mu-tup-cell ${cell}` : cell}>
                {v}
              </span>
            ))}
          </div>
          <code className="mt-3 block font-mono text-xs text-muted">t = (10, 20, 30)</code>
        </div>
      </div>

      <div className="mu-err mt-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 font-mono text-xs text-danger">
        TypeError: &apos;tuple&apos; object does not support item assignment
      </div>

      <div className="mt-4 text-center">
        <span className="mu-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </div>
  );
}
