import LessonShell from "@/components/ui/LessonShell";
import SpoilAndFix from "@/components/python/SpoilAndFix";

export const metadata = {
  title: "How to spoil (and fix) your code — loop",
  description:
    "Errors aren't failures — they're directions. Make one on purpose, read the traceback, and fix it.",
};

export default function Page() {
  return (
    <LessonShell slug="spoil-and-fix">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s a secret: every programmer breaks their code constantly. What
        separates beginners from experts isn&apos;t avoiding mistakes — it&apos;s
        reading the error message instead of panicking. So let&apos;s break our
        program on purpose and practise the fix.
      </p>

      <SpoilAndFix />

      <p className="leading-relaxed text-muted">
        Misspell <span className="font-mono text-foreground">print</span>{" "}as{" "}
        <span className="font-mono text-danger">prnt</span>{" "}and Python stops with
        a <span className="font-mono text-foreground">NameError</span>. That block
        of red text is a <em>traceback</em>, and it&apos;s on your side: it tells
        you the file, the line number, and exactly what it didn&apos;t understand.
      </p>

      <p className="leading-relaxed text-muted">
        Read it from the bottom up —{" "}
        <span className="font-mono text-foreground">
          name &apos;prnt&apos; is not defined
        </span>{" "}
        — fix the typo, and run it again. Green output, no red. Getting
        comfortable with this little loop of break → read → fix is genuinely half
        of learning to code.
      </p>
    </LessonShell>
  );
}
