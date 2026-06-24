// Ordered lessons for the "Tuples and dictionaries" section (Module 4).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "sequences-and-mutability",
    title: "Sequence types and mutability",
    blurb: "The big divide: values you can change after creating them, and values you can't.",
  },
  {
    slug: "tuples",
    title: "Tuples",
    blurb: "Fixed, ordered collections — created with commas, read by index, and unpacked in one line.",
  },
  {
    slug: "dictionaries",
    title: "Dictionaries",
    blurb: "Look things up by a key instead of a position: the key → value mapping.",
  },
  {
    slug: "dictionary-methods",
    title: "Dictionary methods and functions",
    blurb: "keys(), values(), items(), get() and in — the everyday dictionary toolkit.",
  },
  {
    slug: "tuples-and-dictionaries",
    title: "Tuples and dictionaries together",
    blurb: "items() hands back tuples — so looping a dictionary is tuple unpacking in disguise.",
  },
  {
    slug: "tuples-dicts-quiz",
    title: "Quiz",
    blurb: "Check your grip on mutability, tuples, dictionaries and their methods.",
  },
];
