import LessonShell from "@/components/LessonShell";
import ListReference from "@/components/ListReference";
import PyodideRunner from "@/components/PyodideRunner";

const SURPRISE_CODE = `list_1 = [1]
list_2 = list_1     # copies the NAME, not the contents

list_1[0] = 2       # change list_1's only element

print(list_2)       # surprise: [2], not [1]`;

const FIX_CODE = `list_1 = [1]
list_2 = list_1[:]      # a slice makes a real, separate copy

list_1[0] = 2           # only list_1 changes now

print(list_1)           # [2]
print(list_2)           # [1]  -- untouched

# list() and .copy() do the same job:
a = [1, 2, 3]
b = list(a)
c = a.copy()
a[0] = 99
print(b, c)             # [1, 2, 3] [1, 2, 3]`;

export const metadata = {
  title: "Lists are references — loop",
  description:
    "The surprise that bites everyone: list_2 = list_1 copies the name, not the list. Both names point at the same memory — and how to make a real copy.",
};

export default function Page() {
  return (
    <LessonShell slug="list-references">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s one feature of lists that surprises almost everyone — and it&apos;s
        worth memorising, because forgetting it causes bugs that are genuinely
        hard to track down. Look at this little program: it makes a one-element
        list <span className="font-mono text-foreground">list_1</span>, assigns it
        to <span className="font-mono text-foreground">list_2</span>, changes{" "}
        <span className="font-mono text-foreground">list_1</span>, and prints{" "}
        <span className="font-mono text-foreground">list_2</span>.
      </p>

      <p className="leading-relaxed text-muted">
        You&apos;d expect <span className="font-mono text-foreground">list_2</span>{" "}
        to still be <span className="font-mono text-foreground">[1]</span>. It
        isn&apos;t — it prints <span className="font-mono text-brand">[2]</span>.
        Watch why.
      </p>

      <ListReference />

      <p className="leading-relaxed text-muted">
        Lists (and most other complex Python values) are stored differently from
        ordinary scalar variables like numbers. The key idea:
      </p>

      <ul className="ml-5 list-disc space-y-1 leading-relaxed text-muted marker:text-muted">
        <li>
          the name of an ordinary variable is the name of its{" "}
          <strong className="text-foreground">content</strong>;
        </li>
        <li>
          the name of a list is the name of a{" "}
          <strong className="text-foreground">memory location</strong>{" "}where the
          list is stored.
        </li>
      </ul>

      <p className="leading-relaxed text-muted">
        Read those two lines once more — the difference is everything. So{" "}
        <span className="font-mono text-foreground">list_2 = list_1</span>{" "}copies
        the <em>name</em>{" "}of the list, not its contents. Afterwards both names
        identify the same spot in memory: change one and you&apos;ve changed the
        other, and vice versa. We call this an{" "}
        <strong className="text-foreground">alias</strong>.
      </p>

      <PyodideRunner initialCode={SURPRISE_CODE} />

      <p className="leading-relaxed text-muted">
        So how do you cope with it when you genuinely want a separate copy? Make
        one explicitly. The simplest way is a{" "}
        <strong className="text-foreground">slice of the whole list</strong>,{" "}
        <span className="font-mono text-foreground">list_1[:]</span>, which builds
        a brand-new list with the same values.{" "}
        <span className="font-mono text-foreground">list(list_1)</span>{" "}and{" "}
        <span className="font-mono text-foreground">list_1.copy()</span>{" "}do the
        same thing.
      </p>

      <PyodideRunner initialCode={FIX_CODE} />

      <p className="leading-relaxed text-muted">
        That <span className="font-mono text-foreground">[:]</span>{" "}trick is your
        first taste of <strong className="text-foreground">slicing</strong>{" "}— and
        slicing turns out to be one of the most useful things you can do to a
        list. That&apos;s next.
      </p>
    </LessonShell>
  );
}
