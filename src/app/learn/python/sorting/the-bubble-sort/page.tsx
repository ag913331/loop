import LessonShell from "@/components/LessonShell";
import BubbleSort from "@/components/BubbleSort";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `nums = [5, 1, 4, 2, 8]
n = len(nums)

for i in range(n):
    for j in range(n - 1 - i):
        if nums[j] > nums[j + 1]:
            # swap the two neighbours
            nums[j], nums[j + 1] = nums[j + 1], nums[j]

print(nums)     # [1, 2, 4, 5, 8]`;

export const metadata = {
  title: "The bubble sort — loop",
  description:
    "Bubble sort, the classic teaching algorithm: compare neighbours, swap when out of order, and let the biggest bubble to the end.",
};

export default function Page() {
  return (
    <LessonShell slug="the-bubble-sort">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Putting a list in order sounds simple — until you have to spell out{" "}
        <em>exactly</em>{" "}how. The{" "}
        <strong className="text-foreground">bubble sort</strong>{" "}is the classic
        first algorithm: not the fastest, but wonderfully easy to follow. Its one
        idea is to repeatedly compare each pair of{" "}
        <strong className="text-foreground">neighbours</strong>{" "}and swap them if
        they&apos;re in the wrong order.
      </p>

      <p className="leading-relaxed text-muted">
        Watch it work. Each pass walks left to right, comparing two bars at a
        time; whenever the left is taller than the right, they swap. The effect is
        that the largest value &ldquo;bubbles&rdquo; all the way to the end of each
        pass — so after every pass, one more value is locked in its final place.
      </p>

      <BubbleSort />

      <p className="leading-relaxed text-muted">
        Notice the shape of it: an outer loop for the passes, an inner loop for
        the comparisons within a pass, and a single{" "}
        <span className="font-mono text-accent">if</span>{" "}that decides whether to
        swap. That&apos;s everything you learned in this module — loops,
        conditions and list indexing — working together. The swap itself uses a
        neat Python trick:{" "}
        <span className="font-mono text-foreground">a, b = b, a</span>{" "}exchanges
        two values in one line.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        It works perfectly — and it&apos;s genuinely slow. For a big list, bubble
        sort does an enormous number of comparisons (roughly{" "}
        <span className="font-mono text-foreground">n × n</span>), which is why
        nobody uses it for real work. It earns its keep as a <em>teaching</em>{" "}
        algorithm: simple enough to watch, and a perfect warm-up for the way
        you&apos;ll actually sort — which is next.
      </p>
    </LessonShell>
  );
}
