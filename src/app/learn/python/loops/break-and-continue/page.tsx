import LessonShell from "@/components/ui/LessonShell";
import BreakContinue from "@/components/python/BreakContinue";
import PyodideRunner from "@/components/python/PyodideRunner";

const BREAK_CODE = `for n in range(1, 6):
    if n == 3:
        break          # leave the loop completely
    print(n)
print("done")          # prints: 1, 2, done`;

const CONTINUE_CODE = `for n in range(1, 6):
    if n == 3:
        continue       # skip just this one
    print(n)           # prints: 1, 2, 4, 5`;

export const metadata = {
  title: "break and continue — loop",
  description:
    "break leaves a loop early; continue skips to the next iteration. Two ways to steer any loop.",
};

export default function Page() {
  return (
    <LessonShell slug="break-and-continue">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Sometimes you don&apos;t want a loop to simply run to its natural end. Two
        keywords let you steer it from the inside:{" "}
        <strong className="text-foreground">break</strong>{" "}and{" "}
        <strong className="text-foreground">continue</strong>. Both work in{" "}
        <span className="font-mono text-accent">while</span>{" "}and{" "}
        <span className="font-mono text-accent">for</span>{" "}loops alike.
      </p>

      <BreakContinue />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">break</span> <em>leaves the
        loop entirely</em>{" "}— the moment Python hits it, the loop is over and
        execution jumps to whatever comes after. It&apos;s how you stop early: as
        soon as you&apos;ve found what you were looking for, break out.
      </p>

      <PyodideRunner initialCode={BREAK_CODE} />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">continue</span>{" "}is gentler: it{" "}
        <em>skips the rest of the current round</em>{" "}and jumps straight back to
        the top for the next one. The loop carries on — you&apos;ve just chosen to
        ignore this particular item.
      </p>

      <PyodideRunner initialCode={CONTINUE_CODE} />

      <p className="leading-relaxed text-muted">
        A nice detail to remember: a{" "}
        <span className="font-mono text-foreground">break</span>{" "}skips a loop&apos;s{" "}
        <span className="font-mono text-accent">else</span>{" "}clause (the loop
        didn&apos;t finish naturally), whereas{" "}
        <span className="font-mono text-foreground">continue</span>{" "}doesn&apos;t —
        it&apos;s still the same loop, just moving on.
      </p>
    </LessonShell>
  );
}
