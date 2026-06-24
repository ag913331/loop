import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "Which of these is a valid variable name?",
    options: ["2nd_place", "my-name", "total_score", "class"],
    correct: 2,
    explain: "Names start with a letter or underscore, take no hyphens, and can't be a keyword like 'class'.",
  },
  {
    prompt: "What does this print?",
    code: "x = 5\nx = x + 3\nprint(x)",
    options: ["5", "8", "x + 3", "an error"],
    correct: 1,
    explain: "The right side (5 + 3) is worked out first, then 8 is stored back in x.",
  },
  {
    prompt: "After this runs, what is n?",
    code: "n = 10\nn += 5",
    options: ["5", "10", "15", "50"],
    correct: 2,
    explain: "n += 5 is shorthand for n = n + 5, so n becomes 15.",
  },
  {
    prompt: "What is printed?",
    code: "x = 7\ny = x\nx = 2\nprint(y)",
    options: ["2", "7", "9", "an error"],
    correct: 1,
    explain: "y was given the value 7. Changing x afterwards doesn't touch y, so y is still 7.",
  },
  {
    prompt: "score was never created. What happens?",
    code: "print(score)",
    options: ["prints nothing", 'prints "score"', "NameError", "prints 0"],
    correct: 2,
    explain: "Using a variable that doesn't exist raises a NameError — there's no box by that name.",
  },
];

export const metadata = {
  title: "Quiz: variables — loop",
  description: "Check your understanding of Python variables, naming, and reassignment.",
};

export default function Page() {
  return (
    <LessonShell slug="variables-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on naming, assignment and reassignment. Work each one out
        in your head first — then see if you&apos;re right.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That&apos;s variables done — you can store data, name it, reuse it, and
        change it. Combined with operators, that&apos;s genuinely enough to write
        useful little programs.
      </p>
    </LessonShell>
  );
}
