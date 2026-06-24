import LessonShell from "@/components/ui/LessonShell";
import Reassignment from "@/components/python/Reassignment";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `counter = 0
counter = counter + 1
counter = counter + 1
print(counter)        # 2

# a variable can even change type
counter = "done"
print(counter)`;

export const metadata = {
  title: "Assigning a new value — loop",
  description:
    "Reassign a variable to change what it holds — including using its own old value, as in counter = counter + 1.",
};

export default function Page() {
  return (
    <LessonShell slug="reassigning-variables">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A box isn&apos;t sealed. Assign to a name that already exists and you{" "}
        <strong className="text-foreground">replace</strong>{" "}what&apos;s inside —
        the old value is simply gone. The newest assignment always wins.
      </p>

      <p className="leading-relaxed text-muted">
        The really useful move is updating a variable{" "}
        <em>from its own current value</em>, like{" "}
        <span className="font-mono text-foreground">counter = counter + 1</span>.
        It looks circular, but it isn&apos;t: Python works out the right side
        first — reading the old value — and only then stores the result back.
      </p>

      <Reassignment />

      <p className="leading-relaxed text-muted">
        So if <span className="font-mono text-foreground">counter</span>{" "}held{" "}
        <span className="font-mono text-warn">2</span>, the right side becomes{" "}
        <span className="font-mono text-foreground">2 + 1</span>, which is{" "}
        <span className="font-mono text-warn">3</span>, and that 3 goes back into
        the box. Run it for yourself:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        And yes — because Python boxes are data-shaped, a reassignment can change
        the type too: a counter that held a number can suddenly hold the text{" "}
        <span className="font-mono text-warn">&quot;done&quot;</span>. Handy, but
        worth keeping track of.
      </p>
    </LessonShell>
  );
}
