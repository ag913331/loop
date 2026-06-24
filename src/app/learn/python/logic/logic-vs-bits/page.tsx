import LessonShell from "@/components/ui/LessonShell";
import LogicVsBits from "@/components/python/LogicVsBits";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `# logical: whole True/False values
print(True and True)    # True

# bitwise: every bit, separately
print(bin(5), bin(3))   # 0b101 0b11
print(5 & 3)            # 1   (only the last bit is 1 in both)
print(5 | 3)            # 7
print(5 ^ 3)            # 6`;

export const metadata = {
  title: "Logical values vs. single bits — loop",
  description:
    "The difference between logical operators (and/or/not) on whole values and bitwise operators (&/|/~) on each bit.",
};

export default function Page() {
  return (
    <LessonShell slug="logic-vs-bits">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python actually has <em>two</em>{" "}families of &ldquo;and / or / not&rdquo;,
        and they work at different levels. It&apos;s worth pinning the difference
        down now, because mixing them up is a subtle source of bugs.
      </p>

      <LogicVsBits />

      <p className="leading-relaxed text-muted">
        The <strong className="text-foreground">logical</strong>{" "}operators —{" "}
        <span className="font-mono text-accent">and</span>,{" "}
        <span className="font-mono text-accent">or</span>,{" "}
        <span className="font-mono text-accent">not</span>{" "}— treat each side as a
        single True/False <em>value</em>. That&apos;s what you use in{" "}
        <span className="font-mono text-accent">if</span>{" "}conditions.
      </p>

      <p className="leading-relaxed text-muted">
        The <strong className="text-foreground">bitwise</strong>{" "}operators —{" "}
        <span className="font-mono text-foreground">&amp;</span>,{" "}
        <span className="font-mono text-foreground">|</span>,{" "}
        <span className="font-mono text-foreground">~</span>{" "}— go deeper. They
        line two numbers up in <strong className="text-foreground">binary</strong>{" "}
        and apply the logic to <em>each pair of bits</em>{" "}independently. So{" "}
        <span className="font-mono text-foreground">5 &amp; 3</span>{" "}isn&apos;t a
        yes/no answer — it&apos;s a whole new number, built bit by bit.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        The rule of thumb: use the <em>words</em>{" "}(
        <span className="font-mono text-accent">and</span>,{" "}
        <span className="font-mono text-accent">or</span>) for conditions and
        True/False, and the <em>symbols</em>{" "}(
        <span className="font-mono text-foreground">&amp;</span>,{" "}
        <span className="font-mono text-foreground">|</span>) for working with the
        bits of integers — which is exactly where we&apos;re heading next.
      </p>
    </LessonShell>
  );
}
