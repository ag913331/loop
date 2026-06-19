// Ordered lessons for the "Introduction to Python" module. Module-level
// metadata (title, position, what follows) lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "who-created-python",
    title: "Who created Python?",
    blurb: "Guido van Rossum, a holiday project in 1989, and a comedy show.",
  },
  {
    slug: "what-makes-python-special",
    title: "What makes Python so special",
    blurb: "Readable, batteries-included, and friendly to beginners and experts alike.",
  },
  {
    slug: "python-rivals",
    title: "Python's rivals",
    blurb: "The other languages you'll hear it compared to, and what they're for.",
  },
  {
    slug: "python-in-action",
    title: "Where you'll see Python in action",
    blurb: "Web, data and AI, automation, science — Python is almost everywhere.",
  },
  {
    slug: "why-not-python",
    title: "Why not Python?",
    blurb: "The honest trade-offs: speed, mobile, and a few other catches.",
  },
  {
    slug: "more-than-one-python",
    title: "There's more than one Python",
    blurb: "CPython, PyPy, MicroPython and friends — one language, many engines.",
  },
];
