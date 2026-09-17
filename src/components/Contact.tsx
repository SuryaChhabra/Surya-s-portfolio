import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="hue-pink relative overflow-hidden px-4 py-24 sm:px-6 sm:py-36"
    >
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in srgb, var(--sp-red) 30%, transparent), color-mix(in srgb, var(--sp-amber) 30%, transparent), color-mix(in srgb, var(--sp-green) 30%, transparent), color-mix(in srgb, var(--sp-cyan) 30%, transparent), color-mix(in srgb, var(--sp-violet) 30%, transparent), color-mix(in srgb, var(--sp-pink) 30%, transparent), color-mix(in srgb, var(--sp-red) 30%, transparent))",
        }}
      />

      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="label" style={{ color: "var(--accent-ink)" }}>
          06 / Contact
        </p>

        <h2 className="mt-6 text-[clamp(2.25rem,7vw,4.5rem)] font-medium leading-[1] tracking-[-0.04em]">
          Let&apos;s make something <span className="serif-em rainbow-text">grow</span>.
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
          {site.hero.availability}. The fastest way to reach me is email — I
          reply to everything that isn&apos;t a pitch deck.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="r-pill px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
          >
            {site.email}
          </a>
          <a
            href={site.resumeUrl}
            className="r-pill border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-paper-2"
          >
            Résumé
          </a>
        </div>
      </Reveal>
    </section>
  );
}
