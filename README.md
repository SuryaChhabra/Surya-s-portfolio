# Portfolio

A growth portfolio — campaigns, events, experience and the numbers behind them,
fronted by an interactive 3D hero. Built with Next.js (App Router), Tailwind
CSS v4, Motion and react-three-fiber.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Make it yours

**Everything you need to edit lives in one file: [`src/content/site.ts`](src/content/site.ts).**
Name, role, blurb, stats, projects, events, timeline, writing, toolkit and links
are all plain data in there — the components read from it, so you never have to
touch JSX to change content.

A few notes on that file:

- **Hero lines** — each string is its own line. Wrap a word in `*asterisks*` to
  render it in the accent serif italic: `"*momentum*"`.
- **Project `tone`** — sets the card's accent colour. One of `clay`, `sage`,
  `butter`, `lilac`.
- **Empty `link: ""`** — the card or post renders without a link and without the
  ↗ arrow, so unpublished work still looks intentional.
- **Sections are driven by array length** — add or remove projects, events and
  timeline entries freely; the layouts adapt.

### Before publishing

The content shipped here is **realistic placeholder** — swap it for your real
work. Specifically, check:

- [ ] `name`, `initials`, `role`, `location`, `email` and `meta.url`
- [ ] `socials` — the LinkedIn/X/GitHub handles are placeholders
- [ ] `resumeUrl` points at `/resume.pdf` — drop your PDF in `public/` or change
      the link (nothing lives there yet, so the button 404s until you do)
- [ ] every metric in `stats` and `work` — these are invented numbers

### The 3D hero

A cluster of glossy "candy clay" shapes floats beside the headline. They drift
on their own, lean with your cursor, grow when you hover, and squash-and-spin
when you click them.

Everything about the cluster lives in
[`src/components/three/ClayScene.tsx`](src/components/three/ClayScene.tsx):

- `SHAPES` — the desktop arrangement. Each entry takes a `kind` (`blob`,
  `capsule`, `torus`, `box`, `knot`), a `color`, a resting `position`, a `scale`
  and a `seed` that de-syncs its drift.
- `COMPACT_SHAPES` — a separate, smaller arrangement for phones and tablets.
  Portrait screens are much narrower in world units, so the desktop positions
  would sit on top of the copy.
- Shape colours come from
  [`src/components/three/palette.ts`](src/components/three/palette.ts).

**If you move a shape, re-check it against the headline.** Positions are
hand-placed to keep the text column clear, with margin for the drift — the
quickest way to ruin this hero is a blob wandering across the type.

Some deliberate choices worth keeping:

- three.js is **dynamically imported**, so its ~950 KB never touches the initial
  page load, and the CSS gradient stands in until it arrives.
- The render loop **stops when the hero scrolls out of view**, and drops to
  `demand` rather than `never` — `never` would leave reduced-motion visitors
  looking at an empty canvas.
- `prefers-reduced-motion` renders the cluster **static but complete**.
- Lighting uses locally-rendered light cards instead of an HDRI, so nothing is
  fetched from a CDN at runtime.
- If WebGL is missing, the hero falls back to the gradient with no error.

## Design directions

Five complete visual treatments ship behind a switcher in the bottom-right
corner: **Prism** (the default — clay paper, full rainbow, 3D), **Bloom** (soft
sage, very round), **Neon** (near-black techno), **Press** (editorial
broadsheet) and **Mono** (Swiss grid).

They are a decision-making tool, not a site feature. Each one retargets the same
tokens — palette, type, radius, shadow, grain — so no component knows which is
active. Definitions live in [`src/components/direction.tsx`](src/components/direction.tsx)
and the generated tokens in `src/app/directions.css`.

The `-ink` values in that file are **derived, not hand-picked**: 
[`scripts/generate-directions.py`](scripts/generate-directions.py) walks each
hue's lightness until it clears 4.5:1 against that direction's own paper, card
and paper-2, in both themes. Edit the palettes there and re-run it:

```bash
python3 scripts/generate-directions.py
```

**Once you have picked one:** set it as the default in `direction.tsx`, delete
the others, remove `<DirectionSwitcher />` from `src/app/page.tsx`, and fold the
winning block from `directions.css` into `globals.css`. Shipping the switcher on
a live portfolio invites visitors to redesign it for you.

## Project media

Cards take an optional `media` block in `src/content/site.ts`: a **poster**
(required) and optional **sources** for a silent looping clip. Files live in
`public/work/`. The posters shipped here are obvious placeholders — replace
them.

```ts
media: {
  poster: "/work/community-flywheel.webp",
  sources: [
    { src: "/work/community-flywheel.av1.mp4", type: 'video/mp4; codecs="av01.0.05M.08"' },
    { src: "/work/community-flywheel.mp4", type: "video/mp4" },
  ],
  alt: "Discord server growing from empty to eight thousand members.",
},
```

Omit `sources` and the card shows a still. That is a perfectly good answer for
most projects — only use video where motion actually shows something.

### How the loading works

Video is the heaviest thing on a portfolio and the easiest to get wrong. The
rule here is **nothing streams until someone shows interest**, in tiers:

| Stage | What loads |
| --- | --- |
| Page load | Nothing. Not one video byte. |
| Card approaches viewport (200px out) | `preload="metadata"` — one small range request, so the first hover starts instantly |
| Hover / keyboard focus | The clip plays |
| Card leaves the viewport | Paused and rewound |

On **Save-Data, a 2g connection, or `prefers-reduced-motion`**, the metadata
step is skipped too — those visitors fetch *zero* video bytes and get an
explicit play button instead, so the footage is still reachable.

Only one clip ever plays at a time. Four cards autoplaying in a grid means four
decoders running, which is where scrolling starts to stutter on a laptop and a
phone starts getting warm.

Verified in a browser: 0 video requests on load; 1 metadata request once a card
nears the viewport; 0 requests in either reduced-motion or Save-Data mode.

### Encoding

Keep clips **3–8 seconds, silent, and under ~2 MB**. Strip the audio track
entirely — it is dead weight in a muted loop. 1280px wide is plenty for a card.

```bash
# H.264 — the universal fallback
ffmpeg -i source.mov -an -vf "scale=1280:-2,fps=24" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p \
  -movflags +faststart work.mp4

# AV1 — roughly 30–50% smaller, listed first so modern browsers prefer it
ffmpeg -i source.mov -an -vf "scale=1280:-2,fps=24" \
  -c:v libsvtav1 -crf 34 -preset 6 -pix_fmt yuv420p \
  -movflags +faststart work.av1.mp4

# Poster — pull a representative frame, not frame 0
ffmpeg -i source.mov -ss 00:00:01.5 -frames:v 1 -vf "scale=1280:-2" -q:v 80 work.webp
```

`-movflags +faststart` matters: it moves the index to the front of the file so
playback can begin before the whole clip arrives. Without it the metadata
preload fetches from the *end* of the file and hover-to-play stalls.

### When to stop self-hosting

Files in `public/` are committed to git and served from your host's CDN. That is
fine up to roughly **10 MB of video total**. Past that:

- Git gets slow and heavy — the repo carries every version of every binary ever
  committed. Use Git LFS, or keep the masters out of the repo.
- On Vercel's free tier, bandwidth is metered and video eats it fastest.

Beyond that point move to a video host (Cloudflare Stream, Mux, Bunny) and put
its playback URL in `sources`. Their HLS/DASH output also gives you adaptive
bitrate, which a plain `.mp4` cannot do — the same file is served to a phone on
4G and a desktop on fibre.

### The rainbow system

The page walks the spectrum as you scroll: stats red/amber/green/blue, work
orange, events green, path blue, about violet, contact pink — with the hero and
the scroll bar carrying the full arc.

It is driven entirely by CSS custom properties, no JavaScript. Every hue has
**two** values in [`src/app/globals.css`](src/app/globals.css):

| token | use |
| --- | --- |
| `--sp-<hue>` | vivid — fills, rules, dots, 3D shapes, large display numbers |
| `--sp-<hue>-ink` | darkened — anything set at body text size |

A section or card picks a hue by adding a class — `hue-red`, `hue-orange`,
`hue-amber`, `hue-green`, `hue-cyan`, `hue-blue`, `hue-violet`, `hue-pink` —
which rebinds `--accent` and `--accent-ink` for its whole subtree. To recolour a
section, change one class name.

**Use `--accent-ink` for text and `--accent` for everything else.** This is not
a style preference: on the cream background six of the eight vivid hues fall
below even the 3:1 large-text contrast floor (amber lands at 1.6:1). The ink
scale clears 4.5:1 at every stop, and both scales invert for dark mode, so the
rule holds in both themes. `.rainbow-text` is built from the ink scale for the
same reason.

Helpers: `.rainbow-bg` (the full arc as a background, used by the scroll bar,
monogram and footer rule) and `.rainbow-text` (animated gradient type, which
holds still under `prefers-reduced-motion`).

### Colours & type

Design tokens are CSS custom properties at the top of
[`src/app/globals.css`](src/app/globals.css) — one block for light, one for dark.
Change `--clay` and friends there and the whole site follows. Fonts are set in
[`src/app/layout.tsx`](src/app/layout.tsx) (Instrument Serif / Inter / JetBrains
Mono).

Dark mode follows the system by default and can be toggled; the choice persists
in `localStorage`.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — it
detects Next.js with no configuration. Netlify and Cloudflare Pages work too
(`npm run build`).
