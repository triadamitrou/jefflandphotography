import { Reveal } from "@/components/Reveal";

/** How couples and guests describe him, set as a wall of words. */
const words = [
  "Fun", "Friendly", "Relaxed", "Creative", "Thoughtful",
  "Full of ideas", "Organised", "Never stops", "Like one of the guests",
];

export default function Said() {
  return (
    <section className="u-wrap py-20 lg:py-28">
      <Reveal as="p" mode="fade" className="u-label text-mute">
        What people say
      </Reveal>
      <ul className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-2.5">
        {words.map((w, i) => (
          <Reveal
            key={w}
            as="li"
            mode="rise"
            delay={i * 70}
            className="u-display text-[2rem] leading-tight sm:text-5xl lg:text-6xl"
          >
            {w}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
