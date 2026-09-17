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

## Too big for GitHub?

GitHub rejects files over **100 MB** on push and over **25 MB** in the web
uploader, and this repo fails the build over 10 MB. A raw phone or screen
export is routinely 50-500 MB, so it will never go in — and shouldn't, since a
committed binary is carried in git forever and shipped on every deploy.

Almost always the fix is that **the card wants a 3-8 second loop, not the whole
video**. At 1280px, 24fps and silent, that is 0.3-1.5 MB. Trim first, then
encode:

```bash
# trim 6 seconds starting at 0:12, then encode as usual
ffmpeg -i big-original.mov -ss 00:00:12 -t 6 -c copy public/work/_raw/trimmed.mov
./scripts/encode-video.sh public/work/_raw/trimmed.mov community-flywheel
```

No ffmpeg? [HandBrake](https://handbrake.fr) is a free GUI that does the same
job — set the preset to *Web > Gmail Medium 5 Minutes 720p30*, and check
*Audio > None*.

If you genuinely need long-form video on the site, host it elsewhere and point
at it with `videoUrl` in `src/content/site.ts`:

```ts
media: {
  slug: "community-flywheel",          // poster still comes from public/work/
  alt: "...",
  videoUrl: "https://pub-xxxx.r2.dev/community.mp4",
}
```

That file never enters git or the deploy bundle, and the same lazy-loading
rules apply to it. Cloudflare R2, Bunny and Mux all work; R2 has a free tier
with no egress charges.

## When to stop self-hosting

Past ~10 MB of video total, stop committing clips. Git carries every version of
every binary forever, and on Vercel's free tier video eats metered bandwidth
fastest. Move to Cloudflare Stream, Mux or Bunny and point `sources` at the
playback URL — their adaptive bitrate also serves a phone on 4G differently from
a desktop on fibre, which a plain `.mp4` cannot do.
