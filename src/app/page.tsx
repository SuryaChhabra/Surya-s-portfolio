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

      <footer className="relative z-10 px-5 pb-10 sm:px-10">
        <div
          className="mx-auto max-w-6xl border-t pt-6 text-sm"
          style={{
            borderColor: "var(--band-rule, rgba(255,255,255,0.12))",
            color: "var(--band-ink, #ffffff)",
            opacity: 0.55,
          }}
        >
          © {new Date().getFullYear()} {site.name}
        </div>
      </footer>
    </div>
  );
}
