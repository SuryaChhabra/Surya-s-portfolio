# Portfolio

A growth portfolio — campaigns, events, experience and the numbers behind them.
Built with Next.js (App Router), Tailwind CSS v4 and Motion.

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
