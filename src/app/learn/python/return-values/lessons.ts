// Ordered lessons for the "Function return" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "return-statement",
    title: "Effects and results: return",
    blurb: "Hand a value back out of a function with return — and capture it on the way out.",
  },
  {
    slug: "the-none-value",
    title: "The None value",
    blurb: "What a function gives back when it has no return: Python's nothing, None.",
  },
  {
    slug: "lists-and-functions",
    title: "Lists and functions",
    blurb: "Return a whole list — or pass one in and let the function change it in place.",
  },
  {
    slug: "function-examples",
    title: "Examples",
    blurb: "Five real functions: leap year, days in a month, day of the year, primes, fuel conversion.",
  },
];
