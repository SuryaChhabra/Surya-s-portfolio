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
    sub: "I figure things out by making them — moving between brand, video and product, picking up whatever tool each one needs. Most of what is on this page started as something nobody asked me to build.",

    /* The line that says what the prism is for. Without it the glass is
       just a nice object; with it, the whole page has a premise before
       anyone has scrolled a pixel. `cueStill` is the same thing for
       visitors who have motion turned off and never see it happen. */
    cue: "Scroll to split the light",
    cueStill: "Six colours, six sections",
    cueSub: "Six colours, one for each side of what I do.",
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

     Posters are real frames you picked, cropped to 16:9 and re-encoded.
     Replace one by dropping a new file in public/work/ and pointing at it.

     ⚠️ Three of the four notes are still empty. Say what each piece is and
     who it was for; invented descriptions are worse than none.            */
  videoBase: "https://pub-5db4afe057a34843946065c529eba471.r2.dev",

  videos: [
    {
      title: "TwinMind",
      note: "",
      tags: [],
      poster: "/work/video-twinmind.webp",
      file: "Twinmind.mp4",
    },
    {
      title: "OFF/BEAT — application video",
      note: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead, to show how my brain actually works. Built with Suno, Runway and CapCut. It reached 208K people, 99% of them outside my network, and held an 18-second average watch time.",
      tags: ["Suno", "Runway", "CapCut"],
      poster: "/work/video-offbeat.webp",
      file: "offbeat.mp4",
    },
    {
      title: "Permute",
      note: "",
      tags: [],
      poster: "/work/video-permute.webp",
      file: "permute.mp4",
    },
    {
      /* The file is named 0712.mp4; the piece is the Soulful Vybes spot. */
      title: "Soulful Vybes — car perfume",
      note: "",
      tags: [],
      poster: "/work/video-vybe.webp",
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

  /* — Work ————————————————————————————————————————————————————————
     Two bands, because they are two different jobs.

     `growth` is the red band: the same role in three rooms. `leadership` is
     the yellow one: leading people and building a scene rather than a
     funnel. Both take the same shape.

       title   — your role, as it reads on LinkedIn
       org     — who it was for
       kind    — "Internship" / "Contract" / "" for a normal role
       period  — "Jul – Aug 2026"
       place   — "San Francisco Bay Area" or "" to omit
       context — optional: what the organisation is, in its own terms. Only
                 where that frames the work rather than padding it out.
       detail  — what you actually did. One or two sentences.
       metrics — optional: { value, label } that you can stand behind
       skills  — optional tags                                            */
  experience: {
    growth: [
      {
        title: "Founding Growth",
        org: "TwinMind",
        kind: "Internship",
        period: "Jul – Aug 2026",
        place: "San Francisco Bay Area",
        /* ⚠️ LinkedIn only carries TwinMind's own tagline here, which is
           their copy and not your work. Say what the remit actually was. */
        detail: "",
        metrics: [] as { value: string; label: string }[],
        skills: [] as string[],
      },
      {
        title: "Growth",
        org: "Satvic Movement",
        kind: "",
        period: "Mar – May 2026",
        place: "",
        detail:
          "Helped scale e-commerce for India's largest community-led health movement by building high-conversion shopping experiences with an AI-native design stack.",
        metrics: [] as { value: string; label: string }[],
        skills: ["Web Design", "Shopify"],
      },
      {
        title: "Growth",
        org: "Ocher Studio",
        kind: "",
        period: "Jan – Mar 2026",
        place: "",
        detail:
          "Worked to make artisan livelihoods more sustainable by helping an early-stage craft startup grow through ethical markets, partnerships, and community-centered storytelling.",
        metrics: [] as { value: string; label: string }[],
        skills: ["Marketing", "Marketing Strategy"],
      },
    ],

    leadership: [
      {
        title: "Secretary",
        org: "Hindu YUVA, UIUC",
        kind: "",
        /* ⚠️ Which academic year? */
        period: "",
        place: "",
        context:
          "Hindu YUVA runs on four P's — preserve, practice, promote and protect Hindu Dharma — bringing Hindu students together on campuses across North America.",
        detail:
          "Ran all internal and external communications for the year, and led events end to end — a Ganesha celebration that drew over 500 people, where I handled food, decor and the programme, plus Hindu New Year and Guru Vandana, the teachers' appreciation evening.",
        metrics: [{ value: "500+", label: "at the Ganesha celebration" }] as {
          value: string;
          label: string;
        }[],
        skills: [] as string[],
      },
      {
        /* ⚠️ Descriptive, not official — replace with the title Illinois
           actually gives the role (peer instructor, course assistant,
           whichever it is). An invented job title is the one thing on this
           page that cannot survive being asked about. */
        title: "Section lead — LAS 101",
        org: "University of Illinois Urbana-Champaign",
        kind: "",
        /* ⚠️ Which term? */
        period: "",
        place: "",
        context:
          "LAS 101 is the college's first-year experience course: the one that gets new students through the first semester on a campus of 56,000.",
        detail:
          "Taught a section of 25 first-year students, running it start to finish — the sessions, the material and the part that actually matters, which is the students working out how to live somewhere new.",
        metrics: [{ value: "25", label: "students in my section" }] as {
          value: string;
          label: string;
        }[],
        skills: [] as string[],
      },
      {
        title: "Head of Exploration",
        org: "Founders — Illinois Entrepreneurs",
        kind: "",
        period: "Sep 2024 – Dec 2025",
        place: "",
        detail:
          "Led a student innovation team focused on strengthening the campus startup ecosystem through speaker events, founder conversations, and a podcast for student entrepreneurs.",
        metrics: [] as { value: string; label: string }[],
        skills: [] as string[],
      },
    ],
  },

  /* — Education ——————————————————————————————————————————————————
     The orange band, second on the page. It is a compact section by
     design — it does not need a full screen, it needs to be high up.

       institution  — the university, as you would write it
       degree       — exact wording, e.g. "BSc Astrophysics"
       period       — "2023 – 2027"
       place        — optional
       note         — one line, if there is something worth saying
       highlights   — clubs, roles, awards, scholarships, coursework.
                      { label, detail } — detail can be ""              */
  education: {
    institution: "University of Illinois Urbana-Champaign",
    degree: "BS Liberal Arts & Sciences",
    /* Two majors, as the transcript records them. */
    majors: "Astronomy + Data Science · Statistics",
    /* ⚠️ The transcript runs to Fall 2026 in progress. Add the expected
       graduation date when you want it stated. */
    period: "2023 – present",
    place: "",
    note: "",
    highlights: [
      {
        label: "James Scholar",
        detail: "Illinois' honours programme for undergraduates.",
      },
    ] as { label: string; detail: string }[],

    /* Coursework, grouped so the two halves of the degree argue for each
       other. Not the whole transcript — the courses someone hiring for
       growth or research would actually care about. No grades: a portfolio
       is not a transcript, and a number invites a conversation about the
       number instead of about the work. */
    coursework: [
      {
        area: "Statistics & data science",
        courses: [
          "Basics of Statistical Learning",
          "Statistical Modeling I & II",
          "Statistics and Probability I & II",
          "Modeling & Learning in Data Science",
          "Algorithms & Data Structures for Data Science",
          "Data Science Discovery & Exploration",
          "Statistical Data Management",
          "Ethics & Policy for Data Science",
        ],
      },
      {
        area: "Astronomy",
        courses: [
          "Radio Astronomy",
          "Computing in Astronomy",
          "Introduction to Astrophysics",
          "Planetary Systems",
          "Galaxies and the Universe",
          "Individual Study",
        ],
      },
    ] as { area: string; courses: string[] }[],
  },

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
