"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Fades and lifts its children into view once, when scrolled to.
 *
 * Deliberately no `if (useReducedMotion())` branch returning a plain div.
 * That hook reads a media query, so it is false while the page is rendered
 * on the server and true on the first client render for anyone who has
 * Reduce Motion on. The two renders then disagree about the markup, React
 * reports "some attributes of the server rendered HTML didn't match... this
 * won't be patched up", and the `opacity:0` the server wrote for the
 * animation's start is left on the element with nothing left running to
 * take it off. Every section of the page stays invisible, permanently, for
 * exactly the visitors who asked for less motion.
 *
 * `MotionConfig reducedMotion="user"` does the same job inside the
 * animation instead of around the markup: it drops the transform, keeps the
 * fade, and renders identically on both sides of hydration.
 */
export function Reveal({ children, delay = 0, className }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
