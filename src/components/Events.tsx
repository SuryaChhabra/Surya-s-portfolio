import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type EventItem = {
  name: string;
  role: string;
  date: string;
  people: string;
  note: string;
  link?: string;
  images?: readonly string[];
};

export function Events() {
  /* Unnamed entries are templates, not events. With none filled the section
     stays off the page rather than showing a heading over nothing. */
  const events = (site.events as readonly EventItem[]).filter(
    (e) => e.name.trim() !== "",
  );

  if (!events.length) return null;

  return (
    <section
      id="events"
      className="hue-green border-y"
      style={{ backgroundColor: "var(--paper-2)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          index="05 / Events"
          title="Rooms I've filled."
          lead="Events are a channel. These were run end-to-end — sponsorship, comms, run-of-show and the follow-up that actually converts."
        />

        <ul>
          {events.map((event, i) => (
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
                  {event.role ? (
                    <div
                      className="mt-1.5 text-sm"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      {event.role}
                    </div>
                  ) : null}
                </div>

                <div className="sm:col-span-4">
                  {event.note ? (
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {event.note}
                    </p>
                  ) : null}

                  {event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-draw mt-2 inline-block text-sm"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      See the post ↗
                    </a>
                  ) : null}

                  {event.images?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {event.images.map((src) => (
                        <span
                          key={src}
                          className="relative block h-20 w-28 overflow-hidden r-card"
                          style={{ backgroundColor: "var(--paper)" }}
                        >
                          <Image
                            src={src}
                            alt={`${event.name} photo`}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

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
