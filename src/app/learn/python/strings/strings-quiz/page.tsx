import LessonShell from "@/components/ui/LessonShell";
import Quiz, { type Question } from "@/components/ui/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this print?",
    code: 'word = "python"\nprint(word[1:4])',
    options: ["pyt", "yth", "ytho", "pyth"],
    correct: 1,
    explain: "Slice from index 1 up to (not including) 4 → characters y, t, h → 'yth'.",
  },
  {
    prompt: "What happens here?",
    code: 's = "hi"\ns[0] = "H"',
    options: ["s becomes 'Hi'", "TypeError", "s becomes 'H'", "Nothing"],
    correct: 1,
    explain: "Strings are immutable — you can't assign to a character. It raises a TypeError.",
  },
  {
    prompt: "After this runs, what is text?",
    code: 'text = "Hello"\ntext.upper()',
    options: ["'HELLO'", "'Hello'", "None", "Error"],
    correct: 1,
    explain:
      "upper() returns a NEW string but doesn't change the original, and the result isn't stored — so text is still 'Hello'.",
  },
  {
    prompt: "What does this print?",
    code: 'name = "Ada"\nprint(f"Hi {name}!")',
    options: ["Hi {name}!", "Hi Ada!", "f\"Hi Ada!\"", "Hi name!"],
    correct: 1,
    explain: "The f prefix makes it an f-string, so {name} is replaced by its value → 'Hi Ada!'.",
  },
  {
    prompt: "What does this print?",
    code: 'print(f"{7/2:.2f}")',
    options: ["3.5", "3.50", "4", "3"],
    correct: 1,
    explain: "7/2 is 3.5, and the :.2f specifier formats it to two decimal places → '3.50'.",
  },
];

export const metadata = {
  title: "Quiz: working with strings — loop",
  description: "Check your understanding of string indexing, slicing, methods and f-strings.",
};

export default function Page() {
  return (
    <LessonShell slug="strings-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on indexing, slicing, methods and f-strings. Work each one
        out before you pick.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        Strings are one of the types you&apos;ll reach for most — and now you can
        take them apart, reshape them, and build new text cleanly. That rounds out
        the data types at the heart of everyday Python.
      </p>
    </LessonShell>
  );
}
