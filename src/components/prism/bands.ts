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
  /** The same colour taken almost to black — what the section sits on. */
  deep: string;
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
    deep: "#1a0605",
    angle: -10,
    kicker: "Red",
    line: "I keep ending up somewhere new.",
    body: "Growth and creative work, AI video, molecular-line astronomy, competitive archery. From outside it looks like scatter. It isn't.",
  },
  {
    id: "experience",
    color: "#ff8a2b",
    deep: "#1b0d03",
    angle: -19,
    kicker: "Orange",
    line: "Work experience.",
    body: "",
  },
  {
    id: "video",
    color: "#ffd23d",
    deep: "#191202",
    angle: -28,
    kicker: "Yellow",
    line: "AI video.",
    body: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead — Suno, Runway, CapCut. 208,000 people reached, 99% of them outside my network.",
  },
  {
    id: "built",
    color: "#4ade80",
    deep: "#04160c",
    angle: -37,
    kicker: "Green",
    line: "Things I've shipped.",
    body: "Lumiere, Offbeat and Karmic Connections — built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "research",
    color: "#38bdf8",
    deep: "#02121f",
    angle: -46,
    kicker: "Blue",
    line: "Astronomy.",
    body: "Continuum imaging, position–velocity diagrams and rotating-disk fits — measuring the mass of a young star from how the gas around it turns.",
  },
  {
    id: "sport",
    color: "#a78bfa",
    deep: "#0d0720",
    angle: -55,
    kicker: "Violet",
    line: "Competitive archery.",
    body: "The discipline underneath everything else here. Same draw, same anchor, every arrow.",
  },
];

/** What the page sits on before the light is out, and again at the end. */
export const VOID_DEEP = "#05060a";

export const BAND_BY_ID = Object.fromEntries(BANDS.map((b) => [b.id, b])) as
  Record<string, Band>;
