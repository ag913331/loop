import LessonShell from "@/components/ui/LessonShell";
import StringMethods from "@/components/python/StringMethods";
import PyodideRunner from "@/components/python/PyodideRunner";
import Exercise from "@/components/python/Exercise";

const METHODS_CODE = `text = "  Hello, World  "

print(text.upper())        # "  HELLO, WORLD  "
print(text.lower())        # "  hello, world  "
print(text.strip())        # "Hello, World"  (trims the spaces)
print(text.replace("l", "L"))   # "  HeLLo, WorLd  "

# methods chain — each returns a string for the next to work on
print(text.strip().upper())     # "HELLO, WORLD"`;

const SPLIT_CODE = `sentence = "the quick brown fox"

words = sentence.split()        # split on spaces -> a list
print(words)                    # ['the', 'quick', 'brown', 'fox']
print(len(words))               # 4

csv = "ada,alan,grace"
print(csv.split(","))           # ['ada', 'alan', 'grace']

# join is the opposite: glue a list back into a string
print("-".join(["a", "b", "c"]))   # "a-b-c"`;

export const metadata = {
  title: "String methods — loop",
  description:
    "upper, lower, strip, replace, split and join — the everyday string toolkit. Each returns a brand-new string, because strings are immutable.",
};

export default function Page() {
  return (
    <LessonShell slug="string-methods">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Strings come with a rich toolkit of <strong className="text-foreground">methods</strong>{" "}—
        functions you call on the string itself with a dot:{" "}
        <span className="font-mono text-foreground">text.upper()</span>. Because
        strings are immutable, none of them changes the original; each one hands
        back a <strong className="text-foreground">new</strong>{" "}string.
      </p>

      <StringMethods />

      <p className="leading-relaxed text-muted">
        The everyday ones:{" "}
        <span className="font-mono text-foreground">upper()</span>/
        <span className="font-mono text-foreground">lower()</span>{" "}change case,{" "}
        <span className="font-mono text-foreground">strip()</span>{" "}trims
        whitespace from the ends, and{" "}
        <span className="font-mono text-foreground">replace(old, new)</span>{" "}swaps
        text. Since each returns a string, you can <em>chain</em>{" "}them.
      </p>

      <PyodideRunner initialCode={METHODS_CODE} />

      <p className="leading-relaxed text-muted">
        Two more that bridge strings and lists:{" "}
        <span className="font-mono text-foreground">split()</span>{" "}breaks a string
        into a list of pieces (on spaces by default, or any separator you give),
        and <span className="font-mono text-foreground">join()</span>{" "}does the
        reverse — gluing a list of strings back into one.
      </p>

      <PyodideRunner initialCode={SPLIT_CODE} />

      <Exercise
        prompt="Write a function normalise(name) that trims surrounding spaces and returns the name in all lower case. So normalise('  Ada  ') returns 'ada'."
        starter={`def normalise(name):\n    # your code here\n    pass`}
        tests={`assert normalise("  Ada  ") == "ada"\nassert normalise("GRACE") == "grace"\nassert normalise("alan") == "alan"`}
        hint="Chain two methods: .strip() to trim the ends, then .lower() on the result."
      />
    </LessonShell>
  );
}
