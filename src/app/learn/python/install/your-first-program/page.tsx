import LessonShell from "@/components/LessonShell";
import FirstProgram from "@/components/FirstProgram";

export const metadata = {
  title: "Create your very first program — loop",
  description:
    "Save a single line in hello.py, run it from the terminal, and see your first output.",
};

export default function Page() {
  return (
    <LessonShell slug="your-first-program">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Tradition says your first program should say hello to the world — so
        let&apos;s honour it. Open a text editor, type one line, and save it as a
        file called <span className="font-mono text-foreground">hello.py</span>.
        The <span className="font-mono text-foreground">.py</span> ending tells
        everyone (and your computer) that it&apos;s Python.
      </p>

      <FirstProgram />

      <p className="leading-relaxed text-muted">
        Then run it from a terminal with{" "}
        <span className="font-mono text-brand">python hello.py</span>. Python reads
        your file top to bottom, hits the{" "}
        <span className="font-mono text-foreground">print</span> instruction, and
        writes <span className="font-mono text-foreground">Hello, World!</span>{" "}
        back to you. That&apos;s a complete program — really.
      </p>

      <p className="leading-relaxed text-muted">
        It looks tiny, but you just did the whole loop of programming: you wrote
        an instruction, saved it, and the computer carried it out. Every program
        you ever write — however large — is built from exactly this. Now let&apos;s
        see what happens when it goes wrong.
      </p>
    </LessonShell>
  );
}
