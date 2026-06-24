"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Plays an animation when the element scrolls into view, and exposes a `replay`
 * counter so consumers can re-run on demand. Respects prefers-reduced-motion:
 * when set, it reports `reducedMotion` so the component can render a static end
 * state instead of animating.
 */
export function useInViewReplay<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const replay = () => setReplayCount((c) => c + 1);

  return { ref, inView, replay, replayCount, reducedMotion };
}
