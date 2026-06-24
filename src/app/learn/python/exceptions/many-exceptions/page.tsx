import LessonShell from "@/components/ui/LessonShell";
import ExceptRouting from "@/components/python/ExceptRouting";
import PyodideRunner from "@/components/python/PyodideRunner";

const MANY_CODE = `try:
    value = int(input("Enter a number: "))
    print("Reciprocal:", 1 / value)
except ValueError:
    print("That wasn't a whole number.")
except ZeroDivisionError:
    print("Zero has no reciprocal.")
except:
    print("Something unexpected went wrong.")

# letters -> ValueError branch
# 0       -> ZeroDivisionError branch
# 4       -> no error, all excepts skipped`;

export const metadata = {
  title: "Handling several kinds of exception — loop",
  description:
    "One try can have many except branches, each for a different error type, plus a bare except as a catch-all that must come last.",
};

export default function Page() {
  return (
    <LessonShell slug="many-exceptions">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The same <span className="font-mono text-accent">try</span>{" "}block can fail
        in more than one way. Our little program raises a{" "}
        <span className="font-mono text-danger">ValueError</span>{" "}on bad text — but
        enter <span className="font-mono text-foreground">0</span>{" "}and the division
        raises a <span className="font-mono text-danger">ZeroDivisionError</span>{" "}
        instead. You can give each its own handler by stacking{" "}
        <strong className="text-foreground">multiple except branches</strong>.
      </p>

      <ExceptRouting />

      <p className="leading-relaxed text-muted">
        When an exception is raised, Python checks the{" "}
        <span className="font-mono text-accent">except</span>{" "}branches{" "}
        <strong className="text-foreground">top to bottom</strong>{" "}and runs the{" "}
        <strong className="text-foreground">first one that matches</strong>{" "}— then
        skips all the others. Each error type should appear at most once.
      </p>

      <p className="leading-relaxed text-muted">
        You can also add a <strong className="text-foreground">bare</strong>{" "}
        <span className="font-mono text-accent">except:</span>{" "}with no type — a
        catch-all for anything you didn&apos;t name. Because it matches everything,
        it must always be the <strong className="text-foreground">last</strong>{" "}
        branch, or it would swallow errors before the specific handlers get a
        chance.
      </p>

      <PyodideRunner initialCode={MANY_CODE} />

      <p className="leading-relaxed text-muted">
        A word of care with the catch-all: it&apos;s convenient, but hiding{" "}
        <em>every</em>{" "}error can mask real bugs. Prefer naming the exceptions you
        actually expect. To do that well, it helps to know the usual suspects —
        coming up next.
      </p>
    </LessonShell>
  );
}
