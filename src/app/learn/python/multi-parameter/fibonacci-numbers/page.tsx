import LessonShell from "@/components/ui/LessonShell";
import Fibonacci from "@/components/python/Fibonacci";
import PyodideRunner from "@/components/python/PyodideRunner";

const FIB_CODE = `def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b     # slide the window forward by one
    return a

for i in range(10):
    print(fib(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34`;

export const metadata = {
  title: "Fibonacci numbers — loop",
  description:
    "The Fibonacci sequence: each number is the sum of the previous two. Build it with a loop that keeps just the last two values.",
};

export default function Page() {
  return (
    <LessonShell slug="fibonacci-numbers">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The <strong className="text-foreground">Fibonacci sequence</strong>{" "}starts{" "}
        <span className="font-mono text-foreground">0, 1</span>, and from then on
        every number is the <strong className="text-foreground">sum of the two
        before it</strong>. It shows up everywhere from sunflowers to spirals —
        and it&apos;s a lovely thing to compute.
      </p>

      <Fibonacci />

      <p className="leading-relaxed text-muted">
        To build it you only ever need the last two values. The trick is Python&apos;s
        tuple assignment:{" "}
        <span className="font-mono text-foreground">a, b = b, a + b</span>{" "}slides
        the pair forward in a single step — the new{" "}
        <span className="font-mono text-foreground">a</span>{" "}is the old{" "}
        <span className="font-mono text-foreground">b</span>, and the new{" "}
        <span className="font-mono text-foreground">b</span>{" "}is their sum.
      </p>

      <PyodideRunner initialCode={FIB_CODE} />

      <p className="leading-relaxed text-muted">
        Both factorial and Fibonacci have a self-referential feel:{" "}
        <span className="font-mono text-foreground">n!</span>{" "}is{" "}
        <span className="font-mono text-foreground">n × (n-1)!</span>, and each
        Fibonacci number is defined in terms of earlier ones. That hints at a whole
        different way to write them — where a function calls{" "}
        <em>itself</em>. That&apos;s recursion, and it&apos;s next.
      </p>
    </LessonShell>
  );
}
