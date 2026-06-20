"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useInViewReplay } from "./useInViewReplay";

const WORD = ["l", "o", "o", "p"];

// Decorative snippets that drift behind the wordmark — pure flavour.
const TOKENS = [
  { t: "for i in range(n):", x: "6%", y: "18%", d: 0 },
  { t: "while True:", x: "78%", y: "24%", d: 1.2 },
  { t: "print(i)", x: "14%", y: "74%", d: 0.6 },
  { t: "x = [1, 2, 3]", x: "82%", y: "68%", d: 1.8 },
  { t: "def loop():", x: "70%", y: "84%", d: 2.4 },
  { t: "i += 1", x: "4%", y: "46%", d: 3 },
];

/**
 * Landing hero. The "loop" wordmark springs in letter by letter, then each
 * letter bobs on its own phase so the mark feels alive without being noisy.
 * Faint code tokens drift in the background. Respects reduced motion by
 * rendering the resting state with no continuous animation.
 */
export default function Hero() {
  const { ref, reducedMotion } = useInViewReplay<HTMLDivElement>();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      const tokens = gsap.utils.toArray<HTMLElement>(".hero-token");
      const rise = gsap.utils.toArray<HTMLElement>(".hero-rise");

      if (reducedMotion) {
        gsap.set([...letters, ...rise], { opacity: 1, y: 0, scale: 1, rotateX: 0 });
        gsap.set(tokens, { opacity: 0.12 });
        return;
      }

      // Entrance: badge / tagline / buttons fade up.
      gsap.from(rise, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.12,
        delay: 0.5,
        ease: "power3.out",
      });

      // Wordmark: letters drop and settle with an elastic bounce.
      gsap.from(letters, {
        opacity: 0,
        y: 80,
        scale: 0.4,
        rotateX: -90,
        transformOrigin: "50% 100%",
        duration: 1,
        stagger: 0.12,
        ease: "elastic.out(1, 0.55)",
      });

      // Continuous bob — each letter on its own offset for a living feel.
      letters.forEach((el, i) => {
        gsap.to(el, {
          y: -10,
          duration: 1.6 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.2 + i * 0.18,
        });
      });

      // Background tokens drift slowly and breathe.
      tokens.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 0.14, duration: 1.4, delay: 0.3 + i * 0.15 },
        );
        gsap.to(el, {
          y: i % 2 === 0 ? 22 : -22,
          x: i % 2 === 0 ? 14 : -14,
          duration: 6 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      className="relative flex flex-col items-center py-28 text-center"
    >
      {/* drifting code tokens */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {TOKENS.map((tok) => (
          <span
            key={tok.t}
            className="hero-token absolute font-mono text-sm text-brand opacity-0 sm:text-base"
            style={{ left: tok.x, top: tok.y }}
          >
            {tok.t}
          </span>
        ))}
      </div>

      {/* animated wordmark */}
      <h1
        className="relative flex select-none text-7xl font-bold tracking-tight sm:text-8xl"
        style={{ perspective: "600px" }}
        aria-label="loop"
      >
        {WORD.map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="hero-letter brand-gradient inline-block"
            style={{ willChange: "transform" }}
          >
            {ch}
          </span>
        ))}
      </h1>

      <p className="hero-rise relative mt-8 max-w-2xl text-xl text-muted">
        Learn to code by watching concepts move. No walls of text, no static
        diagrams — every idea is an animation that plays out so you{" "}
        <span className="text-foreground">see</span> what happens, step after
        step.
      </p>

      <div className="hero-rise relative mt-10 flex gap-4">
        <Link
          href="/learn/python"
          className="rounded-xl bg-brand-strong px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          Start the loop →
        </Link>
      </div>
    </div>
  );
}
