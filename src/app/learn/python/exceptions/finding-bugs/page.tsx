import LessonShell from "@/components/LessonShell";
import ExecutionPaths from "@/components/ExecutionPaths";
import PyodideRunner from "@/components/PyodideRunner";

const HIDDEN_CODE = `def describe(value):
    if value > 0:
        print("positive")
    elif value < 0:
        print("negative")
    else:
        prin("zero")        # typo! 'prin' isn't a function

describe(5)      # positive  -- works fine
describe(-2)     # negative  -- works fine
describe(0)      # NameError: name 'prin' is not defined`;

const PRINT_DEBUG_CODE = `def total(prices):
    running = 0
    for p in prices:
        print("DEBUG  p =", p, " running =", running)   # temporary
        running += p
    return running

print("answer:", total([2, 3, 5]))

# The DEBUG lines reveal the running total at each step.
# Remove them once the bug is found.`;

export const metadata = {
  title: "Finding and fixing bugs — loop",
  description:
    "The other side of errors: bugs in your own code. Test every execution path (Python won't warn you about unused lines), then track bugs down with print debugging.",
};

export default function Page() {
  return (
    <LessonShell slug="finding-bugs">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Exceptions handle bad <em>data</em>. The other half of the battle is bad{" "}
        <em>code</em>{" "}— the bugs you write yourself. You can&apos;t avoid making
        them, so the real skill is finding them. And finding them starts with one
        habit: <strong className="text-foreground">test every path your code can
        take</strong>.
      </p>

      <ExecutionPaths />

      <p className="leading-relaxed text-muted">
        An <span className="font-mono text-accent">if</span>/
        <span className="font-mono text-accent">elif</span>/
        <span className="font-mono text-accent">else</span>{" "}has several routes, and
        a test only checks the route it actually triggers. Here&apos;s the sting:
        because Python is <strong className="text-foreground">interpreted</strong>,
        it doesn&apos;t pre-scan lines it never runs — so a glaring typo on an
        untested branch sits there silently until someone finally takes that path.
      </p>

      <PyodideRunner initialCode={HIDDEN_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s why <span className="font-mono text-foreground">describe(5)</span>{" "}
        and <span className="font-mono text-foreground">describe(-2)</span>{" "}look
        perfect, while <span className="font-mono text-foreground">describe(0)</span>{" "}
        blows up on a typo Python never warned you about. A good test set has to
        reach <em>every</em>{" "}branch — here, a positive, a negative, and a zero.
      </p>

      <p className="leading-relaxed text-muted">
        When something <em>is</em>{" "}wrong, the oldest trick in the book still works:{" "}
        <strong className="text-foreground">print debugging</strong>. Sprinkle a
        few <span className="font-mono text-foreground">print()</span>{" "}calls to
        show which path ran and what your variables actually hold — then remove
        them once you&apos;ve found the culprit.
      </p>

      <PyodideRunner initialCode={PRINT_DEBUG_CODE} />

      <p className="leading-relaxed text-muted">
        A few more habits that pay off: explain the problem out loud to a colleague
        — or a rubber duck (yes, really) — and the act of narrating often surfaces
        the bug. Isolate the suspect code and run it alone. If it broke recently,
        review what you just changed. And take a break — answers arrive on walks
        more often than at the keyboard.
      </p>
    </LessonShell>
  );
}
