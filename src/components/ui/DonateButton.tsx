"use client";

import { useState } from "react";
import Image from "next/image";

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=FC874VE9PNS4Q";

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
      aria-label="Donate via PayPal"
      className="group relative inline-flex cursor-pointer items-center rounded-xl border border-brand/40 bg-surface px-5 py-3 font-mono text-sm transition-transform duration-100 hover:bg-surface-2 active:scale-95"
    >
      {/* the broke-dog meme, revealed on hover (and on keyboard focus) */}
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
        <span className="block w-56 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-xl shadow-black/40">
          <span className="relative block h-52 w-full overflow-hidden rounded-lg">
            <Image
              src="/donation-image.jpg"
              alt="A sad dog holding out an empty wallet"
              fill
              sizes="224px"
              className="object-cover"
            />
          </span>
          <span className="block px-1 py-1.5 text-center font-sans text-xs text-muted">
            the wallet&apos;s empty — every tip helps 🙏
          </span>
        </span>
      </span>

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
