import LessonShell from "@/components/LessonShell";
import Grid3D from "@/components/Grid3D";
import PyodideRunner from "@/components/PyodideRunner";

const CUBE_CODE = `# weekly temperatures: 3 weeks x 7 days x 24 hours
# temps[week][day][hour]
weeks, days, hours = 3, 7, 24
temps = [[[0.0 for h in range(hours)]
              for d in range(days)]
              for w in range(weeks)]

# record a reading: week 1, day 0, hour 12
temps[1][0][12] = 21.5

print(temps[1][0][12])      # 21.5
print(len(temps))           # 3  weeks
print(len(temps[0]))        # 7  days
print(len(temps[0][0]))     # 24 hours`;

const WALK_CODE = `# a 2-layer, 2x2 game state, and how to total it
cube = [
    [[1, 2], [3, 4]],     # layer 0
    [[5, 6], [7, 8]],     # layer 1
]

total = 0
for layer in cube:
    for row in layer:
        for value in row:
            total += value

print("sum of every cell:", total)   # 36`;

export const metadata = {
  title: "Multidimensional lists — loop",
  description:
    "Nest lists as deep as you like. Three dimensions and beyond, with real-world uses like grids of readings, and the loops that walk them.",
};

export default function Page() {
  return (
    <LessonShell slug="multidimensional-lists">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Here&apos;s the beautiful part: nothing stops at two dimensions. If a row
        can be a list, and a grid can be a list of rows, then a{" "}
        <strong className="text-foreground">stack of grids</strong>{" "}is just a list
        of grids. Each extra <span className="font-mono text-foreground">[ ]</span>{" "}
        you add is one more dimension — one more list wrapped around the last.
      </p>

      <Grid3D />

      <p className="leading-relaxed text-muted">
        Reading a value follows the layers from the outside in:{" "}
        <span className="font-mono text-foreground">cube[1]</span>{" "}picks a layer,{" "}
        <span className="font-mono text-foreground">cube[1][0]</span>{" "}a row in it,{" "}
        <span className="font-mono text-foreground">cube[1][0][2]</span>{" "}a single
        cell. The pattern never changes — you just chain one more index per
        dimension.
      </p>

      <p className="leading-relaxed text-muted">
        Why bother? Because real data has shape. Think of a month of hourly
        temperatures (<span className="font-mono text-foreground">week</span>,{" "}
        <span className="font-mono text-foreground">day</span>,{" "}
        <span className="font-mono text-foreground">hour</span>), the cells of a
        3-D game world, or a stack of image layers. A comprehension builds the
        whole structure at once.
      </p>

      <PyodideRunner initialCode={CUBE_CODE} />

      <p className="leading-relaxed text-muted">
        And to visit <em>every</em>{" "}value, you nest one loop per dimension —
        three dimensions, three <span className="font-mono text-accent">for</span>{" "}
        loops. It looks like a lot, but it&apos;s the same idea from the very first
        list, repeated.
      </p>

      <PyodideRunner initialCode={WALK_CODE} />

      <p className="leading-relaxed text-muted">
        That&apos;s the whole of lists, start to finish: one box, a row of boxes, a
        grid, and a structure of any depth you need — all from the same simple
        idea of putting values, and lists, inside a list.
      </p>
    </LessonShell>
  );
}
