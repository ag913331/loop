import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What type does input() always return?",
    options: ["int", "str", "float", "it depends on what's typed"],
    correct: 1,
    explain: "input() always hands back a string — even if the user types digits.",
  },
  {
    prompt: "The user types 5. What happens?",
    code: 'x = input()\nprint(x + 1)',
    options: ["prints 6", "prints 51", "a TypeError", "prints 5"],
    correct: 2,
    explain: 'x is the string "5"; adding the integer 1 mixes text and number, so it raises a TypeError.',
  },
  {
    prompt: "How do you read a whole number from the user?",
    options: ["input(int)", "int(input())", "input().int", "number(input())"],
    correct: 1,
    explain: "Read the text with input(), then cast it with int() — int(input()).",
  },
  {
    prompt: "What does this print?",
    code: 'print("5" + "5")',
    options: ["10", '"55"', "55", "a TypeError"],
    correct: 2,
    explain: "Both are strings, so + joins them: 55 (as text, no quotes shown when printed).",
  },
  {
    prompt: "What does this print?",
    code: 'print("-" * 5)',
    options: ["-25", "an error", "-----", "-5"],
    correct: 2,
    explain: "String * number repeats the string, so you get five dashes.",
  },
];

export const metadata = {
  title: "Quiz: interaction with the user — loop",
  description: "Check your understanding of input(), type casting and string operators.",
};

export default function Page() {
  return (
    <LessonShell slug="input-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on reading input, converting types and working with
        strings. Picture what Python does before you answer.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That completes the round trip: your programs can now read from a person,
        turn that input into the right type, and respond. Combined with variables
        and operators, you can write genuinely interactive little tools.
      </p>
    </LessonShell>
  );
}
