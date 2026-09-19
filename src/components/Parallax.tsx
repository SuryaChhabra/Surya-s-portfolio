"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its child slower than the page, so a photograph reveals different
 * parts of itself as you scroll past.
 *
 * Deliberately camera movement and nothing else. The alternative for a still
 * of someone mid-action is to animate the subject — a drawn arrow, a zoom
 * that implies the shot was taken — and every one of those claims something
 * the photograph does not show. Shifting the frame is honest: the picture is
 * still a picture, you are just seeing more of it.
 *
 * The child is rendered taller than the frame and slid within it, so there
 * is always something to reveal and no edge can ever come into view.
 */
export function Parallax({
  children,
  /** How far the image travels across a full pass, as a share of its height. */
  amount = 0.08,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = frame.current;
    const target = inner.current;
    if (!box || !target) return;

    /* Someone who asked for less motion gets the still frame, centred. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let queued = 0;

    const measure = () => {
      queued = 0;
      if (reduced.matches) {
        target.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      const r = box.getBoundingClientRect();
      /* -1 when the frame is just below the fold, +1 when just above it.
         Clamped, so the transform never runs away on a long section. */
      const span = window.innerHeight + r.height;
      const progress = Math.max(-1, Math.min(1, 1 - (r.top + r.height) / span * 2));
      const travel = r.height * amount * progress;
      target.style.transform = `translate3d(0, ${travel.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", measure);
    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", measure);
    };
  }, [amount]);

  return (
    <div ref={frame} className={className}>
      {/* Oversized by a third more than the travel on each side. Matching
          the travel exactly leaves zero slack, and a subpixel rounding error
          at either end of the pass would then show a hairline of the field
          through the top or bottom edge of the photograph. */}
      <div
        ref={inner}
        className="absolute inset-0"
        style={{
          top: `${-amount * 133}%`,
          bottom: `${-amount * 133}%`,
          height: "auto",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
