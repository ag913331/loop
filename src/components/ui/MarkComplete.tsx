"use client";

import { useProgress } from "@/lib/progress";

/**
 * The per-lesson completion toggle, shown at the foot of a lesson. Reads/writes
 * the localStorage-backed progress store. Before hydration it renders the
 * neutral ("mark complete") state, matching the server render.
 */
export default function MarkComplete({
  language,
  slug,
}: {
  language: string;
  slug: string;
}) {
  const { isDone, toggle } = useProgress();
  const done = isDone(language, slug);

  return (
    <button
      type="button"
      onClick={() => toggle(language, slug)}
      aria-pressed={done}
      className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
        done
          ? "border-brand/50 bg-brand/10 text-brand hover:bg-brand/15"
          : "border-border bg-surface text-muted hover:bg-surface-2 hover:text-foreground"
      }`}
    >
      {done ? "✓ Completed — undo" : "Mark as complete"}
    </button>
  );
}
