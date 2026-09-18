"use client";

import { useState } from "react";
import { site, type ProjectMedia } from "@/content/site";
import { mediaManifest } from "@/content/media.generated";
import { LazyVideo } from "./LazyVideo";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Project = (typeof site.work)[number];

/** Maps a hosted clip's extension to a MIME type the browser can act on. */
function guessVideoType(url: string) {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}

export function Work() {
  return (
    <section
      id="work"
      className="hue-orange mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        index="01 / Projects"
        title="Things I've built."
        lead="Side projects, shipped and live. Click through to any of them."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {site.work.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 0.1}>
            <WorkCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  /* Hover and keyboard focus are the play signal; LazyVideo does the rest. */
  const [active, setActive] = useState(false);
  const Wrapper = project.link ? "a" : "div";

  /* Resolved from whatever is actually sitting in public/work/. A slug with no
     files yet simply renders no media block rather than a broken image. */
  const projectMedia: ProjectMedia | undefined = (
    project as { media?: ProjectMedia }
  ).media;
  const entry = projectMedia ? mediaManifest[projectMedia.slug] : undefined;

  /* A videoUrl points at a clip hosted somewhere else and replaces the local
     sources entirely — the poster still comes from public/work/, since it is
     small enough to belong in the repo. This is the answer for anything too
     big to commit: the file never enters git or your deploy bundle. */
  const remote = projectMedia?.videoUrl;
  const media = entry
    ? {
        poster: entry.poster,
        sources: remote
          ? [{ src: remote, type: guessVideoType(remote) }]
          : entry.sources,
        alt: projectMedia!.alt,
      }
    : undefined;

  return (
    <Wrapper
      {...(project.link
        ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={`hue-${project.tone} group relative flex h-full flex-col overflow-hidden r-card transition-transform duration-500 hover:-translate-y-1 clay-surface`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{ backgroundColor: "var(--accent)" }}
      />

      {media ? <LazyVideo media={media} active={active} /> : null}

      <div className="relative flex flex-1 flex-col p-7 sm:p-9">
        {/* Accent wash that warms on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-45 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ backgroundColor: "var(--accent)" }}
        />

        <div className="relative flex items-center justify-between gap-4">
          <span className="label" style={{ color: "var(--accent-ink)" }}>
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

        {project.summary ? (
          <p className="relative mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
            {project.summary}
          </p>
        ) : null}

        {project.metrics.length ? (
        <div
          className="relative mt-7 grid grid-cols-3 gap-4 border-t pt-6"
          style={{ borderColor: "var(--line)" }}
        >
          {project.metrics.map((metric: { value: string; label: string }) => (
            <div key={metric.label}>
              <div
                className="text-xl font-medium tracking-[-0.03em] sm:text-2xl"
                style={{ color: "var(--accent-ink)" }}
              >
                {metric.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-ink-faint">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        ) : null}

        {project.tags.length ? (
        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="r-pill border border-line px-2.5 py-1 text-xs text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        ) : null}

        {/* Without metrics or tags the card would collapse to nothing below
            the title, so the link acts as the closing line. */}
        {project.link ? (
          <span
            className="relative mt-6 block text-sm"
            style={{ color: "var(--accent-ink)" }}
          >
            {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
