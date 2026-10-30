import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, Rule, Words } from "@/components/Reveal";
import { about, approach, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} | ${site.full}`,
  description: about.standfirst,
};

export default function About() {
  return (
    <>
      <section className="u-wrap pt-28 pb-16 lg:pt-36 lg:pb-20">
        <Reveal as="p" mode="fade" className="u-label text-mute">
          About
        </Reveal>
        <Words
          text={about.heading}
          as="h1"
          className="u-display mt-5 text-[3rem] sm:text-7xl lg:text-8xl"
          delay={60}
        />
        <Reveal
          as="p"
          mode="rise"
          delay={240}
          className="text-ink-2 mt-8 max-w-2xl text-xl leading-relaxed"
        >
          {about.standfirst}
        </Reveal>
        <Rule delay={420} className="mt-12" />
      </section>

      <section className="u-wrap pb-20">
        <Reveal as="h2" mode="rise" className="u-label text-mute">
          {approach.heading}
        </Reveal>
        <Reveal
          as="p"
          mode="rise"
          delay={80}
          className="u-display mt-6 max-w-4xl text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-5xl"
        >
          {approach.lead}
        </Reveal>
        {/* These five run in the order a day does, so they are set as a
            numbered sequence rather than a grid of equal blocks. The
            numeral gives the eye somewhere to land, the headings line up
            in one column to be read straight down on their own, and the
            prose sits at full body weight instead of muted grey. */}
        <ol className="mt-14 lg:mt-16">
          {approach.points.map((pt, i) => (
            <Reveal
              key={pt.h}
              as="li"
              mode="rise"
              delay={120 + i * 70}
              className="border-line grid gap-x-8 gap-y-2.5 border-t py-7 last:border-b sm:grid-cols-[3rem_1fr] lg:grid-cols-[4rem_17rem_1fr] lg:gap-x-12 lg:py-9"
            >
              <span
                aria-hidden
                className="u-display text-mute/55 text-[2.25rem] leading-none lg:text-[2.75rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="u-display text-[1.6rem] leading-tight sm:text-[1.75rem]">
                {pt.h}
              </h3>
              <p className="text-ink-2 max-w-prose leading-relaxed sm:col-start-2 lg:col-start-3 lg:row-start-1">
                {pt.p}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="u-wrap grid gap-12 pb-20 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
        <div className="space-y-12">
          {about.story.map((s, i) => (
            <Reveal key={s.h} mode="rise" delay={i * 90}>
              <h2 className="u-display text-3xl sm:text-4xl">{s.h}</h2>
              <div className="mt-5 max-w-xl space-y-4">
                {s.p.map((p) => (
                  <p key={p.slice(0, 24)} className="text-ink-2 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="space-y-5">
          <Reveal mode="tile">
            <div className="bg-wall-2 relative aspect-[3/4] overflow-hidden">
              <Image
                src={about.portrait}
                alt="Jeff Land working at an event, a camera in each hand"
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal mode="tile" delay={120}>
            <div className="bg-wall-2 relative aspect-[4/3] overflow-hidden">
              <Image
                src={about.booth}
                alt="Jeff Land in his own photo booth"
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="u-wrap pb-24 lg:pb-32">
        <Rule className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal mode="rise">
            <h2 className="u-label text-mute">Away from the camera</h2>
            <ul className="mt-6 space-y-3">
              {about.likes.map((l) => (
                <li key={l} className="flex gap-4 text-lg tracking-[-0.01em]">
                  <span className="bg-ink mt-3.5 h-px w-5 shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal mode="rise" delay={140}>
            <h2 className="u-label text-mute">Get in touch</h2>
            <p className="u-display mt-5 text-4xl sm:text-5xl">{site.phone}</p>
            <p className="text-ink-2 mt-4 max-w-sm leading-relaxed">
              Based in {site.base}, covering {site.covers}, and further by
              arrangement.
            </p>
            <p className="mt-10">
              <Link href="/" className="u-label u-link text-mute">
                Back to the work
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
