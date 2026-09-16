import { site } from "@/content/site";
import type { Tone } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const toneVar: Record<Tone, string> = {
  clay: "var(--clay)",
  sage: "var(--sage)",
  butter: "var(--butter)",
  lilac: "var(--lilac)",
};

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="01 / Work"
        title="Campaigns, loops and the numbers behind them."
        lead="A few projects where the result was measurable and the method was repeatable."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {site.work.map((project, i) => {
          const accent = toneVar[project.tone];
          const Wrapper = project.link ? "a" : "div";

          return (
            <Reveal key={project.title} delay={(i % 2) * 0.1}>
              <Wrapper
                {...(project.link
                  ? {
                      href: project.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9 clay-surface"
              >
                {/* Accent wash that warms on hover. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-45 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                  style={{ backgroundColor: accent }}
                />

                <div className="relative flex items-center justify-between gap-4">
                  <span className="label" style={{ color: accent }}>
                    {project.kicker}
                  </span>
                  {project.link ? (
                    <span className="text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  ) : null}
                </div>

                <h3 className="relative mt-5 text-2xl font-medium leading-tight tracking-[-0.025em] sm:text-[1.75rem]">
                  {project.title}
                </h3>

                <p className="relative mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  {project.summary}
                </p>

                <div
                  className="relative mt-7 grid grid-cols-3 gap-4 border-t pt-6"
                  style={{ borderColor: "var(--line)" }}
                >
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div
                        className="text-xl font-medium tracking-[-0.03em] sm:text-2xl"
                        style={{ color: accent }}
                      >
                        {metric.value}
                      </div>
                      <div className="mt-1 text-xs leading-snug text-ink-faint">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
