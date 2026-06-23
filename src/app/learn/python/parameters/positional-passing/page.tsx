import LessonShell from "@/components/LessonShell";
import PositionalPassing from "@/components/PositionalPassing";
import PyodideRunner from "@/components/PyodideRunner";

const POS_CODE = `def area(width, height):
    print("area is", width * height)

area(3, 4)      # width=3, height=4  -> area is 12

# order is everything — these mean different things
def introduce(name, age):
    print(name, "is", age, "years old")

introduce("Ada", 36)     # Ada is 36 years old
introduce(36, "Ada")     # 36 is Ada years old  (nonsense!)`;

export const metadata = {
  title: "Positional parameter passing — loop",
  description:
    "The default way to pass arguments: by position. The first argument fills the first parameter, the second the second, and so on.",
};

export default function Page() {
  return (
    <LessonShell slug="positional-passing">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The simplest way to pass arguments is the one you&apos;ve already been
        using: <strong className="text-foreground">by position</strong>. Python
        lines the arguments up with the parameters in order — the first argument
        goes into the first parameter, the second into the second, and so on down
        the line.
      </p>

      <PositionalPassing />

      <p className="leading-relaxed text-muted">
        It&apos;s simple, but it means <strong className="text-foreground">order
        carries all the meaning</strong>. In{" "}
        <span className="font-mono text-foreground">area(3, 4)</span>, the{" "}
        <span className="font-mono text-foreground">3</span>{" "}is the width purely
        because it came first. Write the values in the wrong order and the function
        does the wrong thing — without any error to warn you.
      </p>

      <PyodideRunner initialCode={POS_CODE} />

      <p className="leading-relaxed text-muted">
        That last call is perfectly legal Python and runs happily — it&apos;s just
        nonsense, because the values went into the wrong slots. When a function has
        several parameters and it&apos;s easy to forget the order, there&apos;s a
        clearer way to pass them: by name.
      </p>
    </LessonShell>
  );
}
