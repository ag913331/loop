import Link from "next/link";
import { MODULES } from "./modules";

export const metadata = {
  title: "Python Essentials — loop",
  description:
    "Browse the course. Every section is open — start wherever you like.",
};

export default function CourseIndex() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← home
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">The course</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          Python Essentials
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Every section is open — start at the beginning, or jump to whatever
          you want to learn. Pick one to dive in.
        </p>
      </header>

      <div className="mt-12 space-y-4">
        {MODULES.map((module) => (
          <Link
            key={module.slug}
            href={`/learn/python/${module.slug}`}
            className="group block rounded-2xl border border-border bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                Section {module.number}
              </span>
              <span className="text-xs text-muted">
                {module.lessons.length} lessons
              </span>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {module.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
              {module.intro}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Open section
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}

        <p className="px-1 pt-2 text-sm text-muted">More sections coming soon.</p>
      </div>
    </main>
  );
}
