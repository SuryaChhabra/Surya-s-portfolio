"use client";

import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { VideoPlayer } from "./VideoPlayer";

const TILE_HUES = ["hue-violet", "hue-red", "hue-green", "hue-cyan"];

export function Videos() {
  return (
    <section
      id="video"
      className="hue-violet mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        index="02 / Video"
        title="AI video work."
        lead="Generated, cut and graded. Press play — nothing loads until you do."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {site.videos.map((video, i) => (
          <Reveal key={video.title} delay={(i % 2) * 0.1}>
            <figure className={`${TILE_HUES[i % TILE_HUES.length]} flex flex-col`}>
              <VideoPlayer
                media={{
                  poster: video.poster,
                  /* An empty src renders the poster with no play control,
                     so the layout is real before the files are hosted. */
                  sources: video.file
                    ? [
                        {
                          /* encodeURIComponent keeps spaces and odd
                             characters in a filename from breaking the URL. */
                          src: `${site.videoBase}/${encodeURIComponent(video.file)}`,
                          type: guessType(video.file),
                        },
                      ]
                    : [],
                  alt: `Still from ${video.title}`,
                }}
                title={video.title}
              />

              <figcaption className="mt-5">
                <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                  {video.title}
                </h3>
                {video.note ? (
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                    {video.note}
                  </p>
                ) : null}
                {(video as { link?: string }).link ? (
                  <a
                    href={(video as { link?: string }).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw mt-3 inline-block text-sm"
                    style={{ color: "var(--accent-ink)" }}
                  >
                    See the post ↗
                  </a>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  {video.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="r-pill border px-2.5 py-1 text-xs"
                      style={{
                        borderColor: "var(--accent)",
                        color: "var(--accent-ink)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function guessType(url: string) {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".webm")) return "video/webm";
  if (path.endsWith(".ogv")) return "video/ogg";
  return "video/mp4";
}
