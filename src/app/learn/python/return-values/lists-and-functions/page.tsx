import LessonShell from "@/components/ui/LessonShell";
import ListInFunction from "@/components/python/ListInFunction";
import PyodideRunner from "@/components/python/PyodideRunner";

const RETURN_LIST_CODE = `# A function can RETURN a whole list it builds
def squares_up_to(n):
    result = []
    for i in range(1, n + 1):
        result.append(i * i)
    return result

print(squares_up_to(5))      # [1, 4, 9, 16, 25]`;

const MUTATE_CODE = `# A function can also CHANGE a list passed into it,
# because the list is shared (passed by reference).
def grow(lst):
    lst.append(4)            # edits the caller's own list

nums = [1, 2, 3]
grow(nums)
print(nums)                  # [1, 2, 3, 4]  <- nums changed!

# Want to leave the original alone? Work on a copy:
def grow_copy(lst):
    new = lst[:]             # a separate copy
    new.append(99)
    return new

original = [1, 2, 3]
print(grow_copy(original))   # [1, 2, 3, 99]
print(original)              # [1, 2, 3]  <- untouched`;

export const metadata = {
  title: "Lists and functions — loop",
  description:
    "Functions can return whole lists, and — because lists are shared by reference — can change a list you pass in. Plus how to avoid that.",
};

export default function Page() {
  return (
    <LessonShell slug="lists-and-functions">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A function&apos;s result doesn&apos;t have to be a single number. It can
        hand back a whole <strong className="text-foreground">list</strong>{" "}— build
        it inside, then <span className="font-mono text-accent">return</span>{" "}the
        finished thing. This is how you write functions that produce collections.
      </p>

      <PyodideRunner initialCode={RETURN_LIST_CODE} />

      <p className="leading-relaxed text-muted">
        But lists behave differently from plain numbers when they go{" "}
        <em>into</em>{" "}a function. Remember from earlier that a list name points at
        a shared location in memory — and passing it to a function passes that same
        reference. So a function can reach in and change{" "}
        <strong className="text-foreground">the caller&apos;s own list</strong>.
      </p>

      <ListInFunction />

      <p className="leading-relaxed text-muted">
        That can be exactly what you want (a function that fills or updates a list)
        — or a nasty surprise, if you assumed your original was safe. The animation
        above is the same aliasing idea from the lists module, now crossing a
        function boundary.
      </p>

      <PyodideRunner initialCode={MUTATE_CODE} />

      <p className="leading-relaxed text-muted">
        The rule of thumb:{" "}
        <strong className="text-foreground">if a function should leave its input
        untouched, work on a copy</strong>{" "}(<span className="font-mono text-foreground">lst[:]</span>)
        and return the new list. If it&apos;s meant to update the list in place,
        change it directly — and it&apos;s polite to make that obvious in the
        function&apos;s name.
      </p>
    </LessonShell>
  );
}
