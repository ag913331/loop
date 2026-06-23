// Ordered lessons for the "Sorting lists: bubble sort" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "the-bubble-sort",
    title: "The bubble sort",
    blurb: "Watch the classic sorting algorithm, one comparison at a time.",
  },
  {
    slug: "sorting-a-list",
    title: "Sorting a list",
    blurb: "The one-line way: sort() and sorted(), the way you'll really do it.",
  },
];
