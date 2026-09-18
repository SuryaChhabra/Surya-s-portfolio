"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import type { Band } from "@/components/prism/bands";

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
  index,
  children,
}: {
  band: Band;
  index: number;
  children?: ReactNode;
}) {
  return (
    <section
      id={band.id}
      data-band={band.id}
      /* A full screen minimum: the idea only works if each wavelength
         actually owns the frame for a moment rather than flashing past. */
      className="relative flex min-h-[100svh] scroll-mt-8 flex-col justify-center px-5 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="max-w-2xl">
            <p className="label flex items-center gap-3" style={{ color: band.color }}>
              <span
                className="block h-[2px] w-8 rounded-full"
                style={{ backgroundColor: band.color }}
              />
              {String(index + 1).padStart(2, "0")} — {band.kicker}
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
              {band.line}
            </h2>
            {band.body ? (
              <p className="mt-5 text-[1.02rem] leading-relaxed text-white/70">
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
 * Stands in for content that is genuinely not written yet. It says so rather
 * than inventing something, because a section that admits a gap is worth more
 * in an interview than one that quietly makes a claim up.
 */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-xl rounded-xl border border-dashed border-white/20 px-5 py-4 text-sm italic leading-relaxed text-white/45">
      {children}
    </p>
  );
}
