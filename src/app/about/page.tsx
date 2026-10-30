import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, Rule, Words } from "@/components/Reveal";
import { about, booth, site } from "@/lib/site";

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
            <h2 className="u-label text-mute">The photo booth</h2>
            <p className="u-display mt-5 text-5xl">from {booth.from}</p>
            <p className="text-ink-2 mt-4 max-w-sm leading-relaxed">{booth.detail}</p>
            <p className="mt-8">
              <a href={site.phoneHref} className="u-label u-link">
                {site.phone}
              </a>
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
