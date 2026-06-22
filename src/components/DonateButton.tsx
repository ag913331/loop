"use client";

import { useState } from "react";

// ↓ Replace with your real donation link (Buy Me a Coffee / Ko-fi / GitHub Sponsors).
const DONATE_URL = "buymeacoffee.com/keeplooping";

/**
 * A donate call styled as Python: `donate()` reveals its returned value (❤️) on
 * hover — a wink at the print() lesson on effects vs. returned values — and pops
 * a floating heart when pressed. The `# returns ❤️` comment is always laid out
 * (just invisible) so the button never resizes on hover.
 */
export default function DonateButton() {
  const [hearts, setHearts] = useState<number[]>([]);

  const pop = () => {
    const id = Date.now();
    setHearts((h) => [...h, id]);
    setTimeout(() => setHearts((h) => h.filter((x) => x !== id)), 1000);
  };

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={pop}
      aria-label="Donate — buy me a coffee"
      className="group relative inline-flex cursor-pointer items-center rounded-xl border border-brand/40 bg-surface px-5 py-3 font-mono text-sm transition-transform duration-100 hover:bg-surface-2 active:scale-95"
    >
      <span className="text-brand">donate</span>
      <span className="text-foreground">()</span>
      <span className="ml-2 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        # returns&nbsp;❤️
      </span>

      {hearts.map((id) => (
        <span key={id} className="donate-heart text-lg" aria-hidden="true">
          ❤️
        </span>
      ))}
    </a>
  );
}
