"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";

export type Frame = {
  slug: string;
  title: string;
  img: string;
  note?: string;
  meta?: string;
};

/**
 * The filmstrip. A tall outer section holds a sticky stage, and the strip
 * inside is pushed sideways as that section scrolls past, so the frames
 * flick by one after another.
 *
 * The transform is written to the node from a rAF loop rather than held in
 * state: at sixty frames a second React would re-render the whole strip,
 * and the scroll would stutter on exactly the hardware least able to hide
 * it. The loop only runs while the section is on screen.
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
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = outer.current;
    const strip = track.current;
    if (!section || !strip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    if (reduced || coarse) return;

    let frame = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(section);

    const tick = () => {
      if (visible) {
        const travel = strip.scrollWidth - window.innerWidth;
        const span = section.offsetHeight - window.innerHeight;
        const past = -section.getBoundingClientRect().top;
        const p = span > 0 ? Math.min(1, Math.max(0, past / span)) : 0;
        strip.style.transform = `translate3d(${-(travel * p).toFixed(2)}px,0,0)`;

        // Mark whichever frames are actually in front of the reader, so the
        // rest can sit back without being hidden outright.
        const mid = window.innerWidth / 2;
        for (const el of strip.children) {
          const r = (el as HTMLElement).getBoundingClientRect();
          const near = r.left < mid + r.width && r.right > mid - r.width;
          if (near) (el as HTMLElement).setAttribute("data-near", "");
          else (el as HTMLElement).removeAttribute("data-near");
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  // Tall enough that each frame gets roughly three quarters of a screen.
  const height = `calc(100svh + ${Math.max(1, frames.length) * 62}vh)`;

  return (
    <section ref={outer} id={id} className="u-flick" style={{ height }}>
      <div className="u-flick-stage">
        <div className="u-wrap flex shrink-0 flex-wrap items-end justify-between gap-x-8 gap-y-2 pb-7">
          <h2 className="u-display text-[2.6rem] sm:text-6xl lg:text-7xl">{heading}</h2>
          <p className="u-label text-mute pb-2">{eyebrow}</p>
        </div>

        <div ref={track} className="u-flick-track">
          {frames.map((f, i) => (
            <figure key={f.slug} className="u-frame" data-near={i < 2 ? "" : undefined}>
              <Link href={`${base}/${f.slug}`} className="group block">
                <div className="bg-wall-2 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 80vw, 42vw"
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

        <div className="u-wrap text-mute shrink-0 pt-7 text-sm" style={{ "--d": "0ms" } as CSSProperties}>
          Scroll to move through them. Any frame opens the full set.
        </div>
      </div>
    </section>
  );
}
