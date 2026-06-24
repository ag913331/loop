import LessonShell from "@/components/ui/LessonShell";
import OperatorPrecedence from "@/components/python/OperatorPrecedence";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `print(2 + 3 * 4)     # 14, not 20
print(2 ** 2 ** 3)   # 256  (** binds right-to-left: 2 ** 8)
print((2 + 3) * 4)   # 20  -> parentheses win`;

export const metadata = {
  title: "Operators and their priorities — loop",
  description:
    "Operator precedence in Python: which operations run first, right-associativity of **, and how parentheses override.",
};

export default function Page() {
  return (
    <LessonShell slug="operator-priorities">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        When several operators meet in one expression, Python doesn&apos;t just
        work left to right — it follows{" "}
        <strong className="text-foreground">precedence</strong>, a ranking that
        decides which operation happens first. It&apos;s the same{" "}
        &ldquo;multiplication before addition&rdquo; rule you learned in school.
      </p>

      <OperatorPrecedence />

      <p className="leading-relaxed text-muted">
        From highest priority to lowest, the arithmetic operators rank like this:
      </p>

      <ol className="ml-5 list-decimal space-y-1 leading-relaxed text-muted">
        <li>
          <span className="font-mono text-foreground">**</span>{" "}— exponentiation
        </li>
        <li>
          unary <span className="font-mono text-foreground">+</span>{" "}and{" "}
          <span className="font-mono text-foreground">-</span>{" "}(sign)
        </li>
        <li>
          <span className="font-mono text-foreground">*</span>,{" "}
          <span className="font-mono text-foreground">/</span>,{" "}
          <span className="font-mono text-foreground">//</span>,{" "}
          <span className="font-mono text-foreground">%</span>
        </li>
        <li>
          binary <span className="font-mono text-foreground">+</span>{" "}and{" "}
          <span className="font-mono text-foreground">-</span>
        </li>
      </ol>

      <p className="leading-relaxed text-muted">
        Operators on the same level run <strong className="text-foreground">left
        to right</strong>{" "}— with one famous exception.{" "}
        <span className="font-mono text-foreground">**</span>{" "}goes{" "}
        <strong className="text-foreground">right to left</strong>, so{" "}
        <span className="font-mono text-foreground">2 ** 2 ** 3</span>{" "}is{" "}
        <span className="font-mono text-foreground">2 ** 8</span> ={" "}
        <span className="font-mono text-warn">256</span>, not{" "}
        <span className="font-mono text-foreground">4 ** 3</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        You don&apos;t have to memorise the whole ladder. When in doubt — or just
        to make your intent obvious — wrap the part you want done first in{" "}
        <strong className="text-foreground">parentheses</strong>. They always
        win, and they make code easier to read. That wraps up the operators;
        next, a quick quiz.
      </p>
    </LessonShell>
  );
}
