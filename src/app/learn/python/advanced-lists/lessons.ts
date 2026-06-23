// Ordered lessons for the "Lists in advanced applications" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "lists-in-lists",
    title: "Lists in lists",
    blurb: "A list can hold other lists — plus comprehensions, the one-line way to build one.",
  },
  {
    slug: "two-dimensional-arrays",
    title: "Two-dimensional arrays",
    blurb: "Rows and columns: model a grid as a list of rows and index it [row][col].",
  },
  {
    slug: "multidimensional-lists",
    title: "Multidimensional lists",
    blurb: "Stack the idea deeper — three dimensions and more, with real-world uses.",
  },
];
