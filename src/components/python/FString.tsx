"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimationCard from "@/components/anim/AnimationCard";
import { useAnimation } from "@/components/anim/useAnimation";

const SLOTS = [
  { name: "name", value: "Ada" },
  { name: "age", value: "36" },
];

/**
 * An f-string is a template: each {placeholder} is replaced by the value of that
 * variable, in place. The variable chips fly into their slots and the finished
 * sentence appears. Plays in view, with a replay.
 */
export default function FString() {
  const { rootRef, scope, inView, replay, replayCount, reducedMotion } =
    useAnimation<HTMLDivElement>();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !inView) return;

      const slots = gsap.utils.toArray<HTMLElement>(".fs-slot");
      const result = root.querySelector<HTMLElement>(".fs-result");
      const status = root.querySelector<HTMLElement>(".fs-status");
      if (slots.length !== SLOTS.length) return;

      const lit = "color-mix(in srgb, var(--brand) 18%, transparent)";

      if (reducedMotion) {
        slots.forEach((s, i) => {
          s.textContent = SLOTS[i].value;
          gsap.set(s, { backgroundColor: lit, borderColor: "var(--brand)" });
        });
        if (result) gsap.set(result, { opacity: 1 });
        if (status) status.textContent = "Hi Ada, you are 36";
        return;
      }

      slots.forEach((s, i) => (s.textContent = `{${SLOTS[i].name}}`));
      if (result) gsap.set(result, { opacity: 0 });
      if (status) status.textContent = 'f"Hi {name}, you are {age}"';

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      SLOTS.forEach((slot, i) => {
        tl.to(slots[i], { backgroundColor: lit, borderColor: "var(--brand)", duration: 0.3 }, "+=0.5");
        tl.call(() => (slots[i].textContent = slot.value));
        tl.fromTo(slots[i], { scale: 1.3 }, { scale: 1, duration: 0.35 }, "<");
        tl.call(() => status && (status.textContent = `{${slot.name}} → ${slot.value}`), [], "<");
      });
      if (result) tl.to(result, { opacity: 1, duration: 0.4 }, "+=0.3");
      tl.call(() => status && (status.textContent = "Hi Ada, you are 36"), [], "<");
    },
    { scope, dependencies: [inView, replayCount, reducedMotion] },
  );

  return (
    <AnimationCard rootRef={rootRef} code='f"Hi {name}, you are {age}"' onReplay={replay}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-muted">
          <span>name = </span>
          <span className="rounded border border-border bg-background px-2 py-0.5 text-foreground">Ada</span>
          <span className="ml-2">age = </span>
          <span className="rounded border border-border bg-background px-2 py-0.5 text-foreground">36</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-base text-foreground">
          <span className="text-warn">f&quot;Hi </span>
          <span className="fs-slot inline-flex min-w-12 items-center justify-center rounded-md border border-border bg-background px-2 py-0.5 text-brand" />
          <span className="text-warn">, you are </span>
          <span className="fs-slot inline-flex min-w-10 items-center justify-center rounded-md border border-border bg-background px-2 py-0.5 text-brand" />
          <span className="text-warn">&quot;</span>
        </div>

        <div className="fs-result rounded-lg border border-brand/50 bg-brand/10 px-4 py-2 font-mono text-sm text-brand">
          Hi Ada, you are 36
        </div>
      </div>

      <div className="mt-5 text-center">
        <span className="fs-status inline-block rounded-lg border border-border bg-background px-4 py-1.5 font-mono text-sm text-foreground" />
      </div>
    </AnimationCard>
  );
}
