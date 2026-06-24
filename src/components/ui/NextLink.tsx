"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

/**
 * The "Next" pager link at the foot of a lesson. On click it marks the current
 * lesson complete (in addition to the manual MarkComplete button) and then
 * navigates on — so advancing through the course records progress automatically.
 * The `variant` switches between the plain next-lesson styling and the brand
 * "Section complete · Up next" styling used at the end of a section.
 */
export default function NextLink({
  href,
  eyebrow,
  title,
  language,
  slug,
  variant = "lesson",
}: {
  href: string;
  eyebrow: string;
  title: string;
  language: string;
  slug: string;
  variant?: "lesson" | "section";
}) {
  const { setDone } = useProgress();

  return (
    <Link
      href={href}
      onClick={() => setDone(language, slug, true)}
      className={`flex flex-1 flex-col items-end rounded-xl border bg-surface p-4 text-right transition-colors hover:bg-surface-2 ${
        variant === "section" ? "border-brand/40" : "border-border"
      }`}
    >
      <span
        className={`text-xs ${variant === "section" ? "text-brand" : "text-muted"}`}
      >
        {eyebrow}
      </span>
      <span className="mt-1 text-sm font-medium text-foreground">{title}</span>
    </Link>
  );
}
