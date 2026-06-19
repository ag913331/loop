import Link from "next/link";
import { LESSONS, lessonIndex } from "@/app/learn/python/intro/lessons";

/**
 * Shared chrome for a lesson in the Introduction to Programming module:
 * the eyebrow, title and a prev/next pager driven by the lesson manifest.
 * The lesson body (prose + animation) is passed as children.
 */
export default function LessonShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const i = lessonIndex(slug);
  const lesson = LESSONS[i];
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/learn/python/intro"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← Introduction to Programming
      </Link>

      <article className="prose prose-invert mt-8 max-w-none">
        <p className="text-sm font-medium text-accent">
          Introduction to Programming · Lesson {i + 1} of {LESSONS.length}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
        {children}
      </article>

      <nav className="mt-14 flex items-stretch gap-4">
        {prev ? (
          <Link
            href={`/learn/python/intro/${prev.slug}`}
            className="group flex flex-1 flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2"
          >
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 text-sm font-medium text-foreground">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/learn/python/intro/${next.slug}`}
            className="group flex flex-1 flex-col items-end rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:bg-surface-2"
          >
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 text-sm font-medium text-foreground">
              {next.title}
            </span>
          </Link>
        ) : (
          <Link
            href="/learn/python/lists"
            className="flex flex-1 flex-col items-end rounded-xl border border-brand/40 bg-surface p-4 text-right transition-colors hover:bg-surface-2"
          >
            <span className="text-xs text-brand">Module complete · Up next</span>
            <span className="mt-1 text-sm font-medium text-foreground">
              Lists →
            </span>
          </Link>
        )}
      </nav>
    </main>
  );
}
