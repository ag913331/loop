import LessonShell from "@/components/ui/LessonShell";
import FString from "@/components/python/FString";
import PyodideRunner from "@/components/python/PyodideRunner";
import Exercise from "@/components/python/Exercise";

const FSTRING_CODE = `name = "Ada"
age = 36

# the old way: clumsy, and you must convert numbers to str
print("Hi " + name + ", you are " + str(age))

# the f-string way: put an f before the quote, variables in {braces}
print(f"Hi {name}, you are {age}")

# any expression works inside the braces
print(f"Next year you'll be {age + 1}")`;

const FORMAT_CODE = `price = 19.5
qty = 3

# format specifiers go after a colon
print(f"Total: {price * qty:.2f}")     # Total: 58.50  (2 decimals)
print(f"{name:>8}")                      # right-align in 8 cols
print(f"{0.25:.0%}")                     # 25%   (as a percentage)`;

export const metadata = {
  title: "f-strings — loop",
  description:
    "f-strings are the modern way to build text: prefix the string with f and drop variables or expressions straight in with {curly braces}.",
};

export default function Page() {
  return (
    <LessonShell slug="f-strings">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Gluing text together with <span className="font-mono text-foreground">+</span>{" "}
        gets ugly fast — and it breaks the moment a number is involved, because you
        can&apos;t add a string to an int. The modern fix is the{" "}
        <strong className="text-foreground">f-string</strong>: put an{" "}
        <span className="font-mono text-foreground">f</span>{" "}before the opening
        quote, then drop variables straight into the text inside{" "}
        <strong className="text-foreground">{`{curly braces}`}</strong>.
      </p>

      <FString />

      <p className="leading-relaxed text-muted">
        Each <span className="font-mono text-foreground">{`{name}`}</span>{" "}is
        replaced by that variable&apos;s value, right where it sits — numbers
        included, no <span className="font-mono text-foreground">str()</span>{" "}
        needed. You can even put a whole <em>expression</em>{" "}inside the braces.
      </p>

      <PyodideRunner initialCode={FSTRING_CODE} />

      <p className="leading-relaxed text-muted">
        f-strings can also <strong className="text-foreground">format</strong>{" "}the
        value, with a specifier after a colon. The handiest is{" "}
        <span className="font-mono text-foreground">:.2f</span>{" "}— show a number to
        two decimal places, perfect for money. There are specifiers for alignment,
        percentages and more.
      </p>

      <PyodideRunner initialCode={FORMAT_CODE} />

      <Exercise
        prompt="Write a function receipt(item, price) that returns a string like 'apple costs $0.50' — the price always shown to exactly two decimal places."
        starter={`def receipt(item, price):\n    # use an f-string with a :.2f specifier\n    pass`}
        tests={`assert receipt("apple", 0.5) == "apple costs $0.50"\nassert receipt("pen", 3) == "pen costs $3.00"`}
        hint={'Return f"{item} costs ${price:.2f}" — the :.2f forces two decimals.'}
      />

      <p className="leading-relaxed text-muted">
        From here on, reach for f-strings whenever you build text — they&apos;re
        clearer, safer and the standard in modern Python. A quick quiz to lock the
        section in.
      </p>
    </LessonShell>
  );
}
