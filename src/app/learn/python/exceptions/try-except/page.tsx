import LessonShell from "@/components/LessonShell";
import TryExcept from "@/components/TryExcept";
import PyodideRunner from "@/components/PyodideRunner";

const TRY_CODE = `try:
    value = int(input("Enter a number: "))
    print("Reciprocal:", 1 / value)
except ValueError:
    print("That wasn't a whole number — please try again.")

print("Program finished normally.")

# Type "ten": the except branch runs, then the last line still prints.
# Type 4:     the try block succeeds, and except is skipped entirely.`;

export const metadata = {
  title: "try and except — loop",
  description:
    "Wrap risky code in try, and handle failures in except. When an error is raised, control jumps to the handler instead of crashing.",
};

export default function Page() {
  return (
    <LessonShell slug="try-except">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The tool for catching errors is the{" "}
        <span className="font-mono text-accent">try</span>/
        <span className="font-mono text-accent">except</span>{" "}statement. You put
        the risky code in the <span className="font-mono text-accent">try</span>{" "}
        block, and the rescue plan in the{" "}
        <span className="font-mono text-accent">except</span>{" "}block. If the try
        code raises an error, Python doesn&apos;t crash — it{" "}
        <strong className="text-foreground">jumps</strong>{" "}to the handler.
      </p>

      <TryExcept />

      <p className="leading-relaxed text-muted">
        Follow the flow above. The <span className="font-mono text-accent">try</span>{" "}
        block runs normally — until a line raises an exception. At that instant the
        rest of the try block is <strong className="text-foreground">skipped</strong>,
        control leaps to the matching <span className="font-mono text-accent">except</span>,
        the handler runs, and then the program carries on below as if nothing had
        happened.
      </p>

      <PyodideRunner initialCode={TRY_CODE} />

      <p className="leading-relaxed text-muted">
        Two things worth fixing in your mind: the{" "}
        <span className="font-mono text-accent">except</span>{" "}block runs{" "}
        <em>only</em>{" "}when an error was raised — on a good run it&apos;s skipped
        entirely — and either way, execution{" "}
        <strong className="text-foreground">resumes</strong>{" "}after the whole
        statement. No more abrupt crash, no more cryptic traceback for your user.
      </p>

      <p className="leading-relaxed text-muted">
        But is <span className="font-mono text-danger">ValueError</span>{" "}the only
        thing that could go wrong here? Enter <span className="font-mono text-foreground">0</span>{" "}
        and find out — which leads straight to the next lesson.
      </p>
    </LessonShell>
  );
}
