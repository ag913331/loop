// Ordered lessons for the "Making decisions in Python" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "questions-and-answers",
    title: "Questions and answers",
    blurb: "How a program asks a yes/no question and gets True or False.",
  },
  {
    slug: "comparison-operators",
    title: "Comparison operators",
    blurb: "==, !=, >, <, >=, <= — and why == isn't =.",
  },
  {
    slug: "making-use-of-answers",
    title: "Making use of answers",
    blurb: "Store a True/False answer in a variable and reuse it.",
  },
  {
    slug: "conditional-execution",
    title: "Conditions and conditional execution",
    blurb: "if, else and elif — run code only when a condition holds.",
  },
  {
    slug: "analyzing-code",
    title: "Analyzing code samples",
    blurb: "Read if/elif/else programs and predict what they do.",
  },
  {
    slug: "pseudocode-and-loops",
    title: "Pseudocode and a peek at loops",
    blurb: "Plan in plain steps — and meet the idea of repetition.",
  },
  {
    slug: "decisions-quiz",
    title: "Quiz",
    blurb: "Check your grip on comparisons and conditions.",
  },
];
