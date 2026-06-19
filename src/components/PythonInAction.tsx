"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const DOMAINS = [
  { icon: "🌐", title: "Web apps", libs: "Django · Flask · FastAPI" },
  { icon: "🤖", title: "Data & AI", libs: "pandas · PyTorch · scikit-learn" },
  { icon: "⚙️", title: "Automation", libs: "scripts · bots · scraping" },
  { icon: "🔬", title: "Science", libs: "NumPy · SciPy · Astropy" },
  { icon: "💸", title: "Finance", libs: "analytics · quant models" },
  { icon: "🚀", title: "DevOps", libs: "Ansible · cloud tooling" },
];

/**
 * Where Python shows up: a grid of domains it dominates, each with a couple of
 * the libraries you'd actually use. Tiles pop in one after another. In view.
 */
export default function PythonInAction() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".ia-tile");

      if (reducedMotion) {
        gsap.set(tiles, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.set(tiles, { opacity: 0, scale: 0.8, y: 12 });
      gsap.to(tiles, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        stagger: { each: 0.1, from: "start" },
        ease: "back.out(1.8)",
      });
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
          One language, many jobs
        </span>
        <button
          onClick={replay}
          className="rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          ↻ Replay
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {DOMAINS.map((d) => (
          <div
            key={d.title}
            className="ia-tile rounded-xl border border-border bg-background p-4"
          >
            <div className="text-2xl">{d.icon}</div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              {d.title}
            </div>
            <div className="mt-1 font-mono text-xs leading-relaxed text-muted">
              {d.libs}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
