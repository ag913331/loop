// Ordered lessons for the "Interaction with the user" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "the-input-function",
    title: "The input() function",
    blurb: "Pause the program and read a line the user types — with a prompt.",
  },
  {
    slug: "input-returns-a-string",
    title: "The result is always a string",
    blurb: "Even if they type 123, you get the text \"123\".",
  },
  {
    slug: "prohibited-operations",
    title: "Prohibited operations",
    blurb: "Why you can't do maths on the text input() gives you.",
  },
  {
    slug: "type-casting",
    title: "Type casting",
    blurb: "Convert between types with int(), float() and str().",
  },
  {
    slug: "string-operators",
    title: "String operators",
    blurb: "+ joins strings and * repeats them.",
  },
  {
    slug: "input-quiz",
    title: "Quiz",
    blurb: "Check what you've learned about input and conversions.",
  },
];
