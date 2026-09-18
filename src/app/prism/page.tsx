"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/* three.js is heavy and useless to a server render. */
const PrismScene = dynamic(
  () => import("@/components/prism/PrismScene").then((m) => m.PrismScene),
  { ssr: false },
);

/* Copy pinned to the beat of the scroll it belongs to. */
const BEATS = [
  {
    at: 0.02,
    kicker: "One source",
    line: "I keep ending up somewhere new.",
    body: "Growth, AI video, molecular-line astronomy, competitive archery. It looks like scatter from the outside.",
  },
  {
    at: 0.3,
    kicker: "Dispersion",
    line: "Same light, different wavelengths.",
    body: "Each one took the same thing: learn the tools, apply taste, ship version one before I felt ready.",
  },
  {
    at: 0.6,
    kicker: "The points",
    line: "Every piece is real, and linked.",
    body: "Twelve of them — a music video that reached 208,000 people, a Keplerian fit, three shipped apps, a competition line.",
  },
  {
    at: 0.86,
    kicker: "The shape",
    line: "Connect them and it's a path.",
    body: "Not an accident and not a detour. This is what looking for the right room actually looks like.",
  },
];

export default function PrismPage() {
  const progress = useRef(0);
  const [beat, setBeat] = useState(0);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(Boolean(c.getContext("webgl2") ?? c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const t = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.current = t;

      /* The copy is React state; the 3D reads the ref directly so the frame
         loop never waits on a render. */
      let next = 0;
      BEATS.forEach((b, i) => {
        if (t >= b.at - 0.08) next = i;
      });
      setBeat(next);
    };

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

  const active = BEATS[beat];

  return (
    <div style={{ backgroundColor: "#07080c" }}>
      {supported ? <PrismScene progress={progress} /> : null}

      {/* Scroll runway. The scene is fixed; this gives it distance to play out. */}
      <div style={{ height: "420vh" }} />

      {/* Copy sits over the scene, pinned, swapping with the beat. */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-end sm:items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8 sm:pb-0">
          <div className="max-w-md">
            <p
              className="label"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {active.kicker}
            </p>
            <h2
              className="mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]"
              style={{ color: "#fff" }}
            >
              {active.line}
            </h2>
            <p
              className="mt-4 text-[0.95rem] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.68)" }}
            >
              {active.body}
            </p>
          </div>
        </div>
      </div>

      {/* Name and a way out, always present. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="text-sm font-medium" style={{ color: "#fff" }}>
            {site.name}
          </span>
          <a
            href="/"
            className="pointer-events-auto r-pill border px-4 py-2 text-sm"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            Skip to the work
          </a>
        </div>
      </header>

      <div
        className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 text-xs"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        scroll
      </div>
    </div>
  );
}
