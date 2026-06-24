// Ordered lessons for the "Creating multi-parameter functions" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "evaluating-bmi",
    title: "Evaluating the BMI",
    blurb: "Your first genuinely useful two-parameter function: weight and height in, BMI out.",
  },
  {
    slug: "triangles",
    title: "Triangles",
    blurb: "Three sides in: decide whether they form a triangle, and measure its area.",
  },
  {
    slug: "factorials",
    title: "Factorials",
    blurb: "Multiply a run of numbers together — the classic loop-and-accumulate function.",
  },
  {
    slug: "fibonacci-numbers",
    title: "Fibonacci numbers",
    blurb: "Each number is the sum of the two before it — built up with a loop.",
  },
  {
    slug: "recursion",
    title: "Recursion",
    blurb: "A function that calls itself: the call stack, the base case, and when to use it.",
  },
];
