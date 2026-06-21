import LessonShell from "@/components/LessonShell";
import VariableBox from "@/components/VariableBox";

export const metadata = {
  title: "Variables — data-shaped boxes — loop",
  description:
    "A variable is a named box that stores a value — and in Python the box can hold any type of data.",
};

export default function Page() {
  return (
    <LessonShell slug="data-shaped-boxes">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        So far your values have been throwaway — printed once and gone. A{" "}
        <strong className="text-foreground">variable</strong>{" "}lets you keep one:
        it&apos;s a named box that stores a value so you can use it again later,
        or change it as your program runs.
      </p>

      <VariableBox />

      <p className="leading-relaxed text-muted">
        Two things make a variable: a <strong className="text-foreground">name</strong>{" "}
        on the outside and a <strong className="text-foreground">value</strong>{" "}
        inside. And here&apos;s the &ldquo;data-shaped&rdquo; part — Python
        doesn&apos;t lock a box to one type. The same name can hold an integer
        now, a string later, a boolean after that. The box quietly takes the
        shape of whatever you put in it.
      </p>

      <p className="leading-relaxed text-muted">
        That flexibility is powerful, and just occasionally a trap (a box you
        thought held a number might now hold text). For the next few lessons
        we&apos;ll keep it simple: how to name a box, how to fill it, and how to
        use what&apos;s inside.
      </p>
    </LessonShell>
  );
}
