import LessonShell from "@/components/LessonShell";
import PositionalArgs from "@/components/PositionalArgs";

export const metadata = {
  title: "Positional arguments — loop",
  description:
    "When you pass several values to print, their position decides the order they appear in.",
};

export default function Page() {
  return (
    <LessonShell slug="positional-arguments">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        When you give print several arguments, how does it know which comes
        first? By their <strong className="text-foreground">position</strong>.
        These are called{" "}
        <strong className="text-foreground">positional arguments</strong>: the
        first value you write is used first, the second is used second, and so
        on.
      </p>

      <PositionalArgs />

      <p className="leading-relaxed text-muted">
        It sounds obvious for print — they just come out in the order you wrote
        them — but it&apos;s a rule that runs through all of Python. A function
        decides what each <em>slot</em> means, and the position of your value
        decides which slot it fills.
      </p>

      <p className="leading-relaxed text-muted">
        So <span className="font-mono text-brand">print(&quot;Alice&quot;, &quot;Bob&quot;)</span>{" "}
        and <span className="font-mono text-brand">print(&quot;Bob&quot;, &quot;Alice&quot;)</span>{" "}
        are different instructions with different output. Order carries meaning.
        But position isn&apos;t the only way to pass an argument — some have names,
        which is next.
      </p>
    </LessonShell>
  );
}
