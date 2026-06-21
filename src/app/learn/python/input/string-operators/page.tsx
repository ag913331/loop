import LessonShell from "@/components/LessonShell";
import StringOps from "@/components/StringOps";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `first = "Ada"
last = "Lovelace"
print(first + " " + last)     # join with +
print("=" * 20)               # repeat with *
print("ha" * 3)`;

export const metadata = {
  title: "String operators — loop",
  description:
    "For strings, + joins (concatenation) and * repeats (replication) — the same symbols, a different meaning.",
};

export default function Page() {
  return (
    <LessonShell slug="string-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Since <span className="font-mono text-brand">input()</span>{" "}hands you
        strings, it&apos;s worth knowing what you <em>can</em>{" "}do with them.{" "}
        Two operators you already know from numbers work on text as well —
        they just mean something different.
      </p>

      <StringOps />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">+</span>{" "}is{" "}
        <strong className="text-foreground">concatenation</strong>: it joins two
        strings end to end, so{" "}
        <span className="font-mono text-foreground">&quot;ab&quot; + &quot;cd&quot;</span>{" "}
        becomes <span className="font-mono text-warn">&quot;abcd&quot;</span>.
        Note it adds nothing between them — if you want a space, you include one
        yourself.
      </p>

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">*</span>{" "}is{" "}
        <strong className="text-foreground">replication</strong>: a string times a
        number repeats it, so{" "}
        <span className="font-mono text-foreground">&quot;ha&quot; * 3</span>{" "}is{" "}
        <span className="font-mono text-warn">&quot;hahaha&quot;</span>{" "}— handy for
        drawing separator lines. Try them:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Both follow the same logic as before:{" "}
        <span className="font-mono text-foreground">+</span>{" "}needs two strings (you
        can&apos;t join text and a number — cast first), and{" "}
        <span className="font-mono text-foreground">*</span>{" "}needs a string and an
        integer. A quick quiz next to tie input, casting and strings together.
      </p>
    </LessonShell>
  );
}
