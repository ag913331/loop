import LessonShell from "@/components/ui/LessonShell";
import FunctionMachine from "@/components/python/FunctionMachine";
import PyodideRunner from "@/components/python/PyodideRunner";

const REPEAT_CODE = `# Without a function — the same three lines, copied for each person
print("=" * 20)
print("Hi, Ada!")
print("=" * 20)

print("=" * 20)
print("Hi, Alan!")
print("=" * 20)

print("=" * 20)
print("Hi, Grace!")
print("=" * 20)`;

const FUNC_CODE = `# With a function — write the steps once, then just call it
def greet(name):
    print("=" * 20)
    print("Hi, " + name + "!")
    print("=" * 20)

greet("Ada")
greet("Alan")
greet("Grace")

# Change the greeting in ONE place and every call updates.`;

export const metadata = {
  title: "What is a function, and why? — loop",
  description:
    "A function is a named, reusable block of code. Write the steps once, call them as often as you like — and fix bugs in one place.",
};

export default function Page() {
  return (
    <LessonShell slug="what-is-a-function">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <strong className="text-foreground">function</strong>{" "}is a named block
        of code that does one job. You define it once, then{" "}
        <strong className="text-foreground">call</strong>{" "}it by name whenever you
        need that job done — like a little machine you can run again and again,
        with different inputs each time.
      </p>

      <FunctionMachine />

      <p className="leading-relaxed text-muted">
        Why bother? Imagine greeting three people without a function: you&apos;d
        copy the same lines three times. Now imagine fifty people — or wanting to
        change the wording. You&apos;d be editing every single copy, and missing
        one is how bugs are born.
      </p>

      <PyodideRunner initialCode={REPEAT_CODE} />

      <p className="leading-relaxed text-muted">
        A function fixes all of that. Write the steps{" "}
        <strong className="text-foreground">once</strong>, give them a name, and
        call it. Three lines of definition replace the copy-paste, the code says
        what it <em>means</em>{" "}(<span className="font-mono text-foreground">greet</span>),
        and a change in one place updates every call.
      </p>

      <PyodideRunner initialCode={FUNC_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s the whole promise of functions:{" "}
        <strong className="text-foreground">don&apos;t repeat yourself</strong>,
        name your ideas, and keep each job in exactly one place. Next we&apos;ll
        see how they let you break a big problem into pieces.
      </p>
    </LessonShell>
  );
}
