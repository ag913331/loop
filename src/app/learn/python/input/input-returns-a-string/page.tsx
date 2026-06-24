import LessonShell from "@/components/ui/LessonShell";
import InputReturnsString from "@/components/python/InputReturnsString";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `x = input("Type a number: ")
print(x)
print(type(x))     # <class 'str'> — always!`;

export const metadata = {
  title: "The result is always a string — loop",
  description:
    "input() always returns a string, even when the user types digits. type() proves it.",
};

export default function Page() {
  return (
    <LessonShell slug="input-returns-a-string">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s the single most important fact about{" "}
        <span className="font-mono text-brand">input()</span>, and the one that
        trips up every beginner: it <strong className="text-foreground">always
        returns a string</strong>. It doesn&apos;t matter what the user types —
        even if they type digits, you get back <em>text</em>.
      </p>

      <InputReturnsString />

      <p className="leading-relaxed text-muted">
        Type <span className="font-mono text-foreground">123</span>{" "}at the prompt
        and you don&apos;t get the number{" "}
        <span className="font-mono text-warn">123</span>{" "}— you get the string{" "}
        <span className="font-mono text-warn">&quot;123&quot;</span>. They look
        identical on screen, but to Python they&apos;re completely different
        things. You can check any value&apos;s type with the built-in{" "}
        <span className="font-mono text-foreground">type()</span>{" "}function:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        No matter what you enter, <span className="font-mono text-foreground">type(x)</span>{" "}
        reports <span className="font-mono text-accent">&lt;class &apos;str&apos;&gt;</span>.
        Keep that in mind — because the moment you try to do arithmetic with it,
        as the next lesson shows, it matters a lot.
      </p>
    </LessonShell>
  );
}
