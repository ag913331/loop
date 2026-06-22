import LessonShell from "@/components/LessonShell";
import BitMask from "@/components/BitMask";
import PyodideRunner from "@/components/PyodideRunner";

const STARTER_CODE = `flags = 0b0001     # bit 0 is on

# SET bit 2  -> use | with a mask
flags = flags | (1 << 2)
print(bin(flags))          # 0b101

# CHECK bit 2 -> use &
print((flags & (1 << 2)) != 0)   # True

# CLEAR bit 2 -> use & ~mask
flags = flags & ~(1 << 2)
print(bin(flags))          # back to 0b1

# FLIP bit 0 -> use ^
print(bin(flags ^ (1 << 0)))     # 0b0`;

export const metadata = {
  title: "Working with single bits — loop",
  description:
    "Use masks to check, set, clear and flip individual bits with the bitwise operators.",
};

export default function Page() {
  return (
    <LessonShell slug="working-with-bits">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The real power of bitwise operators is targeting <em>one</em>{" "}bit while
        leaving the rest alone. The tool for that is a{" "}
        <strong className="text-foreground">mask</strong>: a number with a single{" "}
        <span className="font-mono text-foreground">1</span>{" "}in the position you
        care about, built easily with a shift —{" "}
        <span className="font-mono text-foreground">1 &lt;&lt; n</span>{" "}puts a 1 in
        slot <span className="font-mono text-foreground">n</span>.
      </p>

      <BitMask />

      <p className="leading-relaxed text-muted">
        Pair a mask with the right operator and you get four precise moves on a
        single bit:
      </p>

      <ul className="ml-5 list-disc space-y-1 leading-relaxed text-muted">
        <li>
          <strong className="text-foreground">Set</strong>{" "}it to 1:{" "}
          <span className="font-mono text-foreground">x | (1 &lt;&lt; n)</span>
        </li>
        <li>
          <strong className="text-foreground">Check</strong>{" "}if it&apos;s 1:{" "}
          <span className="font-mono text-foreground">x &amp; (1 &lt;&lt; n)</span>
        </li>
        <li>
          <strong className="text-foreground">Clear</strong>{" "}it to 0:{" "}
          <span className="font-mono text-foreground">x &amp; ~(1 &lt;&lt; n)</span>
        </li>
        <li>
          <strong className="text-foreground">Flip</strong>{" "}it:{" "}
          <span className="font-mono text-foreground">x ^ (1 &lt;&lt; n)</span>
        </li>
      </ul>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        This is how a single integer can pack dozens of on/off{" "}
        <strong className="text-foreground">flags</strong>{" "}— one per bit — which is
        why bit masks show up in graphics, networking, hardware and file
        permissions. The last piece of the puzzle is the shift itself.
      </p>
    </LessonShell>
  );
}
