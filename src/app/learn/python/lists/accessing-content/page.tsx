import LessonShell from "@/components/ui/LessonShell";
import ListMutate from "@/components/python/ListMutate";
import PyodideRunner from "@/components/python/PyodideRunner";

const STARTER_CODE = `nums = [10, 20, 30, 40]

# read an element
print(nums[1])        # 20

# change it in place
nums[1] = 99
print(nums)           # [10, 99, 30, 40]

# useful helpers
print(len(nums))      # 4
print(30 in nums)     # True — is it there?`;

export const metadata = {
  title: "Reading and changing content — loop",
  description:
    "Read a list element by index, replace it in place, measure the list, and test membership with in.",
};

export default function Page() {
  return (
    <LessonShell slug="accessing-content">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Indexing isn&apos;t just for reading. Because lists are{" "}
        <strong className="text-foreground">mutable</strong>{" "}— changeable — you
        can also <em>assign</em>{" "}to a position and replace whatever&apos;s there.{" "}
        <span className="font-mono text-foreground">nums[1] = 99</span>{" "}swaps the
        second element for 99, in place, leaving everything else exactly as it
        was.
      </p>

      <ListMutate />

      <p className="leading-relaxed text-muted">
        That&apos;s a real difference from the values you&apos;ve met so far. A
        number or a string can&apos;t be changed — you can only make a new one.
        A list, though, is a container you can keep rearranging without giving it
        a new name.
      </p>

      <PyodideRunner initialCode={STARTER_CODE} />

      <p className="leading-relaxed text-muted">
        Two everyday helpers round this out:{" "}
        <span className="font-mono text-foreground">len(nums)</span>{" "}gives the
        number of items, and{" "}
        <span className="font-mono text-foreground">value in nums</span>{" "}answers a
        yes/no question — is that value anywhere in the list? — with a boolean.
        Both come up constantly. Next: making the list longer.
      </p>
    </LessonShell>
  );
}
