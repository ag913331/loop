import LessonShell from "@/components/ui/LessonShell";
import ListRemove from "@/components/python/ListRemove";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `nums = [10, 15, 20, 30]

del nums[1]            # remove by index
print(nums)            # [10, 20, 30]

last = nums.pop()      # remove the last AND give it back
print(last)            # 30
print(nums)            # [10, 20]

nums = [10, 20, 20, 30]
nums.remove(20)        # remove the first matching value
print(nums)            # [10, 20, 30]`;

export const metadata = {
  title: "Removing elements — loop",
  description:
    "Shrink a list with del (by index), pop() (returns the value), and remove() (by value).",
};

export default function Page() {
  return (
    <LessonShell slug="removing-elements">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Lists shrink, too — and crucially, they never leave a hole. Remove an
        element and everything after it slides left to close the gap, the exact
        mirror image of an insert. There are three ways to do it, each for a
        slightly different situation.
      </p>

      <ListRemove />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-brand">del nums[1]</span>{" "}removes whatever
        is <em>at index 1</em>. <span className="font-mono text-brand">nums.pop()</span>{" "}
        removes the <em>last</em>{" "}element — but also <strong className="text-foreground">returns</strong>{" "}
        it, so you can use the value you just took out (pop an index, like{" "}
        <span className="font-mono text-foreground">pop(0)</span>, to take from
        elsewhere). And{" "}
        <span className="font-mono text-brand">nums.remove(20)</span>{" "}deletes the
        first element that <em>equals</em>{" "}a value, when you know the value but
        not the position.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        A couple of gotchas:{" "}
        <span className="font-mono text-foreground">remove()</span>{" "}only takes out
        the <em>first</em>{" "}match, and asking it to remove something that isn&apos;t
        there raises a <span className="font-mono text-danger">ValueError</span>.
        When in doubt, <span className="font-mono text-foreground">value in nums</span>{" "}
        first.
      </p>
    </LessonShell>
  );
}
