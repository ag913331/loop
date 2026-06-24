"use client";

import { useProgress } from "@/lib/progress";

/**
 * A small "x/y" (or "✓ done") badge for a section, shown on the course index.
 * Renders nothing until progress has hydrated, to avoid a flash of "0/N".
 */
export default function SectionBadge({
  language,
  slugs,
}: {
  language: string;
  slugs: string[];
}) {
  const { hydrated, countDone } = useProgress();
  if (!hydrated) return null;

  const done = countDone(language, slugs);
  const total = slugs.length;
  if (done === 0) return null;

  const complete = done === total;
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
        complete
          ? "border-brand/50 bg-brand/10 text-brand"
          : "border-border bg-surface-2 text-muted"
      }`}
    >
      {complete ? "✓ done" : `${done}/${total}`}
    </span>
  );
}
