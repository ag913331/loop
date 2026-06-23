import LessonShell from "@/components/LessonShell";
import FunctionCall from "@/components/FunctionCall";
import PyodideRunner from "@/components/PyodideRunner";

const DEF_CODE = `def greet():
    print("Hello!")
    print("Nice to meet you.")

print("Start")
greet()              # control jumps into greet, runs it, comes back
print("End")`;

const ORDER_CODE = `# A function must be DEFINED before it is called.
# This works:
def hello():
    print("hi")

hello()

# Defining a function does NOT run it —
# it only runs when you call it. Uncomment to prove it:
# def never_called():
#     print("you won't see this")`;

export const metadata = {
  title: "Your first function — loop",
  description:
    "Define a function with def, call it by name, and follow how control jumps into the body and returns to where it left off.",
};

export default function Page() {
  return (
    <LessonShell slug="first-function">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Time to write one. A function definition has four parts: the keyword{" "}
        <span className="font-mono text-accent">def</span>, a{" "}
        <strong className="text-foreground">name</strong>, a pair of{" "}
        <strong className="text-foreground">parentheses</strong>, and a colon —
        then the indented <strong className="text-foreground">body</strong>{" "}
        underneath. Defining it doesn&apos;t run it; the body only runs when you{" "}
        <strong className="text-foreground">call</strong>{" "}the function by its
        name.
      </p>

      <pre className="not-prose my-6 overflow-x-auto rounded-xl border border-border bg-background p-4 font-mono text-sm leading-7">
        <span className="text-accent">def</span>
        <span className="text-foreground"> greet():</span>
        {"\n  "}
        <span className="text-muted"># &larr; the body, indented</span>
        {"\n    "}
        <span className="text-brand">print</span>
        <span className="text-foreground">(</span>
        <span className="text-warn">&quot;Hello!&quot;</span>
        <span className="text-foreground">)</span>
      </pre>

      <p className="leading-relaxed text-muted">
        Calling it is the part worth watching closely. When Python reaches{" "}
        <span className="font-mono text-foreground">greet()</span>, it{" "}
        <em>jumps</em>{" "}into the function, runs every line of the body, then{" "}
        <strong className="text-foreground">returns</strong>{" "}to the exact spot it
        left and carries on.
      </p>

      <FunctionCall />

      <p className="leading-relaxed text-muted">
        Run this and read the output order: &ldquo;Start&rdquo;, then everything
        inside <span className="font-mono text-foreground">greet</span>, then
        &ldquo;End&rdquo;. The call is a detour, not a fork.
      </p>

      <PyodideRunner initialCode={DEF_CODE} />

      <p className="leading-relaxed text-muted">
        One rule to remember: a function must be{" "}
        <strong className="text-foreground">defined before it&apos;s called</strong>,
        so its <span className="font-mono text-accent">def</span>{" "}has to appear
        above the call in your file. And defining a function never runs it on its
        own — it just teaches Python the steps, ready for whenever you call.
      </p>

      <PyodideRunner initialCode={ORDER_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s a real function: defined, called, and back again. From here
        functions only get more powerful — passing in values, and handing results
        back out.
      </p>
    </LessonShell>
  );
}
