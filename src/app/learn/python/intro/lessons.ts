// Single source of truth for the "Introduction to Programming" module: the
// lesson order, slugs, titles and one-line blurbs. The overview page, the
// lesson shell (prev/next pager) and each lesson's metadata all read from here.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "how-programs-work",
    title: "How a computer program works",
    blurb: "A program is a list of instructions the computer follows in order.",
  },
  {
    slug: "natural-vs-programming-languages",
    title: "Natural languages vs programming languages",
    blurb: "Why human language is ambiguous and code has to be exact.",
  },
  {
    slug: "what-makes-a-language",
    title: "What makes a language",
    blurb: "Alphabet, vocabulary, syntax and meaning — for English and for Python.",
  },
  {
    slug: "machine-vs-high-level",
    title: "Machine language vs high-level language",
    blurb: "The 0s and 1s the CPU runs, and the readable code we write instead.",
  },
  {
    slug: "compilation-vs-interpretation",
    title: "Compilation vs interpretation",
    blurb: "Two ways to turn your code into something the computer can run.",
  },
  {
    slug: "what-an-interpreter-does",
    title: "What does an interpreter do?",
    blurb: "Reading, checking and running your program one line at a time.",
  },
  {
    slug: "compilation-vs-interpretation-tradeoffs",
    title: "Compilation vs interpretation: pros & cons",
    blurb: "Speed, portability, debugging and distribution — side by side.",
  },
];

export function lessonIndex(slug: string) {
  return LESSONS.findIndex((l) => l.slug === slug);
}
