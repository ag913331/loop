import LessonShell from "@/components/LessonShell";
import BooleanVariable from "@/components/BooleanVariable";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `age = 20
is_adult = age >= 18      # store the answer
print(is_adult)           # True

# the value is just a boolean — reuse it later
print("Can vote:", is_adult)`;

export const metadata = {
  title: "Making use of answers — loop",
  description:
    "A comparison produces a boolean value, so you can store it in a variable and reuse the answer.",
};

export default function Page() {
  return (
    <LessonShell slug="making-use-of-answers">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s the quietly powerful part: the answer to a comparison is just
        a <strong className="text-foreground">value</strong>{" "}— a boolean. And
        anything that&apos;s a value can go into a{" "}
        <strong className="text-foreground">variable</strong>. So you can ask a
        question once, store the True/False answer, and use it as many times as
        you like.
      </p>

      <BooleanVariable />

      <p className="leading-relaxed text-muted">
        Python works out the right-hand side first —{" "}
        <span className="font-mono text-foreground">age &gt;= 18</span>{" "}becomes{" "}
        <span className="font-mono text-brand">True</span>{" "}— then stores that
        boolean in <span className="font-mono text-foreground">is_adult</span>,
        exactly like any other assignment. Naming the answer also makes your code
        read like English:{" "}
        <span className="font-mono text-foreground">is_adult</span>,{" "}
        <span className="font-mono text-foreground">has_won</span>,{" "}
        <span className="font-mono text-foreground">is_empty</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Storing a boolean is nice, but the real point of an answer is to{" "}
        <em>act</em>{" "}on it — to run one piece of code when it&apos;s True and skip
        it otherwise. That&apos;s the <span className="font-mono text-accent">if</span>{" "}
        statement, and it&apos;s next.
      </p>
    </LessonShell>
  );
}
