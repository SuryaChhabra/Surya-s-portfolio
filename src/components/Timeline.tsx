import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  return (
    <section id="path" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading index="03 / Path" title="How I got here." />

      <div className="relative">
        {/* The spine the markers hang from. */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[calc(11rem+7px)]"
          style={{ backgroundColor: "var(--line)" }}
        />

        <ol className="space-y-10">
          {site.timeline.map((item, i) => (
            <Reveal key={`${item.org}-${item.period}`} delay={i * 0.08}>
              <li className="relative flex flex-col gap-2 pl-8 sm:flex-row sm:gap-0 sm:pl-0">
                <div className="label shrink-0 sm:w-44">{item.period}</div>

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-4 sm:left-44"
                  style={{
                    backgroundColor: "var(--clay)",
                    borderColor: "var(--paper)",
                  }}
                />

                <div className="sm:pl-8">
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {item.title}{" "}
                    <span className="text-ink-faint">· {item.org}</span>
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {item.detail}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
