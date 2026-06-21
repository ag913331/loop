import LessonShell from "@/components/LessonShell";
import Assignment from "@/components/Assignment";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Create some variables, then print them
score = 100
name = "Ada"
print(score)
print(name)`;

export const metadata = {
  title: "How to create a variable — loop",
  description:
    "Create a variable with assignment: name = value. The = operator stores the right-hand value in the left-hand name.",
};

export default function Page() {
  return (
    <LessonShell slug="creating-a-variable">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You create a variable the moment you put something in it, using the{" "}
        <strong className="text-foreground">assignment operator</strong>,{" "}
        <span className="font-mono text-foreground">=</span>. Write the name, an{" "}
        <span className="font-mono text-foreground">=</span>, then the value:{" "}
        <span className="font-mono text-foreground">score = 100</span>. There&apos;s
        no need to announce the type — Python works it out from the value.
      </p>

      <Assignment />

      <p className="leading-relaxed text-muted">
        Read it right-to-left:{" "}
        <span className="font-mono text-foreground">=</span>{" "}takes the value on
        the <em>right</em>{" "}and stores it in the name on the <em>left</em>. That&apos;s
        why <span className="font-mono text-foreground">100 = score</span>{" "}is an
        error — the name has to be on the left. And despite the symbol, it does{" "}
        <em>not</em>{" "}mean &ldquo;equals&rdquo; in the maths sense.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Try changing the values, or adding a variable of your own. Once a box
        exists, you can use it anywhere you&apos;d use the value itself — which is
        exactly the next lesson.
      </p>
    </LessonShell>
  );
}
