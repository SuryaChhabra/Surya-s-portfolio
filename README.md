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

## The video section

`src/content/site.ts` has a `videos` array driving a dedicated section. These
are meant to be **watched**, not glanced at, so they get a real player — sound,
scrubbing, fullscreen, keyboard support — using the browser's native controls
rather than a custom skin.

```ts
videos: [
  {
    title: "Aurora — brand film",
    note: "60s brand film. Generated sequences, hand-graded.",
    tags: ["Runway", "Midjourney", "Resolve"],
    poster: "/work/video-aurora.webp",              // small, lives in the repo
    src: "https://pub-xxxx.r2.dev/aurora.mp4",      // hosted, never committed
  },
]
```

**Nothing loads until someone presses play.** Before the click there is no
`<video>` element in the page at all — just the poster. Verified in a browser:
0 requests to the host before the click, 1 after.

Leave `src` empty and the tile shows its poster with no play control, so the
layout is real before the files are hosted.

### Hosting the files

Do not commit these. GitHub rejects anything over 100 MB, and a committed
binary is carried in git forever and shipped on every deploy. Put them on
object storage and paste the URL into `src`:

- **Cloudflare R2** — free tier, and crucially **no egress charges**, which is
  what usually bites on video. Make the bucket public, upload, copy the URL.
- **Bunny.net** — cheap, fast, simple CDN.
- **Mux / Cloudflare Stream** — worth it only if you want adaptive bitrate,
  i.e. a phone on 4G getting a different rendition from a desktop on fibre.

Export at **1080p, H.264, AAC audio**, `-movflags +faststart` so playback can
begin before the whole file arrives:

```bash
ffmpeg -i master.mov -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart aurora.mp4

# poster: grab a representative frame
ffmpeg -i master.mov -ss 00:00:03 -frames:v 1 -q:v 82 public/work/video-aurora.webp
```

## Project media

Adding a video is a **file drop, not a code edit**. Put the files in
`public/work/`, run `npm run media`, and the card picks them up.

```bash
./scripts/encode-video.sh public/work/_raw/my-clip.mov community-flywheel
npm run media
```

Files are matched to projects by **slug** — the `media.slug` in
`src/content/site.ts`. Everything sharing a slug belongs to one card:

```
community-flywheel.webp       poster   (required)
community-flywheel.av1.mp4    AV1      (optional, offered first)
community-flywheel.mp4        H.264    (optional, fallback)
```

A slug with only a poster renders a still, and no video machinery loads at all.
Only use motion where motion shows something a frame can't.

`npm run media` regenerates `src/content/media.generated.ts` and runs
automatically before `dev` and `build`, so the manifest can never drift from
what is actually on disk.

### Keeping it light

Two separate problems. **What the browser downloads** — nothing streams until
someone shows interest:

| Stage | Loads |
| --- | --- |
| Page load | nothing, not one video byte |
| Card nears the viewport | `preload="metadata"`, one small range request |
| Hover / keyboard focus | the clip plays |
| Card leaves the viewport | paused and rewound |

On Save-Data, 2g or `prefers-reduced-motion`, even the metadata step is skipped
— those visitors fetch **zero** video bytes and get a play button instead, so
the footage stays reachable. Only one clip plays at a time; four decoders in a
card grid is where scrolling starts to stutter and phones get warm. Verified in
a browser: 0 requests on load, 0 in either reduced-motion or Save-Data mode.

**What the repo carries** — anything committed is in git forever and shipped on
every deploy, so the manifest enforces budgets rather than trusting discipline:

| Limit | Behaviour |
| --- | --- |
| clip > 2.5 MB | warning |
| clip > 10 MB | **build fails** |
| all clips > 10 MB | warning to move to a streaming host |
| video without a poster | **build fails** |

Masters go in `public/work/_raw/`, which is gitignored — encode from there and
never commit the originals.

Target 3–8 seconds, silent, under 2.5 MB. Full encode settings and the
streaming-host threshold are in
[`public/work/README.md`](public/work/README.md).

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
