import Hero from "@/components/sections/Hero";
import Flick from "@/components/Flick";
import AboutTeaser from "@/components/sections/AboutTeaser";
import { events, weddings } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      <Flick
        id="weddings"
        eyebrow={`${weddings.length} weddings`}
        heading="Weddings"
        frames={weddings.map((w) => ({
          slug: w.slug,
          title: w.title,
          img: w.img,
          meta: [w.venue, w.place].filter(Boolean).join(", "),
        }))}
        base="/weddings"
      />

      <Flick
        id="events"
        eyebrow="Everything else"
        heading="Events and portraits"
        frames={events.map((e) => ({
          slug: e.slug,
          title: e.title,
          img: e.img,
          meta: e.note,
        }))}
        base="/events"
      />

      <AboutTeaser />
    </>
  );
}
