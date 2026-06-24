import LessonShell from "@/components/ui/LessonShell";
import KeywordPassing from "@/components/python/KeywordPassing";
import PyodideRunner from "@/components/python/PyodideRunner";

const KW_CODE = `def area(width, height):
    print("area is", width * height)

# name each argument — now order doesn't matter
area(width=3, height=4)     # area is 12
area(height=4, width=3)     # area is 12  (same!)

def introduce(name, age):
    print(name, "is", age, "years old")

# keywords make the call self-documenting
introduce(age=36, name="Ada")    # Ada is 36 years old`;

export const metadata = {
  title: "Keyword argument passing — loop",
  description:
    "Pass arguments by name with name=value. Order no longer matters, and the call documents itself.",
};

export default function Page() {
  return (
    <LessonShell slug="keyword-passing">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        There&apos;s a second way to pass arguments that sidesteps the order
        problem entirely:{" "}
        <strong className="text-foreground">keyword arguments</strong>. Instead of
        relying on position, you name the parameter right at the call, with{" "}
        <span className="font-mono text-foreground">name=value</span>. Python then
        matches each value to the parameter you named.
      </p>

      <KeywordPassing />

      <p className="leading-relaxed text-muted">
        Because each value carries its own label, the{" "}
        <strong className="text-foreground">order becomes irrelevant</strong>{" "}—{" "}
        <span className="font-mono text-foreground">area(height=4, width=3)</span>{" "}
        does exactly the same thing as{" "}
        <span className="font-mono text-foreground">area(width=3, height=4)</span>.
        The keyword has to match a real parameter name, though, or Python will
        complain.
      </p>

      <PyodideRunner initialCode={KW_CODE} />

      <p className="leading-relaxed text-muted">
        Keyword arguments also make a call <em>read</em>{" "}better:{" "}
        <span className="font-mono text-foreground">introduce(name=&quot;Ada&quot;, age=36)</span>{" "}
        tells you what each value means without having to go look at the
        definition. So when do you use which? Often you&apos;ll want both at
        once — which has one small rule.
      </p>
    </LessonShell>
  );
}
