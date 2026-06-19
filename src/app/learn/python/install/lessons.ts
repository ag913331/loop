// Ordered lessons for the "Downloading and Installing Python" module.
// Module-level metadata (title, position, what follows) lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "download-install-configure",
    title: "Downloading, installing & configuring Python",
    blurb: "Get it from python.org, run the installer, and add it to your PATH.",
  },
  {
    slug: "starting-your-work",
    title: "Starting your work with Python",
    blurb: "Meet the interactive shell — the fastest way to try things out.",
  },
  {
    slug: "your-first-program",
    title: "Create your very first program",
    blurb: "Write hello.py, run it, and watch Python greet you back.",
  },
  {
    slug: "spoil-and-fix",
    title: "How to spoil (and fix) your code",
    blurb: "Make a mistake on purpose, read the error, and put it right.",
  },
];
