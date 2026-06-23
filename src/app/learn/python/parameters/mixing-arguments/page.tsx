import LessonShell from "@/components/LessonShell";
import MixingArgs from "@/components/MixingArgs";
import PyodideRunner from "@/components/PyodideRunner";

const MIX_CODE = `def introduce(name, age, city):
    print(name, "is", age, "and lives in", city)

# positional first, then keyword — perfectly fine
introduce("Ada", age=36, city="London")

# all keyword is fine too
introduce(name="Ada", age=36, city="London")

# but a positional AFTER a keyword is a SyntaxError:
# introduce("Ada", age=36, "London")   # <- uncomment to see it fail`;

export const metadata = {
  title: "Mixing positional and keyword arguments — loop",
  description:
    "You can combine positional and keyword arguments in one call — as long as every positional argument comes before any keyword argument.",
};

export default function Page() {
  return (
    <LessonShell slug="mixing-arguments">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You don&apos;t have to choose one style — you can mix positional and
        keyword arguments in a single call. It&apos;s common to pass the first,
        obvious value positionally and then name the rest for clarity. There&apos;s
        just <strong className="text-foreground">one rule</strong>, and Python
        enforces it strictly.
      </p>

      <p className="leading-relaxed text-muted">
        The rule:{" "}
        <strong className="text-foreground">every positional argument must come
        before any keyword argument</strong>. Once you&apos;ve started naming
        arguments, you can&apos;t go back to bare positional ones — Python would no
        longer know which parameter the bare value belongs to.
      </p>

      <MixingArgs />

      <p className="leading-relaxed text-muted">
        The good arrangement reads naturally; the bad one stops the program before
        it even runs, with a{" "}
        <span className="font-mono text-danger">SyntaxError</span>. The fix is
        always the same: move the positional arguments to the front, or give them
        names too.
      </p>

      <PyodideRunner initialCode={MIX_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s the complete picture of passing data <em>into</em>{" "}a function:
        parameters as slots, arguments by position or by name, and how to combine
        them. A short quiz to lock it in.
      </p>
    </LessonShell>
  );
}
