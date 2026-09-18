import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Events() {
  return (
    <section
      id="events"
      className="hue-green border-y"
      style={{ backgroundColor: "var(--paper-2)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          index="04 / Events"
          title="Rooms I've filled."
          lead="Events are a channel. These were run end-to-end — sponsorship, comms, run-of-show and the follow-up that actually converts."
        />

        <ul>
          {site.events.map((event, i) => (
            <Reveal key={event.name} delay={i * 0.06}>
              <li
                className="group grid gap-3 border-t py-7 transition-colors sm:grid-cols-12 sm:items-baseline sm:gap-6"
                style={{ borderColor: "var(--line)" }}
              >
                <div className="label sm:col-span-2">{event.date}</div>

                <div className="sm:col-span-5">
                  <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                    {event.name}
                  </h3>
                  <div className="mt-1.5 text-sm" style={{ color: "var(--accent-ink)" }}>
                    {event.role}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft sm:col-span-4">
                  {event.note}
                </p>

                <div className="label sm:col-span-1 sm:text-right">
                  {event.people}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
