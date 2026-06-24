import LessonShell from "@/components/ui/LessonShell";
import Substitution from "@/components/python/Substitution";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `price = 20
quantity = 3
print(price * quantity)        # 60
print("Total:", price * quantity)
# variables can be used to make more variables
total = price * quantity
print(total)`;

export const metadata = {
  title: "How to use variables — loop",
  description:
    "Use a variable by its name and Python substitutes the stored value — anywhere a value would go.",
};

export default function Page() {
  return (
    <LessonShell slug="using-variables">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Once a box has a value, you use it just by writing its{" "}
        <strong className="text-foreground">name</strong>. Wherever Python sees
        the name, it swaps in the stored value — so a variable can go anywhere a
        literal could: inside <span className="font-mono text-brand">print</span>,
        in an expression, even in another assignment.
      </p>

      <Substitution />

      <p className="leading-relaxed text-muted">
        That&apos;s the whole idea: a name <em>stands in</em>{" "}for its value. The
        big win is reuse — set a price once and refer to it ten times, and if it
        changes, you change it in a single place.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        One catch: a variable has to exist <em>before</em>{" "}you use it. Ask Python
        for a name it&apos;s never seen and you&apos;ll get a{" "}
        <span className="font-mono text-danger">NameError</span>{" "}— the same error
        you met from a typo, for the same reason: Python has no box by that name.
      </p>
    </LessonShell>
  );
}
