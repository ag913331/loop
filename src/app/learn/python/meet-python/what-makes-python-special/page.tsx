import LessonShell from "@/components/LessonShell";
import PythonSpecial from "@/components/PythonSpecial";

export const metadata = {
  title: "What makes Python so special — loop",
  description:
    "Readability, a huge standard library and a welcoming community make Python a favourite for beginners and experts alike.",
};

export default function Page() {
  return (
    <LessonShell slug="what-makes-python-special">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Plenty of languages can do the job. Python&apos;s superpower is{" "}
        <strong className="text-foreground">how little it asks of you</strong> to
        get there. The same task that needs a wall of boilerplate elsewhere is
        often a single, readable line in Python.
      </p>

      <PythonSpecial />

      <p className="leading-relaxed text-muted">
        That readability is by design — Python reads almost like English, with
        meaning shown by indentation instead of a clutter of braces and
        semicolons. It&apos;s easy to write, but just as importantly, easy to{" "}
        <em>read</em> later, which is where programmers spend most of their time.
      </p>

      <p className="leading-relaxed text-muted">
        Around that core sits the rest of the appeal: it&apos;s free and open
        source, ships &ldquo;batteries included&rdquo; with a huge standard
        library, runs on every major operating system, and has one of the
        largest, friendliest communities in software. That combination is why
        it&apos;s so often the first language people learn — and one they keep
        using for decades.
      </p>
    </LessonShell>
  );
}
