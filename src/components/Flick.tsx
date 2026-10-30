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

/* Width of a frame at rest, and once it has been pushed aside, in vw. */
const FULL = 40;
const SLIVER = 2.2;
/* How many frames stay open at the end rather than collapsing. */
const KEEP = 1.7;

/**
 * The filmstrip. Frames do not slide past the edge: as the page scrolls
 * each one narrows to a sliver and piles up against the left, so the ones
 * already seen stay on screen as a stack of edges while the next opens.
 *
 * Nothing translates. The whole effect is the frames' own widths, which
 * means the stack pins itself to the left without any compensating offset.
 * Those widths are written to the nodes from a rAF loop rather than held
 * in state: at sixty frames a second React would re-render the strip and
 * the scroll would stutter.
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

    const items = Array.from(strip.children) as HTMLElement[];
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(section);

    const tick = () => {
      if (visible) {
        const span = section.offsetHeight - window.innerHeight;
        const past = -section.getBoundingClientRect().top;
        const p = span > 0 ? Math.min(1, Math.max(0, past / span)) : 0;

        // How far through the stack we are, counted in frames.
        const shut = p * Math.max(1, items.length - KEEP);

        for (let i = 0; i < items.length; i++) {
          const el = items[i];
          // 0 while open, 1 once fully folded away.
          const t = Math.min(1, Math.max(0, shut - i));
          const eased = t * t * (3 - 2 * t);
          el.style.width = `${(FULL + (SLIVER - FULL) * eased).toFixed(3)}vw`;
          el.style.setProperty("--shut", eased.toFixed(3));
          if (eased > 0.6) el.setAttribute("data-shut", "");
          else el.removeAttribute("data-shut");
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Tall enough that each frame gets roughly three quarters of a screen.
  const height = `calc(100svh + ${Math.max(1, frames.length) * 72}vh)`;

  return (
    <section ref={outer} id={id} className="u-flick" style={{ height }}>
      <div className="u-flick-stage">
        <div className="u-wrap flex shrink-0 flex-wrap items-end justify-between gap-x-8 gap-y-2 pb-7">
          <h2 className="u-display text-[2.6rem] sm:text-6xl lg:text-7xl">{heading}</h2>
          <p className="u-label text-mute pb-2">{eyebrow}</p>
        </div>

        <div ref={track} className="u-flick-track">
          {frames.map((f, i) => (
            <figure key={f.slug} className="u-frame">
              <Link href={`${base}/${f.slug}`} className="group block">
                <div className="bg-wall-2 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 80vw, 40vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    priority={i < 2}
                  />
                </div>
                <figcaption className="u-frame-cap mt-3.5">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-[1.0625rem] tracking-[-0.01em] whitespace-nowrap">
                      {f.title}
                    </span>
                    <span className="u-label text-mute shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  {(f.meta || f.note) && (
                    <span className="text-mute mt-1 block text-sm whitespace-nowrap">
                      {f.meta || f.note}
                    </span>
                  )}
                </figcaption>
              </Link>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
