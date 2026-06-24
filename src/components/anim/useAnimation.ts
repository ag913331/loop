"use client";

import { useCallback, useRef } from "react";
import { useInViewReplay } from "./useInViewReplay";

/**
 * One-stop hook for an animated lesson component. Bundles useInViewReplay with a
 * single `rootRef` callback that wires the same element to BOTH the in-view
 * observer and the GSAP scope — removing the ref-merge boilerplate every
 * animation used to repeat.
 *
 * Usage:
 *   const { rootRef, scope, inView, replay, replayCount, reducedMotion } = useAnimation();
 *   useGSAP(() => { ... }, { scope, dependencies: [inView, replayCount, reducedMotion] });
 *   return <AnimationCard rootRef={rootRef} label="…" onReplay={replay}> … </AnimationCard>;
 */
export function useAnimation<T extends HTMLElement = HTMLDivElement>() {
  const { ref, inView, replay, replayCount, reducedMotion } =
    useInViewReplay<T>();
  const scope = useRef<T>(null);

  const rootRef = useCallback(
    (node: T | null) => {
      ref.current = node;
      scope.current = node;
    },
    [ref],
  );

  return { rootRef, scope, inView, replay, replayCount, reducedMotion };
}
