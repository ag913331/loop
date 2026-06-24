import LessonShell from "@/components/ui/LessonShell";
import Grid2D from "@/components/python/Grid2D";
import PyodideRunner from "@/components/python/PyodideRunner";

const BUILD_CODE = `# a 3x4 grid: 3 rows, each a list of 4 numbers
grid = [
    [1,  2,  3,  4],
    [5,  6,  7,  8],
    [9, 10, 11, 12],
]

print(grid[1])      # the whole second row -> [5, 6, 7, 8]
print(grid[1][2])   # row 1, column 2      -> 7

grid[1][2] = 99     # change one cell
print(grid[1])      # [5, 6, 99, 8]`;

const COMP_CODE = `# build a 3x4 grid of zeros with a comprehension
rows, cols = 3, 4
grid = [[0 for c in range(cols)] for r in range(rows)]

# fill it: each cell = row number x column number
for r in range(rows):
    for c in range(cols):
        grid[r][c] = r * c

for row in grid:
    print(row)`;

const PITFALL_CODE = `# CAREFUL: this looks right but is a trap
grid = [[0] * 3] * 2     # two references to the SAME inner row!
grid[0][0] = 1
print(grid)              # [[1, 0, 0], [1, 0, 0]]  -- both changed!

# the comprehension makes independent rows
grid = [[0] * 3 for _ in range(2)]
grid[0][0] = 1
print(grid)              # [[1, 0, 0], [0, 0, 0]]  -- correct`;

export const metadata = {
  title: "Two-dimensional arrays — loop",
  description:
    "Model a grid as a list of rows. Index it with [row][column], build it with a comprehension, and avoid the shared-row trap.",
};

export default function Page() {
  return (
    <LessonShell slug="two-dimensional-arrays">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Put lists inside a list and you get a{" "}
        <strong className="text-foreground">two-dimensional array</strong>{" "}— a
        grid. Think of the outer list as the{" "}
        <strong className="text-foreground">rows</strong>, and each inner list as
        the cells across one row. A chessboard, a spreadsheet, a game of
        tic-tac-toe: all of them are just a list of rows.
      </p>

      <p className="leading-relaxed text-muted">
        Reading a cell is a two-step move:{" "}
        <span className="font-mono text-foreground">grid[1]</span>{" "}picks the row,
        then <span className="font-mono text-foreground">[2]</span>{" "}picks the
        column within it. Watch the two steps happen.
      </p>

      <Grid2D />

      <p className="leading-relaxed text-muted">
        So <span className="font-mono text-foreground">grid[row][col]</span>{" "}— row
        first, then column. Assigning works the same way:{" "}
        <span className="font-mono text-foreground">grid[1][2] = 99</span>{" "}changes
        exactly one cell.
      </p>

      <PyodideRunner initialCode={BUILD_CODE} />

      <p className="leading-relaxed text-muted">
        You rarely type a grid out by hand. A{" "}
        <strong className="text-foreground">nested comprehension</strong>{" "}builds
        one at any size, and two nested{" "}
        <span className="font-mono text-accent">for</span>{" "}loops are the natural
        way to walk every cell.
      </p>

      <PyodideRunner initialCode={COMP_CODE} />

      <p className="leading-relaxed text-muted">
        One trap to remember from the references lesson:{" "}
        <span className="font-mono text-foreground">[[0] * 3] * 2</span>{" "}does{" "}
        <em>not</em>{" "}make two rows — it makes two references to the{" "}
        <strong className="text-foreground">same</strong>{" "}row, so editing one
        edits both. The comprehension gives each row its own list. Run this to see
        the difference.
      </p>

      <PyodideRunner initialCode={PITFALL_CODE} />
    </LessonShell>
  );
}
