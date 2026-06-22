import LessonShell from "@/components/LessonShell";
import IfStatement from "@/components/IfStatement";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `temperature = 35

if temperature > 30:
    print("Hot!")
else:
    print("Nice.")

print("Done.")     # runs either way — it's not indented`;

export const metadata = {
  title: "Conditions and conditional execution — loop",
  description:
    "The if statement runs a block of code only when a condition is True; else handles the other case, and elif chains more.",
};

export default function Page() {
  return (
    <LessonShell slug="conditional-execution">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Now we put answers to work. The{" "}
        <strong className="text-foreground">if</strong>{" "}statement runs a block of
        code <em>only</em>{" "}when its condition is True. Write{" "}
        <span className="font-mono text-accent">if</span>, a condition, a colon —
        then <strong className="text-foreground">indent</strong>{" "}the lines that
        should run.
      </p>

      <IfStatement />

      <p className="leading-relaxed text-muted">
        That indentation isn&apos;t decoration — it&apos;s how Python knows which
        lines belong to the <span className="font-mono text-accent">if</span>.
        Indented lines run only when the condition holds; lines back at the left
        margin run no matter what.
      </p>

      <p className="leading-relaxed text-muted">
        Add an <span className="font-mono text-accent">else</span>{" "}for the
        opposite case — code that runs when the condition is False. And when there
        are several possibilities, chain them with{" "}
        <span className="font-mono text-accent">elif</span>{" "}(&ldquo;else
        if&rdquo;): Python checks each condition in turn and runs the first one
        that&apos;s True, then stops.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Change <span className="font-mono text-foreground">temperature</span>{" "}to
        something cooler and run it again — the program takes the other branch.
        Notice <span className="font-mono text-foreground">&quot;Done.&quot;</span>{" "}
        prints every time, because it isn&apos;t indented under the{" "}
        <span className="font-mono text-accent">if</span>.
      </p>
    </LessonShell>
  );
}
