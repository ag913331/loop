// Ordered lessons for the "Operations on lists" section (Module 3).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "list-references",
    title: "Lists are references",
    blurb: "The surprise that bites everyone: copying a list name doesn't copy the list.",
  },
  {
    slug: "powerful-slices",
    title: "Powerful slices",
    blurb: "start:stop:step — copy a list, replace a stretch, or delete one.",
  },
  {
    slug: "negative-slices",
    title: "Slices with negative indices",
    blurb: "Count from the end inside a slice, without knowing the length.",
  },
  {
    slug: "in-operator",
    title: "The in and not in operators",
    blurb: "Ask a list whether it contains a value — and get a clean True or False.",
  },
  {
    slug: "list-ops-examples",
    title: "Examples",
    blurb: "References, slices and in, put to work on real little problems.",
  },
];
