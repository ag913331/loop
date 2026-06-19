import LessonShell from "@/components/LessonShell";
import HighLevelToMachine from "@/components/HighLevelToMachine";

export const metadata = {
  title: "Machine language vs high-level language — loop",
  description:
    "The CPU only understands binary. High-level languages let us write something readable instead.",
};

export default function Page() {
  return (
    <LessonShell slug="machine-vs-high-level">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Deep down, a processor only understands one thing:{" "}
        <strong className="text-foreground">machine language</strong> — long
        strings of 0s and 1s, each pattern standing for a tiny operation. It&apos;s
        what runs, but it&apos;s almost impossible for a human to read or write
        directly.
      </p>

      <HighLevelToMachine />

      <p className="leading-relaxed text-muted">
        So instead we write in a{" "}
        <strong className="text-foreground">high-level language</strong> like
        Python — close to human language, readable, and not tied to any one kind
        of processor. One clear line like{" "}
        <span className="font-mono text-brand">print(&quot;Hi&quot;)</span>{" "}
        stands in for a great many machine instructions.
      </p>

      <p className="leading-relaxed text-muted">
        But the computer can&apos;t run high-level code as-is — it still has to
        become machine language somehow. That translation step is the subject of
        the next lesson.
      </p>
    </LessonShell>
  );
}
