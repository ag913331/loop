"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

/**
 * A pager link that marks the current lesson complete as the learner advances.
 * Used for the "Next →" and "Section complete" links in LessonShell; clicking it
 * records `completeSlug` as done (a synchronous localStorage write) and then
 * navigates. The "Previous" link is a plain Link and never marks anything.
 */
export default function ForwardLink({
  href,
  language,
  completeSlug,
  className,
  children,
}: {
  href: string;
  language: string;
  completeSlug: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { setDone } = useProgress();
  return (
    <Link
      href={href}
      onClick={() => setDone(language, completeSlug, true)}
      className={className}
    >
      {children}
    </Link>
  );
}
