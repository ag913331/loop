import LessonShell from "@/components/LessonShell";
import PythonTimeline from "@/components/PythonTimeline";

export const metadata = {
  title: "Who created Python? — loop",
  description:
    "Guido van Rossum began Python as a holiday project in 1989 — and named it after a comedy show.",
};

export default function Page() {
  return (
    <LessonShell slug="who-created-python">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python was created by a Dutch programmer named{" "}
        <strong className="text-foreground">Guido van Rossum</strong>. He started
        it over the Christmas holidays in 1989 as a side project — something
        cleaner and more readable than the languages he was using at work — and
        released it to the world in 1991.
      </p>

      <PythonTimeline />

      <p className="leading-relaxed text-muted">
        For decades Guido guided the language as its{" "}
        <span className="font-mono text-foreground">BDFL</span> — &ldquo;Benevolent
        Dictator For Life,&rdquo; the person with the final say on how Python
        should grow. He stepped back from that role in 2018, and today Python is
        steered by a community steering council.
      </p>

      <p className="leading-relaxed text-muted">
        And the name? It has nothing to do with snakes. Guido was reading scripts
        from <em>Monty Python&apos;s Flying Circus</em> and wanted something
        short, a little mysterious, and fun. The playful spirit stuck — you&apos;ll
        still see <span className="font-mono text-foreground">spam</span> and{" "}
        <span className="font-mono text-foreground">eggs</span> in Python
        examples to this day.
      </p>
    </LessonShell>
  );
}
