import LessonShell from "@/components/ui/LessonShell";
import ParameterSlots from "@/components/python/ParameterSlots";
import PyodideRunner from "@/components/python/PyodideRunner";

const PARAM_CODE = `# 'name' is a PARAMETER — a placeholder named in the def
def greet(name):
    print("Hi, " + name + "!")

# "Ada" and "Alan" are ARGUMENTS — the real values you pass in
greet("Ada")
greet("Alan")

# more than one parameter? separate them with commas
def power(base, exp):
    print(base ** exp)

power(2, 10)        # 1024`;

export const metadata = {
  title: "Parameterized functions — loop",
  description:
    "Parameters are the named slots a function declares; arguments are the values you pass when you call it. The two words, and how they connect.",
};

export default function Page() {
  return (
    <LessonShell slug="parameterized-functions">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A function that always does exactly the same thing is limited. The power
        comes from feeding it <em>different data</em>{" "}each time you call it. You
        do that with <strong className="text-foreground">parameters</strong>: named
        slots, listed in the parentheses of the{" "}
        <span className="font-mono text-accent">def</span>, that stand in for
        values the caller will supply.
      </p>

      <p className="leading-relaxed text-muted">
        Two words are easy to mix up, so let&apos;s pin them down. A{" "}
        <strong className="text-foreground">parameter</strong>{" "}is the name in the
        definition (the empty slot). An{" "}
        <strong className="text-foreground">argument</strong>{" "}is the actual value
        you pass at the call (what fills the slot). Watch one fill the other:
      </p>

      <ParameterSlots />

      <p className="leading-relaxed text-muted">
        Inside the function body, the parameter behaves like an ordinary
        variable — it just happens to start out holding whatever argument was
        passed in. List several parameters by separating them with commas, and the
        function can work with several inputs at once.
      </p>

      <PyodideRunner initialCode={PARAM_CODE} />

      <p className="leading-relaxed text-muted">
        So far we&apos;ve passed arguments in a simple, natural order. But{" "}
        <em>how</em>{" "}does Python decide which argument lands in which parameter?
        That&apos;s the next two lessons — first by position, then by name.
      </p>
    </LessonShell>
  );
}
