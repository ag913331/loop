import LessonShell from "@/components/LessonShell";
import CompileVsInterpret from "@/components/CompileVsInterpret";

export const metadata = {
  title: "Compilation vs interpretation — loop",
  description:
    "Two ways to turn high-level code into something a computer can run: translate it all first, or run it line by line.",
};

export default function Page() {
  return (
    <LessonShell slug="compilation-vs-interpretation">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        High-level code has to be turned into machine instructions before it can
        run. There are two classic ways to do it, and the difference is mostly{" "}
        <em>when</em>{" "}the translation happens.
      </p>

      <CompileVsInterpret />

      <p className="leading-relaxed text-muted">
        A <strong className="text-foreground">compiler</strong> {" "} translates your
        whole program ahead of time into a standalone machine-code file. After
        that, the computer runs the file directly — the original source
        isn&apos;t needed anymore.
      </p>

      <p className="leading-relaxed text-muted">
        An <strong className="text-foreground">interpreter</strong>{" "}takes a
        different route: it reads your source and runs it{" "}
        <em>line by line</em>, translating on the fly each time the program runs.
        Python works this way — which is why the next lesson looks at exactly
        what an interpreter does.
      </p>
    </LessonShell>
  );
}
