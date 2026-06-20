import LessonShell from "@/components/LessonShell";
import EscapeChars from "@/components/EscapeChars";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# \\n breaks the line, \\t inserts a tab. Try changing them!
print("Line 1\\nLine 2")
print("Name:\\tAda")`;

export const metadata = {
  title: "Escape & newline characters — loop",
  description:
    "The backslash turns ordinary letters into special instructions like \\n (new line) and \\t (tab).",
};

export default function Page() {
  return (
    <LessonShell slug="escape-and-newline">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        How do you tell print to break onto a new line, when you can&apos;t press
        Enter inside a string? You use a special code. A backslash{" "}
        <span className="font-mono text-foreground">\</span> inside a string is an{" "}
        <strong className="text-foreground">escape character</strong>: it tells
        Python that the next character means something special.
      </p>

      <EscapeChars />

      <p className="leading-relaxed text-muted">
        The most common one is <span className="font-mono text-accent">\n</span> —
        a <strong className="text-foreground">newline</strong>. It isn&apos;t
        printed as a backslash and an &ldquo;n&rdquo;; instead, print breaks the
        text onto the next line right where it sits. Its cousin{" "}
        <span className="font-mono text-accent">\t</span> inserts a tab.
      </p>

      <p className="leading-relaxed text-muted">
        Because the backslash is special, to print an actual backslash you write
        two of them: <span className="font-mono text-foreground">\\</span>. Try
        moving the <span className="font-mono text-accent">\n</span> and{" "}
        <span className="font-mono text-accent">\t</span> around below and see
        what happens:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />
    </LessonShell>
  );
}
