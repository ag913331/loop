import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this print?",
    code: "print(7 // 2)",
    options: ["3.5", "3", "4", "3.0"],
    correct: 1,
    explain: "Floor division of two integers drops the fraction and stays an integer: 3.",
  },
  {
    prompt: "What is the result?",
    code: "print(4 / 2)",
    options: ["2", "2.0", '"2"', "1"],
    correct: 1,
    explain: "Plain division always returns a float — even when it divides evenly. So 2.0.",
  },
  {
    prompt: "What's the remainder?",
    code: "print(14 % 4)",
    options: ["3", "2", "3.5", "0"],
    correct: 1,
    explain: "14 is 3 groups of 4 (12), with 2 left over. The remainder is 2.",
  },
  {
    prompt: "Mind the order of operations:",
    code: "print(2 + 3 * 4)",
    options: ["20", "14", "24", "11"],
    correct: 1,
    explain: "* outranks +, so 3 * 4 = 12 happens first, then 2 + 12 = 14.",
  },
  {
    prompt: "** binds right to left — what's this?",
    code: "print(2 ** 2 ** 3)",
    options: ["64", "256", "12", "16"],
    correct: 1,
    explain: "Right-associative: 2 ** (2 ** 3) = 2 ** 8 = 256, not (2 ** 2) ** 3.",
  },
];

export const metadata = {
  title: "Quiz: operators — loop",
  description: "Check your grip on Python's arithmetic operators and precedence.",
};

export default function Page() {
  return (
    <LessonShell slug="operators-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on operators, division rules and precedence. Predict each
        answer before you pick — then see if Python agrees.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That&apos;s operators done. You can now turn values into expressions and
        predict what they evaluate to — the groundwork for variables and the
        decisions your programs will start making.
      </p>
    </LessonShell>
  );
}
