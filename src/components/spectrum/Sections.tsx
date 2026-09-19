"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Lightbox } from "@/components/Lightbox";
import { BANDS, BAND_BY_ID, CLOSING, tones, type Band } from "@/components/prism/bands";
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
    logo,
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
    <BandSection band={band} mark={logo || undefined}>
      {institution ? (
        <div className="space-y-9">
          <Reveal>
            <div
              className={`flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-7 sm:py-7 ${t.pane}`}
            >
              <div className="min-w-0">
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
                          See the post ↗︎
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
      {/* Stated once, at the top, because these three made all four films.
          On a single card they read as that card's stack. */}
      <Reveal>
        <div className="mb-12">
          <p className="label" style={{ color: t.muted }}>
            On every film here
          </p>
          {/* Filled, not outlined, and set at body size rather than caption
              size: these are three of the four things this section is
              actually about, and an outlined chip reads as metadata. */}
          <div className="mt-4 flex flex-wrap gap-3">
            {site.videoToolkit.map((tool) => (
              <span
                key={tool.name}
                className="flex items-center gap-2.5 rounded-full border border-white/50 bg-white/80 px-5 py-3 text-[1.02rem] font-medium"
                style={{ color: t.ink, boxShadow: "0 6px 18px -10px rgba(60,30,0,0.45)" }}
              >
                {tool.logo ? (
                  <span className="relative block h-6 w-6 shrink-0 overflow-hidden rounded-[6px]">
                    <Image src={tool.logo} alt="" fill sizes="24px" className="object-contain" />
                  </span>
                ) : null}
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

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

/** An anchor when there is somewhere to go, a div when there is not. */
function Row({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
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
              {/* A row without a link is a plain block, not an anchor that
                  goes nowhere: every other row here ends in "Open" and a
                  dead one would be the only promise the page breaks. */}
              <Row href={project.link} className={`group flex flex-col gap-3 px-5 py-7 transition-colors sm:flex-row sm:items-baseline sm:gap-8 ${t.pane}`}>
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
                {project.link ? (
                  <span
                    className="shrink-0 text-sm transition-transform group-hover:translate-x-1"
                    style={{ color: band.accent }}
                  >
                    Open ↗︎
                  </span>
                ) : null}
              </Row>
            </li>
          </Reveal>
        ))}
      </ul>
    </BandSection>
  );
}

/* — 06 Indigo — astronomy ——————————————————————————————————————————— */

type ResearchImage = {
  src: string;
  title: string;
  caption: string;
  /** The version for someone who works in this field. Opened, not printed. */
  detail?: string;
  alt: string;
};

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
                  {/* This is not an astronomy portfolio, so the card says
                      what you are looking at in plain words and the
                      technical reading waits behind a click for the one
                      visitor in twenty who wants it. Without this line
                      nobody would know it was there. */}
                  {image.detail ? (
                    <span
                      className="mt-3 block text-[0.78rem] uppercase tracking-[0.12em]"
                      style={{ color: band.accent }}
                    >
                      Technical detail
                    </span>
                  ) : null}
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
          detail={images[open].detail}
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
      <div className="space-y-12 sm:space-y-14">
        {/* Full width, and landscape, because that is the shape of the
            photograph: the archer is hard left and the rest of the frame is
            the empty ground the arrow has to cross. Cropping it to a portrait
            card to sit beside the numbers would take out both the distance
            and, at 4:5, the archer's head. */}
        {image ? (
          <Reveal>
            <div
              className={`relative aspect-[3/2] overflow-hidden sm:aspect-[16/9] ${t.pane}`}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <div className="space-y-10">
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
  const band = CLOSING;
  const t = tones(band);
  /* A dead contact link is worse than a missing one: it reads as real, gets
     clicked, and fails in front of exactly the person you wanted. Anything
     still holding scaffold does not render. */
  const socials = site.socials.filter((s) => !PLACEHOLDER_LINK.test(s.href));
  const email = socials.find((s) => s.href.startsWith("mailto:"));
  const rest = socials.filter((s) => s !== email);

  return (
    <section
      id="contact"
      data-band={band.id}
      className="relative scroll-mt-8 px-5 py-28 sm:px-10 sm:py-36"
    >
      {/* Two columns, and the photo is the right one. Everything above this
          point has been colour; the page ends by saying the colours belong
          to somebody. On a narrow screen the same thing happens vertically:
          the words, then the face, in that order, because the email is what
          the section is for. */}
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-20">
        <Reveal>
          {/* The seven, recombined. The page opened on white light going into
              glass; it closes by putting the colours back where they came
              from, which is the one thing the spectrum has not said yet. */}
          <span aria-hidden="true" className="flex h-2 w-40 overflow-hidden rounded-full">
            {BANDS.map((b) => (
              <span key={b.id} className="flex-1" style={{ backgroundColor: b.color }} />
            ))}
          </span>
          <p className="label mt-4" style={{ color: t.muted }}>
            All seven, back together
          </p>

          <h2
            className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.04em]"
            style={{ color: t.ink }}
          >
            Tell me what you&rsquo;re building.
          </h2>
          <p
            className="mt-5 max-w-xl text-[1.02rem] leading-relaxed"
            style={{ color: t.body }}
          >
            {site.hero.lead} If something here looks like the kind of thing you
            need made, I am one message away.
          </p>

          {/* The address at the size of the thing the page is for. */}
          {email ? (
            <a
              href={email.href}
              className="mt-10 inline-block max-w-full break-words text-[clamp(1.5rem,4.2vw,2.6rem)] font-medium leading-tight tracking-[-0.035em] underline decoration-[0.06em] underline-offset-[0.18em] transition-colors"
              style={{ color: t.ink, textDecorationColor: "rgba(20,20,24,0.25)" }}
            >
              {email.href.replace("mailto:", "")}
            </a>
          ) : null}

          {rest.length ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {rest.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="r-pill border px-5 py-2.5 text-sm transition-colors"
                  style={{ borderColor: t.rule, color: t.ink }}
                >
                  {s.label} ↗︎
                </a>
              ))}
            </div>
          ) : null}

          {socials.length < site.socials.length ? (
            <div className="mt-6">
              <Pending band={band}>
                {site.socials.length - socials.length} of {site.socials.length}{" "}
                links in `site.socials` are still example.com / username
                placeholders and are hidden until they are real. Same for
                `site.meta.url`.
              </Pending>
            </div>
          ) : null}
        </Reveal>

        <Reveal>
          {/* A tall card, not a circle: the crop is 3:4 because the castle
              behind the shoulder is half of why this is the photo, and a
              circle would take it out entirely. */}
          <figure className="mx-auto w-full max-w-[17rem] lg:max-w-none">
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border"
              style={{
                borderColor: t.rule,
                boxShadow: "0 24px 60px -28px rgba(20,20,24,0.45)",
              }}
            >
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                sizes="(min-width: 1024px) 21rem, 17rem"
                className="object-cover"
              />
              {/* The spectrum runs along the bottom edge, so the light the
                  page spent seven sections splitting ends up underneath the
                  person it belongs to. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex h-[6px]"
              >
                {BANDS.map((b) => (
                  <span key={b.id} className="flex-1" style={{ backgroundColor: b.color }} />
                ))}
              </span>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
