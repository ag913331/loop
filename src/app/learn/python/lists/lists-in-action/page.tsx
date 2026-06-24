import LessonShell from "@/components/ui/LessonShell";
import ForEach from "@/components/python/ForEach";
import ListSlice from "@/components/python/ListSlice";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `nums = [4, 8, 15, 16, 23, 42]

# loop over every item
for n in nums:
    print(n, "doubled is", n * 2)

# built-in helpers do the obvious thing
print("sum:", sum(nums))
print("max:", max(nums))

# build a new list by filtering
evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print("evens:", evens)`;

const SLICE_CODE = `letters = ["a", "b", "c", "d", "e"]
print(letters[1:4])    # ['b', 'c', 'd']
print(letters[:2])     # first two: ['a', 'b']
print(letters[-2:])    # last two:  ['d', 'e']
print(letters[::2])    # every other: ['a', 'c', 'e']`;

export const metadata = {
  title: "Lists in action — loop",
  description:
    "Loop over lists, slice out sub-lists, and combine lists with loops and conditions to do real work.",
};

export default function Page() {
  return (
    <LessonShell slug="lists-in-action">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        This is where it all comes together. Lists and loops are made for each
        other: a <span className="font-mono text-accent">for</span>{" "}loop walks a
        list item by item, so you can do something with every single value
        without ever touching an index.
      </p>

      <ForEach />

      <p className="leading-relaxed text-muted">
        That pairing — <em>loop over the list, do something with each item</em>{" "}—
        is the engine behind most list work: adding them up, finding the biggest,
        printing a menu, building a new list from an old one. Python also gives
        you ready-made helpers like{" "}
        <span className="font-mono text-foreground">sum()</span>,{" "}
        <span className="font-mono text-foreground">max()</span>{" "}and{" "}
        <span className="font-mono text-foreground">min()</span>{" "}for the common
        cases.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        One more essential tool:{" "}
        <strong className="text-foreground">slicing</strong>. Where{" "}
        <span className="font-mono text-foreground">nums[2]</span>{" "}grabs a single
        item, <span className="font-mono text-foreground">nums[1:4]</span>{" "}grabs a
        whole <em>range</em>{" "}of them as a brand-new list.
      </p>

      <ListSlice />

      <p className="leading-relaxed text-muted">
        The two numbers are a start and a stop (stop excluded, just like{" "}
        <span className="font-mono text-foreground">range</span>), and you can
        leave either out to mean &ldquo;from the beginning&rdquo; or &ldquo;to the
        end.&rdquo; There&apos;s even a third number for a step. Try a few:
      </p>

      <PyodideRunner initialCode={SLICE_CODE} />

      <p className="leading-relaxed text-muted">
        Indexing, slicing, looping, growing and shrinking — that&apos;s the full
        toolkit. A quick quiz to lock it in.
      </p>
    </LessonShell>
  );
}
