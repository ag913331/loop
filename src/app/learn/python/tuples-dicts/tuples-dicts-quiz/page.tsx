import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "Which statement raises an error?",
    code: "t = (1, 2, 3)",
    options: [
      "print(t[0])",
      "print(len(t))",
      "t[0] = 9",
      "print(t + (4,))",
    ],
    correct: 2,
    explain:
      "Tuples are immutable, so item assignment t[0] = 9 raises a TypeError. Reading, len(), and building a new tuple with + are all fine.",
  },
  {
    prompt: "What is one_item?",
    code: "one_item = (7,)",
    options: [
      "The integer 7",
      "A one-element tuple",
      "A syntax error",
      "An empty tuple",
    ],
    correct: 1,
    explain:
      "The trailing comma makes it a tuple. Without the comma, (7) would just be the integer 7.",
  },
  {
    prompt: "What does this print?",
    code: 'd = {"a": 1, "b": 2}\nprint(d.get("z", 0))',
    options: ["None", "0", "KeyError", '"z"'],
    correct: 1,
    explain:
      "get() returns the default (0 here) when the key is missing, instead of raising KeyError. Without a default it would return None.",
  },
  {
    prompt: "What does in test on a dictionary?",
    code: 'ages = {"Ada": 36}\nprint(36 in ages)',
    options: [
      "True — it checks values",
      "False — in checks KEYS, not values",
      "36 is converted to a key",
      "TypeError",
    ],
    correct: 1,
    explain:
      "For dictionaries, in tests the keys. 36 is a value, not a key, so the result is False.",
  },
  {
    prompt: "What does ages.items() yield each loop?",
    code: 'for x in ages.items():\n    print(x)',
    options: [
      "Each key",
      "Each value",
      "A (key, value) tuple",
      "A list",
    ],
    correct: 2,
    explain:
      "items() yields (key, value) tuples — which is why for k, v in ages.items() works by unpacking each tuple.",
  },
];

export const metadata = {
  title: "Quiz: tuples and dictionaries — loop",
  description:
    "Check your understanding of mutability, tuples, dictionaries, and dictionary methods.",
};

export default function Page() {
  return (
    <LessonShell slug="tuples-dicts-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on mutability, tuples, dictionaries and their methods. Run
        each snippet in your head first.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        Lists, tuples and dictionaries give you a collection for every job: ordered
        and editable, fixed and safe, or looked up by name. Next in this module:
        handling the unexpected, with exceptions.
      </p>
    </LessonShell>
  );
}
