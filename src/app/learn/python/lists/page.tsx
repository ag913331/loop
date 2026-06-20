import Link from "next/link";
import AnimatedArray from "@/components/AnimatedArray";

export const metadata = {
  title: "Python Lists — loop",
  description: "An animated introduction to Python lists.",
};

export default function ListsLesson() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← back
      </Link>

      <article className="prose prose-invert mt-8 max-w-none">
        <p className="text-sm font-medium text-accent">Python · Fundamentals</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          Lists
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted">
          A <span className="font-mono text-foreground">list</span>{" "}is an ordered
          collection of values. Each value sits in its own slot, and every slot
          has a number — its <em>index</em>{" "}— starting from{" "}
          <span className="font-mono text-foreground">0</span>. Watch how the
          values fill in, how the index walks across them, and what happens when
          we add a new value to the end.
        </p>

        <AnimatedArray />

        <p className="leading-relaxed text-muted">
          The pointer above is the index. Position{" "}
          <span className="font-mono text-foreground">[0]</span>{" "}holds the first
          value, <span className="font-mono text-foreground">[1]</span>{" "}the
          second, and so on. When you call{" "}
          <span className="font-mono text-brand">nums.append(99)</span>, Python
          drops the new value into the next free slot at the end — the list grows
          by one.
        </p>

        <p className="leading-relaxed text-muted">
          That&apos;s the whole idea of this site: instead of describing the
          mechanics, we <span className="text-foreground">show</span>{" "}them. Next
          lessons will animate slicing, looping, and how methods like{" "}
          <span className="font-mono text-foreground">insert</span>{" "}and{" "}
          <span className="font-mono text-foreground">pop</span>{" "}shift things
          around.
        </p>
      </article>
    </main>
  );
}
