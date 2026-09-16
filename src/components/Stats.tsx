import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line sm:grid-cols-2 lg:grid-cols-4"
           style={{ backgroundColor: "var(--line)" }}>
        {site.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div
              className="h-full px-6 py-8 sm:px-7 sm:py-10"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div className="text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-none tracking-[-0.04em]">
                {stat.value}
              </div>
              <div className="mt-3 text-sm leading-snug text-ink-soft">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
