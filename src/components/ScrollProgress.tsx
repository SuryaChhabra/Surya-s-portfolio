"use client";

import { useEffect, useState } from "react";

/** A spectrum bar across the top that fills as the page is read. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      /* A page shorter than the viewport has nothing to report. */
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    /* Coalesce scroll events into one measurement per frame. */
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px]"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="rainbow-bg h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          /* Transform-only so this never triggers layout while scrolling. */
          transition: "transform 80ms linear",
        }}
      />
    </div>
  );
}
