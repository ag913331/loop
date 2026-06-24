import LessonShell from "@/components/ui/LessonShell";
import PythonCalculator from "@/components/python/PythonCalculator";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `# Can you guess the output before you run it?
print(2 + 2)`;

export const metadata = {
  title: "Python as a calculator — loop",
  description:
    "print() shows the value of an expression — so Python works the arithmetic out first.",
};

export default function Page() {
  return (
    <LessonShell slug="python-as-a-calculator">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        There&apos;s a side of{" "}
        <span className="font-mono text-brand">print</span>{" "}you haven&apos;t seen
        yet. So far you&apos;ve passed it finished values — but you can also pass
        it an <strong className="text-foreground">expression</strong>, and Python
        will work out the answer before printing it.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Run it. You don&apos;t get the text{" "}
        <span className="font-mono text-warn">2 + 2</span>{" "}— you get{" "}
        <span className="font-mono text-foreground">4</span>. Python evaluated the
        expression inside the parentheses first, then handed the <em>result</em>{" "}
        to print.
      </p>

      <PythonCalculator />

      <p className="leading-relaxed text-muted">
        That little <span className="font-mono text-foreground">+</span>{" "}is an{" "}
        <strong className="text-foreground">operator</strong>, and{" "}
        <span className="font-mono text-warn">2 + 2</span>{" "}is an{" "}
        <strong className="text-foreground">expression</strong>{" "}— data joined
        together by operators. The simplest expression of all is just a single
        literal. From here on we&apos;re in the territory of operators and
        expressions, and the next lesson goes through the tools one by one.
      </p>
    </LessonShell>
  );
}
