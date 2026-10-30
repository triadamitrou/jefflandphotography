import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { intro, site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[94svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/hero.jpg"
          alt="A bride and groom photographed from above on a spiral staircase"
          fill
          priority
          sizes="100vw"
          className="scale-[1.04] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="u-wrap pb-14 text-white lg:pb-20">
        <Reveal mode="fade" className="u-display text-[16vw] leading-[0.9] sm:text-[11vw] lg:text-[8.5vw]">
          {site.name}
        </Reveal>

        <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <Reveal mode="rise" delay={320} className="max-w-xl">
            <p className="u-label opacity-70">
              {site.role} &middot; {site.base}
            </p>
            <p className="mt-4 text-base leading-relaxed opacity-90 sm:text-lg">{intro}</p>
          </Reveal>

          <Reveal mode="rise" delay={460} className="flex flex-wrap items-center gap-6">
            <Link href="/#weddings" className="u-label u-link">
              See the weddings
            </Link>
            <a href={site.phoneHref} className="u-label u-link opacity-80">
              {site.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
