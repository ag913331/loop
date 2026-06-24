import CoffeeInfinity from "@/components/ui/CoffeeInfinity";
import DonateButton from "@/components/ui/DonateButton";

// ↓ Replace with your repository URL.
const GITHUB_URL = "https://github.com/ag913331/loop";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-6 py-16 text-center">
        <CoffeeInfinity className="h-16 w-16" />

        <p className="max-w-xl leading-relaxed text-muted">
          <span className="brand-gradient font-semibold">loop</span> {" "}
          <span className="text-foreground">
            is free and open source — and always will be.
          </span>{" "}
          No VC, no trackers, no course upsell. Just one developer and a lot of
          coffee. If it helped you, a tip keeps the loop running.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <DonateButton />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            ⭐ Star on GitHub
          </a>
        </div>

        <p className="text-xs text-muted">
          © 2026 loop · made with ☕ · free &amp; open source
        </p>
      </div>
    </footer>
  );
}
