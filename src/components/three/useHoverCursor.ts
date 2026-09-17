"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Tracks whether any 3D shape is currently hovered, so the host element can
 * swap its CSS cursor.
 *
 * Deliberately kept in its own module, free of any three.js import: the hero
 * wrapper needs this hook eagerly, and pulling it from the scene module would
 * drag the whole 3D bundle into the initial page load.
 */
export function useHoverCursor() {
  const [hovering, setHovering] = useState(false);
  /* Shapes can overlap, so count enter/leave pairs instead of using a boolean —
     leaving one shape onto another must not clear the cursor. */
  const count = useRef(0);

  const onHoverChange = useCallback((entering: boolean) => {
    count.current = Math.max(0, count.current + (entering ? 1 : -1));
    setHovering(count.current > 0);
  }, []);

  return { hovering, onHoverChange };
}
