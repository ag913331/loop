// Ordered lessons for the "Logic and bit operations" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "logical-operators",
    title: "Logical operators",
    blurb: "Combine True/False answers with and, or and not.",
  },
  {
    slug: "logic-vs-bits",
    title: "Logical values vs. single bits",
    blurb: "Whole-value logic (and/or/not) vs. operating on each bit.",
  },
  {
    slug: "bitwise-operators",
    title: "Bitwise operators",
    blurb: "&, |, ^ and ~ — logic applied bit by bit.",
  },
  {
    slug: "working-with-bits",
    title: "Working with single bits",
    blurb: "Masks: check, set, clear and flip one bit at a time.",
  },
  {
    slug: "bit-shifting",
    title: "Shifting bits left and right",
    blurb: "<< and >> slide the bits — and multiply or divide by powers of 2.",
  },
  {
    slug: "logic-quiz",
    title: "Quiz",
    blurb: "Check your grip on logical and bitwise operations.",
  },
];
