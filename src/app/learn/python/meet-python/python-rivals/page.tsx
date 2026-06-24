import LessonShell from "@/components/ui/LessonShell";
import PythonRivals from "@/components/python/PythonRivals";

export const metadata = {
  title: "Python's rivals — loop",
  description:
    "The other languages Python is often compared to — JavaScript, Java, C++, and more — and what each is known for.",
};

export default function Page() {
  return (
    <LessonShell slug="python-rivals">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Python isn&apos;t the only choice, and it isn&apos;t the right choice for
        everything. It&apos;s worth knowing the languages it&apos;s most often
        weighed against — not as enemies, but as tools each suited to a different
        job.
      </p>

      <PythonRivals />

      <p className="leading-relaxed text-muted">
        Notice the pattern: most rivals are <em>specialists</em>. JavaScript owns
        the browser, C and C++ chase raw performance, R lives in statistics. They
        each win decisively in their home turf.
      </p>

      <p className="leading-relaxed text-muted">
        Python&apos;s edge is the opposite — it&apos;s a{" "}
        <strong className="text-foreground">generalist</strong>. It&apos;s rarely
        the absolute fastest at any one thing, but it&apos;s good enough at almost
        everything and pleasant to use throughout. That breadth is exactly what
        the next lesson is about.
      </p>
    </LessonShell>
  );
}
