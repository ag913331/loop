// Ordered lessons for the "Lists and list processing" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-are-lists",
    title: "What are lists?",
    blurb: "Many values under one name — and why that beats many variables.",
  },
  {
    slug: "indexing-lists",
    title: "Indexing lists",
    blurb: "Reach any element by its position — including from the end.",
  },
  {
    slug: "accessing-content",
    title: "Reading and changing content",
    blurb: "Get an element, replace it in place, and measure the list.",
  },
  {
    slug: "adding-elements",
    title: "Adding elements",
    blurb: "append() to the end, insert() anywhere — watch the rest shift.",
  },
  {
    slug: "removing-elements",
    title: "Removing elements",
    blurb: "del, pop() and remove() — and the gap closing behind them.",
  },
  {
    slug: "lists-in-action",
    title: "Lists in action",
    blurb: "Loop over them, slice them, and put them to real work.",
  },
  {
    slug: "lists-quiz",
    title: "Quiz",
    blurb: "Check your understanding of indexing, slicing and list methods.",
  },
];
