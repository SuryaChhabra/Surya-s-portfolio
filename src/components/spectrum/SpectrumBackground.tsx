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
        {/* Two spotlights, and otherwise the dark.

            Each section used to paint the whole page its own saturated
            colour — a red field, then an orange one, then a bright gold
            one. Three things were wrong with that. It made the page a
            sequence of flat colour panels, which is the loudest possible
            reading of a spectrum and the one closest to a flag. It broke
            the premise, because the opening is glass in space and then the
            space abruptly stopped. And two of the seven could not be both
            dark and recognisably themselves, so yellow and orange had to
            invert to bright fields with black ink — a special case that
            every other part of the page had to know about.

            Lighting the dark instead of painting it fixes all three at
            once. The field stays near-black the whole way down, barely
            tinted with the band's hue; the colour arrives as light, from
            two sources off opposite edges. Nothing is ever a colour panel,
            every band is dark so nothing has to invert, and the space the
            prism is floating in simply continues.

            The two are deliberately not symmetric, and they move: the pair
            pivots with `angle`, so red is lit from high left and low right
            and violet from low left and high right. Seven sections, seven
            different lighting setups, all of it already described by the
            number that aims the rays in the 3D scene. */}
        <div
          className="absolute inset-0"
          style={{
            background: band
              ? `radial-gradient(70% 78% at -6% ${lift(band.angle, 16, 62)}%, ${band.color}5c, transparent 66%),
                 radial-gradient(64% 72% at 106% ${lift(band.angle, 86, 34)}%, ${band.color}42, transparent 64%),
                 radial-gradient(86% 62% at 26% 52%, rgba(0,0,0,0.58), transparent 72%)`
              : "none",
            opacity: band ? 1 : 0,
            transition: "opacity 900ms linear, background 900ms linear",
          }}
        />

        {/* The beam itself, still arriving.
            The prism act ends and the page has been taking the colour but
            not the light: a field that changes hue is a swatch, not a ray.
            This is one soft shaft crossing the field at exactly the angle
            this band leaves the glass, and because the rotation transitions
            with everything else, it tilts further as you go down the
            spectrum — red almost level, violet steeply raked. Scrolling
            stops being a walk past seven colours and becomes a descent
            through the fan. */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Centred at 64% of the height, not 50%. Measured: a beam through
              the middle lifted the field behind the headings and cost up to
              2.7 points of contrast — built fell from 7.98 to 5.78, leading
              to 4.68, which is where body text stops being comfortable. Low
              and dim keeps the light without paying for it. */}
          <div
            className="absolute left-1/2 top-[64%] h-[46vh] w-[240%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${band?.angle ?? 0}deg)`,
              background: band
                ? `linear-gradient(to bottom,
                     transparent 0%,
                     ${band.color}0e 34%,
                     ${band.tone === "light" ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.045)"} 50%,
                     ${band.color}0e 66%,
                     transparent 100%)`
                : "none",
              filter: "blur(34px)",
              opacity: band ? 1 : 0,
              transition:
                "opacity 900ms linear, transform 900ms cubic-bezier(0.2,0.7,0.2,1), background 900ms linear",
            }}
          />
        </div>

        {/* The star field carries over from the 3D scene so the sections read
            as the same space, only lit differently. */}
        <div
          className="absolute inset-0"
          style={{
            background: STARS,
            /* Pinpoints belong in the dark, and the dark no longer ends
               when the prism act does. They used to fade to almost nothing
               the moment a saturated field came up; now the field is the
               same space the glass was in, so they carry straight on. */
            opacity: band ? 0.38 : 0.5,
            transition: "opacity 900ms linear",
          }}
        />
      </div>

      <SpectrumRail active={band} />
    </>
  );
}

/**
 * Maps a band's angle out of the prism onto a position, so the two
 * spotlights pivot as the page descends the spectrum.
 *
 * `angle` runs -10 at red to -58 at violet. `from` is where red puts the
 * light and `to` is where violet does; everything between interpolates.
 */
function lift(angle: number, from: number, to: number) {
  const t = Math.min(1, Math.max(0, (Math.abs(angle) - 10) / 48));
  return (from + (to - from) * t).toFixed(1);
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
      /* right-6, not right-3: at 12px the rail sat on top of the scrollbar,
         so reaching for the scrollbar caught the rail instead. */
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 sm:flex"
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
            /* h-7 so the active marker, which grows to 26px, sits inside
               its own link rather than overflowing it. */
            className="group relative flex h-7 w-6 items-center justify-end"
            title={b.line}
          >
            {/* Absolute, so the label does not widen the link. It is only
                opacity-0 when idle, and opacity does not remove layout: the
                rail was 95px of invisible clickable strip down the right
                edge of every page, which is what was swallowing the scroll.
                Out of flow it costs nothing, and pointer-events-none keeps
                it from catching anything on the way past. */}
            <span
              className="pointer-events-none absolute right-full mr-2 whitespace-nowrap text-[0.68rem] uppercase tracking-[0.14em] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ color: t?.ink ?? "#ffffff" }}
            >
              {b.id}
            </span>
            {/* Only the band you are on takes a colour. The rest are
                neutral.

                Every dot used to carry its own wavelength, which made the
                rail a column of seven rainbow dots fixed to the edge of the
                screen for the entire page — simultaneous, stacked and
                spectral, which is the arrangement that reads as a flag
                rather than as light. It was also doing its actual job
                badly: if all seven are lit, colour cannot be what tells you
                which one you are on, and the height change was carrying the
                whole signal alone.

                Neutral inactive, coloured active. The rail stops being a
                spectrum and becomes what it always claimed to be — a
                position indicator — and the one dot that is lit is lit in
                the colour of the field you are actually standing on.

                The active band's own vivid colour sits at about 2.3:1 on
                its own field, so the marker takes `accent`, not `color`. */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: on ? 26 : 6,
                backgroundColor: on ? b.accent : t?.muted ?? "rgba(255,255,255,0.55)",
                /* Same reason as the nav: on its own field a band's colour
                   is invisible, so every mark carries a hairline. */
                boxShadow: `0 0 0 1px ${t?.rule ?? "rgba(255,255,255,0.2)"}`,
                opacity: on ? 1 : 0.42,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
