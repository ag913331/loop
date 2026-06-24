import LessonShell from "@/components/ui/LessonShell";
import Recursion from "@/components/python/Recursion";
import PyodideRunner from "@/components/python/PyodideRunner";

const REC_FACT_CODE = `def factorial(n):
    if n <= 1:          # the base case — stops the recursion
        return 1
    return n * factorial(n - 1)   # the function calls ITSELF

print(factorial(4))     # 24
print(factorial(6))     # 720`;

const REC_FIB_CODE = `def fib(n):
    if n < 2:           # base cases: fib(0)=0, fib(1)=1
        return n
    return fib(n - 1) + fib(n - 2)

for i in range(10):
    print(fib(i), end=" ")
# 0 1 1 2 3 5 8 13 21 34

# Elegant — but this recursive fib recomputes the same values over
# and over, so it gets slow fast. The loop version is far quicker.`;

export const metadata = {
  title: "Recursion — loop",
  description:
    "A function that calls itself. Every recursion needs a base case to stop it; watch the call stack build up and unwind for factorial.",
};

export default function Page() {
  return (
    <LessonShell slug="recursion">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You just noticed it:{" "}
        <span className="font-mono text-foreground">n!</span>{" "}is really{" "}
        <span className="font-mono text-foreground">n × (n-1)!</span>. A definition
        that refers to itself can be written as a function that{" "}
        <strong className="text-foreground">calls itself</strong>{" "}— that&apos;s{" "}
        <strong className="text-foreground">recursion</strong>. Every recursive
        function needs two things: a{" "}
        <strong className="text-foreground">base case</strong>{" "}that stops it, and a
        step that moves <em>toward</em>{" "}that base case.
      </p>

      <Recursion />

      <p className="leading-relaxed text-muted">
        Watch what happens above:{" "}
        <span className="font-mono text-foreground">factorial(4)</span>{" "}can&apos;t
        finish until <span className="font-mono text-foreground">factorial(3)</span>{" "}
        does, which waits on <span className="font-mono text-foreground">factorial(2)</span>,
        and so on — each call stacked up, paused, waiting. Only when{" "}
        <span className="font-mono text-foreground">factorial(1)</span>{" "}hits the
        base case do the answers come flowing back up:{" "}
        <span className="font-mono text-foreground">1 → 2 → 6 → 24</span>.
      </p>

      <PyodideRunner initialCode={REC_FACT_CODE} />

      <p className="leading-relaxed text-muted">
        The base case is not optional. Forget it — or never move toward it — and
        the function calls itself forever, until Python gives up with a{" "}
        <span className="font-mono text-danger">RecursionError</span>. It&apos;s the
        recursive cousin of the infinite loop.
      </p>

      <PyodideRunner initialCode={REC_FIB_CODE} />

      <p className="leading-relaxed text-muted">
        Recursion can be beautifully concise — Fibonacci in two lines — but it
        isn&apos;t always the right tool. The recursive{" "}
        <span className="font-mono text-foreground">fib</span>{" "}re-solves the same
        sub-problems endlessly and crawls for large{" "}
        <span className="font-mono text-foreground">n</span>, where the loop version
        flies. Reach for recursion when a problem is{" "}
        <em>naturally</em>{" "}self-similar — and keep the loop in your back pocket
        for everything else.
      </p>
    </LessonShell>
  );
}
