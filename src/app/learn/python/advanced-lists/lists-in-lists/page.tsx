import LessonShell from "@/components/LessonShell";
import ListComprehension from "@/components/ListComprehension";
import PyodideRunner from "@/components/PyodideRunner";

const NESTED_CODE = `# a list whose elements are themselves lists
people = [
    ["Ada", 36],
    ["Alan", 41],
    ["Grace", 29],
]

print(people[0])        # ['Ada', 36]   -- a whole inner list
print(people[0][0])     # 'Ada'         -- reach inside it
print(people[2][1])     # 29

# loop over the rows, unpacking each inner list
for name, age in people:
    print(name, "is", age)`;

const COMP_CODE = `nums = [1, 2, 3, 4, 5]

# the long way
squares = []
for n in nums:
    squares.append(n * n)

# the comprehension: same result, one line
squares = [n * n for n in nums]
print(squares)          # [1, 4, 9, 16, 25]

# with a condition: keep only the even ones
evens = [n for n in nums if n % 2 == 0]
print(evens)            # [2, 4]`;

export const metadata = {
  title: "Lists in lists — loop",
  description:
    "A list can hold other lists. Reach inside with double indexing, and build lists in one line with comprehensions.",
};

export default function Page() {
  return (
    <LessonShell slug="lists-in-lists">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Nothing says a list&apos;s elements have to be simple values. An element
        can be <em>another list</em>{" "}— and that single fact is the key to grids,
        tables and boards. To reach a value inside a nested list, index twice:{" "}
        <span className="font-mono text-foreground">people[0]</span>{" "}gives you the
        first inner list, and{" "}
        <span className="font-mono text-foreground">people[0][0]</span>{" "}reaches the
        first item inside <em>that</em>.
      </p>

      <PyodideRunner initialCode={NESTED_CODE} />

      <p className="leading-relaxed text-muted">
        Building these lists by hand — start empty, loop,{" "}
        <span className="font-mono text-foreground">append</span>{" "}— works, but
        Python has a wonderfully compact alternative made for exactly this: the{" "}
        <strong className="text-foreground">list comprehension</strong>. It builds
        a whole new list from an old one in a single expression.
      </p>

      <ListComprehension />

      <p className="leading-relaxed text-muted">
        The shape is always the same:{" "}
        <span className="font-mono text-foreground">[ expression </span>
        <span className="font-mono text-accent">for</span>{" "}
        <span className="font-mono text-foreground">item </span>
        <span className="font-mono text-accent">in</span>{" "}
        <span className="font-mono text-foreground">sequence ]</span>. Take each
        item, run it through the expression, collect the results. You can even add
        an <span className="font-mono text-accent">if</span>{" "}on the end to keep
        only the items you want.
      </p>

      <PyodideRunner initialCode={COMP_CODE} />

      <p className="leading-relaxed text-muted">
        Comprehensions and nested lists are a natural pair — in the next lesson we
        use a comprehension to build a whole{" "}
        <strong className="text-foreground">two-dimensional</strong>{" "}grid in one
        line.
      </p>
    </LessonShell>
  );
}
