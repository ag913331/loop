import LessonShell from "@/components/ui/LessonShell";
import TradeoffComparison from "@/components/python/TradeoffComparison";

export const metadata = {
  title: "Compilation vs interpretation: pros & cons — loop",
  description:
    "Speed, portability, debugging and distribution — how compiled and interpreted languages stack up.",
};

export default function Page() {
  return (
    <LessonShell slug="compilation-vs-interpretation-tradeoffs">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Neither approach is simply &ldquo;better.&rdquo; Each buys an advantage
        by accepting a cost somewhere else. Here&apos;s how they line up on the
        things that matter most in day-to-day programming.
      </p>

      <TradeoffComparison />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">Compiling</strong>{" "}shines when speed
        and distribution matter: the program is already machine code, so it runs
        fast, and you can ship a single file without the source. The price is
        flexibility — the binary is built for one kind of machine, and every
        change means compiling again.
      </p>

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">Interpreting</strong>{" "}trades raw
        speed for convenience: the same code runs anywhere the interpreter
        exists, and you can change a line and run it instantly. That fast,
        forgiving feedback loop is a big reason Python is such a friendly place
        to start — and exactly what the rest of this course builds on.
      </p>
    </LessonShell>
  );
}
