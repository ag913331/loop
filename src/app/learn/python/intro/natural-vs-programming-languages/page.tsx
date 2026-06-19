import LessonShell from "@/components/LessonShell";
import AmbiguityVsPrecision from "@/components/AmbiguityVsPrecision";

export const metadata = {
  title: "Natural languages vs programming languages — loop",
  description:
    "Human language is rich but ambiguous. Programming languages trade that richness for exactness.",
};

export default function Page() {
  return (
    <LessonShell slug="natural-vs-programming-languages">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        We talk to each other in <strong className="text-foreground">natural
        languages</strong> like English — languages that grew up on their own
        over thousands of years. They&apos;re powerful, but slippery: the same
        sentence can mean different things, and we lean on tone, context and
        common sense to fill the gaps.
      </p>

      <AmbiguityVsPrecision />

      <p className="leading-relaxed text-muted">
        A computer has none of that common sense. So we talk to it in a{" "}
        <strong className="text-foreground">programming language</strong> — one
        that was deliberately designed to have a single, exact meaning for every
        valid statement. There&apos;s no room for &ldquo;you know what I
        meant.&rdquo; Given the same input, it does the same thing, every time.
      </p>

      <p className="leading-relaxed text-muted">
        That strictness can feel unforgiving at first, but it&apos;s a gift: once
        you know the rules, the computer&apos;s behaviour is completely
        predictable. Your job as a programmer is to say precisely what you mean.
      </p>
    </LessonShell>
  );
}
