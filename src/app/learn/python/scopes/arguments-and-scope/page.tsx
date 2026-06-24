import LessonShell from "@/components/ui/LessonShell";
import ArgumentCopy from "@/components/python/ArgumentCopy";
import ListInFunction from "@/components/python/ListInFunction";
import PyodideRunner from "@/components/python/PyodideRunner";

const NUMBER_CODE = `def bump(n):
    n = n + 1            # changes n, the function's own copy
    print("inside:", n)

x = 5
bump(x)                  # inside: 6
print("outside:", x)     # outside: 5  -- x never changed`;

const LIST_CODE = `def add(lst):
    lst.append(4)        # changes the SHARED list

nums = [1, 2, 3]
add(nums)
print(nums)              # [1, 2, 3, 4]  -- nums changed!

# Want to protect the original? Hand the function a copy:
def add_copy(lst):
    lst = lst[:]         # rebind to a private copy first
    lst.append(99)
    return lst

original = [1, 2, 3]
print(add_copy(original))   # [1, 2, 3, 99]
print(original)             # [1, 2, 3]  -- safe`;

export const metadata = {
  title: "How a function interacts with its arguments — loop",
  description:
    "Numbers and strings arrive as copies, so the function can't change the caller's variable; lists are shared, so it can. The same value, two behaviours.",
};

export default function Page() {
  return (
    <LessonShell slug="arguments-and-scope">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        When you pass a value into a function, the parameter is a local variable —
        so what happens if the function changes it? The answer is one of the most
        important things to understand in Python, and it depends entirely on{" "}
        <em>what kind</em>{" "}of value you passed.
      </p>

      <p className="leading-relaxed text-muted">
        Start with a plain number. The parameter gets its own{" "}
        <strong className="text-foreground">copy</strong>{" "}of the value, so changing
        it inside the function has no effect on the caller&apos;s variable at all.
      </p>

      <ArgumentCopy />

      <PyodideRunner initialCode={NUMBER_CODE} />

      <p className="leading-relaxed text-muted">
        Numbers, strings and booleans all behave this way — they&apos;re{" "}
        <strong className="text-foreground">immutable</strong>, and the function
        works on a copy. A list is different. Passing a list hands over a{" "}
        <strong className="text-foreground">reference</strong>{" "}to the very same
        list, so a function can reach in and change the caller&apos;s data.
      </p>

      <ListInFunction />

      <PyodideRunner initialCode={LIST_CODE} />

      <p className="leading-relaxed text-muted">
        Same act of &ldquo;passing an argument,&rdquo; two outcomes: immutable
        values are safe because the function gets a copy; mutable ones (lists,
        and later dictionaries) are shared, so changes leak back out. When you
        want to protect a mutable original, pass — or make — a copy. Keep this in
        mind and a whole category of baffling bugs simply never happens.
      </p>
    </LessonShell>
  );
}
