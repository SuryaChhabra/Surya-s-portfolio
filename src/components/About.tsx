import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/* Stickers get a small deterministic tilt so the row feels hand-placed. */
const tilts = [-2.5, 1.8, -1.2, 2.4, -1.9, 1.1, -2.2, 1.5, -1.4, 2.1];

/* Stickers walk the whole spectrum, so the toolkit reads as a colour swatch. */
const STICKER_HUES = [
  "var(--sp-red)",
  "var(--sp-orange)",
  "var(--sp-amber)",
  "var(--sp-green)",
  "var(--sp-cyan)",
  "var(--sp-blue)",
  "var(--sp-violet)",
  "var(--sp-pink)",
];

export function About() {
  return (
    <section
      id="about"
      className="hue-violet border-y"
      style={{ backgroundColor: "var(--paper-2)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading index="04 / About" title="The short version." />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            {site.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="r-card p-7 clay-surface sm:p-8">
              <div className="label">Toolkit</div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {site.about.toolkit.map((tool, i) => (
                  <span
                    key={tool}
                    className="r-pill border px-3 py-1.5 text-sm transition-transform duration-300 hover:rotate-0 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "var(--paper)",
                      borderColor: STICKER_HUES[i % STICKER_HUES.length],
                      transform: `rotate(${tilts[i % tilts.length]}deg)`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {site.writing.length > 0 ? (
                <div className="mt-9 border-t pt-7" style={{ borderColor: "var(--line)" }}>
                  <div className="label">Writing</div>
                  <ul className="mt-4 space-y-4">
                    {site.writing.map((post) => {
                      const Item = post.link ? "a" : "div";
                      return (
                        <li key={post.title}>
                          <Item
                            {...(post.link
                              ? {
                                  href: post.link,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                }
                              : {})}
                            className="group block"
                          >
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="font-medium tracking-[-0.01em] link-draw">
                                {post.title}
                              </span>
                              <span className="label shrink-0">{post.date}</span>
                            </div>
                            <p className="mt-1 text-sm text-ink-faint">
                              {post.note}
                            </p>
                          </Item>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
