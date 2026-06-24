"use client";

import Link from "next/link";
import { getSection } from "@/courses";
import { useProgress } from "@/lib/progress";

/**
 * Landing page for a section: its module context, header, a begin/continue CTA,
 * a progress bar, and the numbered lesson list with completion ticks. Driven by
 * the course registry + the localStorage progress store. Shared by every section
 * of every course.
 */
export default function SectionOverview({
  slug,
  language = "python",
}: {
  slug: string;
  language?: string;
}) {
  const { hydrated, isDone, countDone, firstIncomplete } = useProgress();
  const found = getSection(language, slug);
  if (!found) return null;
  const { section, module, moduleNumber } = found;
  const base = `/learn/${language}/${section.slug}`;

  const slugs = section.lessons.map((l) => l.slug);
  const done = countDone(language, slugs);
  const total = slugs.length;
  const allDone = hydrated && done === total;
  const nextSlug = hydrated ? firstIncomplete(language, slugs) : null;

  // Before hydration, show the plain "Begin lesson 1"; after, resume or review.
  const cta = !hydrated
    ? { href: `${base}/${slugs[0]}`, label: "Begin lesson 1 →" }
    : allDone
      ? { href: `${base}/${slugs[0]}`, label: "Review from the start →" }
      : done > 0 && nextSlug
        ? { href: `${base}/${nextSlug}`, label: "Continue →" }
        : { href: `${base}/${slugs[0]}`, label: "Begin lesson 1 →" };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href={`/learn/${language}`}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← All sections
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">
          Module {moduleNumber} · {module.title}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          {section.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {section.intro}
        </p>

        <Link
          href={cta.href}
          className="mt-7 inline-block rounded-xl bg-brand-strong px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          {cta.label}
        </Link>

        {hydrated && done > 0 && (
          <div className="mt-6">
            <div className="mb-1.5 text-xs text-muted">
              {done} of {total} complete
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-brand-strong transition-[width] duration-500"
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <ol className="mt-12 space-y-3">
        {section.lessons.map((lesson, i) => {
          const complete = hydrated && isDone(language, lesson.slug);
          return (
            <li key={lesson.slug}>
              <Link
                href={`${base}/${lesson.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm ${
                    complete
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-muted group-hover:border-brand group-hover:text-brand"
                  }`}
                >
                  {complete ? "✓" : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground">
                    {lesson.title}
                  </span>
                  <span className="block text-sm text-muted">{lesson.blurb}</span>
                </span>
                <span className="ml-auto text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
