import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

export const metadata = {
  title: "Section quiz: the print() function — loop",
  description: "Five quick questions to check what you learned about print().",
};

const QUESTIONS: Question[] = [
  {
    prompt: "In the call below, what is \"Hello\"?",
    code: 'print("Hello")',
    options: ["A function", "An argument", "A keyword", "A separator"],
    correct: 1,
    explain:
      "It's the data you hand to the function inside its parentheses — an argument.",
  },
  {
    prompt: "What happens when you run this line?",
    code: 'print("a") print("b")',
    options: [
      "It prints: a b",
      "It prints: ab",
      "A SyntaxError — two instructions on one line",
      "It prints only b",
    ],
    correct: 2,
    explain:
      "Python allows only one instruction per line, so this stops with a SyntaxError.",
  },
  {
    prompt: "What does \\n do inside a string?",
    code: 'print("one\\ntwo")',
    options: [
      "Prints a backslash and an n",
      "Inserts a tab",
      "Starts a new line",
      "Nothing at all",
    ],
    correct: 2,
    explain:
      "\\n is the newline escape — print breaks onto a new line right where it appears.",
  },
  {
    prompt: "What does this print?",
    code: 'print("Python", "is", "fun")',
    options: ["Pythonisfun", "Python is fun", "Python,is,fun", "Python-is-fun"],
    correct: 1,
    explain:
      "Multiple arguments are printed in order with print's default separator — a single space.",
  },
  {
    prompt: "Which call outputs x-y?",
    options: [
      'print("x", "y", end="-")',
      'print("x", "y", join="-")',
      'print("x", "y", sep="-")',
      'print("x-y")  is the only way',
    ],
    correct: 2,
    explain:
      "sep sets what goes between the values; sep=\"-\" joins them with a dash.",
  },
];

export default function Page() {
  return (
    <LessonShell slug="section-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Time to check what stuck. Pick an answer for each question — you&apos;ll
        see straight away whether it&apos;s right, with a quick explanation. No
        pressure: you can retry as many times as you like.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That&apos;s the whole of <span className="font-mono text-brand">print</span>{" "}
        — arguments, one instruction per line, escape characters, and the{" "}
        <span className="font-mono text-foreground">sep</span> and{" "}
        <span className="font-mono text-foreground">end</span> keywords. Next
        we&apos;ll start giving our programs memory with variables.
      </p>
    </LessonShell>
  );
}
