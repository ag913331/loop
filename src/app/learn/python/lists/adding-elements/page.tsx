import LessonShell from "@/components/ui/LessonShell";
import ListInsert from "@/components/python/ListInsert";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `nums = [10, 20, 30]

nums.append(40)        # add to the end
print(nums)            # [10, 20, 30, 40]

nums.insert(1, 15)     # add 15 at index 1
print(nums)            # [10, 15, 20, 30, 40]

# a common pattern: start empty, append in a loop
squares = []
for i in range(1, 5):
    squares.append(i * i)
print(squares)         # [1, 4, 9, 16]`;

export const metadata = {
  title: "Adding elements — loop",
  description:
    "Grow a list with append() (to the end) and insert() (anywhere, shifting the rest along).",
};

export default function Page() {
  return (
    <LessonShell slug="adding-elements">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Lists grow. The everyday way is{" "}
        <strong className="text-foreground">append()</strong>, which adds a value
        to the <em>end</em>{" "}— quick, and the list simply gets one longer. But
        sometimes you need to drop a value into the <em>middle</em>, and that&apos;s{" "}
        <strong className="text-foreground">insert()</strong>.
      </p>

      <ListInsert />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-brand">nums.insert(1, 15)</span>{" "}means
        &ldquo;put 15 at index 1.&rdquo; To make room, every element from that
        position on slides one place to the right — the list reshuffles itself
        around the newcomer. <span className="font-mono text-brand">append(x)</span>{" "}
        is really just the special case of inserting at the very end, where
        nothing has to move.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        That last snippet is one of the most common patterns in all of
        programming: start with an empty list and{" "}
        <span className="font-mono text-foreground">append</span>{" "}to it inside a
        loop, building the result up one item at a time. You&apos;ll write it
        again and again.
      </p>
    </LessonShell>
  );
}
