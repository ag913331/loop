// Ordered lessons for the "Scopes in Python" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "functions-and-scopes",
    title: "Functions and scopes",
    blurb: "Where a variable lives: local names exist only inside their function; globals are visible to read.",
  },
  {
    slug: "the-global-keyword",
    title: "The global keyword",
    blurb: "When a function really must change a global variable — and why it's rarely the right call.",
  },
  {
    slug: "arguments-and-scope",
    title: "How a function interacts with its arguments",
    blurb: "Numbers arrive as copies; lists are shared — the same value, two very different behaviours.",
  },
];
