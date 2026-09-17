"use client";

import { useRef, useState } from "react";
import type { MediaEntry } from "@/content/media.generated";

export type PlayerMedia = MediaEntry & { readonly alt: string };

type Props = {
  media: PlayerMedia;
  /** Used for the accessible label only — the visible caption sits alongside. */
  title?: string;
  /** CSS aspect-ratio, e.g. "16 / 9" or "9 / 16" for vertical work. */
  aspect?: string;
};

/**
 * A click-to-play player for video people actually sit and watch.
 *
 * Deliberately different from LazyVideo, which drives silent hover loops on
 * cards. Here playback is intentional, so it gets sound, native controls,
 * scrubbing and fullscreen — and nothing at all is fetched until the visitor
 * presses play. That single gesture is why this is allowed to be heavy: the
 * bytes are spent only by someone who asked for them.
 *
 * Controls are the browser's own rather than custom: keyboard support,
 * captions, picture-in-picture, fullscreen and download-blocking all come
 * free, and they behave the way each platform's users already expect.
 */
export function VideoPlayer({ media, title, aspect = "16 / 9" }: Props) {
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const playable = media.sources.length > 0;

  function start() {
    setStarted(true);
    /* The element mounts in the same commit, so wait a tick before playing. */
    requestAnimationFrame(() => {
      video.current?.play().catch(() => {
        /* Autoplay-with-sound can still be refused; the visitor then just
           presses the native play button, which is already on screen. */
      });
    });
  }

  return (
    <div
      className="relative w-full overflow-hidden r-card"
      style={{ aspectRatio: aspect, backgroundColor: "var(--paper-2)" }}
    >
      {started && playable ? (
        <video
          ref={video}
          controls
          playsInline
          preload="auto"
          poster={media.poster}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        >
          {media.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          {/* Shown only if no source can be decoded. */}
          <p className="p-4 text-sm">
            Your browser can&apos;t play this video.
          </p>
        </video>
      ) : (
        <Shell playable={playable} onStart={start} title={title} alt={media.alt}>
          <img
            src={media.poster}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Scrim keeps the play control legible over any frame. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.05) 55%)",
            }}
          />

          {playable ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          ) : null}

        </Shell>
      )}
    </div>
  );
}

/** A real button when there is something to play, a plain box when there isn't. */
function Shell({
  playable,
  onStart,
  title,
  alt,
  children,
}: {
  playable: boolean;
  onStart: () => void;
  title?: string;
  alt: string;
  children: React.ReactNode;
}) {
  const className = "group absolute inset-0 h-full w-full";

  if (!playable) return <div className={className}>{children}</div>;

  return (
    <button
      type="button"
      onClick={onStart}
      aria-label={title ? `Play ${title}` : `Play ${alt}`}
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
}
