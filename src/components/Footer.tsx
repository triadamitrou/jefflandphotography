import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-line border-t">
      <div className="u-wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-18">
        <div>
          <p className="u-display text-2xl leading-none tracking-[-0.025em]">{site.full}</p>
          <p className="text-mute mt-3 text-sm">
            {site.role}
            <br />
            {site.base}, covering {site.covers}
          </p>
        </div>

        <div>
          <p className="u-label text-mute">Enquiries</p>
          <p className="mt-3.5 text-lg tracking-[-0.02em]">
            <a href={site.phoneHref} className="u-link">
              {site.phone}
            </a>
          </p>
        </div>

        <div>
          <p className="u-label text-mute">Pages</p>
          <ul className="mt-3.5 space-y-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.label} className={n.ready ? "" : "text-mute"}>
                {n.ready ? (
                  <a href={n.href} className="u-link">
                    {n.label}
                  </a>
                ) : (
                  n.label
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="u-label text-mute">Photographing since</p>
          <p className="u-display mt-3 text-4xl">{site.since}</p>
          <p className="text-mute mt-2 text-sm">Full time since {site.fullTimeSince}</p>
        </div>
      </div>
    </footer>
  );
}
