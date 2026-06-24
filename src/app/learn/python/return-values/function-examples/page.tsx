import LessonShell from "@/components/ui/LessonShell";
import PyodideRunner from "@/components/python/PyodideRunner";

const LEAP_CODE = `# A leap year: divisible by 4, but NOT by 100 unless also by 400.
def is_leap(year):
    if year % 4 != 0:
        return False
    if year % 100 != 0:
        return True
    return year % 400 == 0

for y in [1900, 2000, 2024, 2023]:
    print(y, "->", is_leap(y))
# 1900 False, 2000 True, 2024 True, 2023 False`;

const DAYS_CODE = `def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def days_in_month(year, month):
    if month == 2:
        return 29 if is_leap(year) else 28
    if month in (4, 6, 9, 11):
        return 30
    return 31

print(days_in_month(2024, 2))    # 29 (leap)
print(days_in_month(2023, 2))    # 28
print(days_in_month(2024, 4))    # 30`;

const DOY_CODE = `def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

def days_in_month(year, month):
    if month == 2:
        return 29 if is_leap(year) else 28
    if month in (4, 6, 9, 11):
        return 30
    return 31

# Add up whole months before this one, then add the day.
def day_of_year(year, month, day):
    total = day
    for m in range(1, month):
        total += days_in_month(year, m)
    return total

print(day_of_year(2024, 3, 1))    # 61  (31 + 29 + 1)
print(day_of_year(2023, 12, 31))  # 365`;

const PRIME_CODE = `# Prime: a whole number > 1 with no divisors but 1 and itself.
def is_prime(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:        # only test up to the square root
        if n % d == 0:
            return False
        d += 1
    return True

print(is_prime(7), is_prime(8))   # True False
print([n for n in range(2, 30) if is_prime(n)])`;

const FUEL_CODE = `# US miles-per-gallon <-> European litres-per-100km.
def l100km_to_mpg(liters):
    return 235.215 / liters

def mpg_to_l100km(mpg):
    return 235.215 / mpg

print(round(l100km_to_mpg(8), 1))    # ~29.4 mpg
print(round(mpg_to_l100km(30), 1))   # ~7.8 L/100km`;

export const metadata = {
  title: "Examples: writing real functions — loop",
  description:
    "Five worked functions that return results: leap year, days in a month, day of the year, prime testing, and fuel-consumption conversion.",
};

export default function Page() {
  return (
    <LessonShell slug="function-examples">
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Time to put it together. Each of these is a small function that{" "}
        <strong className="text-foreground">returns</strong>{" "}a result you can use
        elsewhere — and several build on each other, which is decomposition in
        action. Read each one, predict the output, then run it.
      </p>

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">1. A leap year.</strong>{" "}A clean use of
        early returns to express a slightly fiddly rule one step at a time.
      </p>

      <PyodideRunner initialCode={LEAP_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">2. How many days in a month.</strong>{" "}
        This one <em>calls</em>{" "}
        <span className="font-mono text-foreground">is_leap</span>{" "}— a function
        using another function, exactly as intended.
      </p>

      <PyodideRunner initialCode={DAYS_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">3. Day of the year.</strong>{" "}Built on
        top of <span className="font-mono text-foreground">days_in_month</span>:
        sum the whole months before this one, then add the day. Three small
        functions, stacked.
      </p>

      <PyodideRunner initialCode={DOY_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">4. Prime numbers.</strong>{" "}A{" "}
        <span className="font-mono text-foreground">True</span>/
        <span className="font-mono text-foreground">False</span>{" "}function, then a
        comprehension that uses it to collect every prime below 30.
      </p>

      <PyodideRunner initialCode={PRIME_CODE} />

      <p className="leading-relaxed text-muted">
        <strong className="text-foreground">5. Converting fuel consumption.</strong>{" "}
        Two tiny functions that turn a number into another number — the everyday
        bread and butter of returning results. (Using US gallons.)
      </p>

      <PyodideRunner initialCode={FUEL_CODE} />

      <p className="leading-relaxed text-muted">
        Notice the pattern across all five: take some inputs, compute, and{" "}
        <span className="font-mono text-accent">return</span>{" "}the answer — never
        just print it. A function that returns its result can be reused, combined,
        and tested. That&apos;s the whole point. Next in this module: bundling
        several values together with tuples and dictionaries.
      </p>
    </LessonShell>
  );
}
