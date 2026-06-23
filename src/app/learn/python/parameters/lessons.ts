// Ordered lessons for the "How functions communicate with their environment"
// section (Module 4). Module/section metadata lives in ../modules.ts.

export type Lesson = {
  slug: string;
  title: string;
  blurb: string;
};

export const LESSONS: Lesson[] = [
  {
    slug: "parameterized-functions",
    title: "Parameterized functions",
    blurb: "Give a function inputs: parameters are the named slots, arguments are the values you pass in.",
  },
  {
    slug: "positional-passing",
    title: "Positional parameter passing",
    blurb: "Arguments fill parameters by their position — first to first, second to second.",
  },
  {
    slug: "keyword-passing",
    title: "Keyword argument passing",
    blurb: "Name each argument at the call, and the order stops mattering.",
  },
  {
    slug: "mixing-arguments",
    title: "Mixing positional and keyword",
    blurb: "Use both at once — with the one rule that keeps Python happy.",
  },
  {
    slug: "parameters-quiz",
    title: "Quiz",
    blurb: "Check your grip on parameters, positional order, and keyword arguments.",
  },
];
