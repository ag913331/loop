import LessonShell from "@/components/ui/LessonShell";
import InOperator from "@/components/python/InOperator";
import PyodideRunner from "@/components/python/PyodideRunner";

const IN_CODE = `nums = [3, 8, 1, 6, 9]

print(6 in nums)        # True
print(5 in nums)        # False
print(5 not in nums)    # True

# the real use: guard before you act
if 8 in nums:
    print("found an 8")

# works on strings too
word = "python"
print("y" in word)      # True`;

export const metadata = {
  title: "The in and not in operators — loop",
  description:
    "Ask a list whether it contains a value with in and not in. Each returns a clean True or False, perfect for an if.",
};

export default function Page() {
  return (
    <LessonShell slug="in-operator">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Very often you don&apos;t care <em>where</em>{" "}a value sits in a list —
        only <em>whether</em>{" "}it&apos;s there at all. Python has a pair of
        operators built exactly for that question:{" "}
        <span className="font-mono text-accent">in</span>{" "}and{" "}
        <span className="font-mono text-accent">not in</span>. Each one looks
        through the list and answers with a plain{" "}
        <span className="font-mono text-brand">True</span>{" "}or{" "}
        <span className="font-mono text-danger">False</span>.
      </p>

      <InOperator />

      <p className="leading-relaxed text-muted">
        Under the hood it&apos;s exactly the scan you just watched: Python compares
        the value to each element in turn and stops the moment it finds a match.
        You never have to write that loop yourself —{" "}
        <span className="font-mono text-foreground">6 in nums</span>{" "}says it all.
      </p>

      <PyodideRunner initialCode={IN_CODE} />

      <p className="leading-relaxed text-muted">
        Because the result is a Boolean, it slots straight into an{" "}
        <span className="font-mono text-accent">if</span>{" "}— &ldquo;if this value
        is in the list, do something.&rdquo;{" "}
        <span className="font-mono text-accent">not in</span>{" "}is simply its
        opposite, and reads just as naturally. (As a bonus, both work on strings,
        where they test for a substring.)
      </p>
    </LessonShell>
  );
}
