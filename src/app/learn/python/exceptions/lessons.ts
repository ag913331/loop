// Ordered lessons for the "Exceptions" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "errors-are-normal",
    title: "Errors are part of the job",
    blurb: "Why every program meets errors — and the traceback Python shows when one stops it cold.",
  },
  {
    slug: "try-except",
    title: "try and except",
    blurb: "Catch an error the moment it happens and keep the program alive: ask forgiveness, not permission.",
  },
  {
    slug: "many-exceptions",
    title: "Handling several kinds",
    blurb: "Different errors, different responses — multiple except branches, plus a catch-all for the rest.",
  },
  {
    slug: "common-exceptions",
    title: "Exceptions you'll meet",
    blurb: "A field guide to the everyday ones: ZeroDivisionError, ValueError, TypeError and friends.",
  },
  {
    slug: "finding-bugs",
    title: "Finding and fixing bugs",
    blurb: "Errors in your code, not the data: test every path, and hunt bugs with print debugging.",
  },
  {
    slug: "exceptions-quiz",
    title: "Quiz",
    blurb: "Check your grip on tracebacks, try/except, branch order and common exceptions.",
  },
];
