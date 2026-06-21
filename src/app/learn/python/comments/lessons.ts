// Ordered lessons for the "Comments" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "comments-why-when-how",
    title: "Comments — why, when, and how?",
    blurb: "Notes Python ignores, and how to write good ones.",
  },
  {
    slug: "commenting-out-code",
    title: "Making fragments of code",
    blurb: "Switch a line off with # — no deleting required.",
  },
];
