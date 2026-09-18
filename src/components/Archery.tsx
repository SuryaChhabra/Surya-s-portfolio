import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Result = {
  date: string;
  event: string;
  level: string;
  category: string;
  result: string;
};

export function Archery() {
  /* Template rows ship empty; only filled ones count, and if none are
     filled the section stays off the page entirely. */
  const results = (site.archery.results as readonly Result[]).filter(
    (r) => r.event.trim() !== "",
  );

  const photo = (site.archery as { image?: string }).image;
  const photoAlt = (site.archery as { imageAlt?: string }).imageAlt ?? "";

  /* The photo alone is real content, so it is reason enough to show the
     section while the results table is still being filled in. */
  if (!results.length && !photo) return null;

  return (
    <section id="archery" className="hue-amber mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="04 / Archery"
        title="Competitive archery."
        lead={site.archery.blurb || undefined}
      />

      <div className="grid gap-10 lg:grid-cols-12">
        {photo ? (
          <Reveal className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden r-card clay-surface"
              style={{ backgroundColor: "var(--paper-2)" }}
            >
              <Image
                src={photo}
                alt={photoAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <ul className={photo ? "lg:col-span-7" : "lg:col-span-12"}>
        {results.map((r, i) => (
          <Reveal key={`${r.event}-${r.date}-${i}`} delay={i * 0.06}>
            <li
              className="grid gap-3 border-t py-7 sm:grid-cols-8 sm:items-baseline sm:gap-5"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="label sm:col-span-2">{r.date}</div>

              <div className="sm:col-span-3">
                <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                  {r.event}
                </h3>
                {r.level ? (
                  <div
                    className="mt-1.5 text-sm"
                    style={{ color: "var(--accent-ink)" }}
                  >
                    {r.level}
                  </div>
                ) : null}
              </div>

              <div className="text-sm text-ink-soft sm:col-span-2">
                {r.category}
              </div>

              {/* The result is the point of the row, so it gets the weight. */}
              <div
                className="text-lg font-medium tracking-[-0.02em] sm:col-span-2 sm:text-right"
                style={{ color: "var(--accent-ink)" }}
              >
                {r.result}
              </div>
            </li>
          </Reveal>
        ))}
        </ul>
      </div>
    </section>
  );
}
