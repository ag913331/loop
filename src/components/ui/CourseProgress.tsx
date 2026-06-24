"use client";

import Link from "next/link";
import { getCourse } from "@/courses";
import { useProgress } from "@/lib/progress";

/**
 * Course-wide progress for the index page: an overall bar, a "continue where you
 * left off" button pointing at the first unfinished lesson, and a reset. Renders
 * nothing until hydrated so it never points at the wrong place on first paint.
 */
export default function CourseProgress({ language }: { language: string }) {
  const { hydrated, countDone, firstIncomplete, resetLanguage } = useProgress();

  const course = getCourse(language);
  if (!course || !hydrated) return null;

  // every lesson slug, in course order, paired with its section
  const lessons = course.modules.flatMap((m) =>
    m.sections.flatMap((s) => s.lessons.map((l) => ({ section: s.slug, slug: l.slug }))),
  );
  const slugs = lessons.map((l) => l.slug);
  const done = countDone(language, slugs);
  const total = slugs.length;
  if (done === 0) return null; // nothing to resume yet

  const pct = Math.round((done / total) * 100);
  const nextSlug = firstIncomplete(language, slugs);
  const next = nextSlug ? lessons.find((l) => l.slug === nextSlug) : null;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {done === total ? "Course complete 🎉" : "Your progress"}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {done} of {total} lessons · {pct}%
          </p>
        </div>
        {next ? (
          <Link
            href={`/learn/${language}/${next.section}/${next.slug}`}
            className="shrink-0 rounded-xl bg-brand-strong px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Continue →
          </Link>
        ) : null}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-brand-strong transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          if (confirm("Reset all your progress for this course?")) resetLanguage(language);
        }}
        className="mt-3 cursor-pointer text-xs text-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
      >
        Reset progress
      </button>
    </div>
  );
}
