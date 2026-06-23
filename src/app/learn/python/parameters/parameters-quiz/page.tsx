import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "In def greet(name):, what is name?",
    options: [
      "An argument",
      "A parameter",
      "A return value",
      "A keyword",
    ],
    correct: 1,
    explain:
      "name is a parameter — the named slot in the definition. The value you pass when calling (like \"Ada\") is the argument.",
  },
  {
    prompt: "What does this print?",
    code: "def f(a, b):\n    print(a - b)\n\nf(10, 3)",
    options: ["13", "7", "-7", "Error"],
    correct: 1,
    explain:
      "Positional passing: a gets 10, b gets 3, so a - b is 7.",
  },
  {
    prompt: "Which call gives the SAME result as area(width=3, height=4)?",
    code: "def area(width, height):\n    return width * height",
    options: [
      "area(4, 3)",
      "area(height=4, width=3)",
      "area(w=3, h=4)",
      "area(3)",
    ],
    correct: 1,
    explain:
      "Keyword arguments match by name, so order doesn't matter — height=4, width=3 is identical to width=3, height=4.",
  },
  {
    prompt: "What happens here?",
    code: 'def f(a, b):\n    print(a, b)\n\nf(a=1, 2)',
    options: [
      "Prints 1 2",
      "Prints 2 1",
      "SyntaxError",
      "Prints a 2",
    ],
    correct: 2,
    explain:
      "A positional argument can't follow a keyword argument. Python raises SyntaxError before running.",
  },
  {
    prompt: "Which call is valid for def order(item, qty, gift):?",
    options: [
      'order("pen", gift=True, 5)',
      'order("pen", 5, gift=True)',
      'order(item="pen", 5, True)',
      "order(qty=5, \"pen\", True)",
    ],
    correct: 1,
    explain:
      "Positional arguments must all come before keyword ones. \"pen\" and 5 are positional, then gift=True is keyword — the only correctly ordered call.",
  },
];

export const metadata = {
  title: "Quiz: parameters and arguments — loop",
  description:
    "Check your understanding of parameters, positional order, keyword arguments, and mixing them.",
};

export default function Page() {
  return (
    <LessonShell slug="parameters-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on parameters, positional order, and keyword arguments. Work
        out each result in your head before you pick.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That&apos;s how data flows <em>into</em>{" "}a function. The other half —
        handing a result back <em>out</em>{" "}with{" "}
        <span className="font-mono text-accent">return</span>{" "}— is where functions
        go next.
      </p>
    </LessonShell>
  );
}
