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

  if (!results.length) return null;

  return (
    <section id="archery" className="hue-amber mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="04 / Archery"
        title="Competitive archery."
        lead={site.archery.blurb || undefined}
      />

      <ul>
        {results.map((r, i) => (
          <Reveal key={`${r.event}-${r.date}-${i}`} delay={i * 0.06}>
            <li
              className="grid gap-3 border-t py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="label sm:col-span-2">{r.date}</div>

              <div className="sm:col-span-5">
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

              <div className="text-sm text-ink-soft sm:col-span-3">
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
    </section>
  );
}
