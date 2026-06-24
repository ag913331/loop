import LessonShell from "@/components/LessonShell";
import TupleUnpack from "@/components/TupleUnpack";
import PyodideRunner from "@/components/PyodideRunner";

const LOOP_CODE = `ages = {"Ada": 36, "Alan": 41, "Grace": 29}

# items() gives (key, value) tuples — unpack them right in the loop
for name, age in ages.items():
    print(name, "is", age)

# Ada is 36
# Alan is 41
# Grace is 29`;

const COMBO_CODE = `# Tuples make great dictionary KEYS (lists can't — they're mutable)
distances = {
    ("London", "Paris"): 344,
    ("Paris", "Berlin"): 878,
}
print(distances[("London", "Paris")])   # 344

# And a list of tuples is a tidy way to build a dict
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)
print(d)        # {'a': 1, 'b': 2, 'c': 3}`;

export const metadata = {
  title: "Tuples and dictionaries together — loop",
  description:
    "items() yields (key, value) tuples, so looping a dictionary is tuple unpacking. Tuples can also be dictionary keys, and lists of tuples build dicts.",
};

export default function Page() {
  return (
    <LessonShell slug="tuples-and-dictionaries">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s where the last two lessons click together. You saw that{" "}
        <span className="font-mono text-foreground">items()</span>{" "}hands back{" "}
        <strong className="text-foreground">(key, value) tuples</strong>. You saw
        that a tuple can be <strong className="text-foreground">unpacked</strong>{" "}
        into separate variables. Put them side by side and the most common
        dictionary loop falls right out.
      </p>

      <TupleUnpack />

      <p className="leading-relaxed text-muted">
        When you write{" "}
        <span className="font-mono text-foreground">for name, age in ages.items()</span>,
        each round hands you one{" "}
        <span className="font-mono text-foreground">(key, value)</span>{" "}tuple and
        unpacks it into <span className="font-mono text-foreground">name</span>{" "}and{" "}
        <span className="font-mono text-foreground">age</span>{" "}— exactly the move
        above, happening once per entry.
      </p>

      <PyodideRunner initialCode={LOOP_CODE} />

      <p className="leading-relaxed text-muted">
        The partnership runs the other way too. Because tuples are{" "}
        <strong className="text-foreground">immutable</strong>, they can serve as
        dictionary <em>keys</em>{" "}— something a list can never do — which is perfect
        for things like a lookup keyed by a pair of cities. And a list of tuples
        drops straight into <span className="font-mono text-foreground">dict()</span>{" "}
        to build a dictionary.
      </p>

      <PyodideRunner initialCode={COMBO_CODE} />

      <p className="leading-relaxed text-muted">
        Immutable tuples and flexible dictionaries turn out to be natural partners:
        one provides safe, fixed groupings; the other looks them up by name. A
        quick quiz to lock the whole section in.
      </p>
    </LessonShell>
  );
}
