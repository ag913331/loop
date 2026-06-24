import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this print?",
    code: "for i in range(3):\n    print(i)",
    options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "just 3"],
    correct: 1,
    explain: "range(3) starts at 0 and stops before 3, so you get 0, 1, 2.",
  },
  {
    prompt: "What does continue do inside a loop?",
    options: [
      "Ends the loop completely",
      "Skips to the next iteration",
      "Restarts from the first item",
      "Pauses the program",
    ],
    correct: 1,
    explain: "continue skips the rest of the current round and jumps to the next one. (break is the one that ends the loop.)",
  },
  {
    prompt: "A while True loop with no break inside…",
    options: ["runs once", "runs forever", "raises an error", "never runs"],
    correct: 1,
    explain: "True never becomes False, and nothing stops it — so it loops forever (an infinite loop).",
  },
  {
    prompt: "What is the result?",
    code: "list(range(2, 5))",
    options: ["[2, 3, 4, 5]", "[2, 3, 4]", "[3, 4, 5]", "[2, 5]"],
    correct: 1,
    explain: "Starts at 2, stops before 5: [2, 3, 4]. The stop value is never included.",
  },
  {
    prompt: "A loop's else clause runs…",
    options: [
      "every time the loop ends",
      "only if the loop hit a break",
      "only if the loop finished without a break",
      "never",
    ],
    correct: 2,
    explain: "The else runs when the loop completes normally — a break skips it.",
  },
];

export const metadata = {
  title: "Quiz: loops — loop",
  description: "Check your understanding of while, for, range, and break/continue.",
};

export default function Page() {
  return (
    <LessonShell slug="loops-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on while, for, range and loop control. Run each one in your
        head before you answer.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        Repetition unlocked. You can now make code run as many times as you need —
        and the loop that gives this whole site its name finally has its lessons.
        Next in this module: lists, the collections loops were made for.
      </p>
    </LessonShell>
  );
}
