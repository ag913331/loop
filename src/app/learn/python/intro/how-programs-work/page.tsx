import LessonShell from "@/components/LessonShell";
import SequentialRun from "@/components/SequentialRun";

export const metadata = {
  title: "How a computer program works — loop",
  description:
    "A program is a list of instructions, and the computer carries them out one at a time, in order.",
};

export default function Page() {
  return (
    <LessonShell slug="how-programs-work">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A <span className="font-mono text-foreground">program</span> is nothing
        more than a list of instructions. The computer reads them{" "}
        <em>one at a time, from top to bottom</em>, and does exactly what each
        one says — no guessing, no skipping ahead. Watch this tiny program run:
        the highlight is the computer&apos;s place in the code, and the panel on
        the right is what it produces.
      </p>

      <SequentialRun />

      <p className="leading-relaxed text-muted">
        Each line above is a single instruction —{" "}
        <span className="font-mono text-brand">print(...)</span>, which shows
        text on screen. The computer runs the first, then the second, then the
        third, always in that order. It feels instant because a processor runs
        billions of these steps per second, but the rule never changes: one
        instruction after another.
      </p>

      <p className="leading-relaxed text-muted">
        Everything else you&apos;ll learn — decisions, loops, functions — is
        just a way of controlling <em>which</em> instructions run and{" "}
        <em>how many times</em>. But underneath, it&apos;s always this: a
        sequence of steps the computer follows faithfully.
      </p>
    </LessonShell>
  );
}
