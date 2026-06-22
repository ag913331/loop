import LessonShell from "@/components/LessonShell";
import ForEach from "@/components/ForEach";
import ForLoopDemo from "@/components/ForLoopDemo";
import PyodideRunner from "@/components/PyodideRunner";

const VARIETY_CODE = `# over a list
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# over a string — one character at a time
for letter in "hi!":
    print(letter)

# over a range of numbers
for i in range(3):
    print("row", i)`;

const ELSE_CODE = `for n in range(2, 10):
    if n == 7:
        print("found a 7")
        break
else:
    print("no 7 in range")   # runs only if the loop never broke`;

export const metadata = {
  title: "The for loop — loop",
  description:
    "The for loop steps through every item in a sequence — a list, a string, or a range — plus the for/else clause.",
};

export default function Page() {
  return (
    <LessonShell slug="for-loop">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Where a <span className="font-mono text-accent">while</span>{" "}loop repeats
        until a condition changes, a{" "}
        <strong className="text-foreground">for loop</strong>{" "}walks through a
        ready-made <em>sequence</em>, one item at a time — and stops automatically
        when it runs out. No counter to manage, no condition to get wrong.
      </p>

      <ForEach />

      <p className="leading-relaxed text-muted">
        Read it almost as English: <span className="font-mono text-accent">for</span>{" "}
        <span className="font-mono text-foreground">fruit</span>{" "}
        <span className="font-mono text-accent">in</span>{" "}the list, do this. Each
        time round, the loop variable —{" "}
        <span className="font-mono text-foreground">fruit</span>{" "}— is set to the
        next item, and the indented body runs with it. A{" "}
        <span className="font-mono text-accent">for</span>{" "}loop will happily step
        through a list, the characters of a string, or a{" "}
        <span className="font-mono text-foreground">range()</span>{" "}of numbers:
      </p>

      <PyodideRunner initialCode={VARIETY_CODE} />

      <p className="leading-relaxed text-muted">
        Pairing <span className="font-mono text-accent">for</span>{" "}with{" "}
        <span className="font-mono text-foreground">range()</span>{" "}is the classic
        &ldquo;do this N times&rdquo; pattern — and it&apos;s exactly the loop from
        the home page: a counter walking{" "}
        <span className="font-mono text-foreground">range(5)</span>, adding each
        number to a running total.
      </p>

      <ForLoopDemo />

      <p className="leading-relaxed text-muted">
        Like <span className="font-mono text-accent">while</span>, a{" "}
        <span className="font-mono text-accent">for</span>{" "}loop can carry an{" "}
        <span className="font-mono text-accent">else</span>{" "}that runs when the
        loop finishes <em>without</em>{" "}a{" "}
        <span className="font-mono text-foreground">break</span>. It&apos;s a tidy
        way to say &ldquo;I went through everything and didn&apos;t find it&rdquo;:
      </p>

      <PyodideRunner initialCode={ELSE_CODE} />

      <p className="leading-relaxed text-muted">
        Between <span className="font-mono text-accent">for</span>,{" "}
        <span className="font-mono text-accent">while</span>,{" "}
        <span className="font-mono text-foreground">range()</span>{" "}and{" "}
        <span className="font-mono text-foreground">break</span>/<span className="font-mono text-foreground">continue</span>,
        you can now express almost any kind of repetition. A quick quiz to seal it
        in.
      </p>
    </LessonShell>
  );
}
