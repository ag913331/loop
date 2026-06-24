import LessonShell from "@/components/ui/LessonShell";
import PyodideRunner from "@/components/python/PyodideRunner";

const TEMP_CODE = `# Convert a temperature from Celsius to Fahrenheit
celsius = 100
fahrenheit = celsius * 9 / 5 + 32
print(fahrenheit, "°F")     # 212.0 °F`;

const BILL_CODE = `# Your turn: split a bill with a tip
total = 90
people = 3
tip_percent = 10

tip = total * tip_percent / 100
each = (total + tip) / people
print("Each pays:", each)`;

export const metadata = {
  title: "Solving simple problems — loop",
  description:
    "Put variables and operators together to solve a real problem, step by step.",
};

export default function Page() {
  return (
    <LessonShell slug="solving-problems">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You now have everything you need to make a computer actually{" "}
        <em>compute</em>{" "}something. The recipe is always the same: store the
        inputs in well-named variables, build an expression that works out the
        answer, store that in another variable, and print it.
      </p>

      <p className="leading-relaxed text-muted">
        Take converting a temperature from Celsius to Fahrenheit. The formula is{" "}
        <span className="font-mono text-foreground">F = C × 9 / 5 + 32</span>.
        Notice how precedence quietly does the right thing here —{" "}
        <span className="font-mono text-foreground">*</span>{" "}and{" "}
        <span className="font-mono text-foreground">/</span>{" "}happen before the{" "}
        <span className="font-mono text-foreground">+ 32</span>:
      </p>

      <PyodideRunner initialCode={TEMP_CODE} />

      <p className="leading-relaxed text-muted">
        Change <span className="font-mono text-foreground">celsius</span>{" "}and run
        it again — the whole calculation follows along, because everything below
        it is built from that one variable. That&apos;s the payoff of naming your
        data.
      </p>

      <p className="leading-relaxed text-muted">
        Now your turn. Here&apos;s a bill-splitter: it adds a tip, then divides
        between everyone. Read it, predict the answer, then run it — and try
        tweaking the numbers.
      </p>

      <PyodideRunner initialCode={BILL_CODE} />

      <p className="leading-relaxed text-muted">
        Updating a variable from itself — like adding things up as you go — is so
        common that Python has a shorthand for it. That&apos;s next.
      </p>
    </LessonShell>
  );
}
