import { PrismAct } from "@/components/spectrum/PrismAct";
import { SpectrumBackground } from "@/components/spectrum/SpectrumBackground";
import { TopBar } from "@/components/spectrum/TopBar";
import {
  GrowthBand,
  VideoBand,
  EducationBand,
  LeadingBand,
  BuiltBand,
  ResearchBand,
  SportBand,
  CloseBand,
} from "@/components/spectrum/Sections";
import { site } from "@/content/site";
import { BANDS, CLOSING, tones } from "@/components/prism/bands";

/**
 * White light in, a spectrum out, and then one section per wavelength.
 *
 * The prism holds the top of the page while you scroll through it; the glass
 * turns, the beam gets through, the colours come out. Once they are out the
 * act releases the scroll and each section takes its own colour as the page's
 * background. The argument is the structure: one beam, one person, six very
 * different-looking things that all came out of the same source.
 */
export default function Home() {
  return (
    <div className="spectrum-page relative">
      <SpectrumBackground />

      <TopBar />

      <main id="top" className="relative z-10">
        <PrismAct />
        <GrowthBand />
        <VideoBand />
        <EducationBand />
        <LeadingBand />
        <BuiltBand />
        <ResearchBand />
        <SportBand />
        <CloseBand />
      </main>

      {/* The footer shares the closing field, so it is dark ink on white
          like the section above it, and the spectrum runs along the very
          bottom edge — the last thing on the page is the seven colours the
          whole thing was about. */}
      <footer
        className="relative z-10"
        style={{ color: tones(CLOSING).ink }}
      >
        <div className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-10">
          <div
            className="flex flex-col gap-8 border-t pt-8 sm:flex-row sm:items-start sm:justify-between"
            style={{ borderColor: tones(CLOSING).rule }}
          >
            <div>
              <p className="text-sm font-medium">{site.name}</p>
              <p className="mt-1.5 text-sm" style={{ color: tones(CLOSING).muted }}>
                © {new Date().getFullYear()} · Built with Next.js and three.js
              </p>
            </div>

            {/* Someone who read to the end should not have to scroll back up
                to get anywhere. */}
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm sm:justify-end">
              {BANDS.map((b) => (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  className="group flex items-center gap-2 transition-opacity hover:opacity-100"
                  style={{ color: tones(CLOSING).body }}
                >
                  <span
                    aria-hidden="true"
                    className="block h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-150"
                    style={{ backgroundColor: b.color }}
                  />
                  {b.nav}
                </a>
              ))}
              <a
                href="#top"
                className="flex items-center gap-1.5 font-medium"
                style={{ color: tones(CLOSING).ink }}
              >
                Back to top ↑︎
              </a>
            </nav>
          </div>
        </div>

        <div aria-hidden="true" className="flex h-2 w-full">
          {BANDS.map((b) => (
            <span key={b.id} className="flex-1" style={{ backgroundColor: b.color }} />
          ))}
        </div>
      </footer>
    </div>
  );
}
