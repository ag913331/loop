import Hero from "@/components/ui/Hero";
import ForLoopDemo from "@/components/python/ForLoopDemo";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
      {/* Hero */}
      <section>
        <Hero />
        <ForLoopDemo />
      </section>

      {/* How it works */}
      <section id="how" className="grid gap-6 py-28 sm:grid-cols-3">
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
            title: "Run it yourself",
            body: "Edit and run real Python right in the browser — no setup, instant output — then lock it in with a quick quiz.",
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
