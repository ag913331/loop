import LessonShell from "@/components/LessonShell";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `nums = [5, 1, 4, 2, 8]

# sorted() returns a NEW sorted list — the original is untouched
print(sorted(nums))     # [1, 2, 4, 5, 8]
print(nums)             # still [5, 1, 4, 2, 8]

# .sort() reorders the list itself, in place
nums.sort()
print(nums)             # now [1, 2, 4, 5, 8]

# largest first
print(sorted(nums, reverse=True))   # [8, 5, 4, 2, 1]

# text sorts alphabetically
words = ["pear", "apple", "fig"]
print(sorted(words))    # ['apple', 'fig', 'pear']`;

export const metadata = {
  title: "Sorting a list — loop",
  description:
    "In real code you don't write bubble sort — you use Python's built-in sort() and sorted().",
};

export default function Page() {
  return (
    <LessonShell slug="sorting-a-list">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s the good news after all that: you&apos;ll almost never write a
        sort by hand. Python has fast, battle-tested sorting built in, and it
        comes in two flavours that are easy to mix up — so let&apos;s pin down the
        difference.
      </p>

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-brand">sorted(nums)</span>{" "}is a function
        that <strong className="text-foreground">returns a new</strong>{" "}sorted
        list and leaves your original exactly as it was.{" "}
        <span className="font-mono text-brand">nums.sort()</span>{" "}is a method that
        <strong className="text-foreground"> reorders the list in place</strong>{" "}—
        it changes <span className="font-mono text-foreground">nums</span>{" "}itself
        and returns nothing. Reach for{" "}
        <span className="font-mono text-foreground">sorted()</span>{" "}when you need
        to keep the original, and <span className="font-mono text-foreground">.sort()</span>{" "}
        when you don&apos;t.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Both sort smallest-to-largest by default. Pass{" "}
        <span className="font-mono text-foreground">reverse=True</span>{" "}to flip
        it, and note that strings sort <em>alphabetically</em>, numbers{" "}
        <em>numerically</em>{" "}— you just can&apos;t mix the two types in one list.
        Under the hood Python uses an algorithm far cleverer (and faster) than
        bubble sort, but the bubble sort you just watched is exactly the kind of
        thinking that makes it tick.
      </p>

      <p className="leading-relaxed text-muted">
        And that&apos;s a wrap on lists — from a row of boxes to sorting them in a
        single line. You now have variables, decisions, loops and collections:
        the core of practical Python.
      </p>
    </LessonShell>
  );
}
