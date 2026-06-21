import LessonShell from "@/components/LessonShell";
import StringMathError from "@/components/StringMathError";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `age = "5"          # what input() would hand you
print(age + 2)     # trying to add text and a number...`;

export const metadata = {
  title: "Prohibited operations — loop",
  description:
    "You can't do arithmetic on the string input() returns — mixing text and numbers raises a TypeError.",
};

export default function Page() {
  return (
    <LessonShell slug="prohibited-operations">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Now the trap springs. Because{" "}
        <span className="font-mono text-brand">input()</span>{" "}always gives you a
        string, trying to do <strong className="text-foreground">maths</strong>{" "}
        with it goes wrong. Python flatly refuses to mix text and numbers — and
        says so, loudly.
      </p>

      <StringMathError />

      <p className="leading-relaxed text-muted">
        Adding the string <span className="font-mono text-warn">&quot;5&quot;</span>{" "}
        to the integer <span className="font-mono text-warn">2</span>{" "}doesn&apos;t
        make <span className="font-mono text-warn">7</span>. To Python,{" "}
        <span className="font-mono text-foreground">+</span>{" "}means &ldquo;add&rdquo;
        for numbers but &ldquo;join&rdquo; for text — and it can&apos;t do either
        across the two types. The result is a{" "}
        <span className="font-mono text-danger">TypeError</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        This is the classic beginner bug: read a number with{" "}
        <span className="font-mono text-foreground">input()</span>, try to add to
        it, and get a <span className="font-mono text-danger">TypeError</span>{" "}you
        didn&apos;t expect. The fix is to <em>convert</em>{" "}the text into a real
        number first — which is exactly what the next lesson is for.
      </p>
    </LessonShell>
  );
}
