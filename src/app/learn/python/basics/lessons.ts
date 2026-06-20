// Ordered lessons for the "Basics" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "writing-your-first-program",
    title: "Your very first program",
    blurb: "Store a value, use it, and print a real result of your own.",
  },
  {
    slug: "the-print-function",
    title: "The print() function",
    blurb: "Its effects, its arguments, and the value it hands back.",
  },
  {
    slug: "function-arguments",
    title: "Function arguments",
    blurb: "The data you hand a function inside its parentheses.",
  },
  {
    slug: "instructions",
    title: "Instructions",
    blurb: "Why Python wants exactly one instruction per line.",
  },
  {
    slug: "escape-and-newline",
    title: "Escape & newline characters",
    blurb: "Special codes like \\n that bend text to your will.",
  },
  {
    slug: "multiple-arguments",
    title: "Using multiple arguments",
    blurb: "Pass print several values at once, separated by commas.",
  },
  {
    slug: "positional-arguments",
    title: "Positional arguments",
    blurb: "How the order of arguments decides what goes where.",
  },
  {
    slug: "keyword-arguments",
    title: "Keyword arguments",
    blurb: "Named options like sep and end that reshape the output.",
  },
  {
    slug: "section-quiz",
    title: "Section quiz",
    blurb: "Nine ideas, a handful of questions to lock them in.",
  },
];
