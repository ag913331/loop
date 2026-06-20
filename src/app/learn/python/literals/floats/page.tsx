import LessonShell from "@/components/LessonShell";
import FloatsDemo from "@/components/FloatsDemo";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Floats have a decimal point — try some
print(3.14)
print(2.0)
print(0.1 + 0.2)   # surprise!
print(3e8)         # scientific: 3 × 10^8`;

export const metadata = {
  title: "Floats — loop",
  description:
    "Floats are numbers with a decimal point. 2 and 2.0 are different types — and 0.1 + 0.2 isn't quite 0.3.",
};

export default function Page() {
  return (
    <LessonShell slug="floats">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <strong className="text-foreground">float</strong>{" "}— type{" "}
        <span className="font-mono text-accent">float</span>{" "}— is a number with a
        decimal point: <span className="font-mono text-warn">3.14</span>,{" "}
        <span className="font-mono text-warn">-0.5</span>,{" "}
        <span className="font-mono text-warn">2.0</span>. That dot is the whole
        difference — <span className="font-mono text-warn">2</span>{" "}is an integer,
        but <span className="font-mono text-warn">2.0</span>{" "}is a float, even
        though they&apos;re the same value.
      </p>

      <FloatsDemo />

      <p className="leading-relaxed text-muted">
        For very large or very small numbers, you can use scientific notation
        with an <span className="font-mono text-foreground">e</span>:{" "}
        <span className="font-mono text-warn">3e8</span>{" "}means 3 × 10⁸, or
        300000000.0 — and notice the result is always a float.
      </p>

      <p className="leading-relaxed text-muted">
        One thing that catches everyone out: floats can be slightly imprecise.
        Run this and look closely at the third line — it&apos;s not a Python bug,
        it&apos;s how all computers store decimals in binary.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        For everyday work that tiny error never matters. Just know it&apos;s
        there, and don&apos;t be surprised when a float ends in a long tail of
        digits. Next: text.
      </p>
    </LessonShell>
  );
}
