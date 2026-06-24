import LessonShell from "@/components/ui/LessonShell";
import InstallSteps from "@/components/python/InstallSteps";
import PathGuide from "@/components/python/PathGuide";

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
        <span className="font-mono text-foreground">python.org/downloads</span>{" "}—
        the site even guesses your operating system and offers the right version.
      </p>

      <InstallSteps />

      <p className="leading-relaxed text-muted">
        One concept is worth pausing on: the{" "}
        <strong className="text-foreground">PATH</strong>. It&apos;s the list of
        folders your computer searches when you type a command, so putting Python
        on it is what lets you simply type{" "}
        <span className="font-mono text-foreground">python</span>{" "}in any terminal
        instead of spelling out where it was installed. How you do that depends on
        your operating system:
      </p>

      <PathGuide />

      <p className="leading-relaxed text-muted">
        A heads-up for <strong className="text-foreground">Linux</strong>{" "}and{" "}
        <strong className="text-foreground">macOS</strong>{" "}users: you may already
        have Python. Most Linux distributions ship with it pre-installed — run{" "}
        <span className="font-mono text-foreground">python3 --version</span>{" "}to
        check — though it can be an older release, so installing the latest from
        python.org keeps you current. On these systems the command is often{" "}
        <span className="font-mono text-foreground">python3</span>{" "}rather than{" "}
        <span className="font-mono text-foreground">python</span>.
      </p>

      <p className="leading-relaxed text-muted">
        Whichever route you took, the final check is the same: open a terminal,
        run <span className="font-mono text-brand">python --version</span>{" "}(or{" "}
        <span className="font-mono text-brand">python3 --version</span>), and if a
        version number prints back, Python is installed and on your PATH —
        you&apos;re ready to write code.
      </p>
    </LessonShell>
  );
}
