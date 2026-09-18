# Research images

Drop astronomy images here and list them in the `research.images` array in
`src/content/site.ts`:

```ts
{ src: "/research/m31-halpha.jpg", caption: "M31 in H-alpha, 2m telescope, 45min stack.", alt: "..." }
```

## Formats

JPEG or PNG is fine — **do not pre-convert to WebP**. Next.js resizes and
serves AVIF/WebP automatically per browser and viewport, so an original-quality
source gives it the most to work with.

Plots and figures (matplotlib, sky maps): PNG. Photographic or stacked imagery:
JPEG.

## Size

Unlike video, these are cheap and belong in the repo. Keep sources under about
**2 MB** each and no wider than **2560px** — beyond that you are committing
detail no screen will show. A 4K stack straight out of a stacking program is
usually worth downscaling first.

## Captions matter more than they do elsewhere

A research image without a caption is decoration. Say what the object is, what
instrument or survey it came from, and what the reader should notice. That is
the difference between a pretty picture and evidence of work.
