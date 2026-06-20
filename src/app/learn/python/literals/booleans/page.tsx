import LessonShell from "@/components/LessonShell";
import BooleanDemo from "@/components/BooleanDemo";

export const metadata = {
  title: "Boolean values — loop",
  description:
    "Booleans have just two values, True and False — the answer to every yes/no question your code asks.",
};

export default function Page() {
  return (
    <LessonShell slug="booleans">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The <strong className="text-foreground">boolean</strong>{" "}type — Python
        calls it <span className="font-mono text-accent">bool</span>{" "}— is the
        smallest of all: it has exactly two values,{" "}
        <span className="font-mono text-warn">True</span>{" "}and{" "}
        <span className="font-mono text-warn">False</span>. They answer every
        yes/no question your program asks.
      </p>

      <BooleanDemo />

      <p className="leading-relaxed text-muted">
        Two details matter. They start with a{" "}
        <strong className="text-foreground">capital</strong>{" "}letter —{" "}
        <span className="font-mono text-warn">True</span>, not{" "}
        <span className="font-mono text-foreground">true</span>{" "}— and they&apos;re
        special words, not text, so they never take quotes.{" "}
        <span className="font-mono text-warn">&quot;True&quot;</span>{" "}with quotes
        is just a string.
      </p>

      <p className="leading-relaxed text-muted">
        You&apos;ll rarely type <span className="font-mono text-warn">True</span>{" "}
        or <span className="font-mono text-warn">False</span>{" "}by hand. Instead
        they appear as the result of <em>comparisons</em>{" "}like{" "}
        <span className="font-mono text-foreground">5 &gt; 3</span>{" "}— and those
        booleans are what let a program choose between two paths, which is where
        a later module picks up. First, a quick check on everything you&apos;ve
        just met.
      </p>
    </LessonShell>
  );
}
