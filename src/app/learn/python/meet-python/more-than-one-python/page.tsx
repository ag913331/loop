import LessonShell from "@/components/LessonShell";
import PythonFlavors from "@/components/PythonFlavors";

export const metadata = {
  title: "There's more than one Python — loop",
  description:
    "Python the language vs the engines that run it: CPython, PyPy, Jython, IronPython and MicroPython.",
};

export default function Page() {
  return (
    <LessonShell slug="more-than-one-python">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s a subtle but useful distinction. &ldquo;Python&rdquo; is the{" "}
        <em>language</em> — the rules and vocabulary. The program that actually
        reads and runs your code is a separate thing called an{" "}
        <strong className="text-foreground">implementation</strong>, and there
        are several of them.
      </p>

      <PythonFlavors />

      <p className="leading-relaxed text-muted">
        The one almost everyone uses is{" "}
        <span className="font-mono text-foreground">CPython</span> — the reference
        implementation, written in C. When you download Python from python.org,
        that&apos;s what you get. The others exist for special reasons:{" "}
        <span className="font-mono text-foreground">PyPy</span> runs the same code
        faster, while <span className="font-mono text-foreground">MicroPython</span>{" "}
        shrinks it down to run on a chip smaller than a coin.
      </p>

      <p className="leading-relaxed text-muted">
        One more thing you&apos;ll hear about: <em>Python 2 vs Python 3</em>. Python
        3 is the present and future — Python 2 reached its end of life in 2020. If
        you&apos;re starting today, you&apos;re learning Python 3, and that&apos;s
        exactly where the rest of this course goes next.
      </p>
    </LessonShell>
  );
}
