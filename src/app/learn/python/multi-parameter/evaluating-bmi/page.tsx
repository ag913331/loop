import LessonShell from "@/components/LessonShell";
import BMIFormula from "@/components/BMIFormula";
import PyodideRunner from "@/components/PyodideRunner";

const BMI_CODE = `def bmi(weight, height):
    return weight / height ** 2

print(round(bmi(70, 1.75), 1))    # 22.9
print(round(bmi(100, 1.80), 1))   # 30.9`;

const CATEGORY_CODE = `def bmi(weight, height):
    return weight / height ** 2

def category(value):
    if value < 18.5:
        return "underweight"
    if value < 25:
        return "normal"
    if value < 30:
        return "overweight"
    return "obese"

# two functions working together
score = bmi(70, 1.75)
print(round(score, 1), "->", category(score))   # 22.9 -> normal`;

export const metadata = {
  title: "Evaluating the BMI — loop",
  description:
    "A first genuinely useful multi-parameter function: take weight and height, return the Body Mass Index — then classify it.",
};

export default function Page() {
  return (
    <LessonShell slug="evaluating-bmi">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Now that you can take inputs and return results, let&apos;s build
        something genuinely useful. The <strong className="text-foreground">Body
        Mass Index</strong>{" "}needs two pieces of information — a person&apos;s
        weight and height — so it&apos;s a natural{" "}
        <strong className="text-foreground">two-parameter</strong>{" "}function. The
        formula is just{" "}
        <span className="font-mono text-foreground">weight / height²</span>.
      </p>

      <BMIFormula />

      <p className="leading-relaxed text-muted">
        In Python, &ldquo;height squared&rdquo; is{" "}
        <span className="font-mono text-foreground">height ** 2</span>. Feed in two
        numbers, get one back — and because the function{" "}
        <span className="font-mono text-accent">return</span>s its result, you can
        round it, compare it, or pass it straight into another function.
      </p>

      <PyodideRunner initialCode={BMI_CODE} />

      <p className="leading-relaxed text-muted">
        That last point is the real lesson. A second function,{" "}
        <span className="font-mono text-foreground">category</span>, can take the
        BMI value and turn it into a label — decomposition again, each function
        doing one job. Together they read almost like a sentence.
      </p>

      <PyodideRunner initialCode={CATEGORY_CODE} />

      <p className="leading-relaxed text-muted">
        One function computes, another classifies, and the second simply uses the
        first&apos;s returned value. Next we&apos;ll take{" "}
        <em>three</em>{" "}parameters and ask a more interesting question.
      </p>
    </LessonShell>
  );
}
