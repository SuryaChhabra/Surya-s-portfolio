"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BANDS } from "@/components/prism/bands";
import { site } from "@/content/site";

const PrismIntro = dynamic(
  () => import("@/components/prism/PrismIntro").then((m) => m.PrismIntro),
  { ssr: false },
);

/** How tall the act is, in viewport heights, including the pinned frame. */
const RUNWAY_VH = 420;

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
      style={{ height: mode === "still" ? "100svh" : `${RUNWAY_VH}vh` }}
      className="relative"
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

        {/* Opening copy: name, one line, and the invitation to scroll. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end"
          style={{
            opacity: 1 - introOut,
            transform: `translateY(${introOut * -24}px)`,
            transition: "opacity 500ms linear, transform 500ms linear",
          }}
        >
          <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-10 sm:pb-24">
            <div className="max-w-md">
              <p className="label" style={{ color: "rgba(255,255,255,0.55)" }}>
                {site.role}
              </p>
              <h1 className="mt-3 text-[clamp(2.4rem,6vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
                {site.name}
              </h1>
              <p
                className="mt-5 text-[1.02rem] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.68)" }}
              >
                One person, six colours. White light goes in; everything I do
                comes out the other side.
              </p>
              <p
                className="mt-8 flex items-center gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span
                  className="inline-block h-4 w-[1px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
                />
                {mode === "still"
                  ? "Six colours, six sections — keep scrolling"
                  : "Scroll to split the light"}
              </p>
            </div>
          </div>
        </div>

        {/* Once the spectrum is out, the frame hands over to the sections. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ opacity: outroIn, transition: "opacity 400ms linear" }}
        >
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-10 sm:pb-16">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {BANDS.map((b) => (
                <span key={b.id} className="flex items-center gap-2">
                  <span
                    className="block h-1.5 w-8 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
                  <span
                    className="label"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {b.id}
                  </span>
                </span>
              ))}
            </div>
            <p
              className="mt-4 text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Each colour below is a section. Keep going.
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
