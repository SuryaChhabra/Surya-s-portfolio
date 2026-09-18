"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Lightbox } from "@/components/Lightbox";
import { BAND_BY_ID, tones } from "@/components/prism/bands";
import { BandSection, Note, Pending, SHOW_NOTES } from "./BandSection";

/* Cards, rules and text colours all come from `tones(band)`. A band only
   has to declare whether its field is dark or light and everything on it
   follows — which is what lets yellow invert without any of this knowing. */


/* — 01 Red — who this is ————————————————————————————————————————— */

export function IntroBand() {
  const band = BAND_BY_ID.intro;
  const t = tones(band);

  return (
    <BandSection band={band} index={0}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="space-y-5">
            {site.about.paragraphs.map((p) => (
              <p key={p} className="text-[1.02rem] leading-relaxed" style={{ color: t.body }}>
                {p}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              {site.about.toolkit.map((tool) => (
                <span
                  key={tool}
                  className="r-pill border px-3 py-1 text-xs"
                  style={{ borderColor: `${band.accent}59`, color: band.accent }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* The numbers are from one post, and the labels say so. */}
        <Reveal delay={0.1}>
          <dl className={`grid grid-cols-2 gap-px overflow-hidden ${t.pane}`}>
            {site.stats.map((stat) => (
              <div key={stat.label} className="px-5 py-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span
                    className="block text-[clamp(1.8rem,4vw,2.6rem)] font-medium tracking-[-0.04em]"
                    style={{ color: band.accent }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug" style={{ color: t.muted }}>
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </BandSection>
  );
}

/* — 02 Orange — work and the rooms it happened in ————————————————— */

export function ExperienceBand() {
  const events = site.events.filter((e) => e.name);
  const roles = site.timeline;

  /* Until there are roles to list, the orange band leads with the events
     instead. A section headed "Work experience." with no work experience
     under it is the one thing on this page that actively costs something,
     and it repairs itself the moment `timeline` has an entry. */
  const band = roles.length
    ? BAND_BY_ID.experience
    : {
        ...BAND_BY_ID.experience,
        line: "Rooms I've been in.",
        body: "",
      };
  const t = tones(band);

  return (
    <BandSection band={band} index={1}>
      <div className="space-y-14">
        {roles.length ? (
          <ol className="space-y-px">
            {roles.map((role) => (
              <Reveal key={`${role.org}-${role.title}`}>
                <li className={`flex flex-col gap-2 px-5 py-6 sm:flex-row sm:gap-8 ${t.pane}`}>
                  <span className="label shrink-0 pt-1 sm:w-40" style={{ color: t.muted }}>
                    {role.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: t.ink }}>
                      {role.title}
                      <span style={{ color: band.accent }}> · {role.org}</span>
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: t.body }}>
                      {role.detail}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        ) : (
          <Reveal>
            <Pending band={band}>
              Roles, dates and what you actually did go here. Nothing is filled
              in yet, and inventing it would be the one thing on this page that
              could not survive a follow-up question. Until then this band
              leads with the events instead.
            </Pending>
          </Reveal>
        )}

        {events.length ? (
          <div>
            {roles.length ? (
              <h3 className="label" style={{ color: t.muted }}>In the room</h3>
            ) : null}
            <ul className={`grid gap-6 sm:grid-cols-2 ${roles.length ? "mt-5" : ""}`}>
              {events.map((event, i) => (
                <Reveal key={event.name} delay={(i % 2) * 0.08}>
                  <li className={`overflow-hidden ${t.pane}`}>
                    {event.images?.length ? (
                      <div className="grid grid-cols-2 gap-px">
                        {event.images.map((src) => (
                          <div key={src} className="relative aspect-[4/3] bg-black/40">
                            <Image
                              src={src}
                              alt={`${event.name}`}
                              fill
                              sizes="(max-width: 640px) 50vw, 25vw"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="px-5 py-5">
                      <h4 className="text-base font-medium" style={{ color: t.ink }}>
                        {event.name}
                      </h4>
                      {event.note ? (
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: t.body }}>
                          {event.note}
                        </p>
                      ) : (
                        <Note band={band}>Date, role and what came of it still to add.</Note>
                      )}
                      {event.link ? (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm underline-offset-4 hover:underline"
                          style={{ color: band.accent }}
                        >
                          See the post ↗
                        </a>
                      ) : null}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </BandSection>
  );
}

/* — 03 Yellow — AI video ——————————————————————————————————————————— */

export function VideoBand() {
  const band = BAND_BY_ID.video;
  const t = tones(band);

  return (
    <BandSection band={band} index={2}>
      <div className="grid gap-10 lg:grid-cols-2">
        {site.videos.map((video, i) => (
          <Reveal key={video.title} delay={(i % 2) * 0.08}>
            <figure>
              {/* VideoPlayer paints its own shell from --paper-2; on this page
                  that token needs to be dark or the card glows white while a
                  poster loads. */}
              <div style={{ ["--paper-2" as string]: band.tone === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.05)" }}>
                <VideoPlayer
                  media={{
                    poster: video.poster,
                    /* An empty src renders the poster with no play control,
                       so the layout is real before a file is hosted. */
                    sources: video.file
                      ? [
                          {
                            src: `${site.videoBase}/${encodeURIComponent(video.file)}`,
                            type: guessType(video.file),
                          },
                        ]
                      : [],
                    alt: `Still from ${video.title}`,
                  }}
                  title={video.title}
                />
              </div>

              <figcaption className="mt-5">
                <h3 className="text-lg font-medium tracking-[-0.02em] sm:text-xl" style={{ color: t.ink }}>
                  {video.title}
                </h3>
                {video.note ? (
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: t.body }}>
                    {video.note}
                  </p>
                ) : (
                  <Note band={band}>One line on what this is and who it was for.</Note>
                )}
                {video.tags.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {video.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="r-pill border px-2.5 py-1 text-xs"
                        style={{ borderColor: `${band.accent}59`, color: band.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-sm" style={{ color: t.muted }}>
        Nothing downloads until you press play.
      </p>
    </BandSection>
  );
}

function guessType(url: string) {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}

/* — 04 Green — shipped ————————————————————————————————————————————— */

export function BuiltBand() {
  const band = BAND_BY_ID.built;
  const t = tones(band);

  return (
    <BandSection band={band} index={3}>
      <ul className="space-y-px">
        {site.work.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <li>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 px-5 py-7 transition-colors sm:flex-row sm:items-baseline sm:gap-8 ${t.pane}`}
              >
                <span className="label shrink-0 sm:w-28" style={{ color: t.muted }}>
                  {project.kicker}
                </span>
                <span className="flex-1">
                  <span className="block text-xl font-medium tracking-[-0.02em] sm:text-2xl" style={{ color: t.ink }}>
                    {project.title}
                  </span>
                  {project.summary ? (
                    <span className="mt-2 block text-sm leading-relaxed" style={{ color: t.body }}>
                      {project.summary}
                    </span>
                  ) : SHOW_NOTES ? (
                    <span className="mt-2 block text-sm italic" style={{ color: t.muted }}>
                      <span className="mr-1.5 opacity-60">✎</span>
                      One line on what it does still to add.
                    </span>
                  ) : null}
                </span>
                <span
                  className="shrink-0 text-sm transition-transform group-hover:translate-x-1"
                  style={{ color: band.accent }}
                >
                  Open ↗
                </span>
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
    </BandSection>
  );
}

/* — 05 Blue — astronomy ——————————————————————————————————————————— */

type ResearchImage = { src: string; title: string; caption: string; alt: string };

export function ResearchBand() {
  const band = BAND_BY_ID.research;
  const t = tones(band);
  const images = site.research.images as readonly ResearchImage[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <BandSection band={band} index={4}>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((image, i) => (
          <Reveal key={image.src} delay={(i % 2) * 0.08}>
            <li className={`overflow-hidden ${t.pane}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full text-left"
                aria-label={`Open ${image.alt}`}
              >
                {/* contain, not cover: cropping a plot cuts data off. */}
                <span className="relative block aspect-[4/3] w-full bg-black/45">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />
                </span>
                <span className="block px-5 py-5">
                  <span
                    className="label block"
                    style={{ color: band.accent }}
                  >
                    {image.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed" style={{ color: t.body }}>
                    {image.caption}
                  </span>
                </span>
              </button>
            </li>
          </Reveal>
        ))}
      </ul>

      {open !== null ? (
        <Lightbox
          src={images[open].src}
          alt={images[open].alt}
          caption={images[open].caption}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </BandSection>
  );
}

/* — 06 Violet — archery ——————————————————————————————————————————— */

export function SportBand() {
  const band = BAND_BY_ID.sport;
  const t = tones(band);
  const results = site.archery.results.filter((r) => r.event);
  /* Nothing to put beside the photo once the author notes are gone, so the
     layout drops to one column rather than leaving a hole in the grid. */
  const aside = results.length > 0 || SHOW_NOTES;

  return (
    <BandSection band={band} index={5}>
      <div className={aside ? "grid gap-10 lg:grid-cols-[0.9fr_1.1fr]" : "max-w-md"}>
        {site.archery.image ? (
          <Reveal>
            <div className={`relative aspect-[4/5] overflow-hidden ${t.pane}`}>
              <Image
                src={site.archery.image}
                alt={site.archery.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        {aside ? (
        <Reveal delay={0.1}>
          {results.length ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: t.rule, color: t.muted }}>
                  <th className="py-3 font-normal">Date</th>
                  <th className="py-3 font-normal">Competition</th>
                  <th className="py-3 font-normal">Category</th>
                  <th className="py-3 font-normal">Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={`${r.date}-${r.event}`} className="border-b" style={{ borderColor: t.rule }}>
                    <td className="py-3" style={{ color: t.muted }}>{r.date}</td>
                    <td className="py-3" style={{ color: t.ink }}>
                      {r.event}
                      {r.level ? (
                        <span style={{ color: t.muted }}> · {r.level}</span>
                      ) : null}
                    </td>
                    <td className="py-3" style={{ color: t.body }}>{r.category}</td>
                    <td className="py-3 font-medium" style={{ color: band.accent }}>
                      {r.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Pending band={band}>
              Competitions, categories and placings go here — date, event,
              level, result, one row each. The photo is real; the record is
              yours to fill in.
            </Pending>
          )}
        </Reveal>
        ) : null}
      </div>
    </BandSection>
  );
}

/* — Close — the light recombines ——————————————————————————————————— */

/**
 * A link that is still the scaffold it shipped with — example.com, or a
 * /username path nobody replaced.
 */
const PLACEHOLDER_LINK = /example\.com|\/username(\/|$)/;

export function CloseBand() {
  /* A dead contact link is worse than a missing one: it reads as real, gets
     clicked, and fails in front of exactly the person you wanted. Anything
     still holding scaffold does not render. */
  const socials = site.socials.filter((s) => !PLACEHOLDER_LINK.test(s.href));

  return (
    <section
      id="contact"
      className="relative scroll-mt-8 px-5 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="label text-white/45">All six, back together</p>
          {/* The close states what the work is and invites the next move.
              A portfolio that ends by asking for a job has spent the whole
              page earning the right not to. */}
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
            Tell me what you&rsquo;re building.
          </h2>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
            {site.hero.availability} If something here looks like the kind of
            thing you need made, I am one message away.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="r-pill border border-white/25 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
              >
                {s.label}
              </a>
            ))}
          </div>

          {socials.length < site.socials.length ? (
            <div className="mt-6">
              <Pending>
                {site.socials.length - socials.length} of {site.socials.length}{" "}
                links in `site.socials` are still example.com / username
                placeholders and are hidden until they are real. Same for
                `site.email` and `site.meta.url`.
              </Pending>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
