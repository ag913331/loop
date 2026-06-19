import LessonShell from "@/components/LessonShell";
import InstallSteps from "@/components/InstallSteps";

export const metadata = {
  title: "Downloading, installing & configuring Python — loop",
  description:
    "Download Python from python.org, run the installer, and make sure it's on your PATH.",
};

export default function Page() {
  return (
    <LessonShell slug="download-install-configure">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Getting Python onto your computer is three quick steps: download it, run
        the installer, and check it worked. The official home for it is{" "}
        <span className="font-mono text-foreground">python.org/downloads</span> —
        the site even guesses your operating system and offers the right version.
      </p>

      <InstallSteps />

      <p className="leading-relaxed text-muted">
        On Windows, there&apos;s one box worth a special mention:{" "}
        <strong className="text-foreground">&ldquo;Add Python to PATH.&rdquo;</strong>{" "}
        Tick it. The <em>PATH</em> is the list of places your computer looks for
        programs, and ticking the box means you can just type{" "}
        <span className="font-mono text-foreground">python</span> in any terminal
        instead of hunting for where it was installed.
      </p>

      <p className="leading-relaxed text-muted">
        macOS and Linux usually come with a Python already, but installing the
        latest from python.org keeps you current. Either way, the final step is
        the same: open a terminal, run{" "}
        <span className="font-mono text-brand">python --version</span>, and if you
        see a version number printed back, you&apos;re ready to go.
      </p>
    </LessonShell>
  );
}
