"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { HeroScene } from "./HeroScene";

/** Renders *starred* words in the display serif italic. */
function Line({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="serif-em rainbow-text">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden px-4 sm:px-6">
      <HeroScene />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[86svh] max-w-6xl flex-col justify-center py-20">
        <motion.p
          className="label pointer-events-auto mb-8 flex w-fit items-center gap-2"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--sp-green)" }}
          />
          {site.hero.availability}
        </motion.p>

        <h1 className="pointer-events-auto w-fit max-w-4xl text-[clamp(2.75rem,10vw,7rem)] font-medium leading-[0.92] tracking-[-0.035em]">
          {site.hero.lines.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={reduced ? false : { opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.1,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              <Line text={line} />
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="pointer-events-auto mt-10 flex max-w-xl flex-col gap-7"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
            {site.hero.blurb}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
            >
              See the work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-paper-2"
            >
              Work with me
            </a>
            <span className="label ml-1">{site.location}</span>
          </div>
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
      <motion.div
        className="label flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>scroll</span>
        <span
          className="block h-6 w-px"
          style={{ backgroundColor: "var(--line)" }}
        />
      </motion.div>
    </div>
  );
}
