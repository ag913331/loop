import LessonShell from "@/components/LessonShell";
import FirstProgramBuild from "@/components/FirstProgramBuild";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Change "Ada" to your own name, then press Run ▶
name = "Ada"
print("Hello,", name)
print("Welcome to Python!")`;

export const metadata = {
  title: "Writing your first program — loop",
  description:
    "Go beyond hello-world: store a value in a variable, then use it to print a result of your own.",
};

export default function Page() {
  return (
    <LessonShell slug="writing-your-first-program">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You&apos;ve printed text and you&apos;ve seen an error. Now let&apos;s
        write a program that actually <em>does</em> something — one that
        remembers a piece of information and uses it. That&apos;s the leap from
        &ldquo;hello world&rdquo; to real code.
      </p>

      <FirstProgramBuild />

      <p className="leading-relaxed text-muted">
        The first line creates a{" "}
        <strong className="text-foreground">variable</strong>:{" "}
        <span className="font-mono text-foreground">name = &quot;Ada&quot;</span>{" "}
        tells Python to remember the text{" "}
        <span className="font-mono text-warn">&quot;Ada&quot;</span> under the
        label <span className="font-mono text-foreground">name</span>. Think of
        it as a labelled box you can put a value into and open again later.
      </p>

      <p className="leading-relaxed text-muted">
        The next line uses it:{" "}
        <span className="font-mono text-brand">print(&quot;Hello,&quot;, name)</span>{" "}
        prints the word <span className="font-mono text-foreground">Hello,</span>{" "}
        followed by whatever&apos;s in the box — so you get{" "}
        <span className="font-mono text-foreground">Hello, Ada</span>. Change the
        value to your own name, run it again, and the program greets{" "}
        <em>you</em>. That tiny change is the whole point: the program works with
        data, not just fixed words.
      </p>

      <p className="leading-relaxed text-muted">
        Don&apos;t just take our word for it — this is real Python, running right
        here in your browser. Change{" "}
        <span className="font-mono text-warn">&quot;Ada&quot;</span> to your own
        name (or add another <span className="font-mono text-foreground">print</span>{" "}
        line) and press <span className="font-mono text-brand">Run</span>:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s exactly what happens when you save it as{" "}
        <span className="font-mono text-foreground">greet.py</span> and run{" "}
        <span className="font-mono text-brand">python greet.py</span> on your own
        machine. You&apos;ve written your first real program. From here, every new
        idea — more variables, doing maths, making decisions — just adds to this
        same foundation.
      </p>
    </LessonShell>
  );
}
