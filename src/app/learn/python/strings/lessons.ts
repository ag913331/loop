// Ordered lessons for the "Working with strings" section (Module 2).
// Module/section metadata lives in src/courses/python.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "string-anatomy",
    title: "Inside a string",
    blurb: "A string is a sequence of characters — index it, slice it, measure it (and never change it).",
  },
  {
    slug: "string-methods",
    title: "String methods",
    blurb: "upper, lower, strip, replace, split — each hands back a brand-new string.",
  },
  {
    slug: "f-strings",
    title: "f-strings",
    blurb: "The modern way to build text: drop variables straight into a string with {curly braces}.",
  },
  {
    slug: "strings-quiz",
    title: "Quiz",
    blurb: "Check your grip on indexing, slicing, methods and f-strings.",
  },
];
