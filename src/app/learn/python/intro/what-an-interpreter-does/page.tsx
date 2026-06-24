import LessonShell from "@/components/ui/LessonShell";
import InterpreterLoop from "@/components/python/InterpreterLoop";

export const metadata = {
  title: "What does an interpreter do? — loop",
  description:
    "An interpreter reads, checks and runs your program one line at a time — and stops at the first line it can't understand.",
};

export default function Page() {
  return (
    <LessonShell slug="what-an-interpreter-does">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python runs through an <strong className="text-foreground">interpreter</strong>.
        It works through your program one line at a time, and for each line it
        does three things: <em>reads</em>{" "}it, <em>checks</em>{" "}that it follows the
        rules, and <em>runs</em>{" "}it. Then it moves to the next line and repeats.
      </p>

      <InterpreterLoop />

      <p className="leading-relaxed text-muted">
        Because it goes line by line, the interpreter only discovers a problem
        when it actually reaches that line. Here the first two lines run fine —
        you see <span className="font-mono text-foreground">Ada</span>{" "}printed —
        but the third has a typo (<span className="font-mono text-danger">prnt</span>{" "}
        instead of <span className="font-mono text-foreground">print</span>). The
        interpreter stops there and reports the error.
      </p>

      <p className="leading-relaxed text-muted">
        Notice what that means: everything <em>before</em>{" "}the bad line already
        happened, and everything <em>after</em>{" "}it never runs. That line-by-line
        behaviour shapes how compiled and interpreted languages compare — which
        is the final lesson.
      </p>
    </LessonShell>
  );
}
