import LessonShell from "@/components/ui/LessonShell";
import GlobalKeyword from "@/components/python/GlobalKeyword";
import PyodideRunner from "@/components/python/PyodideRunner";

const GLOBAL_CODE = `x = 1

def without_global():
    x = 5            # makes a LOCAL x; the global is untouched

def with_global():
    global x         # "I mean the real, global x"
    x = 5            # now this changes the global

without_global()
print(x)             # 1

with_global()
print(x)             # 5`;

const BETTER_CODE = `# global works, but passing in and returning out is usually cleaner:
def bumped(value):
    return value + 1

x = 1
x = bumped(x)        # explicit: x is updated from the result
print(x)             # 2

# No hidden action-at-a-distance — you can see exactly what changes x.`;

export const metadata = {
  title: "The global keyword — loop",
  description:
    "By default a function can't reassign a global. The global keyword lets it — but passing values in and returning them out is usually the better design.",
};

export default function Page() {
  return (
    <LessonShell slug="the-global-keyword">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        We just saw that assigning to a name inside a function makes a{" "}
        <em>local</em>, leaving any global of the same name alone. Sometimes,
        though, you really do want a function to change a global. The{" "}
        <span className="font-mono text-accent">global</span>{" "}keyword tells Python
        exactly that:{" "}
        <span className="font-mono text-foreground">global x</span>{" "}means
        &ldquo;when I write <span className="font-mono text-foreground">x</span>,
        I mean the global one.&rdquo;
      </p>

      <GlobalKeyword />

      <p className="leading-relaxed text-muted">
        The difference is one line. Without{" "}
        <span className="font-mono text-accent">global</span>, the assignment stays
        trapped inside the function as a local. With it, the assignment reaches out
        and changes the variable everyone shares.
      </p>

      <PyodideRunner initialCode={GLOBAL_CODE} />

      <p className="leading-relaxed text-muted">
        A word of caution, though: <span className="font-mono text-accent">global</span>{" "}
        is best used sparingly. When a function quietly reaches out and rewrites
        shared state, your code becomes harder to follow and to debug — the value
        of <span className="font-mono text-foreground">x</span>{" "}can change for
        reasons you can&apos;t see at the call site.
      </p>

      <PyodideRunner initialCode={BETTER_CODE} />

      <p className="leading-relaxed text-muted">
        The cleaner habit, almost always, is the pattern from the last section:
        pass values <em>in</em>{" "}as arguments and hand results back{" "}
        <em>out</em>{" "}with <span className="font-mono text-accent">return</span>.
        Reach for <span className="font-mono text-accent">global</span>{" "}only when
        you have a genuine reason to.
      </p>
    </LessonShell>
  );
}
