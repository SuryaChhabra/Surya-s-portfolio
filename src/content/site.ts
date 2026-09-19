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
  email: "suryachhabra@gmail.com",
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

    /* ── The two lines under your name on the opening screen. ──────────
       `lead` is set in large type directly under the name, so it holds the
       thing you want someone to know first — the work you are looking for.
       `sub` sits under it and says how you go about it.

       Swap either without touching anything else. Alternates for `sub`:
         "I jump in, figure it out, and make the thing."
         "I'd rather make it than wait until I know how."
         "I don't specialise. I finish."                                */
    lead: "Growth & creative for startups.",
    sub: "I figure things out by making them, learning whatever tool it takes on the way. Most of what is on this page started as something nobody asked me to build.",
    blurb:
      "A little bit of brand growth, a little bit of founder chaos, a little bit of space research, a little bit of archery discipline. I combine tools, taste and storytelling to make things feel alive — and I would rather make version one happen than wait until I know everything.",
    /* Stated, not requested. "Looking for work" as a headline reads as
       asking; naming the work you do reads as choosing. Same fact. */
    availability: "Growth and creative work, at startups.",
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
        title: "Continuum image",
        caption:
          "Continuum image (Stokes I) centred near RA 03:25:35.7, Dec +30:45:08. A compact double source sits inside an extended envelope, with filamentary emission reaching toward the upper left. Synthesised beam at lower left.",
        alt: "Millimetre continuum image showing a bright compact double source within a fainter extended envelope.",
      },
      {
        src: "/research/pv-keplerian.webp",
        title: "Position–velocity diagram",
        caption:
          "Position–velocity diagram through the source. The cyan curve is a Keplerian rotation profile overlaid on the line emission, used to constrain the mass of the central object.",
        alt: "Position-velocity diagram with a Keplerian rotation curve overlaid on molecular line emission.",
      },
      {
        src: "/research/moment-maps-fit.webp",
        title: "Kinematic fit",
        caption:
          "Kinematic fit. Top: integrated intensity (moment 0) and the mask applied to it. Bottom: the observed velocity field (moment 1) and the residual after subtracting a rotating-disk model — inclination 30°, position angle 35°, systemic velocity 4.675 km/s.",
        alt: "Four-panel figure: moment 0 map, mask, observed moment 1 velocity field, and observed-minus-model residual.",
      },
    ],
  },

  /* — Archery ———————————————————————————————————————————————————————
     The record, then the detail.

     `honours` is the headline — the three or four things worth knowing
     before anything else. `award` is a single named honour, or null.
     `results` is optional per-competition detail: fill a row per
     competition and the table appears, leave them empty and it does not.

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

    honours: [
      { value: "5×", label: "National player" },
      { value: "3×", label: "Delhi State champion" },
      { value: "150K+", label: "Arrows shot" },
    ],

    award: {
      name: "Shri M.N. Kapoor Award for Excellence in Sports",
      note: "My school's highest sporting honour.",
    },

    results: [
      { date: "", event: "", level: "", category: "", result: "" },
      { date: "", event: "", level: "", category: "", result: "" },
      { date: "", event: "", level: "", category: "", result: "" },
    ],
  },

  /* — Events ————————————————————————————————————————————————————————
     Real events only. An entry with no `name` is skipped, and the section
     removes itself while none are filled — the four events that used to
     live here never happened.

       role   — what you actually did: organiser, host, speaker, attendee
       people — scale, e.g. "40 founders"
       note   — one line on what it was or what came of it
       link   — the post or page about it
       images — optional photos, from public/events/                      */
  events: [
    {
      name: "Antler Founders — Illinois Entrepreneurs",
      role: "",
      date: "",
      people: "",
      note: "",
      link: "https://lnkd.in/p/g6eXxFDd",
      images: ["/events/antler-stage.jpg", "/events/antler-interview.webp"],
    },
  ],

  /* — Experience timeline ————————————————————————————————————————
     The three roles that lived here were fabricated and are gone. Add real
     ones if you want a timeline back; nothing renders it right now.      */
  timeline: [] as { period: string; title: string; org: string; detail: string }[],

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
      "I combine tools, taste and storytelling to make things feel alive. That is the actual skill — not any single tool, and not waiting until I am an expert in one.",
      "It shows up across everything here: AI video made with whatever gets the idea across, side projects shipped instead of planned, molecular-line astronomy, and the discipline competitive archery beats into you.",
      "Expert nahi, par ready hoon.",
    ],
    toolkit: ["Suno", "Runway", "CapCut", "Next.js", "Python", "CARTA"],
  },

  /* — Links ——————————————————————————————————————————————————————— */
  /* ⚠️ Anything still pointing at example.com or /username is scaffold and
     is hidden on the live site rather than rendered as a dead link. Replace
     the href and it appears. */
  socials: [
    { label: "Email", href: "mailto:suryachhabra@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/surya-chhabra/" },
    { label: "GitHub", href: "https://github.com/SuryaChhabra" },
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
