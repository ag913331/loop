import LessonShell from "@/components/ui/LessonShell";
import PyodideRunner from "@/components/python/PyodideRunner";

const SAFE_EDIT_CODE = `# Keep the original, work on a copy
scores = [40, 88, 72, 95, 60]

ranked = sorted(scores)        # sorted() already returns a new list
backup = scores[:]             # an explicit copy, just in case

scores[0] = 0                  # mess with the original...
print("original:", scores)     # [0, 88, 72, 95, 60]
print("backup:  ", backup)     # [40, 88, 72, 95, 60]  -- safe
print("ranked:  ", ranked)     # [40, 60, 72, 88, 95]`;

const SLICE_WORK_CODE = `data = [5, 10, 15, 20, 25, 30]

print("first three:", data[:3])     # [5, 10, 15]
print("last two:   ", data[-2:])    # [25, 30]
print("middle:     ", data[1:-1])   # [10, 15, 20, 25]
print("reversed:   ", data[::-1])   # [30, 25, 20, 15, 10, 5]

# replace the first half in place
data[:3] = [0, 0, 0]
print("patched:    ", data)         # [0, 0, 0, 20, 25, 30]`;

const MEMBERSHIP_CODE = `inventory = ["sword", "shield", "potion"]

item = input("Pick up what? ")

if item in inventory:
    print("You already have a", item)
elif item not in inventory:
    inventory.append(item)
    print("Added", item)

print("Bag:", inventory)`;

export const metadata = {
  title: "Examples — Operations on lists — loop",
  description:
    "Worked examples that combine list copies, powerful slices, and the in operator on small real problems.",
};

export default function Page() {
  return (
    <LessonShell slug="list-ops-examples">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Three ideas, one section: lists are{" "}
        <strong className="text-foreground">references</strong>, slices are{" "}
        <strong className="text-foreground">powerful</strong>, and{" "}
        <span className="font-mono text-accent">in</span>{" "}answers a yes/no
        question. Here they are at work — read each one, predict the output, then
        run it.
      </p>

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">1. Edit safely with a copy.</strong>{" "}
        Because assignment shares a list, take a slice copy whenever you want to
        change one version while keeping another intact.
      </p>

      <PyodideRunner initialCode={SAFE_EDIT_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">2. Slice from both ends.</strong>{" "}
        Positive and negative indices, omitted bounds, and a negative step give
        you the front, the back, the middle, and a reversal — all in one notation.
      </p>

      <PyodideRunner initialCode={SLICE_WORK_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">3. Membership as a gate.</strong>{" "}
        <span className="font-mono text-accent">in</span>{" "}and{" "}
        <span className="font-mono text-accent">not in</span>{" "}decide whether to
        act. Run this one and type an item — try{" "}
        <span className="font-mono text-foreground">potion</span>{" "}(already there),
        then something new.
      </p>

      <PyodideRunner initialCode={MEMBERSHIP_CODE} />

      <p className="leading-relaxed text-muted">
        That rounds out lists: you can build them, read and change them, sort
        them, copy them safely, slice them every which way, and ask what&apos;s
        inside. That&apos;s a complete, practical toolkit — and the foundation for
        every collection Python has.
      </p>
    </LessonShell>
  );
}
