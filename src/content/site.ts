/* ---------------------------------------------------------------------------
 * ✏️  EDIT THIS FILE — it is the single source of truth for the whole site.
 *     Every heading, project, event, number and link below renders directly.
 *     Nothing else needs to change to make this portfolio yours.
 * ------------------------------------------------------------------------- */

export const site = {
  /* — Identity ———————————————————————————————————————————————————— */
  name: "Surya Chhabra",
  email: "suryachhabra@gmail.com",

  /* Drop the file in public/ and name it here, e.g. "/resume.pdf", and a
     download pill appears beside LinkedIn and GitHub at the end of the
     page. Empty renders nothing — an link to a file that is not there is
     worse than no link, because it fails in front of the one person who
     wanted it enough to click. */
  resumeUrl: "/resume.pdf",

  /* The photo at the end of the page. It is the one place a face belongs:
     the seven colours have just come back together into white, and the
     thing they recombine into is a person. Cropped 3:4 rather than to a
     circle on purpose — a circle would take the castle out, and the
     background is half of why this photo is this photo. */
  portrait: {
    src: "/me/portrait.webp",
    alt: "Surya Chhabra, with the Sleeping Beauty castle in the background.",
  },

  /* Shown in the browser tab + link previews */
  meta: {
    title: "Surya Chhabra",
    description:
      "Growth and creative work for startups. I figure things out by making them, moving between brand, video and product, picking up whatever tool each one needs.",
    url: "https://suryachhabra.com",
  },

  /* — Hero ———————————————————————————————————————————————————————— */
  hero: {
    /* ── The two lines under your name on the opening screen. ──────────
       `lead` is set in large type directly under the name, so it holds the
       thing you want someone to know first — the work you are looking for.
       `sub` sits under it and says how you go about it.

       Swap either without touching anything else. Alternates for `sub`:
         "I jump in, figure it out, and make the thing."
         "I'd rather make it than wait until I know how."
         "I don't specialise. I finish."                                */
    lead: "Growth & creative for startups.",
    sub: "I figure things out by making them, moving between brand, video and product, picking up whatever tool each one needs. Most of what is on this page started as something nobody asked me to build.",

    /* The line that says what the prism is for. Without it the glass is
       just a nice object; with it, the whole page has a premise before
       anyone has scrolled a pixel. `cueStill` is the same thing for
       visitors who have motion turned off and never see it happen. */
    cue: "Scroll to split the light",
    cueStill: "Seven colours, seven sections",
    cueSub: "Seven colours, one for each side of what I do.",
  },

  /* — Headline numbers ——————————————————————————————————————————
     All four are from LinkedIn's own analytics on the OFF/BEAT
     application-video post — one piece of work, not a career total. The
     labels no longer say so, but the section they sit in does: they are
     inside the video band, directly above the film they came from.     */
  stats: [
    { value: "310K", label: "impressions" },
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
      /* First, because it is the only thing in this section somebody else
         judged. The rest are all things you decided to make. */
      title: "Collectiv",
      /* The kicker carries the win. It was "Hackathon", which says where you
         were and not how it went, and the summary then had to spend its
         first sentence on it before reaching the idea. */
      kicker: "Won a product hackathon",
      tone: "blue" as const,
      image: "/work/shot-collectiv.webp",
      /* One idea, said once: grouped orders kill the delivery cost. Naming
         the venue at the end keeps the claim checkable without putting it
         where the idea should be. */
      summary:
        "Group the orders on a street and last-mile delivery stops being the cost that keeps small local stores off the internet. Built in 24 hours with no code at UIUC Product Space, with two teammates I met the day before.",
      metrics: [],
      tags: [],
      /* ⚠️ No link yet. The LinkedIn post announcing it would do — without
         one this row is the only project on the page that opens nothing. */
      link: "",
    },
    {
      /* The features carry this row, not the backstory. An earlier version
         opened on "built for them unasked" and counted screens, which is a
         claim about effort; the graded safety ladder is the thing that
         actually shows the work, because nobody builds four tiers of
         language handling for a weekend demo. Who it was for still matters
         and still gets said — at the end, where it lands as context rather
         than as the pitch.
         Kept to one line, like every other row. The full ladder — four
         tiers, the explanation shown on a blocked message, escalation to a
         parent — is on the site itself; the row's job is to make someone
         want to look, not to be the documentation. */
      title: "Lumiere",
      kicker: "Spec build",
      tone: "violet" as const,
      image: "/work/shot-lumiere.webp",
      summary:
        "Matches high-school students into research teams. The chat grades what it catches: slurs and contact details blocked, rudeness only nudged. Built for Lumiere Education, unasked.",
      metrics: [],
      tags: [],
      link: "https://lumiere-flax.vercel.app/",
    },
    {
      /* Was titled "Offbeat", which is a brand — the company two sections
         up that the application video was made for. A row carrying their
         name reads as their project however the summary is worded, so it
         is named for what it does instead. The URL still says off-beat;
         only the visible title changed. */
      title: "Creator to Business",
      kicker: "Side project",
      tone: "orange" as const,
      image: "/work/shot-offbeat.webp",
      summary:
        "Drop in any YouTube creator and it maps their audience, scores the categories that audience actually buys, and surfaces brand concepts grounded in evidence rather than vibes.",
      metrics: [],
      tags: [],
      link: "https://off-beat-choosing-the-creator.vercel.app/",
    },
    {
      title: "Karmic Connections",
      kicker: "Side project",
      tone: "green" as const,
      image: "/work/shot-karmic.webp",
      summary:
        "A site for a hypnotherapy and past-life-regression practice. The one project here built for somebody else to use with their own clients.",
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

  /* The three behind every film here. They belong to the section, not to
     one card — listing them under OFF/BEAT made them look like that film's
     stack and left the other three looking like they were made with
     nothing. A card's own `tags` are now only for what is unique to it. */
  videoToolkit: [
    /* Drop a mark in public/logos/ and set it here; without one the pill is
       just the name, which still reads fine.
       `wordmark` is for a brand whose mark is its own name: the image runs
       at its natural width and the text is dropped, because a pill reading
       "SUNO Suno" says it twice. */
    { name: "Suno", logo: "/logos/tool-suno.webp", wordmark: true },
    { name: "Runway", logo: "/logos/tool-runway.webp" },
    { name: "CapCut", logo: "/logos/tool-capcut.webp" },
    { name: "Claude", logo: "/logos/tool-claude.webp" },
  ] as { name: string; logo?: string; wordmark?: boolean }[],

  videos: [
    {
      title: "TwinMind: animated short",
      note: "TwinMind needed explaining in a way anyone could follow, a small child included. I took that on as an AI-animated short film. It follows Sam through a day that will change the course of his life, on one condition: he has to listen to what the people around him are saying. He doesn't, so the twin does.",
      tags: [],
      poster: "/work/video-twinmind.webp",
      file: "Twinmind.mp4",
    },
    {
      title: "OFF/BEAT: application video",
      /* "Got appreciation from a ton of people" is deliberately not written
         out: the four numbers under this say it with evidence, and the
         sentence would only say it again, weaker. */
      note: "My first experiment with AI video, and basically my portfolio in 55 seconds. OFF/BEAT asked for an application video and got a mini music-video. It is also how I found out how much I like doing this. It reached 208K people, 99% of them outside my network, and held an 18-second average watch time.",
      tags: [],
      poster: "/work/video-offbeat.webp",
      file: "offbeat.mp4",
    },
    {
      title: "Permute: product demo",
      note: "A UIUC alum's startup, and my first B2B SaaS video. It opens in a different style of AI animation, then becomes a product demo built with Claude: the right features, pitched with the right movements.",
      tags: [],
      poster: "/work/video-permute.webp",
      file: "permute.mp4",
    },
    {
      /* The file is named 0712.mp4; the piece is the Soulful Vybes spot. */
      title: "Soulful Vybes: car perfume",
      note: "My first freelance job: a spot for an Indian brand about to move into a new segment, car perfumes.",
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

     The section's own heading copy lives in bands.ts, not here — there is
     no blurb field, because nothing rendered one.                          */
  research: {
    images: [
      {
        src: "/research/continuum-stokes-i.webp",
        title: "Continuum image",
        caption:
          "The dust around the system: two bright cores inside a wider envelope, with a stream of material reaching off to one side.",
        detail:
          "IRS3B in continuum (Stokes I), centred near RA 03:25:35.7, Dec +30:45:08. Imaged in CASA with multiscale tclean; the masking and the Briggs and uv-taper choices decide how much of the envelope survives. A compact double source sits inside an extended envelope, with filamentary emission reaching toward the upper left. That dust morphology is what the gas kinematics are read against. Synthesised beam at lower left.",
        alt: "Millimetre continuum image of IRS3B showing a bright compact double source within a fainter extended envelope.",
      },
      {
        src: "/research/pv-keplerian.webp",
        title: "Position–velocity diagram",
        caption:
          "How fast the gas is moving, against where it is. The blue curve is what gravity alone would produce, the shape everything else gets measured against.",
        detail:
          "Position–velocity diagram through the source. The cyan curve is the Keplerian rotation profile, the baseline Reynolds et al. establish for IRS3B from molecular-line kinematics, and the component modelled away first, because anything gravity already accounts for is not the part worth looking at.",
        alt: "Position-velocity diagram with a Keplerian rotation curve overlaid on molecular line emission.",
      },
      {
        src: "/research/moment-maps-fit.webp",
        title: "Kinematic fit",
        caption:
          "The answer. Take away the motion gravity explains, and the bottom-right panel is what is left over: the part gravity does not account for.",
        detail:
          "Top: integrated intensity (moment 0) and its mask. Bottom: the observed velocity field (moment 1) and what survives a rotating-disk model at inclination 30°, position angle 35°, systemic velocity 4.675 km/s. Residuals near zero mean gravity explained the motion; red and blue patterns that survive mean something else is doing it, which is the evidence for the \"badminton-birdie\" infall pattern.",
        alt: "Four-panel figure: moment 0 map, mask, observed moment 1 velocity field, and the observed-minus-model residual.",
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
    /* Set image to "" to drop the photo. alt is read by screen readers. */
    image: "/archery/at-full-draw.webp",
    imageAlt:
      "At full draw with a recurve bow on an outdoor range, target butts at the left of frame.",

    honours: [
      { value: "5×", label: "National player" },
      { value: "3×", label: "Delhi State champion" },
      { value: "150K+", label: "Arrows shot" },
    ],

    award: {
      name: "Shri M.N. Kapoor Award for Excellence in Sports",
      note: "My school's highest sporting honour.",
    },

    /* Empty on purpose. Add a row and the table appears under the record;
       the shape each row takes is documented at the top of this block. */
    results: [] as {
      date: string;
      event: string;
      level: string;
      category: string;
      result: string;
    }[],
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
      name: "Antler Founders: Illinois Entrepreneurs",
      role: "Head of Exploration, Founders",
      date: "September 2025",
      /* Outcome first, ownership after. The two sentences that matter are
         who brought Antler there and what it was worth to the people in
         the room; the scope of the job is real and belongs on the card,
         but it reads as detail once the result has landed, and as a list
         of tasks when it comes first. The items are the ones that took a
         decision rather than an afternoon. */
      note: "Brought Antler to campus. Workshops and a fireside put 100+ students in direct contact with pre-seed VC. Ran it end to end: the programme, the investor office hours, the guest list for the dinner.",
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
       logo    — optional: a square mark in public/logos/. Omit and the
                 card simply has no logo; nothing else changes.
       context — optional: what the organisation is, in its own terms. Only
                 where that frames the work rather than padding it out.
       detail  — what you actually did. One or two sentences.
       metrics — optional: { value, label } that you can stand behind
       skills  — optional tags                                            */
  experience: {
    growth: [
      {
        /* ⚠️ Your CV says "Growth intern" here and this says "Founding
           Growth". The intern mark comes off every role on this page by
           your own instruction, but those two are different claims, not
           the same claim with a word removed — pick the one you want to
           be asked about in an interview. */
        title: "Founding Growth",
        org: "TwinMind",
        logo: "/logos/twinmind.webp",
        kind: "",
        period: "Jul – Sep 2026",
        place: "San Francisco Bay Area",
        /* GEO is in the CV bullet and deliberately not here: you asked for
           SEO only, so the acronym goes and the substance stays as plain
           discoverability. */
        detail:
          "Led growth across SEO, content, web and brand, making TwinMind easier to find. Ran experiments and launches end to end: website, creative campaigns, product storytelling, video, social distribution and user research.",
        metrics: [] as { value: string; label: string }[],
        skills: ["SEO", "Content", "Brand", "User Research"],
      },
      {
        title: "Growth",
        /* The org spells itself Satvic; the CV has Satvik in one place. */
        org: "Satvic Movement",
        logo: "/logos/satvic.webp",
        kind: "",
        period: "Mar – May 2026",
        place: "",
        detail:
          "Drove e-commerce setup and growth strategy for India's largest community-driven health platform, designing high-conversion Shopify pages in Replo, Shogun and Figma to turn audience scale into revenue.",
        metrics: [{ value: "8M+", label: "subscriber base" }] as {
          value: string;
          label: string;
        }[],
        skills: ["Shopify", "Replo", "Shogun", "Figma"],
      },
      {
        title: "Business & Growth",
        org: "Ocher Studio",
        logo: "/logos/ocher.webp",
        kind: "",
        period: "Jan – May 2026",
        place: "",
        detail:
          "Worked at the intersection of entrepreneurship and community impact, arguing for revenue-driven models to support artisan livelihoods rather than charity. Grew an early-stage studio through market research, new revenue channels, partnerships and brand storytelling.",
        metrics: [] as { value: string; label: string }[],
        skills: ["Market Research", "Partnerships", "Brand Storytelling"],
      },
    ],

    leadership: [
      /* Three cards in one row, so all three carry the same four slots:
         title, org and dates, one number set large, one line of what the
         job was. `context` is gone from every card — it explained the
         organisation rather than the work, and two paragraphs a card is
         what made this section unreadable.
         ⚠️ That means Hindu YUVA's four P's are no longer on the site. You
         said they were essential, so this is a deliberate cut rather than
         an oversight: say the word and they come back, at the cost of the
         row lining up. */
      {
        /* The body goes in the title, as it does on the card beside this
           one: "Secretary" alone says the post and not what it was
           secretary of, and the org line underneath was carrying the
           half of it that matters. Leaves UIUC in the org slot on both,
           which is what the two have in common. */
        title: "Secretary, Hindu YUVA",
        org: "UIUC",
        kind: "",
        period: "Sep 2024 – Aug 2026",
        place: "",
        detail:
          "Ran the year's internal and external communications, and led events end to end: Ganesha, Hindu New Year and Guru Vandana.",
        metrics: [{ value: "500+", label: "at the Ganesha celebration" }] as {
          value: string;
          label: string;
        }[],
        skills: [] as string[],
      },
      {
        title: "Instructor",
        /* The course sits here rather than in the title, because Illinois
           gives the post no official name and "Instructor" is the honest
           one. UIUC stays short: spelt out it wrapped to two lines and
           nothing else in the row did. */
        org: "LAS 101, UIUC",
        kind: "",
        period: "Aug 2025 – Dec 2025",
        place: "",
        detail:
          "Taught Design Your First-Year Experience, the one-credit graded course that gets new students through their first semester at Illinois.",
        metrics: [{ value: "25", label: "students in my section" }] as {
          value: string;
          label: string;
        }[],
        skills: [] as string[],
      },
      {
        title: "Head of Exploration",
        org: "Founders, Illinois Entrepreneurs",
        kind: "",
        period: "Sep 2024 – Dec 2025",
        place: "",
        /* Four numbers were on offer here — 100+ students reached, 200+ at
           Exploring Entrepreneurship, a team recruited each semester, and
           4x participation. The multiplier wins the large slot because it
           is the only one that describes a change rather than a count. */
        /* No Antler here. It has the photographs and the full description at
           the top of this same section, and saying it twice in one band
           makes the role look thinner than it was rather than fuller. What
           is left is the part nothing else covers. */
        detail:
          "Recruited a cross-disciplinary team to launch new projects each semester, and built the Exploring Entrepreneurship series for non-startup majors.",
        metrics: [{ value: "4×", label: "growth in participation" }] as {
          value: string;
          label: string;
        }[],
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
    /* The Block I, on white, the same way the three company marks are
       squares carrying their own background. The auditorium sticker is
       deliberately not here: it is a drawing, and every other image on
       this page is a real thing — a photograph, a plot, a company's own
       mark. One illustration would read as clip art beside them. */
    logo: "/logos/illinois.webp",
    degree: "BS Liberal Arts & Sciences",
    /* Two majors, as the transcript records them. */
    majors: "Astronomy + Data Science · Statistics",
    /* Deliberately blank. "2023 – present" dates you on a page whose whole
       case is the work, and the pane reads cleaner without a lone label
       floating on the right. Put a range back here and it renders again. */
    period: "",
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
      "I combine tools, taste and storytelling to make things feel alive. That is the actual skill, not any single tool, and not waiting until I am an expert in one.",
      "It shows up across everything here: AI video made with whatever gets the idea across, side projects shipped instead of planned, molecular-line astronomy, and the discipline competitive archery beats into you.",
      "Expert nahi, par ready hoon.",
    ],
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
