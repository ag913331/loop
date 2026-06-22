import LessonShell from "@/components/LessonShell";
import DecisionIntro from "@/components/DecisionIntro";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# A comparison is a question; the answer is a boolean
print(7 > 3)      # True
print(2 > 5)      # False
print(10 == 10)   # True`;

export const metadata = {
  title: "Questions and answers — loop",
  description:
    "Programs make decisions by asking yes/no questions. A comparison is that question, and the answer is True or False.",
};

export default function Page() {
  return (
    <LessonShell slug="questions-and-answers">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Real programs don&apos;t just plough straight ahead — they{" "}
        <strong className="text-foreground">decide</strong>. Is the password
        correct? Is the basket empty? Did the player win? Every decision starts
        the same way: with a <em>yes/no question</em>.
      </p>

      <DecisionIntro />

      <p className="leading-relaxed text-muted">
        In Python, you ask such a question with a{" "}
        <strong className="text-foreground">comparison</strong>, and the answer
        comes back as one of the two boolean values you already met:{" "}
        <span className="font-mono text-brand">True</span>{" "}or{" "}
        <span className="font-mono text-danger">False</span>. &ldquo;Is 7 greater
        than 3?&rdquo; — <span className="font-mono text-brand">True</span>.
        &ldquo;Is 2 greater than 5?&rdquo; —{" "}
        <span className="font-mono text-danger">False</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s the raw material of every decision. Next we&apos;ll meet the
        full set of operators for asking these questions — then use the answers to
        actually change what your program does.
      </p>
    </LessonShell>
  );
}
