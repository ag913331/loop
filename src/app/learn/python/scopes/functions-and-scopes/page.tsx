import LessonShell from "@/components/LessonShell";
import Scope from "@/components/Scope";
import PyodideRunner from "@/components/PyodideRunner";

const LOCAL_CODE = `def play():
    bonus = 10           # local — born here, dies when play() ends
    print("inside:", bonus)

play()
print(bonus)             # NameError: bonus doesn't exist out here`;

const READ_CODE = `score = 100              # a global variable

def show():
    # play can READ score without doing anything special
    print("score is", score)

show()                   # score is 100

def shadow():
    score = 0            # a NEW local, just for this function
    print("local score:", score)

shadow()                 # local score: 0
print("global score:", score)   # global score: 100  (unchanged)`;

export const metadata = {
  title: "Functions and scopes — loop",
  description:
    "A variable's scope is where it can be seen. Names created inside a function are local; globals can be read from inside, but a local of the same name shadows them.",
};

export default function Page() {
  return (
    <LessonShell slug="functions-and-scopes">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Every variable has a <strong className="text-foreground">scope</strong>:
        the part of your program where that name actually exists. The big rule for
        functions is simple — a variable you create{" "}
        <em>inside</em>{" "}a function is <strong className="text-foreground">local</strong>.
        It&apos;s born when the function runs and vanishes the instant it returns,
        and the outside world can never see it.
      </p>

      <Scope />

      <p className="leading-relaxed text-muted">
        That&apos;s why reaching for a function&apos;s local variable from outside
        is a <span className="font-mono text-danger">NameError</span>{" "}— by then it
        no longer exists. Locals keep functions self-contained: two functions can
        each have a variable called <span className="font-mono text-foreground">i</span>{" "}
        without ever colliding.
      </p>

      <PyodideRunner initialCode={LOCAL_CODE} />

      <p className="leading-relaxed text-muted">
        Variables defined at the top level of your file are{" "}
        <strong className="text-foreground">global</strong>, and a function{" "}
        <em>can</em>{" "}read them freely. But watch the catch: if a function{" "}
        <strong className="text-foreground">assigns</strong>{" "}to a name, Python
        treats that name as a brand-new local for the whole function — a local that{" "}
        <strong className="text-foreground">shadows</strong>{" "}the global and leaves
        the global untouched.
      </p>

      <PyodideRunner initialCode={READ_CODE} />

      <p className="leading-relaxed text-muted">
        So reading a global is easy; <em>changing</em>{" "}one from inside a function
        takes a deliberate extra step. That step is the{" "}
        <span className="font-mono text-accent">global</span>{" "}keyword — next.
      </p>
    </LessonShell>
  );
}
