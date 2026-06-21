import LessonShell from "@/components/LessonShell";
import InputFlow from "@/components/InputFlow";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `name = input("What's your name? ")
print("Hello,", name + "!")`;

export const metadata = {
  title: "The input() function — loop",
  description:
    "input() pauses the program, optionally shows a prompt, and returns the line of text the user types.",
};

export default function Page() {
  return (
    <LessonShell slug="the-input-function">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Your programs have only talked <em>at</em>{" "}people so far. The{" "}
        <strong className="text-foreground">input()</strong>{" "}function lets them
        listen back. When Python reaches an{" "}
        <span className="font-mono text-brand">input()</span>, it{" "}
        <strong className="text-foreground">pauses</strong>{" "}and waits for the user
        to type a line and press Enter — and whatever they typed becomes the{" "}
        function&apos;s result.
      </p>

      <InputFlow />

      <p className="leading-relaxed text-muted">
        On its own, <span className="font-mono text-foreground">input()</span>{" "}
        just waits silently — not very friendly. Give it a{" "}
        <strong className="text-foreground">prompt</strong>{" "}as an argument and it
        shows that text first, so the user knows what you&apos;re asking for:{" "}
        <span className="font-mono text-foreground">input(&quot;Your name? &quot;)</span>.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Run it — a box will pop up asking for your input. Type a name and watch
        the program carry on with it. (On your own machine the program waits
        right there in the terminal until you type.) Almost always you&apos;ll
        store the result in a variable, as we did with{" "}
        <span className="font-mono text-foreground">name</span>, so you can use it
        afterwards.
      </p>
    </LessonShell>
  );
}
