"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

/**
 * Nav sits top left, as on a gallery wall label. Sections that are not
 * built yet are rendered in the same type as the rest, so the shape of the
 * site reads correctly, but they are not links and go nowhere.
 */
export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-wall/88 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="u-wrap flex h-16 items-center justify-between gap-6">
        {/* His own monogram, the mark alone with the wordmark left off, cut
            from the 512px icon on his site to a transparent circle so the
            wall shows through instead of a white square. */}
        <Link href="/" aria-label={`${site.full}, home`} className="shrink-0">
          <Image
            src="/img/jl-mark.png"
            alt=""
            width={496}
            height={496}
            priority
            className="h-9 w-9 transition-opacity duration-400 hover:opacity-80"
          />
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          {nav.map((item) =>
            item.ready ? (
              <Link
                key={item.label}
                href={item.href}
                className="u-label text-ink-2 hover:text-ink transition-colors duration-400"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.label}
                aria-disabled="true"
                className="u-label text-mute hidden cursor-default sm:inline"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
