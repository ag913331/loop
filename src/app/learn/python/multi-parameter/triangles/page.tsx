import LessonShell from "@/components/ui/LessonShell";
import TriangleCheck from "@/components/python/TriangleCheck";
import PyodideRunner from "@/components/python/PyodideRunner";

const VALID_CODE = `def is_triangle(a, b, c):
    return a + b > c and a + c > b and b + c > a

print(is_triangle(3, 4, 5))    # True
print(is_triangle(1, 1, 5))    # False  (1 + 1 is not > 5)`;

const AREA_CODE = `def is_triangle(a, b, c):
    return a + b > c and a + c > b and b + c > a

def area(a, b, c):
    # Heron's formula
    s = (a + b + c) / 2
    return (s * (s - a) * (s - b) * (s - c)) ** 0.5

if is_triangle(3, 4, 5):
    print("area:", area(3, 4, 5))   # 6.0
else:
    print("not a triangle")`;

export const metadata = {
  title: "Triangles — loop",
  description:
    "A three-parameter function: given three side lengths, decide whether they form a triangle (the triangle inequality), then compute its area.",
};

export default function Page() {
  return (
    <LessonShell slug="triangles">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s a function with <strong className="text-foreground">three</strong>{" "}
        parameters — three side lengths — and a real question to answer:{" "}
        <em>do these sides actually form a triangle?</em>{" "}The rule is the{" "}
        <strong className="text-foreground">triangle inequality</strong>: each side
        must be shorter than the sum of the other two. All three checks have to
        hold.
      </p>

      <TriangleCheck />

      <p className="leading-relaxed text-muted">
        That &ldquo;all three must hold&rdquo; is exactly what{" "}
        <span className="font-mono text-accent">and</span>{" "}is for. The function
        combines the three comparisons into one Boolean and{" "}
        <span className="font-mono text-accent">return</span>s it — a clean{" "}
        <span className="font-mono text-foreground">True</span>{" "}or{" "}
        <span className="font-mono text-foreground">False</span>.
      </p>

      <PyodideRunner initialCode={VALID_CODE} />

      <p className="leading-relaxed text-muted">
        Once you know the sides <em>do</em>{" "}make a triangle, a second
        three-parameter function can find its area with{" "}
        <strong className="text-foreground">Heron&apos;s formula</strong>. Notice
        the pattern again: check first, then compute — two small functions, each
        with a single clear job.
      </p>

      <PyodideRunner initialCode={AREA_CODE} />

      <p className="leading-relaxed text-muted">
        From here the problems get more mathematical — and introduce a pattern of
        their own. First up: factorials.
      </p>
    </LessonShell>
  );
}
