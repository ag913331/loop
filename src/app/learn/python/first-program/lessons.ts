// Ordered lessons for the "Your very first program" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "writing-your-first-program",
    title: "Writing your first program",
    blurb: "Store a value, use it, and print a real result of your own.",
  },
];
