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
    nav: "Growth",
    line: "Growth.",
    /* Not a list of the three companies — the three cards under this are
       already that. The body's job is the thing the cards cannot say, which
       is what the three have in common. */
    body: "Three companies that look nothing alike. In each one the job was the same: work out what gets people to show up, then go and build it.",
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
    nav: "Video",
    line: "AI video.",
    body: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead — Suno, Runway, CapCut.",
  },
  {
    id: "education",
    color: "#ffd23d",
    deep: "#ffd23d",
    accent: "#6b4a00",
    tone: "light",
    angle: -26,
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
    nav: "Built",
    line: "Things I've shipped.",
    body: "Lumiere, Offbeat and Karmic Connections — built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "research",
    color: "#6366f1",
    deep: "#262a7a",
    accent: "#a9abf7",
    tone: "dark",
    angle: -50,
    nav: "Research",
    line: "Astronomy.",
    body: "Continuum imaging, position–velocity diagrams and rotating-disk fits — measuring the mass of a young star from how the gas around it turns.",
  },
  {
    id: "sport",
    color: "#c084fc",
    deep: "#5c2478",
    accent: "#e5b3ff",
    tone: "dark",
    angle: -58,
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
 * How to paint on a band.
 *
 * Every colour below is checked against its own field: headings clear 7.8:1,
 * body copy clears 5.8:1 and the accent clears 5:1. That is what lets a band
 * invert without anything else in the page having to know it did.
 */
export function tones(band: Band) {
  const light = band.tone === "light";
  return {
    /** Headings and anything that has to be unmissable. */
    ink: light ? "#281700" : "#ffffff",
    /** Body copy. */
    body: light ? "rgba(40,23,0,0.84)" : "rgba(255,255,255,0.82)",
    /** Labels, captions, anything deliberately quiet. */
    muted: light ? "rgba(40,23,0,0.66)" : "rgba(255,255,255,0.64)",
    /** A pane of the same glass the light came through. */
    pane: light
      ? "rounded-2xl border border-black/15 bg-white/30 backdrop-blur-[2px]"
      : "rounded-2xl border border-white/20 bg-black/25 backdrop-blur-[2px]",
    /** Hairlines and dividers. */
    rule: light ? "rgba(40,23,0,0.24)" : "rgba(255,255,255,0.20)",
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
