import LessonShell from "@/components/LessonShell";
import PrintMachine from "@/components/PrintMachine";

export const metadata = {
  title: "The print() function — loop",
  description:
    "print() is a function: you give it arguments, its effect is to show text, and it returns the value None.",
};

export default function Page() {
  return (
    <LessonShell slug="the-print-function">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        You&apos;ve been using <span className="font-mono text-brand">print</span>{" "}
        since your very first program. It&apos;s worth a proper look, because it
        shows off three ideas that hold for <em>every</em>{" "}function in Python:
        what you put <strong className="text-foreground">in</strong>, the{" "}
        <strong className="text-foreground">effect</strong>{" "}it has, and the{" "}
        <strong className="text-foreground">value it returns</strong>.
      </p>

      <PrintMachine />

      <p className="leading-relaxed text-muted">
        What you put in are its <strong className="text-foreground">arguments</strong>{" "}
        — the values inside the parentheses. Its{" "}
        <strong className="text-foreground">effect</strong>{" "}is the visible thing
        it does: writing those values to the screen. That&apos;s why you use it —
        to <em>see</em>{" "}what your program is doing.
      </p>

      <p className="leading-relaxed text-muted">
        The third idea is subtler. Every function call also{" "}
        <strong className="text-foreground">returns a value</strong>{" "}back to your
        code — and print&apos;s returned value is{" "}
        <span className="font-mono text-accent">None</span>, Python&apos;s way of
        saying &ldquo;nothing useful here.&rdquo; That makes sense: you call print
        for its effect, not to get something back. Plenty of other functions
        you&apos;ll meet are the opposite — their whole point is the value they
        return. Keeping <em>effect</em>{" "}and <em>returned value</em>{" "}apart will
        save you confusion later.
      </p>

      <p className="leading-relaxed text-muted">
        Next, let&apos;s zoom in on those arguments — the data you actually hand
        the function.
      </p>
    </LessonShell>
  );
}
