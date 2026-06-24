import LessonShell from "@/components/ui/LessonShell";
import DictViews from "@/components/python/DictViews";
import PyodideRunner from "@/components/python/PyodideRunner";

const VIEWS_CODE = `ages = {"Ada": 36, "Alan": 41, "Grace": 29}

print(list(ages.keys()))     # ['Ada', 'Alan', 'Grace']
print(list(ages.values()))   # [36, 41, 29]
print(list(ages.items()))    # [('Ada', 36), ('Alan', 41), ('Grace', 29)]`;

const SAFE_CODE = `ages = {"Ada": 36, "Alan": 41}

# 'in' tests for a KEY — no KeyError, just True/False
print("Ada" in ages)         # True
print("Nobody" in ages)      # False

# get() returns None (or a default) instead of crashing
print(ages.get("Ada"))           # 36
print(ages.get("Nobody"))        # None
print(ages.get("Nobody", 0))     # 0   -- your fallback`;

export const metadata = {
  title: "Dictionary methods and functions — loop",
  description:
    "The everyday dictionary toolkit: keys(), values() and items() to view the contents, plus in and get() for safe lookups.",
};

export default function Page() {
  return (
    <LessonShell slug="dictionary-methods">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        A dictionary comes with a small, well-chosen toolkit. Three methods let you
        view its contents in different shapes —{" "}
        <span className="font-mono text-foreground">keys()</span>,{" "}
        <span className="font-mono text-foreground">values()</span>{" "}and{" "}
        <span className="font-mono text-foreground">items()</span>{" "}— and they&apos;re
        exactly what you reach for when looping.
      </p>

      <DictViews />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">keys()</span>{" "}gives you the
        names, <span className="font-mono text-foreground">values()</span>{" "}the
        data, and <span className="font-mono text-foreground">items()</span>{" "}both
        together as <strong className="text-foreground">(key, value) tuples</strong>{" "}
        — a detail that becomes important in the next lesson.
      </p>

      <PyodideRunner initialCode={VIEWS_CODE} />

      <p className="leading-relaxed text-muted">
        The other two tools are about looking things up{" "}
        <strong className="text-foreground">safely</strong>. Remember that{" "}
        <span className="font-mono text-foreground">ages[&quot;Nobody&quot;]</span>{" "}
        crashes with a <span className="font-mono text-danger">KeyError</span>. The{" "}
        <span className="font-mono text-accent">in</span>{" "}operator checks whether
        a key exists first, and{" "}
        <span className="font-mono text-foreground">get()</span>{" "}fetches a value
        but politely returns <span className="font-mono text-foreground">None</span>{" "}
        (or a default you choose) when the key is missing.
      </p>

      <PyodideRunner initialCode={SAFE_CODE} />

      <p className="leading-relaxed text-muted">
        Note that <span className="font-mono text-accent">in</span>{" "}always tests
        the <em>keys</em>, never the values — the natural question for a dictionary
        is &ldquo;do you have this key?&rdquo; With the toolkit in hand, let&apos;s
        see tuples and dictionaries join forces.
      </p>
    </LessonShell>
  );
}
