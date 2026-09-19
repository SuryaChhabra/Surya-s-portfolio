"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Lightbox } from "@/components/Lightbox";
import { BAND_BY_ID, tones, type Band } from "@/components/prism/bands";
import { BandSection, Note, Pending, SHOW_NOTES } from "./BandSection";

/* Cards, rules and text colours all come from `tones(band)`. A band only
   has to declare whether its field is dark or light and everything on it
   follows — which is what lets yellow invert without any of this knowing. */

type Role = {
  title: string;
  org: string;
  kind: string;
  period: string;
  place: string;
  /** A square mark for the organisation, or nothing. */
  logo?: string;
  /** What the organisation is, when that is the point rather than padding. */
  context?: string;
  detail: string;
  metrics: readonly { value: string; label: string }[];
  skills: readonly string[];
};

/**
 * One job, in the shape a job actually has: when, where, what.
 *
 * Shared by the red band and the yellow one because they are the same
 * object — what differs between growth work and leading a team is the
 * content, not the card.
 */
function RoleCard({ role, band }: { role: Role; band: Band }) {
  const t = tones(band);

  return (
    <li className={`flex gap-4 px-6 py-6 sm:gap-5 sm:px-7 sm:py-7 ${t.pane}`}>
      {/* Full bleed. Each file is already a square carrying its own
          background — blue, teal, or white for the one mark that is a black
          line drawing — so the tile is the logo rather than a frame with a
          logo inside it leaking white at the corners. */}
      {role.logo ? (
        <span className="relative mt-0.5 block h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[72px] sm:w-[72px]">
          <Image src={role.logo} alt="" fill sizes="72px" className="object-cover" />
        </span>
      ) : null}

      <div className="min-w-0 flex-1">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h3 className="text-lg font-medium tracking-[-0.02em] sm:text-xl" style={{ color: t.ink }}>
          {role.title}
          <span style={{ color: band.accent }}> · {role.org}</span>
        </h3>
        <p className="label shrink-0" style={{ color: t.muted }}>
          {role.period}
          {role.kind ? ` · ${role.kind}` : ""}
        </p>
      </div>

      {role.place ? (
        <p className="mt-1 text-sm" style={{ color: t.muted }}>
          {role.place}
        </p>
      ) : null}

      {/* The organisation's own frame, marked as theirs by the rule and
          kept off the same line as what you did in it. */}
      {role.context ? (
        <p
          className="mt-3 border-l-2 pl-3.5 text-[0.92rem] leading-relaxed"
          style={{ borderColor: `${band.accent}66`, color: t.muted }}
        >
          {role.context}
        </p>
      ) : null}

      {role.detail ? (
        <p className="mt-3 text-[0.98rem] leading-relaxed" style={{ color: t.body }}>
          {role.detail}
        </p>
      ) : (
        <Note band={band}>
          What the remit actually was — two or three specifics beat one
          adjective.
        </Note>
      )}

      {role.metrics.length ? (
        <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
          {role.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{m.label}</dt>
              <dd className="flex items-baseline gap-2">
                <span
                  className="text-lg font-medium tracking-[-0.03em]"
                  style={{ color: band.accent }}
                >
                  {m.value}
                </span>
                <span className="text-sm" style={{ color: t.muted }}>
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {role.skills.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {role.skills.map((skill) => (
            <span
              key={skill}
              className="r-pill border px-2.5 py-1 text-xs"
              style={{ borderColor: `${band.accent}59`, color: band.accent }}
            >
              {skill}
            </span>
          ))}
        </div>
      ) : null}
      </div>
    </li>
  );
}

/* — 01 Red — the growth work ——————————————————————————————————————— */

export function GrowthBand() {
  const band = BAND_BY_ID.growth;
  const roles = site.experience.growth as readonly Role[];

  return (
    <BandSection band={band}>
      <ul className="space-y-4">
        {roles.map((role, i) => (
          <Reveal key={`${role.org}-${role.title}`} delay={i * 0.06}>
            <RoleCard role={role} band={band} />
          </Reveal>
        ))}
      </ul>
    </BandSection>
  );
}

/* — 02 Orange — education ——————————————————————————————————————————— */

export function EducationBand() {
  const base = BAND_BY_ID.education;
  const t = tones(base);
  const {
    institution,
    degree,
    majors,
    period,
    place,
    note,
    highlights,
    coursework,
  } = site.education;

  /* Nothing to show and no notes to show either: the band would be a
     heading over empty colour, which is the one thing worse than a gap. */
  if (!institution && !SHOW_NOTES) return null;

  const band: Band = { ...base, line: institution || "Education.", body: note };

  return (
    <BandSection band={band}>
      {institution ? (
        <div className="space-y-9">
          <Reveal>
            <div
              className={`flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-7 sm:py-7 ${t.pane}`}
            >
              <div>
                <p
                  className="text-[clamp(1.15rem,2vw,1.5rem)] font-medium tracking-[-0.025em]"
                  style={{ color: t.ink }}
                >
                  {degree}
                </p>
                {majors ? (
                  <p className="mt-1.5 text-[0.98rem]" style={{ color: band.accent }}>
                    {majors}
                  </p>
                ) : null}
              </div>
              {period || place ? (
                <p className="label shrink-0" style={{ color: t.muted }}>
                  {[period, place].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>
          </Reveal>

          {highlights.length ? (
            <Reveal delay={0.06}>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h.label} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: band.accent }}
                    />
                    <span>
                      <span className="block font-medium" style={{ color: t.ink }}>
                        {h.label}
                      </span>
                      {h.detail ? (
                        <span
                          className="mt-0.5 block text-sm leading-relaxed"
                          style={{ color: t.body }}
                        >
                          {h.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {/* The two halves of the degree, side by side, because the pairing
              is the interesting part — the statistics is why the growth work
              has numbers behind it, and the astronomy is where the research
              band comes from. */}
          {coursework.length ? (
            <Reveal delay={0.12}>
              <div className="grid gap-8 sm:grid-cols-2">
                {coursework.map((group) => (
                  <div key={group.area}>
                    <h3 className="label" style={{ color: t.muted }}>
                      {group.area}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.courses.map((course) => (
                        <li
                          key={course}
                          className="r-pill border px-3 py-1.5 text-[0.82rem]"
                          style={{ borderColor: `${band.accent}4d`, color: t.body }}
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      ) : (
        <Pending band={band}>
          `site.education` is empty — institution, degree, period, and the
          clubs, roles and awards under `highlights`. This band is second on
          the page and renders nothing at all until it has them.
        </Pending>
      )}
    </BandSection>
  );
}

/* — 03 Yellow — leading, and the rooms it happened in ———————————————— */

export function LeadingBand() {
  const band = BAND_BY_ID.leading;
  const t = tones(band);
  const roles = site.experience.leadership as readonly Role[];
  const events = site.events.filter((e) => e.name);

  return (
    <BandSection band={band}>
      <div className="space-y-14">
        {roles.length ? (
          <ul className="space-y-4">
            {roles.map((role) => (
              <Reveal key={`${role.org}-${role.title}`}>
                <RoleCard role={role} band={band} />
              </Reveal>
            ))}
          </ul>
        ) : null}

        {events.length ? (
          <div>
            <h3 className="label" style={{ color: t.muted }}>
              In the room
            </h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-2">
              {events.map((event, i) => (
                <Reveal key={event.name} delay={(i % 2) * 0.08}>
                  <li className={`overflow-hidden ${t.pane}`}>
                    {event.images?.length ? (
                      <div className="grid grid-cols-2 gap-px">
                        {event.images.map((src) => (
                          <div key={src} className="relative aspect-[4/3] bg-black/40">
                            <Image
                              src={src}
                              alt={event.name}
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

/* — 04 Green — AI video ————————————————————————————————————————————— */

export function VideoBand() {
  const band = BAND_BY_ID.video;
  const t = tones(band);

  return (
    <BandSection band={band}>
      {/* The numbers live here rather than in the opening: beside the thing
          they describe they are evidence, and at the top of the page they
          would just be a claim. */}
      <Reveal>
        <dl className={`mb-12 grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-4 ${t.pane}`}>
          {site.stats.map((stat) => (
            <div key={stat.label} className="px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className="block text-[clamp(1.6rem,3.4vw,2.3rem)] font-medium tracking-[-0.04em]"
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

      <div className="grid gap-10 lg:grid-cols-2">
        {site.videos.map((video, i) => (
          <Reveal key={video.title} delay={(i % 2) * 0.08}>
            <figure>
              {/* VideoPlayer paints its own shell from --paper-2; it has to
                  follow the field or the card glows while a poster loads. */}
              <div
                style={{
                  ["--paper-2" as string]:
                    band.tone === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.05)",
                }}
              >
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
                <h3
                  className="text-lg font-medium tracking-[-0.02em] sm:text-xl"
                  style={{ color: t.ink }}
                >
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

/* — 05 Blue — shipped ——————————————————————————————————————————————— */

export function BuiltBand() {
  const band = BAND_BY_ID.built;
  const t = tones(band);

  return (
    <BandSection band={band}>
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
                  <span
                    className="block text-xl font-medium tracking-[-0.02em] sm:text-2xl"
                    style={{ color: t.ink }}
                  >
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

/* — 06 Indigo — astronomy ——————————————————————————————————————————— */

type ResearchImage = { src: string; title: string; caption: string; alt: string };

export function ResearchBand() {
  const band = BAND_BY_ID.research;
  const t = tones(band);
  const images = site.research.images as readonly ResearchImage[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <BandSection band={band}>
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
                  <span className="label block" style={{ color: band.accent }}>
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

/* — 07 Violet — archery ————————————————————————————————————————————— */

export function SportBand() {
  const band = BAND_BY_ID.sport;
  const t = tones(band);
  const { honours, award, image, imageAlt } = site.archery;
  const results = site.archery.results.filter((r) => r.event);

  return (
    <BandSection band={band}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* On a phone the photo is a full screen by itself, which pushes the
            record — the strongest claim on the page — under the fold. The
            numbers go first there and beside it on a wide screen. */}
        {image ? (
          <Reveal className="order-2 lg:order-1">
            <div className={`relative aspect-[4/5] overflow-hidden ${t.pane}`}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <div className="order-1 space-y-10 lg:order-2">
          <Reveal delay={0.08}>
            <dl className="grid grid-cols-3 gap-6">
              {honours.map((h) => (
                <div key={h.label}>
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <span
                      className="block text-[clamp(2rem,4.4vw,3rem)] font-medium leading-none tracking-[-0.045em]"
                      style={{ color: band.accent }}
                    >
                      {h.value}
                    </span>
                    <span className="mt-2 block text-sm leading-snug" style={{ color: t.body }}>
                      {h.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {award?.name ? (
            <Reveal delay={0.16}>
              <div className={`px-6 py-6 ${t.pane}`}>
                <p className="label" style={{ color: t.muted }}>
                  Award
                </p>
                <p className="mt-2 text-lg font-medium leading-snug" style={{ color: t.ink }}>
                  {award.name}
                </p>
                {award.note ? (
                  <p className="mt-2 text-sm" style={{ color: t.body }}>
                    {award.note}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ) : null}

          {/* Per-competition detail, if it is ever filled in. The record
              above already stands on its own without it. */}
          {results.length ? (
            <Reveal delay={0.24}>
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
                        {r.level ? <span style={{ color: t.muted }}> · {r.level}</span> : null}
                      </td>
                      <td className="py-3" style={{ color: t.body }}>{r.category}</td>
                      <td className="py-3 font-medium" style={{ color: band.accent }}>
                        {r.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          ) : (
            <Pending band={band}>
              Optional: a row per competition in `archery.results` — date,
              event, level, category, result — adds a table under the record
              above. The section reads fine without one.
            </Pending>
          )}
        </div>
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
    <section id="contact" className="relative scroll-mt-8 px-5 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="label text-white/45">All seven, back together</p>
          {/* The close states what the work is and invites the next move.
              A portfolio that ends by asking for a job has spent the whole
              page earning the right not to. */}
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
            Tell me what you&rsquo;re building.
          </h2>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/70">
            {site.hero.lead} If something here looks like the kind of thing you
            need made, I am one message away.
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
                `site.meta.url`.
              </Pending>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
