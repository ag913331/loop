import LessonShell from "@/components/LessonShell";
import ListSliceNegative from "@/components/ListSliceNegative";
import PyodideRunner from "@/components/PyodideRunner";

const NEG_CODE = `nums = [10, 20, 30, 40, 50]

print(nums[-3:-1])   # [30, 40]   from 3rd-from-end up to last (excluded)
print(nums[-2:])     # [40, 50]   the last two
print(nums[:-2])     # [10, 20, 30]   everything but the last two
print(nums[::-1])    # [50, 40, 30, 20, 10]   a reversed copy!`;

export const metadata = {
  title: "Slices with negative indices — loop",
  description:
    "Negative indices count from the end inside a slice, so you can grab the last few items — or reverse a list — without knowing its length.",
};

export default function Page() {
  return (
    <LessonShell slug="negative-slices">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Remember that a single negative index counts from the end:{" "}
        <span className="font-mono text-foreground">nums[-1]</span>{" "}is the last
        item. The lovely part is that this works{" "}
        <strong className="text-foreground">inside a slice too</strong>, so you can
        describe a stretch relative to the end without ever knowing the
        list&apos;s length.
      </p>

      <ListSliceNegative />

      <p className="leading-relaxed text-muted">
        Each box has two indices: the usual one counting up from{" "}
        <span className="font-mono text-foreground">0</span>{" "}on top, and the
        negative one counting back from{" "}
        <span className="font-mono text-accent">-1</span>{" "}underneath. A slice can
        use either — or mix them. The stop is still excluded, so{" "}
        <span className="font-mono text-foreground">nums[-3:-1]</span>{" "}stops just
        before the last element.
      </p>

      <PyodideRunner initialCode={NEG_CODE} />

      <p className="leading-relaxed text-muted">
        Two patterns worth keeping in your pocket:{" "}
        <span className="font-mono text-foreground">nums[-2:]</span>{" "}for &ldquo;the
        last couple,&rdquo; and the famous{" "}
        <span className="font-mono text-foreground">nums[::-1]</span>{" "}— a step of{" "}
        <span className="font-mono text-foreground">-1</span>{" "}that walks the list
        backwards and hands you a <strong className="text-foreground">reversed
        copy</strong>.
      </p>
    </LessonShell>
  );
}
