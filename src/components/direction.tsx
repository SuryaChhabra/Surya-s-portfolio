"use client";

import { useEffect, useState } from "react";

/**
 * Design directions. Each one is a complete visual treatment — palette, type,
 * radius, shadow, grain — applied by setting `data-direction` on <html>. The
 * token overrides live in `src/app/directions.css`; the only thing that cannot
 * be expressed in CSS is whether the hero runs its 3D scene, which is why
 * `scene` lives here.
 */
export type Direction = {
  id: string;
  label: string;
  blurb: string;
  scene: boolean;
};

export const DIRECTIONS: Direction[] = [
  {
    id: "prism",
    label: "Prism",
    blurb: "Warm clay paper, full rainbow, floating 3D candy.",
    scene: true,
  },
  {
    id: "bloom",
    label: "Bloom",
    blurb: "Soft sage and blush, very round, muted spectrum.",
    scene: true,
  },
  {
    id: "neon",
    label: "Neon",
    blurb: "Near-black techno, grotesk type, electric spectrum.",
    scene: true,
  },
  {
    id: "press",
    label: "Press",
    blurb: "Editorial broadsheet, serif throughout, one ink red.",
    scene: false,
  },
  {
    id: "mono",
    label: "Mono",
    blurb: "Swiss grid, square corners, a single signal red.",
    scene: false,
  },
];

const DEFAULT = DIRECTIONS[0];
const STORAGE_KEY = "direction";

/* Everything that needs the current direction subscribes to this, so the
   switcher and the hero never disagree about which one is active. */
const listeners = new Set<(id: string) => void>();

export function setDirection(id: string) {
  const root = document.documentElement;
  if (id === DEFAULT.id) root.removeAttribute("data-direction");
  else root.setAttribute("data-direction", id);

  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* Private windows can refuse storage; the choice still applies here. */
  }
  for (const notify of listeners) notify(id);
}

export function useDirection(): Direction {
  const [id, setId] = useState(DEFAULT.id);

  useEffect(() => {
    setId(document.documentElement.getAttribute("data-direction") ?? DEFAULT.id);
    listeners.add(setId);
    return () => {
      listeners.delete(setId);
    };
  }, []);

  return DIRECTIONS.find((d) => d.id === id) ?? DEFAULT;
}
