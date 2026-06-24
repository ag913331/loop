import LessonShell from "@/components/LessonShell";
import Mutability from "@/components/Mutability";
import PyodideRunner from "@/components/PyodideRunner";

const MUT_CODE = `# A list is MUTABLE — change it after it's made
nums = [10, 20, 30]
nums[1] = 99
nums.append(40)
print(nums)          # [10, 99, 30, 40]

# A tuple is IMMUTABLE — fixed once created
t = (10, 20, 30)
print(t[1])          # 20  -- reading is fine
t[1] = 99            # TypeError: tuples can't be changed`;

export const metadata = {
  title: "Sequence types and mutability — loop",
  description:
    "The dividing line behind Python's collections: mutable values can change after creation; immutable ones are fixed. Lists vs tuples.",
};

export default function Page() {
  return (
    <LessonShell slug="sequences-and-mutability">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Lists, tuples, strings — many of Python&apos;s types are{" "}
        <strong className="text-foreground">sequences</strong>: ordered
        collections you can index and loop over. But sequences split along one
        crucial line — whether they can be{" "}
        <strong className="text-foreground">changed after they&apos;re created</strong>.
        That property is called <strong className="text-foreground">mutability</strong>.
      </p>

      <Mutability />

      <p className="leading-relaxed text-muted">
        A <strong className="text-foreground">mutable</strong>{" "}value, like a list,
        can be edited in place — swap an element, add one, remove one. An{" "}
        <strong className="text-foreground">immutable</strong>{" "}value, like a tuple
        or a string, is frozen the moment it&apos;s made: you can read it all you
        like, but any attempt to change it is a{" "}
        <span className="font-mono text-danger">TypeError</span>.
      </p>

      <PyodideRunner initialCode={MUT_CODE} />

      <p className="leading-relaxed text-muted">
        Why would you ever <em>want</em>{" "}something you can&apos;t change? Because
        immutability is a guarantee. It keeps data safe from accidental edits, and
        — as you&apos;ll see — it&apos;s what lets tuples do a few things lists
        simply can&apos;t. Let&apos;s meet tuples properly.
      </p>
    </LessonShell>
  );
}
