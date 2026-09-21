/**
 * The spectrum, in order, with the section each wavelength carries.
 *
 * Seven, not six: a prism gives ROYGBIV, and the seventh band is what makes
 * room for education without pushing anything off the page. The cool end is
 * deliberately spaced wide — blue leans cyan, indigo stays true blue-violet
 * and violet leans magenta — because three adjacent cool fields that look
 * alike read as a rendering fault rather than a spectrum.
 *
 * One list drives four things: the colours out of the prism, the order you
 * meet the sections in, the colour each section paints the page, and the
 * nav. No labels are drawn in the 3D scene; only light.
 */
export type Band = {
  id: string;
  /** The wavelength itself: the ray out of the prism, and the section accent. */
  color: string;
  /**
   * The field the section sits on. Deep enough for white text at 7:1 or
   * better, and no deeper — the point is that the page is unmistakably this
   * colour, not that it is black with a hint of one.
   */
  deep: string;
  /**
   * The wavelength again, adjusted until it can be *read* on `deep`. The
   * vivid colour manages about 2.3:1 on its own field, so it can fill a
   * shape but never carry a word.
   */
  accent: string;
  /**
   * Whether `deep` is dark enough for white text. Yellow is the one hue that
   * cannot be both dark and recognisably itself, so it inverts: a bright gold
   * field with near-black ink, which is also what the middle of a real
   * spectrum looks like.
   */
  tone: "dark" | "light";
  /** Angle of this band below the incoming beam, in degrees. */
  angle: number;
  /**
   * Where this colour actually sits in the visible spectrum, in nanometres.
   *
   * Nothing renders from this any more — it drove the spacing of the
   * continuous ramp, and every ramp has now been taken off the page. It
   * stays because it is the record that keeps the order honest: the bands
   * have to descend in wavelength for the fan to mean anything, and when
   * archery was removed it is what said what colour astronomy should take
   * to cover both of the wavelengths it now stands for.
   */
  nm: number;
  /** What this band is called in the nav — the subject, not the wavelength. */
  nav: string;
  line: string;
  body: string;
  /** Sections that say their piece in less than a screen. */
  compact?: boolean;
};

export const BANDS: Band[] = [
  {
    id: "growth",
    color: "#ff3b30",
    deep: "#240d0f",
    accent: "#ffa7a2",
    tone: "dark",
    angle: -10,
    nm: 660,
    nav: "Growth",
    line: "Growth.",
    /* Not a list of the three companies — the three cards under this are
       already that. The body's job is the thing the cards cannot say.
       That thing is the difference, not the overlap. Two earlier versions
       tried to name one job all three shared — first "what gets people to
       show up", then "building the thing that brings people in" — and both
       were wrong the same way: only the title repeats. The remits differ
       and so do the audiences, and a storefront's shoppers, a health
       movement's followers and a craft studio's buyers are not reached by
       one playbook. Claiming they are makes three roles look like one. */
    body: "Three growth roles, not the same job three times. A Bay Area startup, India's largest health movement, an early-stage craft studio. No two share an audience, and the work followed the audience.",
  },
  {
    id: "video",
    color: "#ff8a2b",
    /* Orange is the second hue that cannot be dark and still be itself: at
       the luminance white text needs, orange is brown, and sitting directly
       under the red band it read as another red. So it inverts too — a
       bright orange field with near-black ink. The warm middle of a real
       spectrum is its brightest part, which is what this now looks like. */
    deep: "#24170f",
    accent: "#ffc08a",
    tone: "dark",
    angle: -18,
    nm: 610,
    nav: "Video",
    line: "AI video.",
    /* This used to be OFF/BEAT's story, which was fine while OFF/BEAT was
       the only card with any copy on it. It is not any more: the section
       now opens with a client brief, so a heading describing the second
       card was introducing the wrong film. */
    body: "It started as an experiment: one application video, made with tools I had not used before. Now it is how I make the case for a thing, whether that thing is a product, a brand or me.",
  },
  /* Built sits third and education fifth, which is the other way round
     from how this page first read.

     The order is the argument. A founder scanning this decides in the
     first three sections whether to keep going, and those three should
     all be work: what the growth roles produced, the films, then the
     things shipped. Education was sitting in the third slot — a degree
     and a list of course titles, in the one position on the page where
     momentum is worth the most. It is the least persuasive section here
     and it was placed as though it were the most.

     Credentials are not persuasion; they are verification, and people
     verify after they are interested. So education moves down to sit
     with the research, where somebody already convinced goes to check
     who they are dealing with.

     The wavelengths stay where they are — the spectrum has to run red to
     violet down the page whatever occupies each band — so the two
     sections swap colours along with positions. Built is the gold band
     now and education the blue one. */
  {
    id: "built",
    color: "#ffd23d",
    deep: "#241f11",
    accent: "#ffe38a",
    tone: "dark",
    angle: -26,
    nm: 580,
    nav: "Built",
    line: "Things I've shipped.",
    /* Not a list of the rows underneath, which is what it was before
       Collectiv arrived and immediately made it wrong. The split it names
       now — one thing judged, three things nobody asked for — is the thing
       the rows cannot say for themselves. */
    body: "First place at a product hackathon, and three things nobody asked me to make. Built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "leading",
    color: "#4ade80",
    deep: "#0e2119",
    accent: "#65e393",
    tone: "dark",
    angle: -34,
    nm: 540,
    nav: "Leading",
    line: "Leading, and the rooms it happened in.",
    body: "",
  },
  {
    id: "education",
    color: "#38bdf8",
    deep: "#0c1d27",
    accent: "#5fd0fb",
    tone: "dark",
    angle: -42,
    nm: 480,
    nav: "Education",
    line: "",
    body: "",
    compact: true,
  },
  {
    id: "research",
    /* Indigo and violet, averaged.
       Archery was the violet band and it has been taken off the site, so
       the spectrum would otherwise have stopped at indigo and left the
       short end missing. Rather than pretend six bands were always the
       plan, this band now carries both wavelengths — colour, angle and
       nanometres are each the midpoint of the two it replaces, so the fan
       still reaches the end of what an eye can see. */
    color: "#9275f7",
    deep: "#171427",
    accent: "#c6b4fb",
    tone: "dark",
    angle: -54,
    nm: 430,
    nav: "Research",
    line: "Astronomy.",
    /* Question first, instruments second. An earlier version opened on
       ALMA, IRS3B and CASA, which spends three proper nouns before anyone
       has a reason to care; this keeps the idea in front and lets the
       specifics land once they mean something. CASA is still left out —
       four proper nouns in one paragraph is where the first version went
       wrong, and the imaging craft belongs beside the panels, not here. */
    body: "Gravity predicts how gas should spin around a forming star. Subtract that from what the telescope sees, and whatever refuses to cancel out is the interesting part. I track that residual with Python and statistics, on ALMA radio-interferometry data for IRS3B, a triple protostar system.",
  },
];

/**
 * What the page sits on before the light is out, and again at the end.
 *
 * The opening stays near-black on purpose: the prism act is the serious part
 * and it needs the dark to read as glass in space at all. Everything after it
 * is the colour the glass produced, which is where the page gets loud.
 */
export const VOID_DEEP = "#05060a";

export const BAND_BY_ID = Object.fromEntries(BANDS.map((b) => [b.id, b])) as
  Record<string, Band>;

/**
 * The closing field: white, because that is what the seven make when you
 * put them back together.
 *
 * Properly white, and that is the whole point of this entry. It was
 * `#f6f5f1`, a cream, and the background painted its washes over the top —
 * including a large black radial that exists to protect the headings on
 * the dark bands and did nothing here but smear the corner grey. Seven
 * saturated sections and then a dirty off-white is not a resolution; it
 * looks like a rendering fault.
 *
 * So this field gets no light on it at all. Everywhere else the colour
 * arrives as spotlights against the dark; here there is nothing to light,
 * because white is already all of it. The background knows to leave it
 * alone — see `plain` in SpectrumBackground.
 *
 * Deliberately not in BANDS. It is not a wavelength, so it gets no ray out
 * of the prism, no nav link and no dot on the rail — only a field, which is
 * why the background looks here as well as in the spectrum.
 */
export const CLOSING: Band = {
  id: "close",
  color: "#ffffff",
  deep: "#ffffff",
  accent: "#1a1a1f",
  tone: "light",
  angle: 0,
  /* White is every wavelength at once, so no single number is right. This
     is the midpoint of the visible band, and nothing reads it: CLOSING is
     never in BANDS, which is the only place `nm` is used. */
  nm: 545,
  nav: "Close",
  line: "",
  body: "",
};

/** Every field the page can sit on, wavelength or not. */
export const FIELD_BY_ID: Record<string, Band> = {
  ...BAND_BY_ID,
  [CLOSING.id]: CLOSING,
};

/**
 * How to paint on a band.
 *
 * Every colour below is checked against its own field: headings clear 7.8:1,
 * body copy clears 5.8:1 and the accent clears 5:1. That is what lets a band
 * invert without anything else in the page having to know it did.
 */
export function tones(band: Band) {
  const light = band.tone === "light";
  /* The warm near-black is right on orange and gold and wrong on white,
     where it reads as a printing error rather than a colour. */
  const neutral = band.id === "close";
  const inkRgb = neutral ? "20,20,24" : "40,23,0";
  return {
    /** Headings and anything that has to be unmissable. */
    ink: light ? (neutral ? "#14141a" : "#281700") : "#ffffff",
    /** Body copy. */
    body: light ? `rgba(${inkRgb},0.84)` : "rgba(255,255,255,0.82)",
    /** Labels, captions, anything deliberately quiet. */
    muted: light ? `rgba(${inkRgb},0.6)` : "rgba(255,255,255,0.64)",
    /**
     * A pane of the same glass the light came through.
     *
     * No `border`: the edge is drawn by `.pane-lit`, which carries a
     * gradient so the side facing the beam is brighter than the rest. The
     * translucency is unchanged from when the field contrasts were last
     * measured — the point here is the edge, not more frost.
     */
    pane: light
      ? "rounded-2xl pane-lit bg-white/30 backdrop-blur-[2px]"
      : "rounded-2xl pane-lit bg-black/25 backdrop-blur-[2px]",
    /** The lit side of the edge, and the rest of the way round. */
    edgeHi: light ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.46)",
    edgeLo: light ? `rgba(${inkRgb},0.15)` : "rgba(255,255,255,0.18)",
    /** Hairlines and dividers. */
    rule: light ? `rgba(${inkRgb},0.18)` : "rgba(255,255,255,0.20)",
    hover: light ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
  };
}

/**
 * Bands the page will actually render.
 *
 * The spectrum always has seven colours — the prism does not care what has
 * been written yet — but a nav link or a rail dot pointing at a section that
 * returns null is a dead end. `empty` names the ids to skip.
 */
export function visibleBands(empty: readonly string[]) {
  return BANDS.filter((b) => !empty.includes(b.id));
}
