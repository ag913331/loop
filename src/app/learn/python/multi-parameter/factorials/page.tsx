import LessonShell from "@/components/ui/LessonShell";
import Factorial from "@/components/python/Factorial";
import PyodideRunner from "@/components/python/PyodideRunner";

const FACT_CODE = `def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i          # multiply each number into the running total
    return result

print(factorial(4))     # 24
print(factorial(5))     # 120
print(factorial(0))     # 1   (0! is defined as 1)`;

export const metadata = {
  title: "Factorials — loop",
  description:
    "The factorial of n is the product 1·2·…·n. Build it with the loop-and-accumulate pattern: a running total multiplied by each number.",
};

export default function Page() {
  return (
    <LessonShell slug="factorials">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The <strong className="text-foreground">factorial</strong>{" "}of a number{" "}
        <span className="font-mono text-foreground">n</span>{" "}(written{" "}
        <span className="font-mono text-foreground">n!</span>) is every whole
        number from 1 up to <span className="font-mono text-foreground">n</span>,
        all multiplied together. So{" "}
        <span className="font-mono text-foreground">4! = 1 · 2 · 3 · 4 = 24</span>.
        It&apos;s a perfect fit for the{" "}
        <strong className="text-foreground">loop-and-accumulate</strong>{" "}pattern.
      </p>

      <Factorial />

      <p className="leading-relaxed text-muted">
        The idea: start a <span className="font-mono text-foreground">result</span>{" "}
        at <span className="font-mono text-foreground">1</span>, then loop through
        the numbers, multiplying each one into it. The running total grows step by
        step — <span className="font-mono text-foreground">1 → 2 → 6 → 24</span>{" "}—
        and the final value is the answer you return.
      </p>

      <PyodideRunner initialCode={FACT_CODE} />

      <p className="leading-relaxed text-muted">
        Starting <span className="font-mono text-foreground">result</span>{" "}at{" "}
        <span className="font-mono text-foreground">1</span>{" "}(not{" "}
        <span className="font-mono text-foreground">0</span>) is the trick — and it
        neatly makes <span className="font-mono text-foreground">factorial(0)</span>{" "}
        come out as <span className="font-mono text-foreground">1</span>, just as
        maths says it should. Next, a sequence built the same loop-driven way:
        Fibonacci.
      </p>
    </LessonShell>
  );
}
