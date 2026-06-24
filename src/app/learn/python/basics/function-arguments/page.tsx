import LessonShell from "@/components/ui/LessonShell";
import PrintArgument from "@/components/python/PrintArgument";

export const metadata = {
  title: "Function arguments — loop",
  description:
    "An argument is the data you pass to a function inside its parentheses — and print turns it into output.",
};

export default function Page() {
  return (
    <LessonShell slug="function-arguments">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        We&apos;ve been calling the values inside the parentheses{" "}
        <strong className="text-foreground">arguments</strong> {" "} — let&apos;s make
        that precise. An <strong className="text-foreground">argument</strong> {" "} is
        a single piece of data you hand to a function for it to work with. It
        sits inside the function&apos;s parentheses.
      </p>

      <PrintArgument />

      <p className="leading-relaxed text-muted">
        So in <span className="font-mono text-brand">print(&quot;Hello&quot;)</span>,
        the text <span className="font-mono text-warn">&quot;Hello&quot;</span>{" "}is
        the argument — the thing you&apos;re asking print to show. An argument
        doesn&apos;t have to be text, either: it can be a number, or even the
        result of a calculation. Whatever you pass in, print shows it.
      </p>

      <p className="leading-relaxed text-muted">
        Every function decides what its arguments mean and what to do with them.
        print&apos;s job is simple — display them — but the idea runs through all
        of Python: you call a function and feed it the data it needs through its
        arguments. Now that you can give a function its data, the bigger question
        is how to stack up many instructions into a whole program — and Python
        has firm rules about that.
      </p>
    </LessonShell>
  );
}
