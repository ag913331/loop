import LessonShell from "@/components/LessonShell";
import MultipleArguments from "@/components/MultipleArguments";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Add or remove values — print handles the spaces for you
print("Python", "is", "fun")
print("1 +", 1, "=", 2)`;

export const metadata = {
  title: "Using multiple arguments — loop",
  description:
    "Pass print several values separated by commas, and it prints them in order with a space between each.",
};

export default function Page() {
  return (
    <LessonShell slug="multiple-arguments">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        print isn&apos;t limited to one argument. Separate several values with
        commas and it prints them all, left to right, on the same line — slipping
        a single space between each one automatically.
      </p>

      <MultipleArguments />

      <p className="leading-relaxed text-muted">
        This is genuinely useful: you can mix different kinds of value in one
        call — text and numbers together — without joining them yourself. Python
        prints each argument in turn and adds the spaces for you.
      </p>

      <p className="leading-relaxed text-muted">
        That automatic space is print&apos;s <em>default</em>{" "}behaviour, and the
        next lessons show how to control it. First though — have a play. Add a
        value, remove one, mix in a number:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />
    </LessonShell>
  );
}
