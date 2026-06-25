import Link from "next/link";
import LoopMark from "@/components/ui/LoopMark";

/**
 * Slim sticky header present on every page. Its only job is the brand lockup
 * (infinity mark + "loop") linking home, so you can always get back to the
 * landing page — including from deep inside a lesson.
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center px-6 py-3">
        <Link
          href="/"
          aria-label="loop — home"
          className="group inline-flex items-center gap-2"
        >
          <span className="brand-gradient text-2xl font-bold tracking-tight">
            loop
          </span>
        </Link>
      </div>
    </header>
  );
}
