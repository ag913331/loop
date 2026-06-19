import Link from "next/link";
import { getModule } from "@/app/learn/python/modules";

/**
 * Landing page for a module: its header, a "begin" CTA and the numbered list of
 * lessons. Driven entirely by the module registry, so both modules share it.
 */
export default function ModuleOverview({ slug }: { slug: string }) {
  const module = getModule(slug);
  if (!module) return null;
  const base = `/learn/python/${module.slug}`;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/learn/python"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← All sections
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">
          Python Essentials · Module {module.number}
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          {module.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {module.intro}
        </p>
        <Link
          href={`${base}/${module.lessons[0].slug}`}
          className="mt-7 inline-block rounded-xl bg-brand-strong px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          Begin lesson 1 →
        </Link>
      </header>

      <ol className="mt-12 space-y-3">
        {module.lessons.map((lesson, i) => (
          <li key={lesson.slug}>
            <Link
              href={`${base}/${lesson.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border font-mono text-sm text-muted group-hover:border-brand group-hover:text-brand">
                {i + 1}
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
        ))}
      </ol>
    </main>
  );
}
