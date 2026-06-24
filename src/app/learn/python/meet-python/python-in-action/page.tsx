import LessonShell from "@/components/ui/LessonShell";
import PythonInAction from "@/components/python/PythonInAction";

export const metadata = {
  title: "Where you'll see Python in action — loop",
  description:
    "From websites to AI to spacecraft analysis, Python quietly powers an enormous range of real-world work.",
};

export default function Page() {
  return (
    <LessonShell slug="python-in-action">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Because Python is a generalist, you&apos;ll find it almost everywhere —
        often behind the scenes. Here are some of the fields where it does the
        heavy lifting, with a few of the tools you&apos;d reach for in each.
      </p>

      <PythonInAction />

      <p className="leading-relaxed text-muted">
        The headline act is <strong className="text-foreground">data and AI</strong>:
        most modern machine-learning work runs through Python libraries like
        pandas, PyTorch and scikit-learn. But it&apos;s just as at home serving
        websites, gluing systems together with quick automation scripts, crunching
        scientific data, or running analytics in finance.
      </p>

      <p className="leading-relaxed text-muted">
        Companies you know — from Netflix and Spotify to Instagram and NASA — lean
        on Python somewhere in their stack. Learning it opens a remarkably wide
        set of doors. But no tool is perfect, so next we&apos;ll be honest about
        where Python <em>isn&apos;t</em>{" "}the best pick.
      </p>
    </LessonShell>
  );
}
