import Link from "next/link";
import { locateLesson, nextSection } from "@/app/learn/python/modules";

/**
 * Shared chrome for a lesson: the eyebrow (module · section · position), title
 * and a prev/next pager. The lesson is found from its slug via the registry, so
 * a lesson page only passes its slug. At the end of a section, the pager flows
 * on to the next section. The lesson body is passed as children.
 */
export default function LessonShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const found = locateLesson(slug);
  if (!found) return null;

  const { section, moduleNumber, index } = found;
  const { lessons } = section;
  const lesson = lessons[index];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  const base = `/learn/python/${section.slug}`;
  const after = next ? null : nextSection(section.slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href={base}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {section.title}
      </Link>

      <article className="prose prose-invert mt-8 max-w-none">
        <p className="text-sm font-medium text-accent">
          Module {moduleNumber} · {section.title} · Lesson {index + 1} of{" "}
          {lessons.length}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
        {children}
      </article>

      <nav className="mt-14 flex items-stretch gap-4">
        {prev ? (
          <Link
            href={`${base}/${prev.slug}`}
            className="flex flex-1 flex-col rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2"
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
            href={`${base}/${next.slug}`}
            className="flex flex-1 flex-col items-end rounded-xl border border-border bg-surface p-4 text-right transition-colors hover:bg-surface-2"
          >
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 text-sm font-medium text-foreground">
              {next.title}
            </span>
          </Link>
        ) : after ? (
          <Link
            href={`/learn/python/${after.section.slug}`}
            className="flex flex-1 flex-col items-end rounded-xl border border-brand/40 bg-surface p-4 text-right transition-colors hover:bg-surface-2"
          >
            <span className="text-xs text-brand">Section complete · Up next</span>
            <span className="mt-1 text-sm font-medium text-foreground">
              {after.section.title} →
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </main>
  );
}
