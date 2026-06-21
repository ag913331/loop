// Ordered lessons for the "Variables" section (Module 2).
// Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "data-shaped-boxes",
    title: "Variables — data-shaped boxes",
    blurb: "A named box that holds a value of any type.",
  },
  {
    slug: "variable-names",
    title: "Variable names",
    blurb: "The rules and conventions for naming your boxes.",
  },
  {
    slug: "creating-a-variable",
    title: "How to create a variable",
    blurb: "Assignment: put a value into a name with =.",
  },
  {
    slug: "using-variables",
    title: "How to use variables",
    blurb: "Use the name and Python fills in the value.",
  },
  {
    slug: "reassigning-variables",
    title: "Assigning a new value",
    blurb: "Change what a variable holds — even using its old value.",
  },
  {
    slug: "solving-problems",
    title: "Solving simple problems",
    blurb: "Put variables and operators together to compute a result.",
  },
  {
    slug: "shortcut-operators",
    title: "Shortcut operators",
    blurb: "x += 1 and friends — shorthand for updating a variable.",
  },
  {
    slug: "variables-quiz",
    title: "Quiz",
    blurb: "Check your understanding of variables.",
  },
];
