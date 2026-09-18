"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  buildIndex,
  DOMAIN_META,
  type Domain,
  type IndexItem,
} from "@/content/index-items";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { VideoPlayer } from "./VideoPlayer";
import { LazyVideo } from "./LazyVideo";
import { Lightbox } from "./Lightbox";

export function WorkIndex() {
  const items = useMemo(buildIndex, []);
  const [filter, setFilter] = useState<Domain | "all">("all");
  const [lightbox, setLightbox] = useState<IndexItem | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  /* Only offer filters for domains that actually have something in them. */
  const domains = useMemo(() => {
    const present = new Set(items.map((i) => i.domain));
    return (Object.keys(DOMAIN_META) as Domain[]).filter((d) =>
      present.has(d),
    );
  }, [items]);

  const shown = filter === "all" ? items : items.filter((i) => i.domain === filter);

  return (
    <section id="index" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        index="01 / Index"
        title="Everything, in one place."
        lead="Different terrain, same habit: learn the tools, apply taste, ship version one. Filter it if you like — or don't, the mix is the point."
      />

      <Reveal className="mb-10 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={`All (${items.length})`}
        />
        {domains.map((d) => (
          <span key={d} className={DOMAIN_META[d].hue}>
            <FilterChip
              active={filter === d}
              onClick={() => setFilter(d)}
              label={`${DOMAIN_META[d].label} (${items.filter((i) => i.domain === d).length})`}
            />
          </span>
        ))}
      </Reveal>

      {/* items-start stops a short card being stretched to the height of the
          tallest in its row, which left big empty blocks under bare titles. */}
      <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, i) => (
          <Reveal
            key={item.id}
            delay={(i % 3) * 0.06}
            className={item.wide ? "sm:col-span-2" : undefined}
          >
            <Tile
              item={item}
              playing={playing === item.id}
              onPlay={() => setPlaying(item.id)}
              onOpenImage={() => setLightbox(item)}
            />
          </Reveal>
        ))}
      </div>

      {lightbox ? (
        <Lightbox
          src={lightbox.thumb}
          alt={lightbox.title}
          caption={lightbox.note}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  );
}

function Tile({
  item,
  playing,
  onPlay,
  onOpenImage,
}: {
  item: IndexItem;
  playing: boolean;
  onPlay: () => void;
  onOpenImage: () => void;
}) {
  const meta = DOMAIN_META[item.domain];
  /* Hovering previews the clip in place — a wall of still thumbnails behind
     play buttons is a poor advert for someone who makes video. */
  const [hovered, setHovered] = useState(false);

  const media =
    item.open === "video" ? (
      <div className={`relative ${item.wide ? "aspect-[2.4/1]" : "aspect-[16/10]"}`}>
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
        >
          hover to preview
        </span>
        <LazyVideo
          media={{
            poster: item.thumb,
            sources: [{ src: item.videoSrc!, type: "video/mp4" }],
            alt: item.title,
          }}
          active={hovered}
        />
      </div>
    ) : (
      <div
        className={`relative ${item.wide ? "aspect-[2.4/1]" : "aspect-[16/10]"} overflow-hidden`}
        style={{ backgroundColor: "var(--paper-2)" }}
      >
        {item.thumb ? (
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : null}
      </div>
    );

  const caption = (
    <div className="relative p-5">
      <div className="label" style={{ color: "var(--accent-ink)" }}>
        {meta.label}
      </div>
      <div className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em]">
        {item.title}
      </div>
      {item.note ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.note}</p>
      ) : null}
    </div>
  );

  const accent = (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-10 h-1"
      style={{ backgroundColor: "var(--accent)" }}
    />
  );

  const className = `${meta.hue} group relative flex h-full w-full flex-col overflow-hidden r-card text-left transition-transform duration-500 hover:-translate-y-1 clay-surface`;
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  /* Video: a plain container, because LazyVideo and the sound button are both
     interactive and nesting them inside a button is invalid HTML — which is
     what broke hydration the first time. */
  if (item.open === "video") {
    return (
      <div className={className} {...hoverProps}>
        {accent}
        {playing ? (
          <VideoPlayer
            media={{
              poster: item.thumb,
              sources: [{ src: item.videoSrc!, type: "video/mp4" }],
              alt: item.title,
            }}
            title={item.title}
          />
        ) : (
          media
        )}
        {caption}
        {!playing ? (
          <div className="relative px-5 pb-5">
            <button
              type="button"
              onClick={onPlay}
              className="r-pill border px-4 py-2 text-sm font-medium transition-colors"
              style={{ borderColor: "var(--accent)", color: "var(--accent-ink)" }}
            >
              ▶ Play with sound
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  if (item.open === "link" && item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...hoverProps}
      >
        {accent}
        {media}
        {caption}
      </a>
    );
  }

  return (
    <button type="button" onClick={onOpenImage} className={className} {...hoverProps}>
      {accent}
      {media}
      {caption}
    </button>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="r-pill border px-4 py-2 text-sm transition-colors"
      style={{
        borderColor: active ? "var(--accent)" : "var(--line)",
        backgroundColor: active ? "var(--accent)" : "transparent",
        color: active ? "var(--paper)" : "var(--ink-soft)",
      }}
    >
      {label}
    </button>
  );
}
