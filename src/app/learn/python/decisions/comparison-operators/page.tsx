import LessonShell from "@/components/LessonShell";
import ComparisonOperators from "@/components/ComparisonOperators";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `print(5 == 5)     # equal?
print(5 != 3)     # not equal?
print(5 > 3)
print(5 < 3)
print(5 >= 5)
print(3 <= 5)

# works on text too — try this:
print("cat" == "dog")`;

export const metadata = {
  title: "Comparison operators — loop",
  description:
    "The six comparison operators in Python: ==, !=, >, <, >=, <= — and why == is not the same as =.",
};

export default function Page() {
  return (
    <LessonShell slug="comparison-operators">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python gives you six operators for comparing values. Each one asks a
        question about two values and answers with a{" "}
        <span className="font-mono text-brand">True</span>{" "}or a{" "}
        <span className="font-mono text-danger">False</span>.
      </p>

      <ComparisonOperators />

      <p className="leading-relaxed text-muted">
        Most read exactly as they look. The two to watch are{" "}
        <span className="font-mono text-foreground">==</span>{" "}(&ldquo;equal
        to&rdquo;, a double equals) and{" "}
        <span className="font-mono text-foreground">!=</span>{" "}(&ldquo;not equal
        to&rdquo;). The double equals matters: a{" "}
        <strong className="text-foreground">single</strong>{" "}
        <span className="font-mono text-foreground">=</span>{" "}is the assignment you
        already know — it <em>stores</em>{" "}a value — whereas{" "}
        <span className="font-mono text-foreground">==</span>{" "}
        <em>compares</em>{" "}two. Reach for the wrong one and your condition won&apos;t
        mean what you think.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        They aren&apos;t just for numbers — you can compare strings too, and even
        the results of other expressions. Whatever you compare, the answer is
        always a boolean, which is exactly what we&apos;ll start putting to work.
      </p>
    </LessonShell>
  );
}
