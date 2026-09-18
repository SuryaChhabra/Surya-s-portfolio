/**
 * The spectrum, in order, with the section each wavelength carries.
 *
 * One list drives three things, which is the whole point: the colours that
 * come out of the prism, the order you meet the sections in, and the colour
 * each section paints the page once the light has landed. Scrolling travels
 * down the rainbow — red first, then orange, and so on. No labels are drawn
 * in the 3D scene; only light. Every word lives in ordinary HTML.
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
  kicker: string;
  line: string;
  body: string;
};

export const BANDS: Band[] = [
  {
    id: "intro",
    color: "#ff3b30",
    deep: "#8f1109",
    accent: "#ffa7a2",
    tone: "dark",
    angle: -10,
    kicker: "Red",
    line: "I keep ending up somewhere new.",
    body: "Growth and creative work, AI video, molecular-line astronomy, competitive archery. From outside it looks like scatter. It isn't.",
  },
  {
    id: "experience",
    color: "#ff8a2b",
    deep: "#8a3a02",
    accent: "#ffc393",
    tone: "dark",
    angle: -19,
    kicker: "Orange",
    line: "Work experience.",
    body: "",
  },
  {
    id: "video",
    color: "#ffd23d",
    deep: "#ffd23d",
    accent: "#6b4a00",
    tone: "light",
    angle: -28,
    kicker: "Yellow",
    line: "AI video.",
    body: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead — Suno, Runway, CapCut. 208,000 people reached, 99% of them outside my network.",
  },
  {
    id: "built",
    color: "#4ade80",
    deep: "#0d5c2e",
    accent: "#65e393",
    tone: "dark",
    angle: -37,
    kicker: "Green",
    line: "Things I've shipped.",
    body: "Lumiere, Offbeat and Karmic Connections — built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "research",
    color: "#38bdf8",
    deep: "#0d4677",
    accent: "#54c6f9",
    tone: "dark",
    angle: -46,
    kicker: "Blue",
    line: "Astronomy.",
    body: "Continuum imaging, position–velocity diagrams and rotating-disk fits — measuring the mass of a young star from how the gas around it turns.",
  },
  {
    id: "sport",
    color: "#a78bfa",
    deep: "#412e88",
    accent: "#bba6fb",
    tone: "dark",
    angle: -55,
    kicker: "Violet",
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
 * Every colour below is checked against its own field: headings clear 9:1,
 * body copy clears 6:1 and the accent clears 5:1. That is what lets a band
 * invert without anything else in the page having to know it did.
 */
export function tones(band: Band) {
  const light = band.tone === "light";
  return {
    /** Headings and anything that has to be unmissable. */
    ink: light ? "#241a00" : "#ffffff",
    /** Body copy. */
    body: light ? "rgba(36,26,0,0.82)" : "rgba(255,255,255,0.82)",
    /** Labels, captions, anything deliberately quiet. */
    muted: light ? "rgba(36,26,0,0.62)" : "rgba(255,255,255,0.64)",
    /** A pane of the same glass the light came through. */
    pane: light
      ? "rounded-2xl border border-black/15 bg-white/30 backdrop-blur-[2px]"
      : "rounded-2xl border border-white/20 bg-black/25 backdrop-blur-[2px]",
    /** Hairlines and dividers. */
    rule: light ? "rgba(36,26,0,0.22)" : "rgba(255,255,255,0.20)",
    hover: light ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
  };
}
