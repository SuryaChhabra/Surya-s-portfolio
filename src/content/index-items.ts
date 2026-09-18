import { site } from "./site";
import { mediaManifest } from "./media.generated";

/**
 * Everything, flattened into one list.
 *
 * The point of the site is that the range belongs to one person. Separate
 * sections per domain argue the opposite — they read as four unrelated
 * hobbies. So domain becomes a tag on a single index rather than a wall
 * between sections, and a visitor sees astronomy beside a music video beside
 * a shipped app in one view.
 */
export type Domain = "video" | "research" | "code" | "sport" | "event";

export type IndexItem = {
  id: string;
  domain: Domain;
  title: string;
  note: string;
  thumb: string;
  /** How a click should behave. */
  open: "video" | "image" | "link";
  videoSrc?: string;
  link?: string;
  tags: readonly string[];
  /** Wide tiles break the grid's rhythm so it reads editorial, not uniform. */
  wide?: boolean;
};

export const DOMAIN_META: Record<Domain, { label: string; hue: string }> = {
  video: { label: "Video", hue: "hue-pink" },
  research: { label: "Research", hue: "hue-cyan" },
  code: { label: "Built", hue: "hue-violet" },
  sport: { label: "Sport", hue: "hue-amber" },
  event: { label: "Events", hue: "hue-green" },
};

function videoUrl(file: string) {
  return `${site.videoBase}/${encodeURIComponent(file)}`;
}

export function buildIndex(): IndexItem[] {
  const items: IndexItem[] = [];

  /* Video first: it is the strongest single piece of evidence. */
  site.videos.forEach((v, i) => {
    if (!v.file) return;
    items.push({
      id: `video-${i}`,
      domain: "video",
      title: v.title,
      note: v.note,
      thumb: v.poster,
      open: "video",
      videoSrc: videoUrl(v.file),
      tags: v.tags,
      wide: i === 0,
    });
  });

  site.research.images.forEach((img, i) => {
    if (!img.src) return;
    items.push({
      id: `research-${i}`,
      domain: "research",
      /* A short title; the full description is the caption. Deriving it from
         alt text produced sentence-long headings. */
      title: (img as { title?: string }).title ?? "Figure",
      note: img.caption,
      thumb: img.src,
      open: "image",
      tags: [],
    });
  });

  site.work.forEach((w, i) => {
    const media = (w as { media?: { slug: string } }).media;
    const entry = media ? mediaManifest[media.slug] : undefined;
    items.push({
      id: `code-${i}`,
      domain: "code",
      title: w.title,
      note: w.summary,
      thumb: entry?.poster ?? "",
      open: "link",
      link: w.link,
      tags: w.tags,
    });
  });

  const archeryPhoto = (site.archery as { image?: string }).image;
  if (archeryPhoto) {
    items.push({
      id: "sport-0",
      domain: "sport",
      title: "Competitive archery",
      note: site.archery.blurb,
      thumb: archeryPhoto,
      open: "image",
      tags: [],
    });
  }

  site.events.forEach((e, i) => {
    if (!e.name.trim()) return;
    items.push({
      id: `event-${i}`,
      domain: "event",
      title: e.name,
      note: e.note,
      thumb: e.images?.[0] ?? "",
      open: "link",
      link: e.link,
      tags: [],
    });
  });

  return items;
}
