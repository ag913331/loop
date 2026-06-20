import LessonShell from "@/components/LessonShell";
import IntegersDemo from "@/components/IntegersDemo";

export const metadata = {
  title: "Integers — loop",
  description:
    "Integers are whole numbers — positive, negative or zero — with no fractional part.",
};

export default function Page() {
  return (
    <LessonShell slug="integers">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        An <strong className="text-foreground">integer</strong>{" "}— Python calls
        the type <span className="font-mono text-accent">int</span>{" "}— is a whole
        number. <span className="font-mono text-warn">0</span>,{" "}
        <span className="font-mono text-warn">42</span>,{" "}
        <span className="font-mono text-warn">-7</span>: positive, negative, or
        zero, but never with a fractional part.
      </p>

      <IntegersDemo />

      <p className="leading-relaxed text-muted">
        You write them just as you&apos;d expect — no commas, no spaces. A minus
        sign makes one negative. There&apos;s no practical limit on how big they
        get: Python handles enormous integers without breaking a sweat.
      </p>

      <p className="leading-relaxed text-muted">
        Two small things to avoid: don&apos;t start an integer with a leading{" "}
        <span className="font-mono text-foreground">0</span>{" "}(Python reserves
        that for other number bases), and use{" "}
        <span className="font-mono text-foreground">_</span>{" "}rather than commas
        to group digits. Next up, what happens when a number <em>does</em>{" "}have a
        decimal point.
      </p>
    </LessonShell>
  );
}
