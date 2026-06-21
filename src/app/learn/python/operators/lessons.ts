// Ordered lessons for the "Operators" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "python-as-a-calculator",
    title: "Python as a calculator",
    blurb: "print() doesn't just show values — it works them out.",
  },
  {
    slug: "basic-operators",
    title: "Basic operators",
    blurb: "The seven arithmetic operators, and the rules behind them.",
  },
  {
    slug: "operator-priorities",
    title: "Operators and their priorities",
    blurb: "Which operations happen first, and why parentheses always win.",
  },
  {
    slug: "operators-quiz",
    title: "Quiz",
    blurb: "Test your arithmetic-operator instincts.",
  },
];
