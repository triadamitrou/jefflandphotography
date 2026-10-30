"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Mode = "rise" | "fade" | "words" | "tile" | "rule";

/**
 * One observer for the whole document: elements opt in with [data-reveal]
 * and are released once played, so nothing re-animates on the way back up.
 *
 * It also lights [data-neon] elements, which carry their own keyframes.
 */
function useRevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.hasAttribute("data-neon")) el.setAttribute("data-lit", "");
          else el.setAttribute("data-in", "");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document
        .querySelectorAll("[data-reveal]:not([data-in]), [data-neon]:not([data-lit])")
        .forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          io.observe(el);
        });
    };
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

export function RevealProvider() {
  useRevealObserver();
  return null;
}

export function Reveal({
  as: Tag = "div",
  mode = "rise",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  mode?: Mode;
  delay?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Tag
      data-reveal={mode}
      className={className}
      style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      {children}
    </Tag>
  );
}

/**
 * A hairline that draws itself across as it arrives.
 *
 * The scaling happens on the inner bar, never on the observed element: a
 * 1px-tall box with scaleX(0) has no area, the observer reads a ratio of
 * zero, and the rule never fires.
 */
export function Rule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <div
      data-reveal="rule"
      className={className}
      style={{ "--d": `${delay}ms` } as CSSProperties}
      suppressHydrationWarning
    >
      <i />
    </div>
  );
}

/** Words climb into view one after another rather than all at once. */
export function Words({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 46,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag data-reveal="words" className={className} suppressHydrationWarning>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} style={{ transitionDelay: `${delay + i * stagger}ms` }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Translates its children against the scroll at a fraction of page speed. */
export function Parallax({
  speed = 0.1,
  className = "",
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const tick = () => {
      if (visible) {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(2)}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
