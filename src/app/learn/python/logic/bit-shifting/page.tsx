import LessonShell from "@/components/LessonShell";
import BitShift from "@/components/BitShift";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `print(5 << 1)    # 10   (5 doubled)
print(5 << 3)    # 40   (5 times 8)
print(20 >> 1)   # 10   (20 halved)
print(20 >> 2)   # 5    (20 divided by 4)
print(7 >> 1)    # 3    (3.5, but the bit just drops off)`;

export const metadata = {
  title: "Shifting bits left and right — loop",
  description:
    "The << and >> operators slide a number's bits, multiplying or dividing by powers of two.",
};

export default function Page() {
  return (
    <LessonShell slug="bit-shifting">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The last two bitwise operators don&apos;t combine numbers — they{" "}
        <strong className="text-foreground">slide</strong>{" "}the bits of one.{" "}
        <span className="font-mono text-foreground">&lt;&lt;</span>{" "}shifts every
        bit to the left; <span className="font-mono text-foreground">&gt;&gt;</span>{" "}
        shifts them right. The number after the operator says how many places.
      </p>

      <BitShift />

      <p className="leading-relaxed text-muted">
        Here&apos;s the neat part. In binary, moving every bit one place left{" "}
        <strong className="text-foreground">doubles</strong>{" "}the value — the same
        way moving a decimal digit left multiplies by ten. So{" "}
        <span className="font-mono text-foreground">x &lt;&lt; 1</span>{" "}is{" "}
        <span className="font-mono text-foreground">x × 2</span>, and{" "}
        <span className="font-mono text-foreground">x &lt;&lt; 3</span>{" "}is{" "}
        <span className="font-mono text-foreground">x × 8</span>{" "}(two to the power
        of the shift).
      </p>

      <p className="leading-relaxed text-muted">
        Shifting right does the reverse: each place{" "}
        <strong className="text-foreground">halves</strong>{" "}the value, dropping any
        bit that falls off the end — which is why{" "}
        <span className="font-mono text-foreground">7 &gt;&gt; 1</span>{" "}gives{" "}
        <span className="font-mono text-warn">3</span>, not 3.5.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Shifts are a fast, classic way to multiply or divide by powers of two, and
        they pair naturally with masks (
        <span className="font-mono text-foreground">1 &lt;&lt; n</span>) to reach
        any bit you like. That&apos;s the whole bitwise toolkit — a quick quiz to
        finish.
      </p>
    </LessonShell>
  );
}
