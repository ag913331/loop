import LessonShell from "@/components/LessonShell";
import ListIndexing from "@/components/ListIndexing";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `nums = [10, 20, 30, 40]
print(nums[0])     # first  -> 10
print(nums[2])     # third  -> 30
print(nums[-1])    # last   -> 40
print(nums[-2])    # second from the end -> 30
# print(nums[4])   # IndexError: out of range`;

export const metadata = {
  title: "Indexing lists — loop",
  description:
    "Reach any list element by its position. Indices start at 0, and negative indices count from the end.",
};

export default function Page() {
  return (
    <LessonShell slug="indexing-lists">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Each value in a list lives at a numbered position — its{" "}
        <strong className="text-foreground">index</strong>. To read one, put its
        index in square brackets after the list:{" "}
        <span className="font-mono text-foreground">nums[2]</span>. The catch that
        trips up every beginner: counting starts at{" "}
        <strong className="text-foreground">0</strong>, so{" "}
        <span className="font-mono text-foreground">nums[0]</span>{" "}is the{" "}
        <em>first</em>{" "}item.
      </p>

      <ListIndexing />

      <p className="leading-relaxed text-muted">
        Here&apos;s a lovely Python convenience:{" "}
        <strong className="text-foreground">negative indices are legal</strong>,
        and they count from the <em>end</em>.{" "}
        <span className="font-mono text-foreground">nums[-1]</span>{" "}is the last
        item, <span className="font-mono text-foreground">nums[-2]</span>{" "}the one
        before it. No need to know the length to grab the final element.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        One boundary to respect: an index that doesn&apos;t exist —{" "}
        <span className="font-mono text-foreground">nums[4]</span>{" "}on a four-item
        list — raises an <span className="font-mono text-danger">IndexError</span>.
        (Uncomment the last line and run it to meet one.) Valid indices run from{" "}
        <span className="font-mono text-foreground">0</span>{" "}to{" "}
        <span className="font-mono text-foreground">len(nums) - 1</span>, or{" "}
        <span className="font-mono text-foreground">-1</span>{" "}down to{" "}
        <span className="font-mono text-foreground">-len(nums)</span>.
      </p>
    </LessonShell>
  );
}
