# Project media

Drop files here, run `npm run media`, done. No code change.

## Adding a project video

1. Put the original anywhere — `_raw/` in this folder is a good spot and is
   **gitignored**, so masters never end up in the repo.
2. Encode it:

   ```bash
   ./scripts/encode-video.sh public/work/_raw/my-clip.mov community-flywheel
   ```

3. Run `npm run media`.

That's it. The card picks the clip up automatically.

## Naming

Files are matched to projects by **slug** — the `media.slug` value in
`src/content/site.ts`. Everything sharing a slug belongs to one card:

```
community-flywheel.webp       poster   (required)
community-flywheel.av1.mp4    AV1      (optional, offered first)
community-flywheel.mp4        H.264    (optional, fallback)
```

Current slugs: `community-flywheel`, `programmatic-seo`, `lifecycle-rebuild`,
`creator-partners`.

**Poster only is a valid answer.** A slug with just an image renders a still,
and no video machinery loads at all. Only use motion where motion shows
something a frame can't.

A slug with video but no poster fails the build on purpose — the poster is what
loads first, so without it the card sits blank until playback starts.

## Keeping the site light

Two different problems, both handled:

**What the browser downloads.** Nothing streams until someone shows interest:

| Stage | Loads |
| --- | --- |
| Page load | nothing — not one video byte |
| Card nears the viewport | `preload="metadata"`, one small range request |
| Hover / keyboard focus | the clip plays |
| Card leaves the viewport | paused and rewound |

On Save-Data, 2g or `prefers-reduced-motion` even the metadata step is skipped,
and those visitors get a play button instead. Only one clip plays at a time —
four decoders running in a card grid is where scrolling starts to stutter.

**What the repo carries.** Anything committed here is in git forever and served
on every deploy, so `npm run media` enforces budgets:

| Limit | Behaviour |
| --- | --- |
| clip > 2.5 MB | warning |
| clip > 10 MB | **build fails** |
| all clips > 10 MB | warning to move to a streaming host |

Target **3–8 seconds, silent, under 2.5 MB**. The encode script's settings hit
that for typical screen-recording footage.

## When to stop self-hosting

Past ~10 MB of video total, stop committing clips. Git carries every version of
every binary forever, and on Vercel's free tier video eats metered bandwidth
fastest. Move to Cloudflare Stream, Mux or Bunny and point `sources` at the
playback URL — their adaptive bitrate also serves a phone on 4G differently from
a desktop on fibre, which a plain `.mp4` cannot do.
