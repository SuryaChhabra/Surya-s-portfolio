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
