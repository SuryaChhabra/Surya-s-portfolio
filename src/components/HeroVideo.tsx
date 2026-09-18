"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { site } from "@/content/site";

/**
 * Full-bleed video behind the hero.
 *
 * This deliberately breaks the "nothing loads until intent" rule the rest of
 * the site follows, and the trade is worth naming: for someone whose pitch is
 * video craft, the work has to be the first thing you see, not a thumbnail
 * you might click. One muted loop, poster-first, and skipped entirely for
 * anyone on Save-Data, a slow connection, or reduced motion.
 */
export function HeroVideo() {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const first = site.videos.find((v) => v.file);
  const src = first ? `${site.videoBase}/${encodeURIComponent(first.file)}` : "";
  const poster = first?.poster ?? "";

  useEffect(() => {
    if (reduced) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)[23]g$/.test(conn.effectiveType)) return;

    /* Wait for first paint so the hero type is never blocked by video bytes. */
    const id = window.setTimeout(() => setAllowed(true), 400);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    const el = video.current;
    if (!el || !allowed) return;
    el.play().then(
      () => setReady(true),
      () => setReady(false),
    );
  }, [allowed]);

  if (!src) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* The poster carries the frame until the video is decoding. */}
      {poster ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {allowed ? (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}

      {/* Scrim: the type has to stay readable over whatever frame is showing. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,10,0.92) 0%, rgba(8,8,10,0.72) 45%, rgba(8,8,10,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to top, var(--paper), transparent)",
        }}
      />
    </div>
  );
}
