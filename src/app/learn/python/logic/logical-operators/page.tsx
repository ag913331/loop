import LessonShell from "@/components/ui/LessonShell";
import TruthTable from "@/components/python/TruthTable";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `print(True and False)   # both must be True
print(True or False)    # either is enough
print(not True)         # flips it

# combine real conditions
age = 20
print(age >= 18 and age < 65)   # in range?
print(age < 13 or age > 65)     # child or senior?`;

export const metadata = {
  title: "Logical operators — loop",
  description:
    "Combine True/False values with and, or and not — and join several conditions into one.",
};

export default function Page() {
  return (
    <LessonShell slug="logical-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A single comparison answers one question. Real decisions often need{" "}
        <em>several</em>{" "}— &ldquo;old enough <strong className="text-foreground">and</strong>{" "}
        has a ticket&rdquo;. The <strong className="text-foreground">logical
        operators</strong>{" "}—{" "}
        <span className="font-mono text-accent">and</span>,{" "}
        <span className="font-mono text-accent">or</span>{" "}and{" "}
        <span className="font-mono text-accent">not</span>{" "}— combine booleans into
        a single True/False.
      </p>

      <TruthTable />

      <p className="leading-relaxed text-muted">
        The rules are common sense.{" "}
        <span className="font-mono text-accent">and</span>{" "}is True only when{" "}
        <em>both</em>{" "}sides are True. <span className="font-mono text-accent">or</span>{" "}
        is True when <em>at least one</em>{" "}is. And{" "}
        <span className="font-mono text-accent">not</span>{" "}simply flips a value to
        its opposite.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Two things worth knowing. They have a{" "}
        <strong className="text-foreground">precedence</strong>, like arithmetic:{" "}
        <span className="font-mono text-accent">not</span>{" "}binds tightest, then{" "}
        <span className="font-mono text-accent">and</span>, then{" "}
        <span className="font-mono text-accent">or</span>{" "}— and parentheses
        override, as always. And Python is{" "}
        <strong className="text-foreground">lazy</strong>: in{" "}
        <span className="font-mono text-foreground">A or B</span>, if{" "}
        <span className="font-mono text-foreground">A</span>{" "}is already True it
        never bothers checking <span className="font-mono text-foreground">B</span>
        . That &ldquo;short-circuiting&rdquo; is handy once your conditions get
        expensive.
      </p>
    </LessonShell>
  );
}
