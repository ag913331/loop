import LessonShell from "@/components/ui/LessonShell";
import TupleUnpack from "@/components/python/TupleUnpack";
import PyodideRunner from "@/components/python/PyodideRunner";

const TUPLE_CODE = `# A tuple is made with commas (the parentheses are usually optional)
point = (3, 4)
colours = "red", "green", "blue"

print(point[0])       # 3   -- index like a list
print(len(colours))   # 3
print(point + (5,))   # (3, 4, 5)  -- join to make a NEW tuple

# A one-item tuple needs a trailing comma:
one = (7,)            # tuple
not_a_tuple = (7)     # just the number 7!`;

const UNPACK_CODE = `point = (3, 4)
x, y = point          # unpack into two variables
print(x, y)           # 3 4

# functions can return several values as a tuple
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([4, 8, 1, 9, 2])
print(low, high)      # 1 9

# the famous one-line swap is unpacking too
a, b = 1, 2
a, b = b, a
print(a, b)           # 2 1`;

export const metadata = {
  title: "Tuples — loop",
  description:
    "Tuples are fixed, ordered collections. Create them with commas, index them like lists, and unpack them into separate variables in one line.",
};

export default function Page() {
  return (
    <LessonShell slug="tuples">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <strong className="text-foreground">tuple</strong>{" "}is an ordered
        collection, just like a list — but immutable. You create one with{" "}
        <strong className="text-foreground">commas</strong>{" "}(the parentheses are
        usually optional but make it clearer), and you read it by index exactly as
        you would a list. You just can&apos;t change it afterwards.
      </p>

      <PyodideRunner initialCode={TUPLE_CODE} />

      <p className="leading-relaxed text-muted">
        Watch the one-item gotcha:{" "}
        <span className="font-mono text-foreground">(7,)</span>{" "}is a tuple, but{" "}
        <span className="font-mono text-foreground">(7)</span>{" "}is just the number 7
        in brackets — it&apos;s the <em>comma</em>{" "}that makes a tuple, not the
        parentheses.
      </p>

      <p className="leading-relaxed text-muted">
        Tuples have one lovely trick called{" "}
        <strong className="text-foreground">unpacking</strong>: assign a tuple to
        several variables at once and Python spreads the items out by position.
      </p>

      <TupleUnpack />

      <p className="leading-relaxed text-muted">
        This is why a function can &ldquo;return several values&rdquo; — it really
        returns one tuple, which you unpack on the way out. It&apos;s also the
        secret behind the elegant one-line swap{" "}
        <span className="font-mono text-foreground">a, b = b, a</span>{" "}you saw with
        Fibonacci.
      </p>

      <PyodideRunner initialCode={UNPACK_CODE} />

      <p className="leading-relaxed text-muted">
        Tuples are perfect when a group of values belongs together and shouldn&apos;t
        change — a coordinate, a date, a row of data. Next, a collection that looks
        things up by <em>name</em>{" "}instead of position.
      </p>
    </LessonShell>
  );
}
