import LessonShell from "@/components/LessonShell";
import TypeCast from "@/components/TypeCast";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `age = input("Your age: ")
age = int(age)              # text -> number
print("Next year:", age + 1)

# you can do it in one step, too:
# age = int(input("Your age: "))`;

export const metadata = {
  title: "Type casting — loop",
  description:
    "Convert between types with int(), float() and str() — the fix for doing maths on input().",
};

export default function Page() {
  return (
    <LessonShell slug="type-casting">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The cure for that <span className="font-mono text-danger">TypeError</span>{" "}
        is <strong className="text-foreground">type casting</strong>: deliberately
        converting a value from one type to another. To turn a string of digits
        into a real integer, pass it through{" "}
        <span className="font-mono text-foreground">int()</span>.
      </p>

      <TypeCast />

      <p className="leading-relaxed text-muted">
        There are three you&apos;ll use constantly:{" "}
        <span className="font-mono text-foreground">int()</span>{" "}makes a whole
        number, <span className="font-mono text-foreground">float()</span>{" "}a
        decimal, and <span className="font-mono text-foreground">str()</span>{" "}
        turns a number back into text. So the standard recipe for reading a number
        is to wrap the input: <span className="font-mono text-foreground">int(input(...))</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        One caution: the text has to actually <em>look</em>{" "}like the target type.{" "}
        <span className="font-mono text-foreground">int(&quot;5&quot;)</span>{" "}is
        fine, but <span className="font-mono text-foreground">int(&quot;hello&quot;)</span>{" "}
        — or <span className="font-mono text-foreground">int(&quot;5.5&quot;)</span>{" "}
        — raises a <span className="font-mono text-danger">ValueError</span>, because
        there&apos;s no whole number in there to find.
      </p>
    </LessonShell>
  );
}
