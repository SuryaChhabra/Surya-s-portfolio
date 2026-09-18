/* ---------------------------------------------------------------------------
 * ✏️  EDIT THIS FILE — it is the single source of truth for the whole site.
 *     Every heading, project, event, number and link below renders directly.
 *     Nothing else needs to change to make this portfolio yours.
 * ------------------------------------------------------------------------- */

export const site = {
  /* — Identity ———————————————————————————————————————————————————— */
  name: "Surya Chhabra",
  initials: "SC",
  role: "Growth & creative",
  location: "New Delhi, IN",
  email: "hello@example.com",
  resumeUrl: "/resume.pdf",

  /* Shown in the browser tab + link previews */
  meta: {
    title: "Surya Chhabra",
    description:
      "Growth and creative work, AI video, astronomy research and competitive archery.",
    url: "https://example.com",
  },

  /* — Hero ———————————————————————————————————————————————————————— */
  hero: {
    /* Each string is a line. Wrap a word in *asterisks* to render it in the
       accent serif italic, e.g. "I build *momentum*" */
    /* Drawn from your own LinkedIn post — edit freely, it is your voice. */
    lines: ["I jump in,", "*figure it out,*", "and ship v1"],
    blurb:
      "A little bit of brand growth, a little bit of founder chaos, a little bit of space research, a little bit of archery discipline. I combine tools, taste and storytelling to make things feel alive — and I would rather make version one happen than wait until I know everything.",
    availability: "Looking for growth & creative startup work",
  },

  /* — Headline numbers ——————————————————————————————————————————
     All four are from LinkedIn's own analytics on the OFF/BEAT
     application-video post. Labels say "one post" on purpose — these are
     one piece of work, not a career total, and claiming otherwise is the
     kind of thing that falls apart in an interview.                      */
  stats: [
    { value: "310K", label: "impressions, one post" },
    { value: "208K", label: "people reached" },
    { value: "120K", label: "video views" },
    { value: "99%", label: "of reach outside my network" },
  ],

  /* — Scrolling marquee words ————————————————————————————————————— */
  marquee: [
    "Growth loops",
    "Lifecycle",
    "Community",
    "Paid social",
    "SEO",
    "Events",
    "Partnerships",
    "Analytics",
    "Brand",
    "Content",
  ],

  /* — Side projects ————————————————————————————————————————————————
     Real, shipped, linked. tone picks the card's hue from the spectrum:
     "red" | "orange" | "amber" | "green" | "cyan" | "blue" | "violet" | "pink"

     ⚠️ summary, metrics and tags are intentionally empty. Fill them with
     what each project actually is — a card with no description still reads
     as honest; an invented one does not. Empty fields render nothing.     */
  work: [
    {
      title: "Lumiere",
      kicker: "Side project",
      tone: "violet" as const,
      summary: "",
      metrics: [],
      tags: [],
      link: "https://lumiere-flax.vercel.app/",
    },
    {
      title: "Offbeat",
      kicker: "Side project",
      tone: "orange" as const,
      summary: "",
      metrics: [],
      tags: [],
      link: "https://off-beat-choosing-the-creator.vercel.app/",
    },
    {
      title: "Karmic Connections",
      kicker: "Side project",
      tone: "green" as const,
      summary: "",
      metrics: [],
      tags: [],
      link: "https://karmicconnections.co.in",
    },
  ],

  /* — Videos ————————————————————————————————————————————————————————
     Files live in the R2 bucket, not the repo. src is the public URL.
     poster is a still in public/work/ — small enough to belong in git.

     ⚠️ The titles below come from the filenames and the notes are empty
     prompts. Replace them with what each piece actually is and who it was
     for; invented descriptions are worse than none.                       */
  videoBase: "https://pub-5db4afe057a34843946065c529eba471.r2.dev",

  videos: [
    {
      title: "Twinmind",
      note: "",
      tags: [],
      poster: "/work/video-twinmind.svg",
      file: "Twinmind.mp4",
    },
    {
      title: "OFF/BEAT — application video",
      note: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead, to show how my brain actually works. Built with Suno, Runway and CapCut. It reached 208K people, 99% of them outside my network, and held an 18-second average watch time.",
      tags: ["Suno", "Runway", "CapCut"],
      poster: "/work/video-offbeat.svg",
      file: "offbeat.mp4",
    },
    {
      title: "Permute",
      note: "",
      tags: [],
      poster: "/work/video-permute.svg",
      file: "permute.mp4",
    },
    {
      title: "0712",
      note: "",
      tags: [],
      poster: "/work/video-0712.svg",
      file: "0712.mp4",
    },
  ],

  /* — Research ——————————————————————————————————————————————————————
     Astronomy work. Images live in public/research/ — they are small enough
     to belong in the repo, and Next optimises them automatically (resizes,
     serves AVIF/WebP, lazy-loads below the fold).

     Each image needs a caption and an alt. The caption is what makes a
     research image readable to someone outside the field — what the object
     is, which instrument, what the plot shows.

     ⚠️ blurb and captions below are empty. Fill them in; empty ones render
     nothing rather than something invented.                                */
  research: {
    blurb: "",
    images: [
      {
        src: "/research/continuum-stokes-i.webp",
        caption:
          "Continuum image (Stokes I) centred near RA 03:25:35.7, Dec +30:45:08. A compact double source sits inside an extended envelope, with filamentary emission reaching toward the upper left. Synthesised beam at lower left.",
        alt: "Millimetre continuum image showing a bright compact double source within a fainter extended envelope.",
      },
      {
        src: "/research/pv-keplerian.webp",
        caption:
          "Position–velocity diagram through the source. The cyan curve is a Keplerian rotation profile overlaid on the line emission, used to constrain the mass of the central object.",
        alt: "Position-velocity diagram with a Keplerian rotation curve overlaid on molecular line emission.",
      },
      {
        src: "/research/moment-maps-fit.webp",
        caption:
          "Kinematic fit. Top: integrated intensity (moment 0) and the mask applied to it. Bottom: the observed velocity field (moment 1) and the residual after subtracting a rotating-disk model — inclination 30°, position angle 35°, systemic velocity 4.675 km/s.",
        alt: "Four-panel figure: moment 0 map, mask, observed moment 1 velocity field, and observed-minus-model residual.",
      },
    ],
  },

  /* — Archery ———————————————————————————————————————————————————————
     Competitive results. Fill a row per competition; rows with no `event`
     are skipped, and the whole section disappears while none are filled,
     so nothing half-written ever ships.

       date     — "Mar 2026" or just "2025"
       event    — the competition name
       level    — e.g. "National", "State", "University", "Club"
       category — e.g. "Recurve, 70m" / "Compound" / "Barebow"
       result   — e.g. "Gold", "2nd", "Qualified", "Personal best 612"  */
  archery: {
    blurb: "",
    /* Set image to "" to drop the photo. alt is read by screen readers. */
    image: "/archery/at-full-draw.png",
    imageAlt:
      "At full draw with a recurve bow on an outdoor archery ground, target butts in the background.",
    results: [
      { date: "", event: "", level: "", category: "", result: "" },
      { date: "", event: "", level: "", category: "", result: "" },
      { date: "", event: "", level: "", category: "", result: "" },
    ],
  },

  /* — Events ————————————————————————————————————————————————————— */
  events: [
    {
      name: "Buildathon — 48h product sprint",
      role: "Lead organiser",
      date: "Mar 2026",
      people: "220 attendees",
      note: "Ran sponsorship, venue, judging and the whole comms arc. Sold out in nine days.",
    },
    {
      name: "Growth Roundtable (monthly)",
      role: "Host",
      date: "2025 — present",
      people: "40 per session",
      note: "Invite-only operator dinners. Became the top-of-funnel for three later hires.",
    },
    {
      name: "Campus Launch Tour",
      role: "Programme lead",
      date: "Sep 2025",
      people: "6 cities",
      note: "Six campuses in three weeks, with a repeatable playbook local teams could run alone.",
    },
    {
      name: "Demo Night",
      role: "Co-organiser",
      date: "Jun 2025",
      people: "150 attendees",
      note: "Founder showcase with live judging; clipped to short-form that outperformed paid.",
    },
  ],

  /* — Experience timeline ————————————————————————————————————————— */
  timeline: [
    {
      period: "2025 — now",
      title: "Growth Lead",
      org: "Company Name",
      detail:
        "Own acquisition, lifecycle and community. Run a weekly experiment cadence with the product team.",
    },
    {
      period: "2024 — 2025",
      title: "Growth Associate",
      org: "Company Name",
      detail:
        "Paid social, creator partnerships and the analytics layer underneath both.",
    },
    {
      period: "2023 — 2024",
      title: "Founder",
      org: "Side Project",
      detail:
        "Built and sold a small tool to 400 paying users. Learned distribution the hard way.",
    },
  ],

  /* — Writing / notes ————————————————————————————————————————————
     Fabricated entries removed. Add real posts here if you have them. */
  writing: [] as { title: string; note: string; date: string; link: string }[],

  /* — About ——————————————————————————————————————————————————————
     Was invented placeholder text and has been emptied. Write what is
     actually true — one paragraph per entry. An empty array hides the
     section entirely rather than showing a heading with nothing under it.

     toolkit — the software you genuinely use.
     (Writing lived here too; those three posts were fabricated and are
     gone. Add real ones to `writing` if you have any.)                 */
  about: {
    paragraphs: [
      "I'm trying to find my way into growth and creative startup work. The thing I actually value in myself is knowing how to combine tools, taste and storytelling to make something feel alive — not being an expert in any one of them yet.",
      "That shows up across everything here: AI video made with whatever gets the idea across, side projects shipped rather than planned, molecular-line astronomy, and the discipline that competitive archery beats into you.",
      "Expert nahi, par ready hoon.",
    ],
    toolkit: ["Suno", "Runway", "CapCut", "Next.js", "Python", "CARTA"],
  },

  /* — Links ——————————————————————————————————————————————————————— */
  socials: [
    { label: "Email", href: "mailto:hello@example.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/username" },
    { label: "X", href: "https://x.com/username" },
    { label: "GitHub", href: "https://github.com/suryachhabra" },
  ],
} as const;

export type Site = typeof site;

/**
 * The `as const` above narrows every media block to its exact literal shape,
 * which hides optional fields nobody has used yet. Consumers read media
 * through this widened type instead.
 */
export type ProjectMedia = {
  readonly slug: string;
  readonly alt: string;
  readonly videoUrl?: string;
};
export type Tone = Site["work"][number]["tone"];
