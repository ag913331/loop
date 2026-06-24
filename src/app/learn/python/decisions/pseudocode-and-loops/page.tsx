import LessonShell from "@/components/ui/LessonShell";
import ForLoopDemo from "@/components/python/ForLoopDemo";

export const metadata = {
  title: "Pseudocode and a peek at loops — loop",
  description:
    "Plan a program in plain steps with pseudocode, and meet the idea of loops — code that repeats.",
};

export default function Page() {
  return (
    <LessonShell slug="pseudocode-and-loops">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Before writing real code, it helps to plan in plain language — a sketch
        called <strong className="text-foreground">pseudocode</strong>. It&apos;s
        just the steps, written for a human, with no fussing over exact syntax:
      </p>

      <pre className="not-prose my-6 overflow-x-auto rounded-2xl border border-border bg-surface p-5 font-mono text-sm leading-7 text-muted">
        {`ask for the temperature
if it is above 30:
    say "Hot!"
otherwise:
    say "Nice."`}
      </pre>

      <p className="leading-relaxed text-muted">
        Notice it reads almost like the Python you just wrote — that&apos;s the
        point. Sketch the logic first, then translate each step into code. For a
        decision, you already can. But pseudocode often contains a step like{" "}
        <em>&ldquo;do this for every item&rdquo;</em>{" "}or{" "}
        <em>&ldquo;keep going until done&rdquo;</em>{" "}— and that&apos;s something
        new: <strong className="text-foreground">repetition</strong>.
      </p>

      <p className="leading-relaxed text-muted">
        A <strong className="text-foreground">loop</strong>{" "}runs the same block of
        code over and over. You&apos;ve seen one on the home page, in fact — here
        it is again: a counter that walks through{" "}
        <span className="font-mono text-foreground">range(5)</span>, adding each
        number to a running total.
      </p>

      <ForLoopDemo />

      <p className="leading-relaxed text-muted">
        That endless little cycle is exactly what the name{" "}
        <span className="brand-gradient font-semibold">loop</span>{" "}is about — and
        it&apos;s where this module heads next. Loops let you process every item
        in a list, repeat until a condition changes, and do in three lines what
        would otherwise take three hundred. First, a quick quiz on decisions.
      </p>
    </LessonShell>
  );
}
