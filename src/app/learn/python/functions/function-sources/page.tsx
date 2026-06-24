import LessonShell from "@/components/ui/LessonShell";
import FunctionSources from "@/components/python/FunctionSources";
import PyodideRunner from "@/components/python/PyodideRunner";

const SOURCES_CODE = `# 1. Built in — always available, no setup
print(len("python"))      # len() and print() are built-ins

# 2. From a module — import it first, then use it
import math
print(math.sqrt(144))     # 12.0

# 3. Written by you — define it, then call it
def double(x):
    return x * 2

print(double(21))         # 42`;

export const metadata = {
  title: "Where functions come from — loop",
  description:
    "Functions come from three places: built into Python, imported from a module, or written by you. All are called the same way.",
};

export default function Page() {
  return (
    <LessonShell slug="function-sources">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You&apos;ve already been calling functions —{" "}
        <span className="font-mono text-foreground">print()</span>,{" "}
        <span className="font-mono text-foreground">len()</span>,{" "}
        <span className="font-mono text-foreground">input()</span>. So where do
        functions actually come from? There are three sources, and the lovely part
        is that you <strong className="text-foreground">call all of them the same
        way</strong>: a name, then parentheses.
      </p>

      <FunctionSources />

      <ul className="ml-5 list-disc space-y-1 leading-relaxed text-muted marker:text-muted">
        <li>
          <strong className="text-foreground">Built in.</strong>{" "}A core set comes
          with Python and is always ready —{" "}
          <span className="font-mono text-foreground">print</span>,{" "}
          <span className="font-mono text-foreground">len</span>,{" "}
          <span className="font-mono text-foreground">input</span>,{" "}
          <span className="font-mono text-foreground">sum</span>, and more.
        </li>
        <li>
          <strong className="text-foreground">From a module.</strong>{" "}Python ships
          with a huge standard library; you{" "}
          <span className="font-mono text-accent">import</span>{" "}a module like{" "}
          <span className="font-mono text-foreground">math</span>{" "}or{" "}
          <span className="font-mono text-foreground">random</span>{" "}to unlock its
          functions.
        </li>
        <li>
          <strong className="text-foreground">Written by you.</strong>{" "}When nothing
          existing fits, you define your own with{" "}
          <span className="font-mono text-accent">def</span>{" "}— exactly what
          we&apos;ll do next.
        </li>
      </ul>

      <PyodideRunner initialCode={SOURCES_CODE} />

      <p className="leading-relaxed text-muted">
        Built-in, imported, or your own — once a function exists, calling it looks
        identical. That consistency is what makes Python feel so approachable. Time
        to write one yourself.
      </p>
    </LessonShell>
  );
}
