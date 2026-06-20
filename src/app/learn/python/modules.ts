// The course, three levels deep: Module → Section → Lesson.
//
// Modules are the top-level grouping. Each module holds ordered Sections, and
// each Section owns its lessons (defined in that section's own lessons.ts).
// Section slugs are globally unique and map directly to the route folders under
// /learn/python/<section>, so a lesson page only needs to pass its slug.

import { LESSONS as INTRO_LESSONS } from "./intro/lessons";
import { LESSONS as MEET_LESSONS } from "./meet-python/lessons";
import { LESSONS as INSTALL_LESSONS } from "./install/lessons";
import { LESSONS as BASICS_LESSONS } from "./basics/lessons";
import { LESSONS as LITERALS_LESSONS } from "./literals/lessons";

export type Lesson = { slug: string; title: string; blurb: string };

export type Section = {
  slug: string; // path segment under /learn/python/
  title: string;
  intro: string;
  lessons: Lesson[];
};

export type Module = {
  title: string;
  intro: string;
  sections: Section[];
};

export const MODULES: Module[] = [
  {
    title: "Getting Started",
    intro:
      "Set the foundations: what programming and Python actually are, and how to get Python running on your own computer.",
    sections: [
      {
        slug: "intro",
        title: "Introduction to Programming",
        intro:
          "Before a single line of Python, the basics that everything else rests on: what a program actually is, why we invented programming languages, and how your code becomes something a computer can run. Every idea here is animated — watch it happen.",
        lessons: INTRO_LESSONS,
      },
      {
        slug: "meet-python",
        title: "Introduction to Python",
        intro:
          "Now meet the language itself. Where Python came from, what makes it a joy to use, who its rivals are, and where you'll find it running in the real world — the story before the syntax.",
        lessons: MEET_LESSONS,
      },
      {
        slug: "install",
        title: "Downloading and Installing Python",
        intro:
          "Time to get Python running on your own machine. Download and install it, learn the different ways to run your code, write your very first program, and — just as importantly — break it and fix it.",
        lessons: INSTALL_LESSONS,
      },
    ],
  },
  {
    title: "Python data types, variables, operators, and basic I/O operations",
    intro:
      "The working core of Python: write and run real programs, get comfortable with print(), then move on to variables, data types, operators, and reading input.",
    sections: [
      {
        slug: "basics",
        title: "Basics",
        intro:
          "Where it gets hands-on: your first real programs, then a thorough tour of print() — the function you'll lean on to see what your code is doing.",
        lessons: BASICS_LESSONS,
      },
      {
        slug: "literals",
        title: "Python literals",
        intro:
          "The raw values you write straight into your code — numbers, text, and true/false — and the type Python gives each one.",
        lessons: LITERALS_LESSONS,
      },
    ],
  },
];

// Sections flattened into course order, each tagged with its module and the
// numbering used for display. This is the backbone the navigation reads from.
export const SECTIONS = MODULES.flatMap((module, mi) =>
  module.sections.map((section, si) => ({
    section,
    module,
    moduleNumber: mi + 1,
    sectionNumber: si + 1,
  })),
);

export type LocatedSection = (typeof SECTIONS)[number];

export function getSection(slug: string): LocatedSection | null {
  return SECTIONS.find((s) => s.section.slug === slug) ?? null;
}

export function locateLesson(lessonSlug: string) {
  for (const entry of SECTIONS) {
    const index = entry.section.lessons.findIndex((l) => l.slug === lessonSlug);
    if (index !== -1) return { ...entry, index };
  }
  return null;
}

export function nextSection(slug: string): LocatedSection | null {
  const i = SECTIONS.findIndex((s) => s.section.slug === slug);
  return i >= 0 && i < SECTIONS.length - 1 ? SECTIONS[i + 1] : null;
}
