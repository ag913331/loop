import LessonShell from "@/components/LessonShell";
import PyodideRunner from "@/components/PyodideRunner";

const GRADE_CODE = `score = 75

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("Try again")`;

const NESTED_CODE = `age = 20
has_ticket = True

if age >= 18:
    if has_ticket:
        print("Enjoy the show!")
    else:
        print("You need a ticket.")
else:
    print("Under 18 — not allowed.")`;

export const metadata = {
  title: "Analyzing code samples — loop",
  description:
    "Read if/elif/else programs and trace, line by line, which branch runs and why.",
};

export default function Page() {
  return (
    <LessonShell slug="analyzing-code">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The best way to get comfortable with conditions is to <em>trace</em>{" "}them
        — to read a program and predict what it does before running it. Let&apos;s
        do a couple. Here&apos;s a grader. With{" "}
        <span className="font-mono text-foreground">score = 75</span>, which line
        prints?
      </p>

      <PyodideRunner initialCode={GRADE_CODE} />

      <p className="leading-relaxed text-muted">
        The key to an <span className="font-mono text-accent">elif</span>{" "}chain is
        that Python tries each condition <strong className="text-foreground">in
        order</strong>{" "}and stops at the first True one.{" "}
        <span className="font-mono text-foreground">75 &gt;= 90</span>? No.{" "}
        <span className="font-mono text-foreground">75 &gt;= 80</span>? No.{" "}
        <span className="font-mono text-foreground">75 &gt;= 70</span>? Yes — so it
        prints <span className="font-mono text-foreground">C</span>{" "}and skips the
        rest. The order of the branches really matters.
      </p>

      <p className="leading-relaxed text-muted">
        Conditions can also <strong className="text-foreground">nest</strong>:
        an <span className="font-mono text-accent">if</span>{" "}inside another{" "}
        <span className="font-mono text-accent">if</span>, each with its own
        indentation. Trace this one before you run it — does the &ldquo;Enjoy the
        show!&rdquo; line happen?
      </p>

      <PyodideRunner initialCode={NESTED_CODE} />

      <p className="leading-relaxed text-muted">
        Follow the indentation like a map:{" "}
        <span className="font-mono text-foreground">age &gt;= 18</span>{" "}is True, so
        we step inside; there{" "}
        <span className="font-mono text-foreground">has_ticket</span>{" "}is True, so
        we get in. Reading code by its indentation is a skill worth practising —
        it&apos;s how you&apos;ll spot bugs.
      </p>
    </LessonShell>
  );
}
