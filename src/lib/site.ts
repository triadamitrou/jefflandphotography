/**
 * Everything this site knows, in one file.
 *
 * Sources, all read 29 October 2026, all from jefflandphotography.co.uk:
 *  - /about-me/ for the biography, the dates and the areas covered.
 *  - /photo-booth/ for the booth specification and its prices.
 *  - /event-photographer/ for the corporate and event work.
 *  - sitemap.xml for the photographs and their captions, 2,560 of them
 *    across 174 pages.
 *
 * The photographs are Jeff's own. This is a mock-up, so it carries noindex
 * and cannot surface in search beside the live site.
 */

export const site = {
  name: "Jeff Land",
  full: "Jeff Land Photography",
  role: "Wedding and event photographer",
  base: "Stratford-upon-Avon",
  covers: "Warwickshire and the Cotswolds",
  phone: "01789 550641",
  phoneHref: "tel:+441789550641",
  since: 2006,
  fullTimeSince: 2014,
  live: "https://jefflandphotography.co.uk",
};

/** Only About is built. The rest stand so the shape of the site is clear. */
export const nav = [
  { label: "Weddings", href: "/#weddings", ready: true },
  { label: "Events", href: "/#events", ready: true },
  { label: "About", href: "/about", ready: true },
  { label: "Photo booth", href: "/photo-booth", ready: false },
  { label: "Prices", href: "/prices", ready: false },
  { label: "Contact", href: "/contact", ready: false },
];

/**
 * Weddings, drawn from his blog. Each one links to its own story, which is
 * not built yet. Places are named only where his own captions name them.
 */
export const weddings = [
  {
    slug: "alveston-manor-sophie-and-tom",
    title: "Sophie and Tom",
    venue: "Alveston Manor",
    place: "Stratford-upon-Avon",
    img: "/img/w-alveston-sophie-tom.jpg",
    note: "A spring wedding under the cedar tree",
  },
  {
    slug: "st-andrews-and-alveston-pastures",
    title: "St Andrew's Church",
    venue: "Alveston Pastures Farm",
    place: "Stratford-upon-Avon",
    img: "/img/w-st-andrews.jpg",
    note: "Church in the morning, farm for the rest of it",
  },
  {
    slug: "the-welcombe-hotel",
    title: "The Welcombe Hotel",
    venue: "The Welcombe Hotel",
    place: "Stratford-upon-Avon",
    img: "/img/w-welcombe.jpg",
    note: "Formal gardens and a long terrace",
  },
  {
    slug: "ettington-park",
    title: "Ettington Park",
    venue: "Ettington Park Hotel",
    place: "",
    img: "/img/w-ettington.jpg",
    note: "Vows in the library room",
  },
  {
    slug: "gorcott-hall",
    title: "Gorcott Hall",
    venue: "Gorcott Hall",
    place: "Redditch",
    img: "/img/w-gorcott.jpg",
    note: "A timbered hall and a walled garden",
  },
  {
    slug: "warwick-castle",
    title: "Warwick Castle",
    venue: "Warwick Castle and The Warwick Arms",
    place: "Warwick",
    img: "/img/w-warwick-castle.jpg",
    note: "Arriving by horse and carriage",
  },
  {
    slug: "nuthurst-grange",
    title: "Nuthurst Grange",
    venue: "Nuthurst Grange",
    place: "",
    img: "/img/w-nuthurst.jpg",
    note: "Lit terraces after dark",
  },
  {
    slug: "manor-hill-house",
    title: "Manor Hill House",
    venue: "Manor Hill House",
    place: "",
    img: "/img/w-manor-hill.jpg",
    note: "An outdoor ceremony in the pavilion",
  },
  {
    slug: "hotel-indigo",
    title: "Hotel Indigo",
    venue: "Hotel Indigo",
    place: "Stratford-upon-Avon",
    img: "/img/w-hotel-indigo.jpg",
    note: "Getting ready in town",
  },
  {
    slug: "lord-leycester",
    title: "Lord Leycester",
    venue: "Lord Leycester Hospital and The Warwick Arms",
    place: "Warwick",
    img: "/img/w-lord-leycester.jpg",
    note: "Fourteenth century courtyards",
  },
  {
    slug: "mickleton-hills-farm",
    title: "Mickleton Hills Farm",
    venue: "Mickleton Hills Farm",
    place: "",
    img: "/img/w-mickleton.jpg",
    note: "A barn on the edge of the Cotswolds",
  },
  {
    slug: "the-barn-at-upcote",
    title: "The Barn at Upcote",
    venue: "The Barn at Upcote",
    place: "",
    img: "/img/w-upcote.jpg",
    note: "Cotswold stone and open fields",
  },
];

/** Everything that is not a wedding. */
export const events = [
  {
    slug: "corporate",
    title: "Corporate and conference",
    img: "/img/e-corporate.jpg",
    note: "Awards nights, trade shows, conferences, team days",
  },
  {
    slug: "parties",
    title: "Parties and celebrations",
    img: "/img/e-entertainers.jpg",
    note: "Anniversaries, proms, charity balls, lodge nights",
  },
  {
    slug: "photo-booth",
    title: "The photo booth",
    img: "/img/e-photo-booth.jpg",
    note: "Manned, open, built to fit the room, prints on the night",
  },
  {
    slug: "headshots",
    title: "Headshots and business portraits",
    img: "/img/e-headshots.jpg",
    note: "Studio or on location, single or a whole team",
  },
  {
    slug: "family",
    title: "Family portraits",
    img: "/img/e-family.jpg",
    note: "In the studio, at home, or out in the Warwickshire countryside",
  },
  {
    slug: "portraits",
    title: "Portraits",
    img: "/img/e-portrait.jpg",
    note: "Studio portraiture, one light and a lot of patience",
  },
  {
    slug: "pets",
    title: "Dogs and pets",
    img: "/img/e-dogs.jpg",
    note: "Including Winnie, who works here",
  },
  {
    slug: "cars",
    title: "Cars",
    img: "/img/e-cars.jpg",
    note: "Classic, sports and show cars, in the studio or on location",
  },
  {
    slug: "product",
    title: "Product and packshot",
    img: "/img/e-product.jpg",
    note: "For menus, listings and websites",
  },
];

/** How other people have described him, from his own About page. */
export const saidOfHim =
  "Fun, friendly, relaxed, creative, thoughtful, like one of the guests, full of ideas, very organised, never stops.";

export const intro =
  "I have photographed weddings around Stratford-upon-Avon since 2006, and nothing else full time since 2014. Manor houses, village churches, barns and back gardens, mostly across Warwickshire and the Cotswolds.";

/** The About page, written from the facts on his own About page. */
export const about = {
  heading: "Hello, I'm Jeff",
  standfirst:
    "A wedding and event photographer based in the middle of Stratford-upon-Avon, covering Warwickshire, the Cotswolds and a good deal further when asked.",
  story: [
    {
      h: "How it started",
      p: [
        "At twelve I was offered a scholarship to study art at Birmingham University. Getting there from home in the Cotswolds was never going to work, so it went no further, though a run of national art competitions followed.",
        "At sixteen I bought a 35mm film camera and that settled it. Then came roughly twenty years in IT and the motor trade, which paid for a lot of film.",
      ],
    },
    {
      h: "Turning it into the job",
      p: [
        "Jeff Land Photography started in 2006, alongside the day job. In 2014 the day job stopped and this became the whole thing.",
        "Two decades in, the approach has not changed much: turn up early, stay out of the way, and come back with the day as it actually happened.",
      ],
    },
    {
      h: "Where I work",
      p: [
        "Based centrally in Stratford-upon-Avon, within easy reach of Leamington Spa, Warwick, Kenilworth, Coventry and Banbury, and out across the Cotswolds.",
        "Further afield across the Midlands and the rest of the UK is routine. Overseas is possible by arrangement.",
      ],
    },
    {
      h: "What else is in the diary",
      p: [
        "Weddings and engagements are most of it. The rest is corporate work, trade shows and award ceremonies, business headshots, product and food photography, family portraits, school proms, graduations, cars and dogs.",
        "There is also a manned photo booth, which travels to most of the same events.",
      ],
    },
  ],
  likes: [
    "Travelling, eating well, and city breaks with my wife Fiona",
    "Taking pictures when nobody is paying me to",
    "Long walks with Winnie, a cockapoo",
    "A 2008 Audi TT called Alan",
    "Coffee, and a good laugh",
  ],
  portrait: "/img/jeff.jpg",
  booth: "/img/jeff-booth.jpg",
};

/** Photo booth figures, as published on his own photo booth page. */
export const booth = {
  from: "£350",
  detail: "Two hours, props, prints on the night and the digital files.",
};
