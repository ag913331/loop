import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this evaluate to?",
    code: "True and False",
    options: ["True", "False", "None", "an error"],
    correct: 1,
    explain: "and is True only when both sides are True. One is False, so the result is False.",
  },
  {
    prompt: "What is the result of this bitwise AND?",
    code: "5 & 3",
    options: ["8", "1", "7", "2"],
    correct: 1,
    explain: "5 is 101 and 3 is 011. AND each column: only the last bit is 1 in both, so 001 = 1.",
  },
  {
    prompt: "When should you use the word 'and' rather than '&'?",
    options: [
      "They're identical",
      "'and' for True/False conditions, '&' for bits",
      "'&' is only for strings",
      "'and' is faster",
    ],
    correct: 1,
    explain: "Use the words (and/or) for logical True/False conditions; the symbols (&/|) work on the bits of integers.",
  },
  {
    prompt: "What is this?",
    code: "1 << 3",
    options: ["3", "4", "8", "16"],
    correct: 2,
    explain: "Shifting 1 left by 3 places gives binary 1000, which is 8 (that's 2 to the power 3).",
  },
  {
    prompt: "What does x >> 1 do to x?",
    options: ["doubles it", "halves it", "flips every bit", "adds 1"],
    correct: 1,
    explain: "A right shift by 1 moves every bit down a place — halving the value (dropping any remainder).",
  },
];

export const metadata = {
  title: "Quiz: logic and bits — loop",
  description: "Check your understanding of logical operators, bitwise operators, masks and shifts.",
};

export default function Page() {
  return (
    <LessonShell slug="logic-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions spanning logical operators, bitwise operators and shifts.
        Work each out before you check.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        You&apos;ve now seen logic at both levels — whole True/False values, and
        the individual bits underneath. That rounds out Module 3&apos;s tour of
        how programs reason and repeat.
      </p>
    </LessonShell>
  );
}
