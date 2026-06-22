import LessonShell from "@/components/LessonShell";
import BitwiseOps from "@/components/BitwiseOps";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `print(12 & 10)   # AND  -> 8
print(12 | 10)   # OR   -> 14
print(12 ^ 10)   # XOR  -> 6
print(~12)       # NOT  -> -13

# see the binary for yourself
print(bin(12), bin(10))   # 0b1100 0b1010`;

export const metadata = {
  title: "Bitwise operators — loop",
  description:
    "&, |, ^ and ~ apply logic to each bit of a number's binary form.",
};

export default function Page() {
  return (
    <LessonShell slug="bitwise-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        There are four bitwise operators, and each is the bit-level twin of a
        logical idea:{" "}
        <span className="font-mono text-foreground">&amp;</span>{" "}(AND),{" "}
        <span className="font-mono text-foreground">|</span>{" "}(OR),{" "}
        <span className="font-mono text-foreground">^</span>{" "}(XOR, &ldquo;exclusive
        or&rdquo;) and <span className="font-mono text-foreground">~</span>{" "}(NOT).
        They line numbers up in binary and combine them column by column.
      </p>

      <BitwiseOps />

      <p className="leading-relaxed text-muted">
        Each column follows a simple rule.{" "}
        <span className="font-mono text-foreground">&amp;</span>{" "}gives a 1 only
        when <em>both</em>{" "}bits are 1.{" "}
        <span className="font-mono text-foreground">|</span>{" "}gives a 1 when{" "}
        <em>either</em>{" "}is. And <span className="font-mono text-foreground">^</span>{" "}
        gives a 1 only when the bits <em>differ</em>{" "}— exactly one of them is 1.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        The odd one out is <span className="font-mono text-foreground">~</span>{" "}
        (NOT), which takes a single number and flips <em>every</em>{" "}bit. Because
        of how Python stores negative numbers, the tidy result is that{" "}
        <span className="font-mono text-foreground">~x</span>{" "}equals{" "}
        <span className="font-mono text-foreground">-(x + 1)</span>{" "}— so{" "}
        <span className="font-mono text-foreground">~12</span>{" "}is{" "}
        <span className="font-mono text-warn">-13</span>. Don&apos;t worry about
        memorising that; just know <span className="font-mono text-foreground">~</span>{" "}
        inverts the bits.
      </p>
    </LessonShell>
  );
}
