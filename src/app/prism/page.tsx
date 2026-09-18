"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const BurstScene = dynamic(
  () => import("@/components/prism/BurstScene").then((m) => m.BurstScene),
  { ssr: false },
);

const BEATS = [
  {
    at: 0,
    kicker: "One source",
    line: "I keep ending up somewhere new.",
    body: "Growth, AI video, molecular-line astronomy, competitive archery. From outside it looks like scatter.",
  },
  {
    at: 0.26,
    kicker: "The prism",
    line: "Same light, turned.",
    body: "Every one of them took the same thing: learn the tools, apply taste, ship version one before I felt ready.",
  },
  {
    at: 0.62,
    kicker: "Dispersion",
    line: "Each part gets its own wavelength.",
    body: "Six directions out of one beam. The colours below are not decoration — they are what came out of here.",
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

      let next = 0;
      BEATS.forEach((b, i) => {
        if (t >= b.at - 0.04) next = i;
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
    <div style={{ backgroundColor: "#05060a" }}>
      {supported ? <BurstScene progress={progress} /> : null}

      {/* Runway: the scene is fixed, this gives it distance to play out. */}
      <div style={{ height: "380vh" }} />

      {/* Copy sits low-left so the burst owns the centre. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
          <div className="max-w-sm">
            <p className="label" style={{ color: "rgba(255,255,255,0.45)" }}>
              {active.kicker}
            </p>
            <h2
              className="mt-2 text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#fff" }}
            >
              {active.line}
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              {active.body}
            </p>
          </div>
        </div>
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="text-sm font-medium" style={{ color: "#fff" }}>
            {site.name}
          </span>
          <a
            href="/"
            className="pointer-events-auto r-pill border px-4 py-2 text-sm"
            style={{ borderColor: "rgba(255,255,255,0.28)", color: "#fff" }}
          >
            Enter the work
          </a>
        </div>
      </header>
    </div>
  );
}
