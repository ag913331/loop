import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "In a traceback, which line is usually the most useful?",
    options: [
      "The first line",
      "The last line — the exception name and reason",
      "The line with the file name",
      "They're all equally useful",
    ],
    correct: 1,
    explain:
      "Read tracebacks bottom-up: the last line names the exception (e.g. ValueError) and gives the reason it was raised.",
  },
  {
    prompt: "What does this print when the user enters 0?",
    code: 'try:\n    print(1 / int(input()))\nexcept ZeroDivisionError:\n    print("nope")\nprint("done")',
    options: ["nope", "nope then done", "done", "a traceback"],
    correct: 1,
    explain:
      "1 / 0 raises ZeroDivisionError, so the handler prints 'nope'; then execution continues and prints 'done'.",
  },
  {
    prompt: "When does the except block run?",
    options: [
      "Always, after the try block",
      "Only if the try block raised a matching error",
      "Only if the try block finished cleanly",
      "Before the try block",
    ],
    correct: 1,
    explain:
      "except runs only when a matching exception was raised inside try. On a clean run, it's skipped entirely.",
  },
  {
    prompt: "Where must a bare except: (no type) go?",
    options: [
      "First, so it catches everything",
      "Anywhere among the branches",
      "Last — after all the specific ones",
      "It isn't allowed",
    ],
    correct: 2,
    explain:
      "A bare except: matches every error, so it must come last. Placed earlier, it would swallow errors before the specific handlers could match.",
  },
  {
    prompt: "Why might a typo on an else branch go unnoticed until runtime?",
    code: "if x > 0:\n    print('hi')\nelse:\n    prin('bye')   # typo",
    options: [
      "Python ignores typos",
      "Python is interpreted — it doesn't pre-scan lines it never runs",
      "else branches are never checked",
      "It's actually caught immediately",
    ],
    correct: 1,
    explain:
      "Python runs code as it goes, so a line on a path that no test exercised isn't checked until that path actually runs. Test every branch!",
  },
];

export const metadata = {
  title: "Quiz: exceptions — loop",
  description:
    "Check your understanding of tracebacks, try/except, branch order, and why testing every path matters.",
};

export default function Page() {
  return (
    <LessonShell slug="exceptions-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on reading tracebacks, try/except flow, branch order and
        testing. Trace each snippet before you answer.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        You can now keep a program standing when the unexpected happens, and track
        down the bugs you make along the way. Python&apos;s exception toolkit goes
        deeper still — raising your own errors, <span className="font-mono text-accent">else</span>{" "}
        and <span className="font-mono text-accent">finally</span>{" "}— but you&apos;ve
        got the essentials that every program needs.
      </p>
    </LessonShell>
  );
}
