import LessonShell from "@/components/ui/LessonShell";
import InfiniteLoop from "@/components/python/InfiniteLoop";
import PyodideRunner from "@/components/python/PyodideRunner";

const SAFE_CODE = `# A "while True" loop with an escape hatch — safe to run
count = 0
while True:
    count += 1
    print("round", count)
    if count == 5:
        break          # <-- this is the only way out
print("Stopped.")`;

export const metadata = {
  title: "Infinite loops — loop",
  description:
    "while True never ends on its own. When infinite loops happen, why they're sometimes useful, and how to escape.",
};

export default function Page() {
  return (
    <LessonShell slug="infinite-loops">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A loop only ends when its condition becomes False. So what if the
        condition is <em>always</em>{" "}True? Then it never ends — an{" "}
        <strong className="text-foreground">infinite loop</strong>. The plainest
        one is <span className="font-mono text-foreground">while True:</span>,
        since <span className="font-mono text-warn">True</span>{" "}is, well, always
        true.
      </p>

      <InfiniteLoop />

      <p className="leading-relaxed text-muted">
        Most infinite loops are <em>accidents</em>: you forget the line that moves
        the condition along, so it never changes. A countdown where you forget{" "}
        <span className="font-mono text-foreground">n -= 1</span>{" "}will print the
        same number forever. If you ever run a program that just hangs, a runaway
        loop is the usual suspect — press{" "}
        <span className="font-mono text-foreground">Ctrl-C</span>{" "}in the terminal
        to stop it.
      </p>

      <p className="leading-relaxed text-muted">
        But infinite loops are also written <em>on purpose</em>. A common, very
        useful pattern is{" "}
        <span className="font-mono text-foreground">while True:</span>{" "}with a{" "}
        <span className="font-mono text-foreground">break</span>{" "}inside — &ldquo;keep
        going until something tells me to stop.&rdquo; The loop runs until a
        condition <em>inside</em>{" "}it triggers the{" "}
        <span className="font-mono text-foreground">break</span>:
      </p>

      <PyodideRunner initialCode={SAFE_CODE} />

      <p className="leading-relaxed text-muted">
        ⚠ A word of warning: only run a{" "}
        <span className="font-mono text-foreground">while True</span>{" "}loop that
        you know has a <span className="font-mono text-foreground">break</span>{" "}—
        a truly endless one would freeze the page. We&apos;ll look at{" "}
        <span className="font-mono text-foreground">break</span>{" "}properly in a
        couple of lessons.
      </p>
    </LessonShell>
  );
}
