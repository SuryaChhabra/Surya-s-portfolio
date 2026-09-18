/**
 * The spectrum, in order, with the section each wavelength carries.
 *
 * Scrolling travels down the rainbow: red first, then orange, and so on.
 * No labels are drawn in the scene — only light. The copy for the active
 * band appears as ordinary HTML beside it.
 */
export type Band = {
  id: string;
  color: string;
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
    angle: -8,
    kicker: "Red",
    line: "I keep ending up somewhere new.",
    body: "Growth and creative work, AI video, molecular-line astronomy, competitive archery. From outside it looks like scatter. It isn't.",
  },
  {
    id: "experience",
    color: "#ff8a2b",
    angle: -14,
    kicker: "Orange",
    line: "Work experience.",
    body: "",
  },
  {
    id: "video",
    color: "#ffd23d",
    angle: -20,
    kicker: "Yellow",
    line: "AI video.",
    body: "OFF/BEAT asked for a 60-second application video. I made a mini music-video instead — Suno, Runway, CapCut. 208,000 people reached, 99% of them outside my network.",
  },
  {
    id: "built",
    color: "#4ade80",
    angle: -26,
    kicker: "Green",
    line: "Things I've shipped.",
    body: "Lumiere, Offbeat and Karmic Connections — built, deployed, live. Version one beats a plan every time.",
  },
  {
    id: "research",
    color: "#38bdf8",
    angle: -32,
    kicker: "Blue",
    line: "Astronomy.",
    body: "Continuum imaging, position–velocity diagrams and rotating-disk fits — measuring the mass of a young star from how the gas around it turns.",
  },
  {
    id: "sport",
    color: "#a78bfa",
    angle: -38,
    kicker: "Violet",
    line: "Competitive archery.",
    body: "The discipline underneath everything else here. Same draw, same anchor, every arrow.",
  },
];
