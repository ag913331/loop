// Ordered lessons for the "Loops in Python" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "while-loop",
    title: "The while loop",
    blurb: "Repeat a block as long as a condition stays True — plus while/else.",
  },
  {
    slug: "infinite-loops",
    title: "Infinite loops",
    blurb: "while True, the loops that never stop, and how to escape them.",
  },
  {
    slug: "range-function",
    title: "The range() function",
    blurb: "Generate sequences of numbers — start, stop and step.",
  },
  {
    slug: "break-and-continue",
    title: "break and continue",
    blurb: "Bail out of a loop early, or skip straight to the next round.",
  },
  {
    slug: "for-loop",
    title: "The for loop",
    blurb: "Step through every item in a sequence — plus for/else.",
  },
  {
    slug: "loops-quiz",
    title: "Quiz",
    blurb: "Check your understanding of while, for, range and loop control.",
  },
];
