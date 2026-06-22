import LessonShell from "@/components/LessonShell";
import WhileLoop from "@/components/WhileLoop";
import PyodideRunner from "@/components/PyodideRunner";

const COUNTDOWN = `n = 5
while n > 0:
    print(n)
    n -= 1
print("Lift off!")`;

const ELSE_CODE = `n = 3
while n > 0:
    print(n)
    n -= 1
else:
    print("Counted all the way down")`;

export const metadata = {
  title: "The while loop — loop",
  description:
    "Repeat a block of code as long as a condition is True, plus the while/else clause.",
};

export default function Page() {
  return (
    <LessonShell slug="while-loop">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <strong className="text-foreground">while loop</strong>{" "}repeats a block
        of code <em>as long as</em>{" "}a condition stays True. Python checks the
        condition; if it&apos;s True, it runs the indented body, then loops back
        and checks again — over and over, until the condition finally turns False.
      </p>

      <WhileLoop />

      <p className="leading-relaxed text-muted">
        The shape mirrors the <span className="font-mono text-accent">if</span>{" "}
        you already know:{" "}
        <span className="font-mono text-accent">while</span>, a condition, a
        colon, then an indented body. The crucial difference is that the body can
        run many times. Which means something <em>inside</em>{" "}the loop must
        eventually make the condition False — here,{" "}
        <span className="font-mono text-foreground">n -= 1</span>{" "}— or the loop
        would never stop.
      </p>

      <PyodideRunner initialCode={COUNTDOWN} />

      <p className="leading-relaxed text-muted">
        Trace it: <span className="font-mono text-foreground">n</span>{" "}starts at 5
        and counts down, printing each value, until{" "}
        <span className="font-mono text-foreground">n</span>{" "}reaches 0 — at which
        point <span className="font-mono text-foreground">n &gt; 0</span>{" "}is False
        and the loop ends. The un-indented{" "}
        <span className="font-mono text-foreground">&quot;Lift off!&quot;</span>{" "}
        then runs once.
      </p>

      <p className="leading-relaxed text-muted">
        A while loop can have an <strong className="text-foreground">else</strong>{" "}
        clause too — an unusual but handy extra. The{" "}
        <span className="font-mono text-accent">else</span>{" "}block runs{" "}
        <em>once</em>, right after the loop ends naturally (when the condition
        becomes False). You&apos;ll see later it&apos;s skipped if the loop is cut
        short by a <span className="font-mono text-foreground">break</span>.
      </p>

      <PyodideRunner initialCode={ELSE_CODE} />
    </LessonShell>
  );
}
