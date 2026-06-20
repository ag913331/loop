// Ordered lessons for the "Python literals" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-are-literals",
    title: "Literals",
    blurb: "Data written directly into your code — and how Python types it.",
  },
  {
    slug: "integers",
    title: "Integers",
    blurb: "Whole numbers, positive or negative, with no fractional part.",
  },
  {
    slug: "floats",
    title: "Floats",
    blurb: "Numbers with a decimal point — and one famous surprise.",
  },
  {
    slug: "strings",
    title: "Strings",
    blurb: "Text, wrapped in quotes that mark where it starts and ends.",
  },
  {
    slug: "booleans",
    title: "Boolean values",
    blurb: "Just two of them: True and False.",
  },
  {
    slug: "literals-quiz",
    title: "Quiz",
    blurb: "A few questions to lock in Python's literal types.",
  },
];
