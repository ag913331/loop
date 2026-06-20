import LessonShell from "@/components/LessonShell";
import StringsDemo from "@/components/StringsDemo";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Strings are text in quotes
print("hello")
print('single quotes work too')
print("123")        # text, not the number 123
print("ab" + "cd")  # join strings with +
print("ha" * 3)     # repeat with *`;

export const metadata = {
  title: "Strings — loop",
  description:
    "A string is text wrapped in quotes. The quotes mark where it starts and ends but aren't part of the value.",
};

export default function Page() {
  return (
    <LessonShell slug="strings">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <strong className="text-foreground">string</strong>{" "}— type{" "}
        <span className="font-mono text-accent">str</span>{" "}— is text: a sequence
        of characters wrapped in quotes. You&apos;ve used them since your first{" "}
        <span className="font-mono text-brand">print</span>.
      </p>

      <StringsDemo />

      <p className="leading-relaxed text-muted">
        Single quotes (<span className="font-mono text-foreground">&apos;...&apos;</span>)
        and double quotes (<span className="font-mono text-foreground">&quot;...&quot;</span>)
        both work — just open and close with the same kind. A handy rule of
        thumb: use double quotes when your text itself contains an apostrophe, so
        it doesn&apos;t end the string early.
      </p>

      <p className="leading-relaxed text-muted">
        Anything inside quotes is text, even digits:{" "}
        <span className="font-mono text-warn">&quot;123&quot;</span>{" "}is a string,
        not the number <span className="font-mono text-warn">123</span>. They look
        the same on screen but Python treats them very differently — you can do
        maths with one and not the other. Try a few things:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Notice <span className="font-mono text-foreground">+</span>{" "}joins strings
        together and <span className="font-mono text-foreground">*</span>{" "}repeats
        one — the same symbols mean something different for text than for numbers.
        Last of the four: true and false.
      </p>
    </LessonShell>
  );
}
