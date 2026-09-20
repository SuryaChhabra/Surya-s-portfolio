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
   * Not decoration: `spectrumRamp` spaces its stops by this, which is what
   * makes the ramp uneven the way real dispersion is uneven — a wide red,
   * a sliver of yellow, indigo and violet crowded together at the short
   * end. Equal-width bands are a flag; unequal ones are light.
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
    deep: "#8f1109",
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
    deep: "#ff8a2b",
    accent: "#5c2600",
    tone: "light",
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
  {
    id: "education",
    color: "#ffd23d",
    deep: "#ffd23d",
    accent: "#6b4a00",
    tone: "light",
    angle: -26,
    nm: 580,
    nav: "Education",
    line: "",
    body: "",
    compact: true,
  },
  {
    id: "leading",
    color: "#4ade80",
    deep: "#0d5c2e",
    accent: "#65e393",
    tone: "dark",
    angle: -34,
    nm: 540,
    nav: "Leading",
    line: "Leading, and the rooms it happened in.",
    body: "",
  },
  {
    id: "built",
    color: "#38bdf8",
    deep: "#0a4a6b",
    accent: "#5fd0fb",
    tone: "dark",
    angle: -42,
    nm: 480,
    nav: "Built",
    line: "Things I've shipped.",
    /* Not a list of the rows underneath, which is what it was before
       Collectiv arrived and immediately made it wrong. The split it names
       now — one thing judged, three things nobody asked for — is the thing
       the rows cannot say for themselves. */
    body: "First place at a product hackathon, and three things nobody asked me to make. Built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "research",
    color: "#6366f1",
    deep: "#262a7a",
    accent: "#a9abf7",
    tone: "dark",
    angle: -50,
    nm: 445,
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
  {
    id: "sport",
    color: "#c084fc",
    deep: "#5c2478",
    accent: "#e5b3ff",
    tone: "dark",
    angle: -58,
    nm: 415,
    nav: "Archery",
    line: "Competitive archery.",
    body: "The discipline underneath everything else here. Same draw, same anchor, every arrow.",
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
 * The closing field: white, because that is what the seven make when you put
 * them back together.
 *
 * Deliberately not in BANDS. It is not a wavelength, so it gets no ray out
 * of the prism, no nav link and no dot on the rail — only a field, which is
 * why the background looks here as well as in the spectrum.
 */
export const CLOSING: Band = {
  id: "close",
  color: "#ffffff",
  deep: "#f6f5f1",
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

/**
 * The edges of what an eye can see, in nanometres. Outside this there is
 * still light; there is just nobody to see it.
 */
const VISIBLE = { lo: 390, hi: 700 };

/**
 * The spectrum as one continuous ramp, for the places that show all seven
 * at once without a section attached to them.
 *
 * These were all seven hard-edged blocks of equal width, and a viewer
 * coming to the page cold read that as the pride flag rather than as a
 * spectrum — the colours stopped saying "dispersion" and started saying
 * something about the author that the author had not set out to say. Three
 * things separate the two, and this does all three:
 *
 *   1. No edges. Refracted light is a continuum; a flag is stripes.
 *   2. Unequal spacing. Stops are positioned by `nm`, so the ramp is as
 *      lopsided as the real thing — red sprawls, yellow is a sliver,
 *      indigo and violet pile up at the short end. A flag is even.
 *   3. It dies at both ends. The stops run from 390nm to 700nm and fade to
 *      zero alpha outside the seven, because that is where the eye gives
 *      out. Flags run edge to edge; light does not.
 *
 * Faded with the end colours at zero alpha rather than the `transparent`
 * keyword, which interpolates through transparent *black* and leaves a grey
 * bruise across the first and last tenth of the bar on a light field.
 *
 * The 3D scene is deliberately untouched. It was never the problem — a
 * beam, a piece of glass and a fan of rays read as optics on sight. Only
 * the flattened-out summaries of it in the chrome ever did.
 */
export const SPECTRUM_STOPS: { at: number; color: string; opacity: number }[] =
  (() => {
    const at = (nm: number) =>
      (VISIBLE.hi - nm) / (VISIBLE.hi - VISIBLE.lo);
    return [
      { at: 0, color: BANDS[0].color, opacity: 0 },
      ...BANDS.map((b) => ({ at: at(b.nm), color: b.color, opacity: 1 })),
      { at: 1, color: BANDS[BANDS.length - 1].color, opacity: 0 },
    ];
  })();

export function spectrumRamp(deg = 90) {
  const stops = SPECTRUM_STOPS.map(
    (s) => `${rgba(s.color, s.opacity)} ${(s.at * 100).toFixed(1)}%`,
  );
  return `linear-gradient(${deg}deg, ${stops.join(", ")})`;
}

/**
 * `#rrggbb` plus an alpha, as `rgba()`.
 *
 * Spelt out rather than using eight-digit hex because this string also has
 * to survive Satori, which renders the link preview and whose CSS parser is
 * a good deal narrower than a browser's — it already silently dropped a
 * radial gradient and an `inset` shorthand on this page. `rgba()` is the
 * form both agree on.
 */
function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

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
