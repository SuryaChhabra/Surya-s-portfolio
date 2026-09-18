/* ---------------------------------------------------------------------------
 * ✏️  EDIT THIS FILE — it is the single source of truth for the whole site.
 *     Every heading, project, event, number and link below renders directly.
 *     Nothing else needs to change to make this portfolio yours.
 * ------------------------------------------------------------------------- */

export const site = {
  /* — Identity ———————————————————————————————————————————————————— */
  name: "Surya Chhabra",
  initials: "SC",
  role: "Growth",
  location: "New Delhi, IN",
  email: "hello@example.com",
  resumeUrl: "/resume.pdf",

  /* Shown in the browser tab + link previews */
  meta: {
    title: "Surya Chhabra — Growth",
    description:
      "Growth portfolio: campaigns, community, events and the numbers behind them.",
    url: "https://example.com",
  },

  /* — Hero ———————————————————————————————————————————————————————— */
  hero: {
    /* Each string is a line. Wrap a word in *asterisks* to render it in the
       accent serif italic, e.g. "I build *momentum*" */
    lines: ["I build", "*momentum*", "for products"],
    blurb:
      "Growth generalist working across acquisition, community and content. I like the unglamorous middle of the funnel, the spreadsheet that explains why, and the event that makes 200 people care.",
    availability: "Open to growth roles & freelance sprints",
  },

  /* — Headline numbers (keep 3–4) ———————————————————————————————— */
  stats: [
    { value: "1.2M", label: "organic impressions driven" },
    { value: "40+", label: "events run end-to-end" },
    { value: "8.4k", label: "community members grown" },
    { value: "3.1x", label: "best campaign ROAS" },
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
      title: "Offbeat",
      note: "",
      tags: [],
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
      { src: "/research/plate-01.svg", caption: "", alt: "Placeholder plate" },
      { src: "/research/plate-02.svg", caption: "", alt: "Placeholder plate" },
      { src: "/research/plate-03.svg", caption: "", alt: "Placeholder plate" },
      { src: "/research/plate-04.svg", caption: "", alt: "Placeholder plate" },
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

  /* — Writing / notes ————————————————————————————————————————————— */
  writing: [
    {
      title: "The event is the funnel",
      note: "Why in-person still beats a landing page for high-intent signups.",
      date: "Aug 2026",
      link: "",
    },
    {
      title: "Stop A/B testing your headline",
      note: "A case for testing offers and audiences before copy.",
      date: "May 2026",
      link: "",
    },
    {
      title: "Community metrics that aren't vanity",
      note: "Three numbers I actually report on.",
      date: "Feb 2026",
      link: "",
    },
  ],

  /* — About ——————————————————————————————————————————————————————— */
  about: {
    paragraphs: [
      "I'm a growth generalist. In practice that means I'm equally happy writing the ad, cleaning the data behind it, and standing at the door of an event at 7am counting people in.",
      "Most of my work sits where distribution meets product: finding the loop that already wants to happen and removing whatever is in its way. I care about compounding channels over spiky ones.",
      "Outside work I run a monthly operator dinner, take too many photos of buildings, and am slowly learning to cook things that take four hours.",
    ],
    /* Small tags shown as stickers */
    toolkit: [
      "GA4",
      "Amplitude",
      "Webflow",
      "Figma",
      "Customer.io",
      "SQL",
      "Notion",
      "Meta Ads",
      "Ahrefs",
      "Framer",
    ],
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
