import LessonShell from "@/components/ui/LessonShell";
import NoneValue from "@/components/python/NoneValue";
import PyodideRunner from "@/components/python/PyodideRunner";

const NONE_CODE = `def log(msg):
    print(msg)            # an effect, but no return

x = log("hi")             # prints: hi
print(x)                  # None  <- what log handed back

# print() itself works the same way
y = print("again")        # prints: again
print(y)                  # None

# None is a real value you can test for
def find(seq, target):
    for item in seq:
        if item == target:
            return item
    # falls off the end with no return -> None

if find([1, 2, 3], 9) is None:
    print("not found")`;

export const metadata = {
  title: "The None value — loop",
  description:
    "When a function has no return, it hands back None — Python's way of saying 'nothing'. None is a real value you can store and test.",
};

export default function Page() {
  return (
    <LessonShell slug="the-none-value">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Every function call produces a result — even one that doesn&apos;t look
        like it returns anything. When a function reaches its end without a{" "}
        <span className="font-mono text-accent">return</span>{" "}value, Python quietly
        hands back a special value called{" "}
        <span className="font-mono text-foreground">None</span>:{" "}
        the official &ldquo;nothing here.&rdquo;
      </p>

      <NoneValue />

      <p className="leading-relaxed text-muted">
        This is exactly why <span className="font-mono text-foreground">print()</span>{" "}
        has an effect (text on screen) but its result is{" "}
        <span className="font-mono text-foreground">None</span>{" "}— and why{" "}
        <span className="font-mono text-foreground">x = print(&quot;hi&quot;)</span>{" "}
        leaves <span className="font-mono text-foreground">x</span>{" "}holding nothing
        useful. Seeing <span className="font-mono text-foreground">None</span>{" "}where
        you expected a value almost always means a function did its work but
        forgot to <span className="font-mono text-accent">return</span>{" "}the answer.
      </p>

      <PyodideRunner initialCode={NONE_CODE} />

      <p className="leading-relaxed text-muted">
        <span className="font-mono text-foreground">None</span>{" "}isn&apos;t an error
        — it&apos;s a genuine value you can store, pass around, and check for. The
        usual test is <span className="font-mono text-foreground">is None</span>{" "}
        (not <span className="font-mono text-foreground">== None</span>), which
        reads naturally and is the Pythonic way to ask &ldquo;did I get
        nothing?&rdquo;
      </p>
    </LessonShell>
  );
}
