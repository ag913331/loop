import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What type is this literal?",
    code: "3.0",
    options: ["int", "float", "str", "bool"],
    correct: 1,
    explain: "The decimal point makes it a float, even though the value is a whole number.",
  },
  {
    prompt: "Which one of these is a string?",
    options: ["42", "True", '"42"', "3.14"],
    correct: 2,
    explain: "Quotes make it text — a string — not the number 42.",
  },
  {
    prompt: "How many possible values does a boolean have?",
    options: ["1", "2", "10", "Unlimited"],
    correct: 1,
    explain: "Exactly two: True and False.",
  },
  {
    prompt: "What does this literal mean?",
    code: "1_000_000",
    options: ["A syntax error", "The number 1000000", "The text '1_000_000'", "1.0"],
    correct: 1,
    explain: "Underscores just group digits for readability — Python ignores them, so it's 1000000.",
  },
  {
    prompt: "Which is the correct way to write the boolean for 'true'?",
    options: ["true", '"True"', "True", "TRUE"],
    correct: 2,
    explain: "Capital T, and no quotes. Lowercase isn't recognised, and quotes would make it a string.",
  },
];

export const metadata = {
  title: "Quiz: Python literals — loop",
  description: "Check your grip on Python's literal types: int, float, str and bool.",
};

export default function Page() {
  return (
    <LessonShell slug="literals-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five quick questions on literals. Pick an answer to see whether it&apos;s
        right and why — there&apos;s no penalty for guessing, so give it a go.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That wraps up Python&apos;s literals. You can now recognise the four
        everyday types on sight — the foundation for variables and operators,
        coming up next.
      </p>
    </LessonShell>
  );
}
