import LessonShell from "@/components/LessonShell";
import ReplDemo from "@/components/ReplDemo";

export const metadata = {
  title: "Starting your work with Python — loop",
  description:
    "The interactive shell lets you type Python and see the result instantly — the fastest way to experiment.",
};

export default function Page() {
  return (
    <LessonShell slug="starting-your-work">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Now that Python is installed, how do you actually use it? The quickest way
        is the <strong className="text-foreground">interactive shell</strong> —
        sometimes called the REPL. Open a terminal, type{" "}
        <span className="font-mono text-foreground">python</span>, and you get a{" "}
        <span className="font-mono text-accent">&gt;&gt;&gt;</span> prompt waiting
        for you.
      </p>

      <ReplDemo />

      <p className="leading-relaxed text-muted">
        Whatever you type, Python runs straight away and shows the result. It&apos;s
        a calculator, a scratchpad and a playground all at once — perfect for
        trying an idea or checking what a piece of code does. No files, no setup,
        just an instant conversation with the language.
      </p>

      <p className="leading-relaxed text-muted">
        It also ships with <span className="font-mono text-foreground">IDLE</span>,
        a simple built-in editor with the same shell inside a window. The shell is
        great for quick experiments — but anything you want to keep and run again
        belongs in a file. That&apos;s the very next lesson.
      </p>
    </LessonShell>
  );
}
