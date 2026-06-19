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

      <div className="mt-12 space-y-12">
        {MODULES.map((module, mi) => (
          <section key={module.title}>
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                Module {mi + 1}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                {module.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {module.intro}
              </p>
            </div>

            <ol className="space-y-3">
              {module.sections.map((section, si) => (
                <li key={section.slug}>
                  <Link
                    href={`/learn/python/${section.slug}`}
                    className="group block rounded-2xl border border-border bg-surface p-5 transition-colors hover:bg-surface-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                        Section {si + 1}
                      </span>
                      <span className="text-xs text-muted">
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
                      {section.intro}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Open section
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <p className="px-1 text-sm text-muted">More modules coming soon.</p>
      </div>
    </main>
  );
}
