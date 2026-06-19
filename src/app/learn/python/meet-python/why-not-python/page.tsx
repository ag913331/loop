import LessonShell from "@/components/LessonShell";
import WhyNotPython from "@/components/WhyNotPython";

export const metadata = {
  title: "Why not Python? — loop",
  description:
    "The honest trade-offs: Python is slower than compiled languages, awkward for mobile, and dynamically typed.",
};

export default function Page() {
  return (
    <LessonShell slug="why-not-python">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        No language is perfect, and pretending otherwise does you no favours.
        Python&apos;s biggest cost is the flip side of how it runs: because it&apos;s
        interpreted line by line rather than compiled ahead of time, it&apos;s
        slower at raw, repetitive number-crunching.
      </p>

      <WhyNotPython />

      <p className="leading-relaxed text-muted">
        For most programs that gap never matters — the computer is waiting on you,
        the network or the disk, not on Python. And when speed truly counts,
        Python often hands the hot path to fast C libraries under the hood, which
        is exactly how the data-science world gets away with it.
      </p>

      <p className="leading-relaxed text-muted">
        The other catches: it&apos;s not the natural choice for{" "}
        <strong className="text-foreground">mobile apps</strong>, it uses more
        memory than lower-level languages, and because types are checked while the
        program runs, some mistakes only surface at runtime rather than ahead of
        time. Worth knowing — rarely a dealbreaker for learning.
      </p>
    </LessonShell>
  );
}
