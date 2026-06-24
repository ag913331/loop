import LessonShell from "@/components/ui/LessonShell";
import StringChars from "@/components/python/StringChars";
import PyodideRunner from "@/components/python/PyodideRunner";
import Exercise from "@/components/python/Exercise";

const INDEX_CODE = `word = "python"

print(word[0])      # p   -- first character
print(word[-1])     # n   -- last character
print(word[0:3])    # pyt -- a slice (stop excluded)
print(word[:3])     # pyt -- from the start
print(word[-2:])    # on  -- the last two
print(len(word))    # 6`;

const IMMUTABLE_CODE = `word = "python"
print(word.upper())   # PYTHON  -- a new string
print(word)           # python  -- the original is unchanged

word[0] = "P"         # TypeError: strings can't be changed in place`;

export const metadata = {
  title: "Inside a string — loop",
  description:
    "A string is an ordered sequence of characters. Index it and slice it just like a list, measure it with len — and note that it can never be changed in place.",
};

export default function Page() {
  return (
    <LessonShell slug="string-anatomy">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You&apos;ve been writing strings since your very first{" "}
        <span className="font-mono text-foreground">print</span>. Now look{" "}
        <em>inside</em>{" "}one. A string is an{" "}
        <strong className="text-foreground">ordered sequence of characters</strong>,
        and that means you can reach into it exactly like a list: by index, and by
        slice.
      </p>

      <StringChars />

      <p className="leading-relaxed text-muted">
        Same rules as list indexing:{" "}
        <span className="font-mono text-foreground">word[0]</span>{" "}is the first
        character, <span className="font-mono text-foreground">word[-1]</span>{" "}the
        last, and <span className="font-mono text-foreground">word[0:3]</span>{" "}is a
        slice (the stop is excluded). <span className="font-mono text-foreground">len()</span>{" "}
        counts the characters.
      </p>

      <PyodideRunner initialCode={INDEX_CODE} />

      <p className="leading-relaxed text-muted">
        One crucial difference from a list, though: a string is{" "}
        <strong className="text-foreground">immutable</strong>. You can read any
        part of it, but you can&apos;t change a character in place — trying to is a{" "}
        <span className="font-mono text-danger">TypeError</span>. Instead, you
        build a <em>new</em>{" "}string, which is exactly what the methods in the next
        lesson do.
      </p>

      <PyodideRunner initialCode={IMMUTABLE_CODE} />

      <Exercise
        prompt="Given word = 'programming', use slicing to build first4 (the first four characters) and last3 (the last three)."
        starter={`word = "programming"\nfirst4 = \nlast3 = `}
        tests={`assert first4 == "prog", f"first4 should be 'prog', got {first4!r}"\nassert last3 == "ing", f"last3 should be 'ing', got {last3!r}"`}
        hint="Slicing: word[:4] takes the first four; word[-3:] takes the last three."
      />
    </LessonShell>
  );
}
