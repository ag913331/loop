import LessonShell from "@/components/LessonShell";
import OneInstructionPerLine from "@/components/OneInstructionPerLine";

export const metadata = {
  title: "Instructions — loop",
  description:
    "Python wants one instruction per line. Here's the rule, the one exception, and why it keeps code readable.",
};

export default function Page() {
  return (
    <LessonShell slug="instructions">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A call like <span className="font-mono text-brand">print(&quot;Hi&quot;)</span>{" "}
        is one <strong className="text-foreground">instruction</strong>{" "}— a single
        order for Python to carry out. Real programs are made of many of them, so
        how do you put more than one together? Python has a firm opinion here.
      </p>

      <OneInstructionPerLine />

      <p className="leading-relaxed text-muted">
        Unlike a lot of languages, Python expects{" "}
        <strong className="text-foreground">one instruction per line</strong>. A
        line is free to be empty, but it must never carry two or three
        instructions crammed together — try it and Python stops with a{" "}
        <span className="font-mono text-foreground">SyntaxError</span>. Give each
        instruction its own line and they run in order, top to bottom.
      </p>

      <p className="leading-relaxed text-muted">
        There&apos;s one exception worth knowing: a single instruction is allowed
        to <em>spread across several lines</em>. That&apos;s handy later, when a
        line would otherwise grow long and hard to read — but it&apos;s still{" "}
        <em>one</em>{" "}instruction, just stretched out. The rule holds: one
        instruction per line, never several jammed onto one.
      </p>
    </LessonShell>
  );
}
