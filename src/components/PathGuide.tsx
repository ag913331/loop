"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * How to put Python on the PATH, per operating system. A static reference card
 * that gently reveals its three platforms when scrolled into view.
 */
export default function PathGuide() {
  const { ref, inView, reducedMotion } = useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;
      const cards = gsap.utils.toArray<HTMLElement>(".pg-card");

      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(cards, { opacity: 0, y: 14 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope, dependencies: [inView, reducedMotion] },
  );

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="mb-5 text-xs font-medium uppercase tracking-wide text-muted">
        Add Python to your PATH — by platform
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="pg-card rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>⊞</span> Windows
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Just tick{" "}
            <span className="font-medium text-foreground">
              &ldquo;Add Python to PATH&rdquo;
            </span>{" "}
            in the installer — done. Missed it? Re-run the installer and choose{" "}
            <span className="font-mono text-foreground">Modify</span>, or add the
            install folder under{" "}
            <span className="text-foreground">
              Settings → Environment Variables → Path
            </span>
            .
          </p>
        </div>

        <div className="pg-card rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span></span> macOS
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            The python.org installer sets it up for you, and{" "}
            <span className="font-mono text-foreground">brew install python</span>{" "}
            does too. To do it by hand, add the folder to your PATH in{" "}
            <span className="font-mono text-foreground">~/.zshrc</span>.
          </p>
        </div>

        <div className="pg-card rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>🐧</span> Linux
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Usually already done — your package manager (
            <span className="font-mono text-foreground">apt</span>,{" "}
            <span className="font-mono text-foreground">dnf</span>…) puts{" "}
            <span className="font-mono text-foreground">python3</span> on the
            PATH. Installed it manually? Add the folder in{" "}
            <span className="font-mono text-foreground">~/.bashrc</span> or{" "}
            <span className="font-mono text-foreground">~/.profile</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
