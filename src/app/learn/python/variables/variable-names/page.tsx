import LessonShell from "@/components/LessonShell";
import VariableNames from "@/components/VariableNames";

export const metadata = {
  title: "Variable names — loop",
  description:
    "The rules for naming variables in Python, plus the conventions that keep your code readable.",
};

export default function Page() {
  return (
    <LessonShell slug="variable-names">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You get to name your own boxes, but Python has a few firm rules. A name
        may contain letters, digits and underscores; it must{" "}
        <strong className="text-foreground">start with a letter or an underscore</strong>{" "}
        — never a digit; and it can&apos;t be a word Python already reserves for
        itself, like <span className="font-mono text-foreground">class</span>{" "}or{" "}
        <span className="font-mono text-foreground">if</span>.
      </p>

      <VariableNames />

      <p className="leading-relaxed text-muted">
        Two more things to know. Names are{" "}
        <strong className="text-foreground">case-sensitive</strong>:{" "}
        <span className="font-mono text-foreground">age</span>,{" "}
        <span className="font-mono text-foreground">Age</span>{" "}and{" "}
        <span className="font-mono text-foreground">AGE</span>{" "}are three
        different boxes. And no spaces or punctuation —{" "}
        <span className="font-mono text-foreground">my-var</span>{" "}looks like a
        subtraction, not a name.
      </p>

      <p className="leading-relaxed text-muted">
        Beyond the rules, there&apos;s a strong convention: use{" "}
        <strong className="text-foreground">lowercase with underscores</strong>{" "}
        (<span className="font-mono text-foreground">user_name</span>,{" "}
        <span className="font-mono text-foreground">total_price</span>), and pick
        names that say what they hold. <span className="font-mono text-foreground">x</span>{" "}
        is fine for a quick sum; <span className="font-mono text-foreground">days_left</span>{" "}
        is far kinder to the next person who reads your code — usually you.
      </p>
    </LessonShell>
  );
}
