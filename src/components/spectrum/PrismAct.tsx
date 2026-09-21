"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BANDS } from "@/components/prism/bands";
import { site } from "@/content/site";

const PrismIntro = dynamic(
  () => import("@/components/prism/PrismIntro").then((m) => m.PrismIntro),
  { ssr: false },
);

/**
 * The opening act: a glass prism held in the frame while you scroll through
 * it. The scroll does three things in order — the prism turns, a white beam
 * arrives and gets through the glass, and the spectrum opens out. When the
 * light is fully out the act releases the page, and the sections below pick
 * up the colours one at a time.
 *
 * It is a sticky frame inside a tall section rather than a fixed overlay, so
 * the handoff is just the document scrolling on. Nothing has to be unmounted
 * at the right moment and nothing can end up stuck over the content.
 */
export function PrismAct() {
  const progress = useRef(0);
  const active = useRef(0);
  const [phase, setPhase] = useState(0);
  const [pinned, setPinned] = useState(true);
  const [mode, setMode] = useState<"pending" | "full" | "lite" | "still">("pending");
  const frame = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  /* Three ways this can run, decided once on mount: the full scene, a
     cheaper one on phones (transmission is the single most expensive thing
     here), or no scene at all when WebGL is missing or motion is unwelcome. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return setMode("still");

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    if (!webgl) return setMode("still");

    const small = window.matchMedia("(max-width: 820px)").matches;
    setMode(small ? "lite" : "full");
  }, []);

  /* One rAF-throttled reader for the whole act. The ref is what the 3D
     samples every frame; the state is only for the DOM copy, so it changes
     a handful of times rather than on every scroll event. */
  useEffect(() => {
    let queued = 0;

    const measure = () => {
      queued = 0;
      const el = section.current;
      if (!el) return;

      const travel = el.offsetHeight - window.innerHeight;
      const t =
        travel > 0
          ? Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / travel))
          : 0;
      progress.current = t;

      /* The band the light is currently on, once it is through the glass. */
      const into = Math.max(0, (t - 0.25) / 0.6);
      active.current = Math.min(BANDS.length - 1, Math.floor(into * BANDS.length));

      /* Quantised so the copy crossfades in steps rather than on every pixel. */
      const next = Math.round(t * 20) / 20;
      setPhase((p) => (p === next ? p : next));
    };

    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Stop rendering the scene the moment the frame leaves the viewport.
     Transmission is the most expensive thing on the page — it has no
     business running while someone is reading the sections below. */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPinned(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Intro copy owns the frame at the start and clears out as the light
     builds, so nothing is ever competing with the spectrum. */
  const introOut = clamp((phase - 0.2) / 0.22);
  const outroIn = clamp((phase - 0.82) / 0.14);

  return (
    <section
      ref={section}
      aria-label="Introduction"
      /* The runway lives in CSS — see `.prism-runway` in globals.css — so
         it can differ by screen size without a first-paint jump. With no
         scene to scroll through there is nothing to pin, so that case
         collapses to a single screen. */
      className={mode === "still" ? "relative h-[100svh]" : "prism-runway relative"}
    >
      <div ref={frame} className="sticky top-0 h-[100svh] overflow-hidden">
        {mode === "full" || mode === "lite" ? (
          <PrismIntro
            progress={progress}
            active={active}
            pinned={pinned}
            lite={mode === "lite"}
          />
        ) : null}

        {/* No WebGL, or motion turned down: the spectrum is stated flat
            rather than animated, and the page below is unchanged. */}
        {mode === "still" ? <StillSpectrum /> : null}

        {/* The opening has to do the whole job on its own: who, what, and
            two ways to act on it. The glass is the argument, but nobody
            hires a prism. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end"
          style={{
            opacity: 1 - introOut,
            transform: `translateY(${introOut * -24}px)`,
            transition: "opacity 500ms linear, transform 500ms linear",
          }}
        >
          {/* The cue is pinned to the floor now, so the copy has to clear it
                rather than sit where it used to. */}
            <div className="mx-auto w-full max-w-6xl px-5 pb-32 sm:px-10 sm:pb-[19vh]">
            {/* Narrow on purpose: the glass owns the right of the
                frame, and a wider column runs underneath it. */}
            {/* Centred inside the text column, not inside the viewport.
                The glass sits centre-right of the frame; a block centred on
                the screen would land on top of it. */}
            <div className="max-w-md text-center">
              {/* Circular, and a circle is the reason this can be centred
                  at all: a rounded rectangle above a line of type reads as
                  an app icon sitting on the page, while a circle above a
                  name is the oldest arrangement there is for saying that a
                  person is speaking. */}
              <Image
                src={site.headshot.src}
                alt={site.headshot.alt}
                width={144}
                height={144}
                priority
                /* Bigger on a wide screen than on a phone, and not by a
                   little. On the desktop frame there is room beside the
                   glass for the portrait to be a presence rather than a
                   token; on a phone the glass is directly above it and
                   every extra pixel closes the gap to its bottom edge. */
                className="mx-auto mb-5 h-[5.5rem] w-[5.5rem] rounded-full object-cover sm:mb-6 sm:h-36 sm:w-36"
                style={{
                  border: "1px solid rgba(255,255,255,0.26)",
                  boxShadow: "0 14px 40px -16px rgba(0,0,0,0.8)",
                }}
              />

              <h1 className="text-[clamp(2.2rem,5.4vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
                {site.name}
              </h1>

              {/* Two lines and nothing else. The first says what the work
                  is, because that is what someone is here to find out; the
                  second says how it gets done. The range is the page's job
                  to show — seven sections, seven colours — not this paragraph's
                  job to list, and a list here would read as a CV anyway. */}
              <p className="mt-4 text-[clamp(1.3rem,2.2vw,1.8rem)] font-medium leading-[1.18] tracking-[-0.028em] text-white">
                {site.hero.lead}
              </p>
              <p
                className="mt-3.5 text-[clamp(1rem,1.25vw,1.14rem)] leading-[1.55]"
                style={{ color: "rgba(255,255,255,0.84)" }}
              >
                {site.hero.sub}
              </p>

              <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
                {/* The first band, not a favourite one. This pointed at
                    #video while the films were the newest thing here, and
                    the effect was that the one button on the opening screen
                    skipped the first section of the page: growth is the
                    longest-running work and the reason the rest exists, and
                    anyone who took the shortcut never saw it. The button
                    means "start", so it goes to the start. */}
                <a
                  href="#growth"
                  className="r-pill px-7 py-3.5 text-[0.95rem] font-medium text-[#0b0b10] transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  See the work
                </a>
                <a
                  href="#contact"
                  className="r-pill border px-7 py-3.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  Get in touch
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* The cue gets the floor to itself. It is the only instruction on
            the page, and the one thing a visitor has to act on for any of
            the rest to happen, so it is not a footnote under the buttons.

            The spectrum bar does more work here than any icon: it is the
            seven colours, at a size you cannot miss, directly under the words
            that promise them. The arrow only says which way. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            opacity: 1 - introOut,
            transition: "opacity 500ms linear",
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-5 pb-9 sm:px-10 sm:pb-12">
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border"
                style={{
                  borderColor: "rgba(255,255,255,0.32)",
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0))",
                }}
              >
                <svg
                  className={mode === "still" ? undefined : "cue-arrow"}
                  width="19"
                  height="21"
                  viewBox="0 0 16 18"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 1v15M2 10l6 6 6-6" />
                </svg>
              </span>

              <span className="min-w-0">
                <span className="block text-[clamp(1.25rem,2vw,1.65rem)] font-medium leading-tight tracking-[-0.025em] text-white">
                  {mode === "still" ? site.hero.cueStill : site.hero.cue}
                </span>
                <span
                  className="mt-2 block text-[clamp(1.05rem,1.45vw,1.28rem)] leading-snug"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {site.hero.cueSub}
                </span>

              </span>
            </div>
          </div>
        </div>

        {/* Once the spectrum is out, the frame hands over to the sections. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ opacity: outroIn, transition: "opacity 400ms linear" }}
        >
          {/* This was a legend: seven coloured rules, each labelled with
              its band name, over "Each colour below is a section." It was
              the worst thing on the page twice over. As copy it explained
              the device instead of trusting it, and a prism that needs a
              key is not working. As a shape it was seven equal stripes in
              spectral order with nothing around them to say they were
              light, which is the single most flag-like object the site
              had — and it appeared at full width, at the exact moment the
              act handed over.

              What replaces it does the handoff instead of narrating it:
              the first band's own colour, and the name of what is next. */}
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-10 sm:pb-16">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="block h-[3px] w-10"
                style={{ backgroundColor: BANDS[0].color }}
              />
              <span className="label" style={{ color: "rgba(255,255,255,0.62)" }}>
                First
              </span>
            </div>
            <p
              className="mt-3 text-[clamp(1.15rem,1.7vw,1.45rem)] font-medium leading-tight tracking-[-0.02em] text-white"
            >
              {BANDS[0].line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** The spectrum with no motion in it, for when the scene cannot or should not run. */
function StillSpectrum() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-end justify-end">
      <div className="flex h-2/3 w-full max-w-xl origin-bottom-right -rotate-6 gap-1 pr-6 opacity-70 sm:pr-12">
        {BANDS.map((b) => (
          <span
            key={b.id}
            className="flex-1 rounded-full"
            style={{
              background: `linear-gradient(to top, transparent, ${b.color})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
