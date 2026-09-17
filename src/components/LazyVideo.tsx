"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export type Media = {
  /** Always shown first. Cheap, static, and what the card looks like at rest. */
  readonly poster: string;
  /** Ordered best-first; the browser picks the first type it supports. */
  readonly sources?: readonly { readonly src: string; readonly type: string }[];
  readonly alt: string;
};

/* Only one clip plays at a time. Four cards autoplaying in a grid means four
   video decoders running, which is where scrolling starts to stutter on a
   laptop and where a phone starts getting warm. */
let nowPlaying: HTMLVideoElement | null = null;

function claimPlayback(el: HTMLVideoElement) {
  if (nowPlaying && nowPlaying !== el) nowPlaying.pause();
  nowPlaying = el;
}

function releasePlayback(el: HTMLVideoElement) {
  if (nowPlaying === el) nowPlaying = null;
}

/** Whether this device/connection should stream video at all without asking. */
function autoplayAllowed() {
  if (typeof navigator === "undefined") return false;

  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false;
  return true;
}

type Props = {
  media: Media;
  /** True while the containing card is hovered or focused. */
  active?: boolean;
};

export function LazyVideo({ media, active = false }: Props) {
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const host = useRef<HTMLDivElement>(null);

  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  /* Set when someone explicitly presses play, for the cases where hover-to-
     play never fires: reduced motion, Save-Data, or a 2g connection. */
  const [manual, setManual] = useState(false);
  const [canStream, setCanStream] = useState(false);
  const hasVideo = Boolean(media.sources?.length);

  /* navigator.connection is only readable in the browser. */
  useEffect(() => setCanStream(autoplayAllowed()), []);

  const mayAutoplay = canStream && !reduced;
  /* Fetching metadata as a card approaches makes the first hover feel instant,
     but it is still bytes nobody asked for — so it is skipped entirely on
     metered or slow connections, and for reduced-motion visitors who will
     never trigger playback by hovering. */
  const shouldLoad = manual || (near && mayAutoplay);

  /* Load nothing until the card is close to the viewport. */
  useEffect(() => {
    const el = host.current;
    if (!el || !hasVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo]);

  /* Play only on intent: hover/focus on a pointer device, and never when the
     visitor has asked for reduced motion or is on a metered connection. */
  useEffect(() => {
    const el = video.current;
    if (!el || !hasVideo) return;

    const wanted = manual || (active && near && mayAutoplay);

    if (wanted) {
      claimPlayback(el);
      /* play() rejects if the element is torn down mid-gesture; that is not
         an error worth surfacing. */
      el.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      el.pause();
      releasePlayback(el);
      setPlaying(false);
    }
  }, [active, near, manual, mayAutoplay, hasVideo]);

  /* Drop the decoded buffer once the card is well out of view. */
  useEffect(() => {
    const el = video.current;
    if (!el || near || !hasVideo) return;
    el.pause();
    releasePlayback(el);
    setManual(false);
    if (el.currentTime !== 0) el.currentTime = 0;
  }, [near, hasVideo]);

  useEffect(() => {
    const el = video.current;
    return () => {
      if (el) releasePlayback(el);
    };
  }, []);

  return (
    <div
      ref={host}
      className="relative aspect-video w-full overflow-hidden"
      style={{ backgroundColor: "var(--paper-2)" }}
    >
      {/* The poster is the real content. Everything else is an enhancement. */}
      <img
        src={media.poster}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: playing ? 0 : 1 }}
      />

      {hasVideo ? (
        <video
          ref={video}
          muted
          loop
          playsInline
          /* Nothing is fetched at this value; it only rises once `near`. */
          preload={shouldLoad ? "metadata" : "none"}
          poster={media.poster}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: playing ? 1 : 0 }}
        >
          {shouldLoad
            ? media.sources!.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))
            : null}
        </video>
      ) : null}

      {/* Without this, a reduced-motion or Save-Data visitor has no way to
          reach the footage at all. */}
      {hasVideo && !mayAutoplay ? (
        <button
          type="button"
          onClick={() => setManual((v) => !v)}
          aria-label={manual ? `Pause ${media.alt}` : `Play ${media.alt}`}
          className="absolute bottom-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full border text-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--line)",
            color: "var(--ink)",
          }}
        >
          {manual ? "❚❚" : "▶"}
        </button>
      ) : null}
    </div>
  );
}
