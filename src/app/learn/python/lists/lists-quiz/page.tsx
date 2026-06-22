import LessonShell from "@/components/LessonShell";
import Quiz, { type Question } from "@/components/Quiz";

const QUESTIONS: Question[] = [
  {
    prompt: "What does this give?",
    code: "nums = [10, 20, 30]\nnums[0]",
    options: ["0", "10", "20", "an error"],
    correct: 1,
    explain: "Indexing starts at 0, so nums[0] is the first element: 10.",
  },
  {
    prompt: "What does this give?",
    code: "nums = [10, 20, 30]\nnums[-1]",
    options: ["10", "30", "-1", "an error"],
    correct: 1,
    explain: "Negative indices count from the end, so -1 is the last element: 30.",
  },
  {
    prompt: "What is the result?",
    code: "nums = [10, 20, 30, 40]\nnums[1:3]",
    options: ["[10, 20, 30]", "[20, 30]", "[20, 30, 40]", "[10, 20]"],
    correct: 1,
    explain: "Slice from index 1 up to (not including) 3 — so indices 1 and 2: [20, 30].",
  },
  {
    prompt: "What does this print?",
    code: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)",
    options: ["[4, 1, 2, 3]", "[1, 2, 3, 4]", "[1, 2, 3]", "an error"],
    correct: 1,
    explain: "append() adds to the end, so the list becomes [1, 2, 3, 4].",
  },
  {
    prompt: "Which removes the last item AND hands it back to you?",
    options: ["del nums[-1]", "nums.remove()", "nums.pop()", "nums.append()"],
    correct: 2,
    explain: "pop() removes the last element and returns its value. del just deletes; remove() deletes by value.",
  },
];

export const metadata = {
  title: "Quiz: lists — loop",
  description: "Check your understanding of list indexing, slicing and methods.",
};

export default function Page() {
  return (
    <LessonShell slug="lists-quiz">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five questions on indexing, slicing and the list methods. Picture the
        cells shifting before you answer.
      </p>

      <Quiz questions={QUESTIONS} />

      <p className="leading-relaxed text-muted">
        That completes lists — and with them, Module 3. You can now make decisions,
        repeat work, and keep whole collections of data in order. That&apos;s the
        toolkit real programs are built from.
      </p>
    </LessonShell>
  );
}
