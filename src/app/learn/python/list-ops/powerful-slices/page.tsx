import LessonShell from "@/components/LessonShell";
import ListSlice from "@/components/ListSlice";
import PyodideRunner from "@/components/PyodideRunner";

const SLICE_CODE = `nums = [10, 20, 30, 40, 50]

print(nums[1:4])     # start:stop -> [20, 30, 40]   (stop excluded)
print(nums[:3])      # no start  -> [10, 20, 30]   (from the beginning)
print(nums[2:])      # no stop   -> [30, 40, 50]   (to the end)
print(nums[:])       # neither   -> a full copy
print(nums[::2])     # step of 2 -> [10, 30, 50]   (every other one)`;

const EDIT_CODE = `nums = [10, 20, 30, 40, 50]

# replace a whole stretch in one go
nums[1:4] = [99, 99]
print(nums)          # [10, 99, 99, 50]

# delete a stretch with del
nums = [10, 20, 30, 40, 50]
del nums[1:4]
print(nums)          # [10, 50]`;

export const metadata = {
  title: "Powerful slices — loop",
  description:
    "Slicing with start:stop:step. Copy a list, grab a sub-list, replace a whole stretch in place, or delete one.",
};

export default function Page() {
  return (
    <LessonShell slug="powerful-slices">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You just used a slice to copy a list. A{" "}
        <strong className="text-foreground">slice</strong>{" "}is a way to pull out a
        whole stretch of a list at once. Where{" "}
        <span className="font-mono text-foreground">nums[2]</span>{" "}grabs a single
        item, <span className="font-mono text-foreground">nums[1:4]</span>{" "}grabs a
        whole range as a brand-new list.
      </p>

      <ListSlice />

      <p className="leading-relaxed text-muted">
        The two numbers are a <strong className="text-foreground">start</strong>{" "}
        and a <strong className="text-foreground">stop</strong>, and — just like{" "}
        <span className="font-mono text-foreground">range</span>{" "}— the stop is{" "}
        <em>excluded</em>. The real power is that you can leave parts out:{" "}
        <span className="font-mono text-foreground">nums[:3]</span>{" "}means
        &ldquo;from the beginning,&rdquo;{" "}
        <span className="font-mono text-foreground">nums[2:]</span>{" "}means &ldquo;to
        the end,&rdquo; and there&apos;s an optional third number — the{" "}
        <strong className="text-foreground">step</strong>.
      </p>

      <PyodideRunner initialCode={SLICE_CODE} />

      <p className="leading-relaxed text-muted">
        Slices aren&apos;t only for reading. Put one on the{" "}
        <em>left</em>{" "}of an <span className="font-mono text-foreground">=</span>{" "}
        and you can replace a whole stretch at once — even with a different number
        of elements — and <span className="font-mono text-accent">del</span>{" "}with a
        slice removes a stretch entirely.
      </p>

      <PyodideRunner initialCode={EDIT_CODE} />

      <p className="leading-relaxed text-muted">
        One slice notation, four jobs: copy, read, replace, delete. Next we&apos;ll
        point those same slices at the <em>end</em>{" "}of a list with negative
        indices.
      </p>
    </LessonShell>
  );
}
