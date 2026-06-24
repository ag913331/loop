import LessonShell from "@/components/ui/LessonShell";
import DictLookup from "@/components/python/DictLookup";
import PyodideRunner from "@/components/python/PyodideRunner";

const DICT_CODE = `# keys map to values, written key: value
ages = {"Ada": 36, "Alan": 41, "Grace": 29}

print(ages["Alan"])      # 41  -- look up by key, not position

ages["Ada"] = 37         # change a value
ages["Linus"] = 52       # add a new pair
del ages["Grace"]        # remove a pair
print(ages)              # {'Ada': 37, 'Alan': 41, 'Linus': 52}

print(ages["Nobody"])    # KeyError: the key doesn't exist`;

export const metadata = {
  title: "Dictionaries — loop",
  description:
    "A dictionary maps keys to values, so you look things up by a meaningful name instead of a numeric position. Add, change and remove pairs.",
};

export default function Page() {
  return (
    <LessonShell slug="dictionaries">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Lists and tuples find things by <em>position</em>. A{" "}
        <strong className="text-foreground">dictionary</strong>{" "}finds them by{" "}
        <strong className="text-foreground">name</strong>. Each entry is a{" "}
        <strong className="text-foreground">key</strong>{" "}paired with a{" "}
        <strong className="text-foreground">value</strong>, written{" "}
        <span className="font-mono text-foreground">key: value</span>{" "}inside curly
        braces — and you reach a value by handing over its key.
      </p>

      <DictLookup />

      <p className="leading-relaxed text-muted">
        That&apos;s the whole idea:{" "}
        <span className="font-mono text-foreground">ages[&quot;Alan&quot;]</span>{" "}
        goes straight to Alan&apos;s value, no counting required. Keys are usually
        strings (they must be unique and immutable — a string or a tuple works, a
        list does not), and the values can be anything at all.
      </p>

      <PyodideRunner initialCode={DICT_CODE} />

      <p className="leading-relaxed text-muted">
        Assigning to a key either <strong className="text-foreground">changes</strong>{" "}
        it if it exists or <strong className="text-foreground">adds</strong>{" "}it if
        it doesn&apos;t, and <span className="font-mono text-accent">del</span>{" "}
        removes a pair. The one sharp edge: asking for a key that isn&apos;t there
        raises a <span className="font-mono text-danger">KeyError</span>{" "}— which is
        exactly what the dictionary methods coming next help you avoid.
      </p>
    </LessonShell>
  );
}
