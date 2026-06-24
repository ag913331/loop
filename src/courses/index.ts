// Course registry. Every course is keyed by its language; the navigation
// helpers all take a `language` so the shared shell components stay generic.
// Adding a new language = add its Course module here.

import type { Course, Module, Section } from "./types";
import { pythonCourse } from "./python";

export type { Course, Module, Section, Lesson } from "./types";

export const COURSES: Record<string, Course> = {
  [pythonCourse.language]: pythonCourse,
};

export function getCourse(language: string): Course | null {
  return COURSES[language] ?? null;
}

export type LocatedSection = {
  language: string;
  section: Section;
  module: Module;
  moduleNumber: number;
  sectionNumber: number;
};

// All sections of a course in course order, tagged with module + display numbers.
function flatSections(language: string): LocatedSection[] {
  const course = COURSES[language];
  if (!course) return [];
  return course.modules.flatMap((module, mi) =>
    module.sections.map((section, si) => ({
      language,
      section,
      module,
      moduleNumber: mi + 1,
      sectionNumber: si + 1,
    })),
  );
}

export function getSection(
  language: string,
  slug: string,
): LocatedSection | null {
  return flatSections(language).find((s) => s.section.slug === slug) ?? null;
}

export function locateLesson(language: string, lessonSlug: string) {
  for (const entry of flatSections(language)) {
    const index = entry.section.lessons.findIndex((l) => l.slug === lessonSlug);
    if (index !== -1) return { ...entry, index };
  }
  return null;
}

export function nextSection(
  language: string,
  slug: string,
): LocatedSection | null {
  const all = flatSections(language);
  const i = all.findIndex((s) => s.section.slug === slug);
  return i >= 0 && i < all.length - 1 ? all[i + 1] : null;
}
