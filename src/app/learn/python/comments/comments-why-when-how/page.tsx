import LessonShell from "@/components/LessonShell";
import CommentDemo from "@/components/CommentDemo";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# This line is a note to a human — Python skips it
print("Hi")          # comments can sit after code too
# print("Bye")       # ...this line never runs`;

export const metadata = {
  title: "Comments — why, when, and how? — loop",
  description:
    "A comment is text Python ignores, starting with #. Why and when to use them, and how to write good ones.",
};

export default function Page() {
  return (
    <LessonShell slug="comments-why-when-how">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Not everything in a program is meant for the computer. A{" "}
        <strong className="text-foreground">comment</strong>{" "}is a note for the
        <em> humans</em>{" "}reading the code — and Python ignores it completely. You
        write one with a hash, <span className="font-mono text-foreground">#</span>:
        everything from the <span className="font-mono text-foreground">#</span>{" "}
        to the end of the line is invisible to Python.
      </p>

      <CommentDemo />

      <p className="leading-relaxed text-muted">
        That&apos;s the <strong className="text-foreground">how</strong>: a{" "}
        <span className="font-mono text-foreground">#</span>{" "}on its own line, or
        tacked onto the end of a line of code. The{" "}
        <strong className="text-foreground">why</strong>{" "}is that code tells you{" "}
        <em>what</em>{" "}happens, but rarely <em>why</em>{" "}— and the why is what your
        future self will have forgotten.
      </p>

      <p className="leading-relaxed text-muted">
        As for <strong className="text-foreground">when</strong>: a good comment
        explains intent or a tricky bit — <em>why</em>{" "}a value is what it is, or
        what a confusing line is for. A bad one just restates the obvious (
        <span className="font-mono text-muted"># add 1 to x</span>{" "}above{" "}
        <span className="font-mono text-foreground">x += 1</span>{" "}earns its
        keep nowhere). Comment the surprising, not the self-evident.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Run it: only the line without a leading{" "}
        <span className="font-mono text-foreground">#</span>{" "}does anything. Python
        has no special multi-line comment — for a longer note, you just start
        each line with its own <span className="font-mono text-foreground">#</span>.
      </p>
    </LessonShell>
  );
}
