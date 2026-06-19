// Registry of course modules. Each module owns an ordered list of lessons (its
// own lessons.ts) plus the metadata the overview and lesson shell need. Lesson
// slugs are unique across modules, so a lesson can be located from its slug
// alone — which lets every lesson page stay a one-liner that just passes `slug`.

import { LESSONS as INTRO_LESSONS } from "./intro/lessons";
import { LESSONS as MEET_LESSONS } from "./meet-python/lessons";

export type Lesson = { slug: string; title: string; blurb: string };

export type CourseModule = {
  slug: string; // path segment under /learn/python/
  number: number;
  title: string;
  intro: string; // overview paragraph
  lessons: Lesson[];
  next?: { href: string; label: string }; // where to go after the last lesson
};

export const MODULES: CourseModule[] = [
  {
    slug: "intro",
    number: 1,
    title: "Introduction to Programming",
    intro:
      "Before a single line of Python, the basics that everything else rests on: what a program actually is, why we invented programming languages, and how your code becomes something a computer can run. Every idea here is animated — watch it happen.",
    lessons: INTRO_LESSONS,
    next: { href: "/learn/python/meet-python", label: "Introduction to Python" },
  },
  {
    slug: "meet-python",
    number: 2,
    title: "Introduction to Python",
    intro:
      "Now meet the language itself. Where Python came from, what makes it a joy to use, who its rivals are, and where you'll find it running in the real world — the story before the syntax.",
    lessons: MEET_LESSONS,
    next: { href: "/learn/python/lists", label: "Lists" },
  },
];

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug);
}

export function locateLesson(lessonSlug: string) {
  for (const mod of MODULES) {
    const index = mod.lessons.findIndex((l) => l.slug === lessonSlug);
    if (index !== -1) return { module: mod, index };
  }
  return null;
}
