import LessonShell from "@/components/LessonShell";
import RangeFunction from "@/components/RangeFunction";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `for i in range(5):
    print(i)                  # 0 1 2 3 4

print(list(range(2, 8)))      # [2, 3, 4, 5, 6, 7]
print(list(range(0, 10, 3)))  # [0, 3, 6, 9]
print(list(range(10, 0, -1))) # counts down!`;

export const metadata = {
  title: "The range() function — loop",
  description:
    "range() generates sequences of numbers to loop over — controlled by start, stop and step.",
};

export default function Page() {
  return (
    <LessonShell slug="range-function">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Counting is so common in loops that Python has a function just for it:{" "}
        <strong className="text-foreground">range()</strong>. It produces a
        sequence of numbers on demand — perfect for repeating something a fixed
        number of times.
      </p>

      <RangeFunction />

      <p className="leading-relaxed text-muted">
        It takes up to three numbers. With one,{" "}
        <span className="font-mono text-foreground">range(5)</span>{" "}counts from 0
        up to (but not including) 5. With two,{" "}
        <span className="font-mono text-foreground">range(2, 6)</span>{" "}sets the{" "}
        <strong className="text-foreground">start</strong>{" "}and{" "}
        <strong className="text-foreground">stop</strong>. With three,{" "}
        <span className="font-mono text-foreground">range(1, 10, 2)</span>{" "}adds a{" "}
        <strong className="text-foreground">step</strong>{" "}— here, every second
        number.
      </p>

      <p className="leading-relaxed text-muted">
        The one rule that catches people out: the{" "}
        <strong className="text-foreground">stop is never included</strong>.{" "}
        <span className="font-mono text-foreground">range(5)</span>{" "}gives you five
        numbers — 0, 1, 2, 3, 4 — and stops just before 5. That&apos;s actually
        convenient: <span className="font-mono text-foreground">range(len(...))</span>{" "}
        lines up perfectly with counting positions, which you&apos;ll use all the
        time with lists.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Two notes: a negative step counts <em>down</em>{" "}(handy for a countdown),
        and <span className="font-mono text-foreground">range()</span>{" "}doesn&apos;t
        build the whole list in memory — it hands out numbers one at a time as the
        loop asks for them. Wrap it in{" "}
        <span className="font-mono text-foreground">list()</span>{" "}if you want to
        see them all at once.
      </p>
    </LessonShell>
  );
}
