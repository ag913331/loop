import LessonShell from "@/components/LessonShell";
import KeywordArgs from "@/components/KeywordArgs";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `# Change sep and end and watch the output change
print("a", "b", "c", sep="-")
print("no", "newline", end=" → ")
print("...same line!")`;

export const metadata = {
  title: "Keyword arguments — loop",
  description:
    "Named arguments like sep and end let you change how print joins and finishes its output.",
};

export default function Page() {
  return (
    <LessonShell slug="keyword-arguments">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Some arguments are passed by <strong className="text-foreground">name</strong>{" "}
        instead of by position. These are{" "}
        <strong className="text-foreground">keyword arguments</strong>, written as{" "}
        <span className="font-mono text-foreground">name=value</span>. print has
        two especially handy ones:{" "}
        <span className="font-mono text-foreground">sep</span> and{" "}
        <span className="font-mono text-foreground">end</span>.
      </p>

      <KeywordArgs />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">sep</span> (short for
        separator) sets what goes <em>between</em> your values — it defaults to a
        single space, but{" "}
        <span className="font-mono text-brand">sep=&quot;-&quot;</span> joins them
        with dashes instead.{" "}
        <span className="font-mono text-foreground">end</span> sets what comes{" "}
        <em>after</em> the last value — it defaults to a newline (that invisible{" "}
        <span className="font-mono text-accent">\n</span>), which is why each
        print normally starts a fresh line.
      </p>

      <p className="leading-relaxed text-muted">
        Change <span className="font-mono text-foreground">end</span> and you can
        keep several prints on the same line. Because they have names, the order
        of keyword arguments doesn&apos;t matter — and they always come after your
        positional values. Try it:
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />
    </LessonShell>
  );
}
