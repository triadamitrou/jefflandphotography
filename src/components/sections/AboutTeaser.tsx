import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal } from "@/components/Reveal";
import { about, site } from "@/lib/site";

export default function AboutTeaser() {
  return (
    <section className="u-wrap grid gap-12 py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-28">
      <div>
        <Reveal as="p" mode="fade" className="u-label text-mute">
          The photographer
        </Reveal>
        <Reveal
          as="h2"
          mode="rise"
          delay={60}
          className="u-display mt-5 text-[2.6rem] sm:text-6xl lg:text-7xl"
        >
          {about.heading}
        </Reveal>
        <Reveal as="p" mode="rise" delay={160} className="text-ink-2 mt-7 max-w-xl text-lg leading-relaxed">
          {about.standfirst}
        </Reveal>
        <Reveal mode="rise" delay={280} className="mt-9">
          <Link href="/about" className="u-label u-link">
            More about Jeff
          </Link>
        </Reveal>

        <Reveal mode="rise" delay={380} className="border-line mt-12 flex flex-wrap gap-10 border-t pt-8">
          <div>
            <p className="u-display text-4xl">{site.since}</p>
            <p className="u-label text-mute mt-2">Photographing weddings since</p>
          </div>
          <div>
            <p className="u-display text-4xl">{site.fullTimeSince}</p>
            <p className="u-label text-mute mt-2">Full time since</p>
          </div>
        </Reveal>
      </div>

      <Reveal mode="tile" className="relative">
        <div className="bg-wall-2 relative aspect-[4/5] overflow-hidden">
          <Parallax speed={0.05} className="absolute inset-[-6%]">
            <div className="relative h-full w-full">
              <Image
                src={about.portrait}
                alt="Jeff Land working at an event, a camera in each hand"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}
