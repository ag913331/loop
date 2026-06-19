import LessonShell from "@/components/LessonShell";
import LanguageLayers from "@/components/LanguageLayers";

export const metadata = {
  title: "What makes a language — loop",
  description:
    "Every language — English or Python — is built from an alphabet, a vocabulary, syntax and meaning.",
};

export default function Page() {
  return (
    <LessonShell slug="what-makes-a-language">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Whether it&apos;s English or Python, every language is built from the
        same four layers. Start with an{" "}
        <strong className="text-foreground">alphabet</strong> of allowed symbols,
        combine those into a <strong className="text-foreground">vocabulary</strong>{" "}
        of words, arrange the words using <strong className="text-foreground">syntax</strong>{" "}
        rules, and the result carries{" "}
        <strong className="text-foreground">meaning</strong>. Watch one Python
        statement come together layer by layer.
      </p>

      <LanguageLayers />

      <p className="leading-relaxed text-muted">
        The <em>alphabet</em> is every character you&apos;re allowed to type. The{" "}
        <em>lexis</em> is the set of real words — keywords like{" "}
        <span className="font-mono text-foreground">print</span>, names, numbers
        and symbols. <em>Syntax</em> is the grammar: the rules for how those
        words may be put together. And <em>semantics</em> is what a correctly
        formed statement actually does.
      </p>

      <p className="leading-relaxed text-muted">
        Break a rule in any layer and it stops working: an unknown character,
        a misspelled word, or words in the wrong order. Python will tell you —
        which is exactly what the next two lessons are about.
      </p>
    </LessonShell>
  );
}
