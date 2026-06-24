import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this evaluate to?",
    code: "5 == 5",
    options: ["5", "True", "False", '"5 == 5"'],
    correct: 1,
    explain: "== asks 'are these equal?'. They are, so the answer is the boolean True.",
  },
  {
    prompt: "Which operator means 'not equal to'?",
    options: ["=/=", "!=", "<>", "~="],
    correct: 1,
    explain: "!= is 'not equal'. (<> was old Python 2; it's gone now.)",
  },
  {
    prompt: "What does this print?",
    code: 'x = 5\nif x > 10:\n    print("big")\nelif x > 3:\n    print("medium")\nelse:\n    print("small")',
    options: ["big", "medium", "small", "nothing"],
    correct: 1,
    explain: "x > 10 is False; x > 3 is True, so it prints 'medium' and skips the else.",
  },
  {
    prompt: "What's the difference between = and ==?",
    options: [
      "Both compare values",
      "= assigns, == compares",
      "Both assign values",
      "== assigns, = compares",
    ],
    correct: 1,
    explain: "A single = stores a value in a variable; == checks whether two values are equal.",
  },
  {
    prompt: "What tells Python which lines belong to an if?",
    options: ["parentheses ()", "braces {}", "the indentation", "a semicolon"],
    correct: 2,
    explain: "Python uses indentation to mark a block — the indented lines run only when the condition is True.",
  },
];

export const metadata = {
  title: "Quiz: making decisions — loop",
  description: "Check your understanding of comparison operators and conditional execution.",
};

export default function Page() {
  return (
    <LessonShell slug="decisions-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on comparisons and conditions. Trace each one in your head
        first — then check.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        Your programs can now branch: ask a question and take a different path
        depending on the answer. Next in this module, they learn to{" "}
        <em>repeat</em>{" "}— with loops.
      </p>
    </LessonShell>
  );
}
