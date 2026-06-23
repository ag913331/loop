import LessonShell from "@/components/LessonShell";
import ReturnValue from "@/components/ReturnValue";
import PyodideRunner from "@/components/PyodideRunner";

const RETURN_CODE = `def square(n):
    return n * n

# the call square(5) becomes its returned value, 25
result = square(5)
print(result)            # 25

# you can use the result directly in a bigger expression
print(square(3) + square(4))   # 9 + 16 = 25

# a function can return whatever it computes
def is_adult(age):
    return age >= 18

print(is_adult(20))      # True`;

const EARLY_CODE = `def absolute(n):
    if n < 0:
        return -n        # return ends the function right here
    return n             # only reached when n >= 0

print(absolute(-7))      # 7
print(absolute(7))       # 7

# A bare 'return' (no value) just exits early and hands back None.
def warn(n):
    if n < 0:
        print("negative!")
        return
    print("ok")

warn(-1)                 # negative!`;

export const metadata = {
  title: "Effects and results: the return statement — loop",
  description:
    "A function's effect is what it does; its result is the value it hands back with return. Capture that value and use it anywhere.",
};

export default function Page() {
  return (
    <LessonShell slug="return-statement">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A function can do two quite different things. It can have an{" "}
        <strong className="text-foreground">effect</strong>{" "}— something visible
        that happens, like <span className="font-mono text-foreground">print</span>{" "}
        putting text on the screen. And it can produce a{" "}
        <strong className="text-foreground">result</strong>{" "}— a value it hands{" "}
        <em>back</em>{" "}to whoever called it. The tool for handing a value back is{" "}
        <span className="font-mono text-accent">return</span>.
      </p>

      <ReturnValue />

      <p className="leading-relaxed text-muted">
        Here&apos;s the key idea:{" "}
        <span className="font-mono text-accent">return</span>{" "}makes the whole call{" "}
        <em>become</em>{" "}that value. After{" "}
        <span className="font-mono text-foreground">return n * n</span>{" "}runs,{" "}
        <span className="font-mono text-foreground">square(5)</span>{" "}is, for all
        purposes, just <span className="font-mono text-foreground">25</span>{" "}— so
        you can store it, print it, or drop it straight into another expression.
      </p>

      <PyodideRunner initialCode={RETURN_CODE} />

      <p className="leading-relaxed text-muted">
        One more thing <span className="font-mono text-accent">return</span>{" "}does:
        it <strong className="text-foreground">ends the function immediately</strong>.
        The moment Python hits a return, it stops and jumps back to the caller —
        any lines below it in the function are skipped. That makes it perfect for
        handling special cases early.
      </p>

      <PyodideRunner initialCode={EARLY_CODE} />

      <p className="leading-relaxed text-muted">
        So a function can act, return a value, or both. But what does a function
        give back when it has no <span className="font-mono text-accent">return</span>{" "}
        at all? Python has a special answer for that — next.
      </p>
    </LessonShell>
  );
}
