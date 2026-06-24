import LessonShell from "@/components/LessonShell";
import ExceptionRaise from "@/components/ExceptionRaise";
import PyodideRunner from "@/components/PyodideRunner";

const CRASH_CODE = `value = int(input("Enter a number: "))
print("Reciprocal:", 1 / value)

# Run it and type letters (like "ten") — or just press Enter.
# Python stops dead and prints a traceback ending in ValueError.`;

export const metadata = {
  title: "Errors are part of the job — loop",
  description:
    "No one writes error-free code, and bad data is inevitable. Meet the traceback Python prints when an unhandled error stops a program.",
};

export default function Page() {
  return (
    <LessonShell slug="errors-are-normal">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s a truth every programmer learns:{" "}
        <strong className="text-foreground">things go wrong</strong>. Not because
        you&apos;re careless, but because code that looks perfect still meets the
        real world — a user types letters where you expected a number, a file
        isn&apos;t there, a calculation divides by zero. Accepting that is the first
        step to handling it gracefully.
      </p>

      <p className="leading-relaxed text-muted">
        There are really two kinds of trouble: errors in the{" "}
        <strong className="text-foreground">data</strong>{" "}(good code, bad input)
        and errors in the <strong className="text-foreground">code</strong>{" "}itself
        (the bugs you write). This section tackles both. Start with the data kind —
        watch a tiny, &ldquo;obviously fine&rdquo; program fall over.
      </p>

      <ExceptionRaise />

      <p className="leading-relaxed text-muted">
        When something goes wrong that Python can&apos;t handle, it{" "}
        <strong className="text-foreground">raises an exception</strong>{" "}and stops,
        printing a <strong className="text-foreground">traceback</strong>. Read it
        bottom-up: the last line is the most useful — it names the exception (here,{" "}
        <span className="font-mono text-danger">ValueError</span>) and gives a short
        reason. The lines above show where it happened.
      </p>

      <PyodideRunner initialCode={CRASH_CODE} />

      <p className="leading-relaxed text-muted">
        Your instinct might be to <em>check</em>{" "}the input first — make sure it&apos;s
        all digits before converting. You could, but Python prefers a different
        philosophy, summed up as{" "}
        <em>&ldquo;it&apos;s easier to ask forgiveness than permission.&rdquo;</em>{" "}
        Rather than trying to prevent every error in advance, let it happen — and
        be ready to catch it. That&apos;s next.
      </p>
    </LessonShell>
  );
}
