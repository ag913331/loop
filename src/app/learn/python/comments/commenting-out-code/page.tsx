import LessonShell from "@/components/ui/LessonShell";
import CommentOut from "@/components/python/CommentOut";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `print("one")
# print("two")     # ← remove the # to switch this back on
print("three")`;

export const metadata = {
  title: "Making fragments of code — loop",
  description:
    "Commenting out code: put a # in front of a line to switch it off temporarily, without deleting it.",
};

export default function Page() {
  return (
    <LessonShell slug="commenting-out-code">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The hash has a second, very practical use. Because Python ignores
        anything after a <span className="font-mono text-foreground">#</span>, you
        can put one in front of a line of <em>code</em>{" "}to switch it off — without
        deleting it. This is called{" "}
        <strong className="text-foreground">commenting out</strong>, and that
        switched-off line is your &ldquo;fragment.&rdquo;
      </p>

      <CommentOut />

      <p className="leading-relaxed text-muted">
        It&apos;s the everyday tool for figuring out what&apos;s going on. Suspect
        one line is causing trouble? Comment it out and run again — if the problem
        vanishes, you&apos;ve found it. Want to test an idea without losing the
        original? Comment the old version out and write the new one beside it.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Try it: delete the <span className="font-mono text-foreground">#</span>{" "}
        and <span className="font-mono text-warn">&quot;two&quot;</span>{" "}joins the
        output; put it back and it&apos;s gone again — all without losing a single
        character of the code. Comment out, uncomment, repeat: it&apos;s how a lot
        of debugging actually gets done.
      </p>
    </LessonShell>
  );
}
