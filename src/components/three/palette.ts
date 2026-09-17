/* Candy-clay palette for the 3D scene — deliberately more saturated than the
   page's surface colours, so the shapes read as objects sitting on the paper
   rather than as part of it. */
export const SHAPE_COLORS = {
  coral: "#ff5e3a",
  violet: "#7c5cff",
  mint: "#2fd8a4",
  butter: "#ffc53d",
  pink: "#ff4d8d",
  cyan: "#22d3ee",
} as const;

export type ShapeColor = keyof typeof SHAPE_COLORS;
