"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { BANDS } from "@/components/prism/bands";

const PrismIntro = dynamic(
  () => import("@/components/prism/PrismIntro").then((m) => m.PrismIntro),
  { ssr: false },
);

export default function PrismPage() {
  const progress = useRef(0);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
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

      /* The first fifth is the beam arriving and the light getting through;
         the rest is spent travelling down the spectrum. */
      const into = Math.max(0, (t - 0.2) / 0.8);
      const i = Math.min(BANDS.length - 1, Math.floor(into * BANDS.length));
      if (i !== activeRef.current) {
        activeRef.current = i;
        setActive(i);
      }
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

  const band = BANDS[active];

  return (
    <div style={{ backgroundColor: "#05060a" }}>
      {supported ? (
        <PrismIntro progress={progress} active={activeRef} />
      ) : null}

      <div style={{ height: "520vh" }} />

      {/* Copy rides the active wavelength — the only text in the scene is
          here in the DOM, never drawn into the 3D. */}
      {/* Copy sits left and low: the beam enters from the left and the
          spectrum sweeps to the lower right, so this is the one quiet
          quarter of the frame. */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-10 sm:pb-16">
          <div className="max-w-sm">
            <p
              className="label transition-colors duration-500"
              style={{ color: band.color }}
            >
              {band.kicker}
            </p>
            <h2
              className="mt-2 text-[clamp(1.7rem,3.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.03em]"
              style={{ color: "#fff" }}
            >
              {band.line}
            </h2>
            {band.body ? (
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.66)" }}
              >
                {band.body}
              </p>
            ) : (
              <p
                className="mt-3 text-sm italic"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Waiting on your copy for this one.
              </p>
            )}

            {/* Where you are in the spectrum, as light rather than words. */}
            <div className="mt-6 flex gap-1.5">
              {BANDS.map((b, i) => (
                <span
                  key={b.id}
                  className="block h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 30 : 12,
                    backgroundColor: b.color,
                    opacity: i === active ? 1 : 0.32,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-10">
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
