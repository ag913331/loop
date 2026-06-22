import LessonShell from "@/components/LessonShell";
import ListIntro from "@/components/ListIntro";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# a list: square brackets, values separated by commas
scores = [85, 92, 78, 64]
print(scores)
print(len(scores))     # how many items? 4

# a list can hold a mix of types
mixed = [1, "two", 3.0, True]
print(mixed)

empty = []             # a list with nothing in it (yet)
print(empty)`;

export const metadata = {
  title: "What are lists? — loop",
  description:
    "A list stores many values under one name, in order — far better than juggling many separate variables.",
};

export default function Page() {
  return (
    <LessonShell slug="what-are-lists">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Imagine storing four test scores. You <em>could</em>{" "}make four variables —{" "}
        <span className="font-mono text-foreground">score1</span>,{" "}
        <span className="font-mono text-foreground">score2</span>, and so on — but
        that gets unbearable fast. What if there are a thousand? A{" "}
        <strong className="text-foreground">list</strong>{" "}holds as many values as
        you like under a <em>single</em>{" "}name, kept in order.
      </p>

      <ListIntro />

      <p className="leading-relaxed text-muted">
        You write one with square brackets and commas:{" "}
        <span className="font-mono text-foreground">[85, 92, 78, 64]</span>. The
        values keep the order you put them in, and{" "}
        <span className="font-mono text-foreground">len()</span>{" "}tells you how
        many there are. A list can even hold a mix of types — numbers, strings,
        booleans, all together — though most of the time they&apos;ll be the same
        kind of thing.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        That last one, <span className="font-mono text-foreground">[]</span>, is an{" "}
        <strong className="text-foreground">empty list</strong>{" "}— perfectly valid,
        and the usual starting point when you&apos;re about to build a list up
        piece by piece. Now that you have a row of values, the next question is
        how to reach into it.
      </p>
    </LessonShell>
  );
}
