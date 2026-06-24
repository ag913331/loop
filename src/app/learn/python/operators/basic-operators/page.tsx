import LessonShell from "@/components/ui/LessonShell";
import OperatorsTable from "@/components/python/OperatorsTable";
import ModuloViz from "@/components/python/ModuloViz";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `# Try each operator — watch the result's type
print(2 ** 3)    # exponentiation
print(7 * 3)     # multiplication
print(7 / 2)     # division  -> always a float
print(7 // 2)    # floor division
print(7 % 2)     # remainder (modulo)
print(7 + 3)
print(7 - 3)`;

const FLOOR_CODE = `print(6 // 4)     # 1
print(6.0 // 4)   # 1.0
print(-6 // 4)    # -2  (rounds DOWN, not toward zero)`;

export const metadata = {
  title: "Basic operators — loop",
  description:
    "The seven arithmetic operators in Python, the int/float rules, floor division, and the modulo operator.",
};

export default function Page() {
  return (
    <LessonShell slug="basic-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        An <strong className="text-foreground">operator</strong>{" "}is a symbol that
        operates on values — just as <span className="font-mono text-foreground">+</span>{" "}
        adds two numbers in arithmetic. Python has seven for everyday maths.
        Here they are, each with a worked example:
      </p>

      <OperatorsTable />

      <p className="leading-relaxed text-muted">
        Try them yourself — and watch the type of each result closely:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        A pattern runs through nearly all of them — the{" "}
        <strong className="text-foreground">int/float rule</strong>: when both
        operands are integers, the result is an integer; if even one is a float,
        the result is a float. Exponentiation (
        <span className="font-mono text-foreground">**</span>),
        multiplication and the rest all follow it.
      </p>

      <p className="leading-relaxed text-muted">
        There&apos;s one exception. Plain division (
        <span className="font-mono text-foreground">/</span>) <em>always</em>{" "}
        gives a float — even <span className="font-mono text-warn">4 / 2</span>{" "}
        is <span className="font-mono text-foreground">2.0</span>, not{" "}
        <span className="font-mono text-foreground">2</span>. When you need a
        whole-number result, reach for{" "}
        <strong className="text-foreground">floor division</strong>{" "}(
        <span className="font-mono text-foreground">//</span>) instead. It throws
        away the fractional part — but carefully: it always rounds <em>down</em>,
        toward the smaller integer, which matters once negatives show up.
      </p>

      <PyodideRunner initialCode={FLOOR_CODE} />

      <p className="leading-relaxed text-muted">
        See the last line? <span className="font-mono text-warn">-6 // 4</span>{" "}
        is <span className="font-mono text-warn">-2</span>, not{" "}
        <span className="font-mono text-warn">-1</span>. The true answer is{" "}
        <span className="font-mono text-foreground">-1.5</span>, and rounding{" "}
        <em>down</em>{" "}from there lands on <span className="font-mono text-warn">-2</span>.
        (You&apos;ll also hear floor division called integer division.)
      </p>

      <p className="leading-relaxed text-muted">
        The last operator is the odd one out:{" "}
        <strong className="text-foreground">modulo</strong>{" "}(
        <span className="font-mono text-foreground">%</span>), which has no
        everyday arithmetic symbol. It gives the <em>remainder</em>{" "}left after a
        floor division — what couldn&apos;t be evenly divided away.
      </p>

      <ModuloViz />

      <p className="leading-relaxed text-muted">
        And a hard rule, no exceptions: <strong className="text-foreground">never
        divide by zero</strong>{" "}— not with{" "}
        <span className="font-mono text-foreground">/</span>,{" "}
        <span className="font-mono text-foreground">//</span>, or{" "}
        <span className="font-mono text-foreground">%</span>. Python stops with a{" "}
        <span className="font-mono text-danger">ZeroDivisionError</span>{" "}every
        time.
      </p>

      <p className="leading-relaxed text-muted">
        One last subtlety about{" "}
        <span className="font-mono text-foreground">+</span>{" "}and{" "}
        <span className="font-mono text-foreground">-</span>: most operators are{" "}
        <strong className="text-foreground">binary</strong>{" "}— they sit between two
        values, like <span className="font-mono text-foreground">7 - 3</span>. But{" "}
        <span className="font-mono text-foreground">-</span>{" "}can also be{" "}
        <strong className="text-foreground">unary</strong>, taking a single value
        to flip its sign, as in{" "}
        <span className="font-mono text-foreground">-7</span>. That difference
        becomes important next, when we sort out which operator goes first.
      </p>
    </LessonShell>
  );
}
