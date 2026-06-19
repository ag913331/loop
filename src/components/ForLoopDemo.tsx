"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const N = 5;
const RANGE = Array.from({ length: N }, (_, i) => i);
// Running totals after each `total += i`: 0, 1, 3, 6, 10.
const TOTALS = RANGE.reduce<number[]>((acc, i) => {
  acc.push((acc.at(-1) ?? 0) + i);
  return acc;
}, []);

/**
 * The brand, made literal: a Python `for` loop that loops forever. A highlight
 * tracks the executing line, the index pointer walks across `range(5)`, and the
 * accumulator updates each pass — then it resets and runs again. Plays while in
 * view; reduced motion shows the finished state.
 */
export default function ForLoopDemo() {
  const { ref, inView, reducedMotion } = useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const forLine = root.querySelector<HTMLElement>(".line-for");
      const bodyLine = root.querySelector<HTMLElement>(".line-body");
      const pointer = root.querySelector<HTMLElement>(".loop-pointer");
      const iLabel = root.querySelector<HTMLElement>(".i-value");
      const totalLabel = root.querySelector<HTMLElement>(".total-value");
      const boxes = gsap.utils.toArray<HTMLElement>(".range-box");
      if (!forLine || !bodyLine || !pointer || !iLabel || !totalLabel) return;

      const litFor = "color-mix(in srgb, var(--accent) 16%, transparent)";
      const litBody = "color-mix(in srgb, var(--brand) 16%, transparent)";

      const setTotal = (v: number) => {
        totalLabel.textContent = String(v);
      };
      const setI = (v: string) => {
        iLabel.textContent = v;
      };

      if (reducedMotion) {
        setI(String(N - 1));
        setTotal(TOTALS.at(-1)!);
        gsap.set(pointer, { opacity: 0 });
        gsap.set(boxes, { borderColor: "var(--border)" });
        return;
      }

      const pointTo = (i: number) => {
        const box = boxes[i];
        return { x: box.offsetLeft, width: box.offsetWidth };
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      const reset = () => {
        setTotal(0);
        setI("–");
        gsap.set([forLine, bodyLine], { backgroundColor: "transparent" });
        gsap.set(boxes, { borderColor: "var(--border)", color: "var(--muted)" });
        gsap.set(pointer, { opacity: 0, ...pointTo(0) });
      };

      tl.call(reset);
      tl.to(pointer, { opacity: 1, duration: 0.3 }, "+=0.3");

      RANGE.forEach((i) => {
        // Highlight the `for` line and step the index pointer.
        tl.to(forLine, { backgroundColor: litFor, duration: 0.25 });
        tl.to(pointer, { ...pointTo(i), duration: 0.35, ease: "power2.inOut" }, "<");
        tl.call(() => setI(String(i)), [], "<");
        tl.to(
          boxes[i],
          { borderColor: "var(--accent)", color: "var(--foreground)", duration: 0.25 },
          "<",
        );
        tl.to(forLine, { backgroundColor: "transparent", duration: 0.25 }, "+=0.15");

        // Highlight the body and bump the accumulator.
        tl.to(bodyLine, { backgroundColor: litBody, duration: 0.25 }, "<");
        tl.call(() => setTotal(TOTALS[i]), [], ">-0.1");
        tl.fromTo(
          totalLabel,
          { scale: 1.35, color: "var(--brand)" },
          { scale: 1, color: "var(--brand)", duration: 0.4, ease: "back.out(2)" },
          "<",
        );
        tl.to(bodyLine, { backgroundColor: "transparent", duration: 0.25 }, "+=0.2");
      });

      // Loop condition fails — pointer steps off and fades.
      tl.to(forLine, { backgroundColor: litFor, duration: 0.25 }, "+=0.1");
      tl.to(pointer, { opacity: 0, duration: 0.3 }, "<");
      tl.to(forLine, { backgroundColor: "transparent", duration: 0.25 }, "+=0.2");
    },
    { scope, dependencies: [inView, reducedMotion] },
  );

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="not-prose mx-auto mt-4 w-full max-w-3xl rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between">
        <code className="font-mono text-sm text-muted">loop.py</code>
        <span className="flex items-center gap-2 text-xs font-medium text-muted">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand" />
          running
        </span>
      </div>

      <div className="grid items-center gap-6 sm:grid-cols-2">
        {/* code */}
        <pre className="overflow-hidden rounded-xl bg-background p-4 font-mono text-sm leading-7 sm:text-[15px]">
          <div>
            <span className="text-muted">total</span>
            <span className="text-foreground"> = </span>
            <span className="text-warn">0</span>
          </div>
          <div className="line-for -mx-2 rounded px-2">
            <span className="text-accent">for</span>
            <span className="text-foreground"> i </span>
            <span className="text-accent">in</span>
            <span className="text-foreground"> </span>
            <span className="text-brand">range</span>
            <span className="text-foreground">(</span>
            <span className="text-warn">5</span>
            <span className="text-foreground">):</span>
          </div>
          <div className="line-body -mx-2 rounded px-2 pl-6">
            <span className="text-muted">total</span>
            <span className="text-foreground"> += i</span>
          </div>
        </pre>

        {/* live state */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              range(5)
            </div>
            <div className="relative inline-flex gap-2">
              {/* moving highlight pointer behind the boxes */}
              <div
                className="loop-pointer pointer-events-none absolute top-0 h-full rounded-lg opacity-0"
                style={{
                  background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                  boxShadow: "0 0 0 1.5px var(--accent)",
                }}
              />
              {RANGE.map((i) => (
                <div
                  key={i}
                  className="range-box relative flex h-11 w-11 items-center justify-center rounded-lg border border-border font-mono text-base text-muted"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">i</div>
              <div className="i-value text-2xl font-semibold text-accent">–</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">total</div>
              <div
                className="total-value text-2xl font-semibold text-brand"
                style={{ transformBox: "fill-box", transformOrigin: "left center" }}
              >
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
