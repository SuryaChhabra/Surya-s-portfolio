"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { BANDS, tones, type Band } from "@/components/prism/bands";

/**
 * One wavelength's worth of page.
 *
 * `data-band` is the only contract with SpectrumBackground: it reads the
 * attribute off whichever section is over the middle of the screen and
 * crossfades the page to that colour. The section itself paints nothing,
 * which is what keeps the transitions continuous instead of stacked.
 */
export function BandSection({
  band,
  children,
}: {
  band: Band;
  children?: ReactNode;
}) {
  const t = tones(band);
  /* Derived, not passed. Moving a subject to another wavelength is a one-line
     edit in bands.ts, and the numbering has to follow it without anyone
     remembering to renumber seven call sites. */
  const index = BANDS.findIndex((x) => x.id === band.id);

  return (
    <section
      id={band.id}
      data-band={band.id}
      /* A full screen minimum: the idea only works if each wavelength
         actually owns the frame for a moment rather than flashing past.
         A `compact` band settles for most of one — enough to own the middle
         of the screen and hold its colour, without padding thin content out
         to fill a frame it cannot fill honestly. */
      className={`relative flex scroll-mt-8 flex-col justify-center px-5 sm:px-10 ${
        band.compact
          ? "min-h-[72svh] py-20 sm:py-24"
          : "min-h-[100svh] py-24 sm:py-32"
      }`}
    >
      {/* w-full matters: `mx-auto` sets auto margins, and a flex item with
          auto margins on the cross axis is not stretched — it shrinks to its
          content, so a sparse section would sit narrower and further right
          than a full one and nothing would line up down the page. */}
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <header className="max-w-2xl">
            {/* The accent carries the words, the vivid colour carries the
                rule: one has to be read on this field, the other only has to
                be seen. */}
            <p className="label flex items-center gap-3" style={{ color: band.accent }}>
              {/* On a light field the vivid colour *is* the field, so the
                  rule would disappear into it. */}
              <span
                className="block h-[3px] w-10 rounded-full"
                style={{
                  backgroundColor:
                    band.tone === "light" ? band.accent : band.color,
                }}
              />
              {String(index + 1).padStart(2, "0")} — {band.kicker}
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em]"
              style={{ color: t.ink }}
            >
              {band.line}
            </h2>
            {band.body ? (
              <p
                className="mt-5 text-[1.02rem] leading-relaxed"
                style={{ color: t.body }}
              >
                {band.body}
              </p>
            ) : null}
          </header>
        </Reveal>

        {children ? <div className="mt-12 sm:mt-16">{children}</div> : null}
      </div>
    </section>
  );
}

/**
 * Whether to show the reminders about content that is not written yet.
 *
 * They are notes to the author, so they belong in `npm run dev` and nowhere
 * near a visitor. A built site drops them: an empty space says "nothing here
 * yet" quietly, while "roles and dates go here" says it out loud, in the
 * author's own voice, to whoever is deciding whether to hire them. Empty
 * still beats invented — this only changes who the admission is addressed to.
 */
export const SHOW_NOTES = process.env.NODE_ENV !== "production";

/** A block-level note to the author. Renders nothing in a built site. */
export function Pending({
  children,
  band,
}: {
  children: ReactNode;
  band?: Band;
}) {
  if (!SHOW_NOTES) return null;
  const t = band ? tones(band) : null;
  return (
    <p
      className="max-w-xl rounded-xl border border-dashed px-5 py-4 text-sm italic leading-relaxed"
      style={{
        borderColor: t?.rule ?? "rgba(255,255,255,0.20)",
        color: t?.muted ?? "rgba(255,255,255,0.45)",
      }}
    >
      {children}
    </p>
  );
}

/** The same thing inline, under a card. */
export function Note({ children, band }: { children: ReactNode; band?: Band }) {
  if (!SHOW_NOTES) return null;
  const t = band ? tones(band) : null;
  return (
    <p
      className="mt-2 text-sm italic"
      style={{ color: t?.muted ?? "rgba(255,255,255,0.4)" }}
    >
      <span className="mr-1.5 opacity-60">✎</span>
      {children}
    </p>
  );
}
