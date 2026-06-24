// Course data model, three levels deep: Course → Module → Section → Lesson.
// A Course belongs to one language; everything below is language-agnostic shape.
// The shared LessonShell / SectionOverview render any course from these types.

export type Lesson = { slug: string; title: string; blurb: string };

export type Section = {
  slug: string; // path segment under /learn/<language>/
  title: string;
  intro: string;
  lessons: Lesson[];
};

export type Module = {
  title: string;
  intro: string;
  sections: Section[];
};

export type Course = {
  language: string; // URL segment + COURSES key, e.g. "python"
  title: string; // display name, e.g. "Python Essentials"
  modules: Module[];
};
