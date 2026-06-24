import LessonShell from "@/components/ui/LessonShell";
import Decomposition from "@/components/python/Decomposition";
import PyodideRunner from "@/components/python/PyodideRunner";

const DECOMP_CODE = `# Each small step is its own function...
def brew_coffee():
    print("brewing coffee")

def toast_bread():
    print("toasting bread")

def fry_egg():
    print("frying an egg")

# ...and the big job is just a tidy list of calls
def make_breakfast():
    brew_coffee()
    toast_bread()
    fry_egg()
    print("breakfast is ready!")

make_breakfast()`;

export const metadata = {
  title: "Decomposition — loop",
  description:
    "Decomposition: break a big, daunting problem into small, named functions you can write, test and understand one at a time.",
};

export default function Page() {
  return (
    <LessonShell slug="decomposition">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Big problems are overwhelming when you stare at them whole. The trick that
        every programmer leans on is{" "}
        <strong className="text-foreground">decomposition</strong>: split the big
        job into a handful of smaller jobs, each simple enough to hold in your
        head — and make each one a function.
      </p>

      <Decomposition />

      <p className="leading-relaxed text-muted">
        &ldquo;Make breakfast&rdquo; is vague and daunting. But{" "}
        <span className="font-mono text-foreground">brew_coffee</span>,{" "}
        <span className="font-mono text-foreground">toast_bread</span>{" "}and{" "}
        <span className="font-mono text-foreground">fry_egg</span>{" "}are each small,
        clear, and easy to get right on their own. Solve the small pieces, and the
        big one assembles itself.
      </p>

      <PyodideRunner initialCode={DECOMP_CODE} />

      <p className="leading-relaxed text-muted">
        Notice how <span className="font-mono text-foreground">make_breakfast</span>{" "}
        reads almost like plain English — a list of named steps. That&apos;s the
        real payoff: well-decomposed code{" "}
        <strong className="text-foreground">documents itself</strong>. Each piece
        can be written, tested and fixed alone, and a function you got right once
        can be reused in the next program too.
      </p>
    </LessonShell>
  );
}
