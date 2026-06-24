import LessonShell from "@/components/ui/LessonShell";
import ShortcutOperators from "@/components/python/ShortcutOperators";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `total = 0
total += 10      # total = total + 10
total += 5       # total = total + 5
total *= 2       # total = total * 2
print(total)     # 30`;

export const metadata = {
  title: "Shortcut operators — loop",
  description:
    "Compound assignment operators like += and *= are shorthand for updating a variable from its own value.",
};

export default function Page() {
  return (
    <LessonShell slug="shortcut-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Writing <span className="font-mono text-foreground">total = total + 10</span>{" "}
        gets repetitive fast. Python gives you a shorthand for &ldquo;update a
        variable using itself&rdquo;: the{" "}
        <strong className="text-foreground">compound assignment operators</strong>.
        Stick the arithmetic operator in front of the{" "}
        <span className="font-mono text-foreground">=</span>.
      </p>

      <ShortcutOperators />

      <p className="leading-relaxed text-muted">
        Every arithmetic operator has one. They&apos;re purely a convenience —{" "}
        <span className="font-mono text-foreground">x += 5</span>{" "}does exactly
        what <span className="font-mono text-foreground">x = x + 5</span>{" "}does,
        just with less to type and read. The variable has to already exist,
        though, since the shortcut needs its current value to work with.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        You&apos;ll see <span className="font-mono text-foreground">+=</span>{" "}
        everywhere once you start writing loops — counting things up, building
        totals, stepping a value along. For now, a quick quiz to wrap up
        variables.
      </p>
    </LessonShell>
  );
}
