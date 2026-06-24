import LessonShell from "@/components/LessonShell";
import ExceptionGallery from "@/components/ExceptionGallery";
import PyodideRunner from "@/components/PyodideRunner";

const NAMES_CODE = `def attempt(action):
    try:
        action()
    except Exception as e:
        # type(e).__name__ is the exception's name; e is its message
        print(type(e).__name__, "->", e)

attempt(lambda: 10 / 0)
attempt(lambda: int("abc"))
attempt(lambda: "3" + 5)
attempt(lambda: [1].depend(2))

# ZeroDivisionError -> division by zero
# ValueError -> invalid literal for int() with base 10: 'abc'
# TypeError -> can only concatenate str (not "int") to str
# AttributeError -> 'list' object has no attribute 'depend'`;

export const metadata = {
  title: "Exceptions you'll meet — loop",
  description:
    "A field guide to the most common exceptions — ZeroDivisionError, ValueError, TypeError, AttributeError — and how catching the base Exception catches them all.",
};

export default function Page() {
  return (
    <LessonShell slug="common-exceptions">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python has dozens of built-in exception types, but a handful show up again
        and again. Recognising them on sight turns a scary traceback into a quick
        diagnosis — you read the name and you already know roughly what happened.
      </p>

      <ExceptionGallery />

      <ul className="ml-5 list-disc space-y-1 leading-relaxed text-muted marker:text-muted">
        <li>
          <span className="font-mono text-danger">ZeroDivisionError</span>{" "}— any
          division by zero, with <span className="font-mono text-foreground">/</span>,{" "}
          <span className="font-mono text-foreground">//</span>{" "}or{" "}
          <span className="font-mono text-foreground">%</span>.
        </li>
        <li>
          <span className="font-mono text-danger">ValueError</span>{" "}— the right{" "}
          <em>type</em>{" "}but an impossible value, like{" "}
          <span className="font-mono text-foreground">int(&quot;abc&quot;)</span>.
        </li>
        <li>
          <span className="font-mono text-danger">TypeError</span>{" "}— the wrong type
          for the operation, like adding a string to a number.
        </li>
        <li>
          <span className="font-mono text-danger">AttributeError</span>{" "}— asking for
          a method or attribute a value doesn&apos;t have.
        </li>
      </ul>

      <p className="leading-relaxed text-muted">
        You can capture the exception object itself with{" "}
        <span className="font-mono text-foreground">except ... as e</span>, which is
        handy for printing its message. Run this to see four different exceptions,
        each caught and named:
      </p>

      <PyodideRunner initialCode={NAMES_CODE} />

      <p className="leading-relaxed text-muted">
        Notice the single <span className="font-mono text-foreground">except Exception</span>{" "}
        caught all four. That&apos;s because these specific errors are all{" "}
        <strong className="text-foreground">kinds of</strong>{" "}
        <span className="font-mono text-foreground">Exception</span>{" "}— so catching
        the general type catches the specific ones too. (One to leave alone:{" "}
        <span className="font-mono text-danger">SyntaxError</span>{" "}means your code
        itself is malformed — fix it, don&apos;t catch it.)
      </p>
    </LessonShell>
  );
}
