import LessonShell from "@/components/ui/LessonShell";
import LiteralTypes from "@/components/python/LiteralTypes";

export const metadata = {
  title: "Literals — loop",
  description:
    "A literal is a value written directly into your code, and Python recognises its type on sight.",
};

export default function Page() {
  return (
    <LessonShell slug="what-are-literals">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        When you wrote{" "}
        <span className="font-mono text-warn">&quot;Hello&quot;</span>{" "}or{" "}
        <span className="font-mono text-warn">42</span>{" "}in your programs, you were
        using <strong className="text-foreground">literals</strong>. A literal is
        simply a value written <em>literally</em>{" "}into your code — the data
        itself, spelled out, rather than calculated or stored under a name.
      </p>

      <LiteralTypes />

      <p className="leading-relaxed text-muted">
        Here&apos;s the key idea: Python looks at <em>how</em>{" "}you write a literal
        and decides what <strong className="text-foreground">type</strong>{" "}of
        data it is. <span className="font-mono text-warn">42</span>{" "}is a whole
        number, so it&apos;s an integer.{" "}
        <span className="font-mono text-warn">3.14</span>{" "}has a decimal point, so
        it&apos;s a float. Quotes make it text; the words{" "}
        <span className="font-mono text-warn">True</span>{" "}and{" "}
        <span className="font-mono text-warn">False</span>{" "}make it a boolean.
      </p>

      <p className="leading-relaxed text-muted">
        Type matters because it decides what Python can <em>do</em>{" "}with a value —
        you can multiply numbers, but not the word &ldquo;hello.&rdquo; The rest
        of this section takes each of these four types in turn, starting with the
        most familiar: whole numbers.
      </p>
    </LessonShell>
  );
}
