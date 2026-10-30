"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type Frame = {
  slug: string;
  title: string;
  img: string;
  note?: string;
  meta?: string;
};

/**
 * The filmstrip. Sideways scrolling moves through the photographs;
 * scrolling down moves down the page, as it would anywhere else.
 *
 * That separation is the whole design. Nothing is pinned and no scroll is
 * intercepted, so the rail is a plain overflow container the browser
 * drives: a trackpad swipe, shift and the wheel, a touch drag, or the
 * arrow keys once it has focus all work without any help from us.
 *
 * The only scripting is cosmetic. A listener marks whichever frames are
 * in front of the reader so the rest can sit back, and tracks how far
 * along the rail has travelled for the progress rule. Both are written
 * straight to the nodes, because at scroll frequency going through React
 * would re-render the strip for no benefit.
 */
export default function Flick({
  id,
  eyebrow,
  heading,
  frames,
  base,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  frames: Frame[];
  /* A path prefix rather than a builder function: this is a client
     component, and a function cannot cross that boundary. */
  base: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const strip = track.current;
    if (!strip) return;

    const dim = !window.matchMedia("(hover: none)").matches;
    let queued = false;

    const paint = () => {
      queued = false;
      const travel = strip.scrollWidth - strip.clientWidth;
      if (bar.current) {
        const p = travel > 0 ? strip.scrollLeft / travel : 0;
        bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0.04, p)).toFixed(3)})`;
      }
      if (!dim) return;
      const box = strip.getBoundingClientRect();
      for (const el of Array.from(strip.children) as HTMLElement[]) {
        const r = el.getBoundingClientRect();
        // Lit while any part of the frame is comfortably inside the rail.
        const inside = r.left < box.right - 60 && r.right > box.left + 60;
        if (inside) el.setAttribute("data-near", "");
        else el.removeAttribute("data-near");
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    paint();
    strip.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      strip.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id={id} className="u-flick py-16 lg:py-24">
      <div className="u-wrap flex flex-wrap items-end justify-between gap-x-8 gap-y-2 pb-7">
        <h2 className="u-display text-[2.6rem] sm:text-6xl lg:text-7xl">{heading}</h2>
        <p className="u-label text-mute pb-2">{eyebrow}</p>
      </div>

      <div
        ref={track}
        className="u-flick-track"
        tabIndex={0}
        role="region"
        aria-label={`${heading}, scroll sideways`}
      >
        {frames.map((f, i) => (
          <figure key={f.slug} className="u-frame" data-near={i < 3 ? "" : undefined}>
            <Link href={`${base}/${f.slug}`} className="group block">
              <div className="bg-wall-2 relative aspect-[4/3] overflow-hidden">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  sizes="(max-width: 640px) 80vw, 34vw"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  priority={i < 2}
                />
              </div>
              <figcaption className="mt-3.5 flex items-baseline justify-between gap-4">
                <span className="text-[1.0625rem] tracking-[-0.01em]">{f.title}</span>
                <span className="u-label text-mute shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
              {(f.meta || f.note) && (
                <p className="text-mute mt-1 text-sm">{f.meta || f.note}</p>
              )}
            </Link>
          </figure>
        ))}
        <div className="w-[var(--gutter)] shrink-0" aria-hidden />
      </div>

      <div className="u-wrap pt-9">
        <span className="u-flick-bar" aria-hidden>
          <span ref={bar} />
        </span>
      </div>
    </section>
  );
}
