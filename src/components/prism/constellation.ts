import { buildIndex, type Domain } from "@/content/index-items";

/** Spectrum in three.js-friendly hex, ordered as light disperses. */
export const SPECTRUM = [
  "#ff4d3d", "#ff8a2b", "#f5b301", "#a3e635",
  "#2fd8a4", "#22d3ee", "#4d9fff", "#9b7bff",
];

export const DOMAIN_COLOR: Record<Domain, string> = {
  video: "#ff4d8d",
  research: "#22d3ee",
  code: "#9b7bff",
  sport: "#f5b301",
  event: "#2fd8a4",
};

export type Star = {
  id: string;
  title: string;
  domain: Domain;
  color: string;
  /** Where it lands once the dispersion resolves. */
  position: [number, number, number];
};

/* Hand-placed so the scatter resolves into a shape rather than noise — a
   random cloud reads as mess, and the whole point is that the points turn
   out to be connected. */
const LAYOUT: [number, number, number][] = [
  [-4.6, 2.4, -2], [-2.2, 3.1, 0.5], [0.4, 2.2, -1.2], [2.9, 3.0, 0.8],
  [5.0, 1.6, -1.6], [3.4, -0.2, 1.2], [1.0, 0.4, -0.4], [-1.4, 0.9, 1.6],
  [-3.8, -0.4, -0.8], [-1.9, -2.2, 0.6], [1.6, -2.6, -1.4], [4.2, -2.0, 1.0],
];

/** Which points the constellation joins, in draw order. */
export const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7], [7, 1],
  [7, 8], [8, 9], [9, 10], [10, 11], [11, 5],
  [6, 10],
];

export function buildStars(): Star[] {
  return buildIndex()
    .slice(0, LAYOUT.length)
    .map((item, i) => ({
      id: item.id,
      title: item.title,
      domain: item.domain,
      color: DOMAIN_COLOR[item.domain],
      position: LAYOUT[i],
    }));
}
