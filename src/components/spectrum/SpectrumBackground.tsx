"use client";

import { useEffect, useState } from "react";
import { BANDS, FIELD_BY_ID, VOID_DEEP, tones, visibleBands, type Band } from "@/components/prism/bands";
import { site } from "@/content/site";

/**
 * The page's one background, and the rail that says where you are in it.
 *
 * After the prism has split the light, every section simply takes its own
 * wavelength as the colour behind it. Rather than painting each section
 * separately — which stacks hard edges as you scroll — a single fixed layer
 * crossfades between the deep tones, so the page reads as one continuous
 * beam of light changing colour underneath the content.
 */
export function SpectrumBackground() {
  const [band, setBand] = useState<Band | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-band]"),
    );
    let queued = 0;

    const measure = () => {
      queued = 0;
      /* Whichever section is over the middle of the screen owns the colour.
         The middle, not the top: it is where someone is actually reading. */
      const mid = window.scrollY + window.innerHeight / 2;
      const hit = sections.find(
        (el) => mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight,
      );
      const id = hit?.dataset.band;
      const next = id ? (FIELD_BY_ID[id] ?? null) : null;
      setBand((current) => (current?.id === next?.id ? current : next));
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

  const deep = band?.deep ?? VOID_DEEP;
  const t = band ? tones(band) : null;

  /* The header and footer are fixed on top of whatever field is current, so
     they cannot take a colour at build time — white would vanish the moment
     the page reaches the gold band. Publishing the ink as a custom property
     lets them follow without any of them knowing this component exists. */
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--band-ink", t?.ink ?? "#ffffff");
    root.setProperty("--band-rule", t?.rule ?? "rgba(255,255,255,0.20)");
    root.setProperty("--band-hover", t?.hover ?? "rgba(255,255,255,0.10)");
  }, [t?.ink, t?.rule, t?.hover]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundColor: deep,
          transition: "background-color 900ms cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        {/* The wavelength itself, as a wash rather than a flat fill — the
            light is still coming from the prism, off to the upper left. */}
        <div
          className="absolute inset-0"
          style={{
            /* Light still arriving from the prism, off past the top right.
               It is kept out of the left half on purpose: that is where the
               headings sit, and lifting the field under them is what would
               cost the white text its contrast. */
            background: band
              ? `radial-gradient(85% 70% at 100% 0%, ${band.color}33, transparent 58%),
                 radial-gradient(70% 55% at 88% 100%, ${band.color}1f, transparent 62%),
                 radial-gradient(120% 100% at 10% 55%, ${
                   band.tone === "light"
                     ? "rgba(255,255,255,0.26)"
                     : "rgba(0,0,0,0.34)"
                 }, transparent 70%)`
              : "none",
            opacity: band ? 1 : 0,
            transition: "opacity 900ms linear, background 900ms linear",
          }}
        />

        {/* The star field carries over from the 3D scene so the sections read
            as the same space, only lit differently. */}
        <div
          className="absolute inset-0"
          style={{
            background: STARS,
            /* Pinpoints belong in the dark. On a lit field they are just
               speckle, so they fade out as the colour comes up. */
            opacity: band ? 0.18 : 0.5,
            transition: "opacity 900ms linear",
          }}
        />
      </div>

      <SpectrumRail active={band} />
    </>
  );
}

/** A handful of fixed pinpoints, cheap enough to sit behind everything. */
const STARS = [
  "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7), transparent)",
  "radial-gradient(1px 1px at 32% 62%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1.4px 1.4px at 58% 26%, rgba(255,255,255,0.6), transparent)",
  "radial-gradient(1px 1px at 74% 74%, rgba(255,255,255,0.45), transparent)",
  "radial-gradient(1px 1px at 88% 34%, rgba(255,255,255,0.55), transparent)",
  "radial-gradient(1px 1px at 46% 88%, rgba(255,255,255,0.4), transparent)",
  "radial-gradient(1.2px 1.2px at 22% 44%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1px 1px at 66% 8%, rgba(255,255,255,0.45), transparent)",
].join(", ");

/**
 * The spectrum, stood on its end at the edge of the screen. It appears only
 * once the light is out, because before that the prism is saying the same
 * thing far better.
 */
function SpectrumRail({ active }: { active: Band | null }) {
  /* The rail sits on whichever field is current, so its own text takes that
     field's ink rather than any one band's colour. */
  const t = active ? tones(active) : null;
  const links = visibleBands(site.education.institution ? [] : ["education"]);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? "auto" : "none",
        transition: "opacity 500ms linear",
      }}
    >
      {links.map((b) => {
        const on = b.id === active?.id;
        return (
          <a
            key={b.id}
            href={`#${b.id}`}
            className="group flex items-center justify-end gap-2 py-1 pr-1"
            title={b.line}
          >
            <span
              className="text-[0.68rem] uppercase tracking-[0.14em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ color: t?.ink ?? "#ffffff" }}
            >
              {b.id}
            </span>
            {/* The active band's own vivid colour sits at about 2.3:1 on its
                own field — visible as a shape, useless as a marker. The light
                tint is what actually tells you where you are. */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: on ? 26 : 6,
                backgroundColor: on ? b.accent : b.color,
                /* Same reason as the nav: on its own field a band's colour
                   is invisible, so every mark carries a hairline. */
                boxShadow: `0 0 0 1px ${t?.rule ?? "rgba(255,255,255,0.2)"}`,
                opacity: on ? 1 : 0.6,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
