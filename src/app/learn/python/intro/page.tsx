import Link from "next/link";
import { LESSONS } from "./lessons";

export const metadata = {
  title: "Introduction to Programming — loop",
  description:
    "The very beginning: what a program is, how languages work, and how your code is turned into something a computer can run.",
};

export default function IntroOverview() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← back
      </Link>

      <header className="mt-8">
        <p className="text-sm font-medium text-accent">
          Python Essentials · Module 1
        </p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          Introduction to Programming
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Before a single line of Python, the basics that everything else rests
          on: what a program actually is, why we invented programming languages,
          and how your code becomes something a computer can run. Every idea
          here is animated — watch it happen.
        </p>
        <Link
          href={`/learn/python/intro/${LESSONS[0].slug}`}
          className="mt-7 inline-block rounded-xl bg-brand-strong px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          Begin lesson 1 →
        </Link>
      </header>

      <ol className="mt-12 space-y-3">
        {LESSONS.map((lesson, i) => (
          <li key={lesson.slug}>
            <Link
              href={`/learn/python/intro/${lesson.slug}`}
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
