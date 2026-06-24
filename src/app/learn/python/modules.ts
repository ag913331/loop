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
import { LESSONS as OPERATORS_LESSONS } from "./operators/lessons";
import { LESSONS as VARIABLES_LESSONS } from "./variables/lessons";
import { LESSONS as COMMENTS_LESSONS } from "./comments/lessons";
import { LESSONS as INPUT_LESSONS } from "./input/lessons";
import { LESSONS as DECISIONS_LESSONS } from "./decisions/lessons";
import { LESSONS as LOOPS_LESSONS } from "./loops/lessons";
import { LESSONS as LOGIC_LESSONS } from "./logic/lessons";
import { LESSONS as LISTS_LESSONS } from "./lists/lessons";
import { LESSONS as SORTING_LESSONS } from "./sorting/lessons";
import { LESSONS as LIST_OPS_LESSONS } from "./list-ops/lessons";
import { LESSONS as ADVANCED_LISTS_LESSONS } from "./advanced-lists/lessons";
import { LESSONS as FUNCTIONS_LESSONS } from "./functions/lessons";
import { LESSONS as PARAMETERS_LESSONS } from "./parameters/lessons";
import { LESSONS as RETURN_LESSONS } from "./return-values/lessons";
import { LESSONS as SCOPES_LESSONS } from "./scopes/lessons";
import { LESSONS as MULTI_PARAM_LESSONS } from "./multi-parameter/lessons";

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
      {
        slug: "operators",
        title: "Operators",
        intro:
          "Your data-manipulation tools. The symbols that combine values into expressions — arithmetic and beyond — and the rules that decide what happens first.",
        lessons: OPERATORS_LESSONS,
      },
      {
        slug: "variables",
        title: "Variables",
        intro:
          "Give your data a name so you can store it, reuse it, and change it. Named boxes that hold a value — the memory your programs run on.",
        lessons: VARIABLES_LESSONS,
      },
      {
        slug: "comments",
        title: "Comments",
        intro:
          "Notes for humans that Python ignores. Why and when to leave them, how to write them, and how to switch lines of code off without deleting them.",
        lessons: COMMENTS_LESSONS,
      },
      {
        slug: "input",
        title: "Interaction with the user",
        intro:
          "Until now your programs only spoke. Now they listen: read what the user types with input(), and turn that text into numbers you can compute with.",
        lessons: INPUT_LESSONS,
      },
    ],
  },
  {
    title:
      "Boolean values, conditional execution, loops, lists and list processing, logical and bitwise operations",
    intro:
      "Until now your code has run straight through, top to bottom. Now it gains a will of its own — making decisions, repeating work, and handling whole collections of data.",
    sections: [
      {
        slug: "decisions",
        title: "Making decisions in Python",
        intro:
          "Teach your code to choose. Ask yes/no questions with comparison operators, and run different code depending on the answer.",
        lessons: DECISIONS_LESSONS,
      },
      {
        slug: "loops",
        title: "Loops in Python",
        intro:
          "The heart of the language's name: code that repeats. while and for loops, the range() function, and the break and continue controls that steer them.",
        lessons: LOOPS_LESSONS,
      },
      {
        slug: "logic",
        title: "Logic and bit operations",
        intro:
          "Combine conditions with and, or and not — then drop a level to the bits themselves, with the bitwise operators and shifts that work on individual 0s and 1s.",
        lessons: LOGIC_LESSONS,
      },
      {
        slug: "lists",
        title: "Lists and list processing",
        intro:
          "Hold many values under one name, in order. Index them, change them, grow and shrink them — the collection that loops were made to process.",
        lessons: LISTS_LESSONS,
      },
      {
        slug: "sorting",
        title: "Sorting lists: bubble sort",
        intro:
          "Put a list in order. Watch the classic bubble sort algorithm work step by step — then meet the one-line way Python does it for you.",
        lessons: SORTING_LESSONS,
      },
      {
        slug: "list-ops",
        title: "Operations on lists",
        intro:
          "The surprising truth about how lists are stored — why copying a name doesn't copy the list — and the everyday tools that follow from it: powerful slices, negative indices, and the in operator.",
        lessons: LIST_OPS_LESSONS,
      },
      {
        slug: "advanced-lists",
        title: "Lists in advanced applications",
        intro:
          "Lists can hold other lists — and that one idea unlocks grids, boards, and tables. Nest them to build two-dimensional arrays and beyond, with comprehensions to create them in a single line.",
        lessons: ADVANCED_LISTS_LESSONS,
      },
    ],
  },
  {
    title: "Functions, tuples, dictionaries, exceptions, and data processing",
    intro:
      "Your code has been one long script. Now you give it structure: package logic into reusable functions, store data in tuples and dictionaries, and handle the unexpected with exceptions.",
    sections: [
      {
        slug: "functions",
        title: "Functions",
        intro:
          "The single most important tool for taming complexity: a named, reusable block of code. Learn why functions exist, how breaking a problem into them keeps it manageable, where they come from, and how to write your own.",
        lessons: FUNCTIONS_LESSONS,
      },
      {
        slug: "parameters",
        title: "How functions communicate with their environment",
        intro:
          "Functions get useful when you can feed them data. Meet parameters and arguments — the slots a function declares and the values you pass in — and the two ways to pass them: by position and by name.",
        lessons: PARAMETERS_LESSONS,
      },
      {
        slug: "return-values",
        title: "Function return",
        intro:
          "If parameters are how data goes in, return is how it comes back out. Learn the difference between a function's effect and its result, meet the None value, see how lists travel in and out — then build five real functions.",
        lessons: RETURN_LESSONS,
      },
      {
        slug: "scopes",
        title: "Scopes in Python",
        intro:
          "Where does a variable live, and who can see it? Meet local and global scope, the global keyword that crosses between them, and exactly what happens to the values you hand a function.",
        lessons: SCOPES_LESSONS,
      },
      {
        slug: "multi-parameter",
        title: "Creating multi-parameter functions",
        intro:
          "Everything you've learned about functions, put to work on real problems. Build functions that take several inputs — BMI, triangles, factorials, Fibonacci — and finish with recursion, a function that calls itself.",
        lessons: MULTI_PARAM_LESSONS,
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
