// Ordered lessons for the "Functions" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-a-function",
    title: "What is a function, and why?",
    blurb: "A named, reusable block of code — write it once, call it as often as you like.",
  },
  {
    slug: "decomposition",
    title: "Decomposition",
    blurb: "Split a big, daunting problem into small, named pieces you can tackle one at a time.",
  },
  {
    slug: "function-sources",
    title: "Where functions come from",
    blurb: "Built into Python, imported from a module, or written by you — all called the same way.",
  },
  {
    slug: "first-function",
    title: "Your first function",
    blurb: "Define one with def, call it, and watch control jump in and return.",
  },
];
