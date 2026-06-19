import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
      {/* Hero */}
      <section className="flex flex-col items-center py-28 text-center">
        <span className="mb-6 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          Now in early development · Starting with Python
        </span>
        <h1 className="text-6xl font-bold tracking-tight sm:text-7xl">
          <span className="brand-gradient">loop</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-muted">
          Learn to code by watching concepts move. No walls of text, no static
          diagrams — every idea is an animation that plays out so you{" "}
          <span className="text-foreground">see</span> what happens, step after
          step.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/learn/python/lists"
            className="rounded-xl bg-brand-strong px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Watch a lesson →
          </Link>
          <a
            href="#how"
            className="rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            How it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="grid gap-6 pb-28 sm:grid-cols-3">
        {[
          {
            title: "See it, don't read it",
            body: "Arrays fill, pointers walk, loops iterate. Concepts animate so the mechanics are obvious.",
          },
          {
            title: "Plays as you scroll",
            body: "Animations trigger when you reach them, at reading pace — with a replay whenever you want.",
          },
          {
            title: "Python first",
            body: "We're starting with Python fundamentals. More languages follow once the format proves itself.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              {c.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{c.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
