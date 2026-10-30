import { words } from "@/lib/site";

/**
 * A banner of the words couples and guests use about him, running edge to
 * edge between the two strips. The list is doubled so the loop closes on
 * itself with no visible seam.
 */
export default function Said() {
  const run = [...words, ...words];
  return (
    <section className="u-marquee bg-ink text-wall py-7 lg:py-9" aria-label="What people say">
      <div className="u-marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {run.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="u-display px-7 text-4xl whitespace-nowrap sm:text-5xl lg:text-6xl">
                  {w}
                </span>
                <span className="bg-wall/40 h-1.5 w-1.5 shrink-0 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
