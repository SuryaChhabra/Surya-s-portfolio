"use client";

import { useEffect, useState } from "react";
import { SPECTRUM_STOPS, visibleBands } from "@/components/prism/bands";
import { site } from "@/content/site";

/**
 * The bar across the top.
 *
 * It takes its colours from `--band-ink` and `--band-rule`, published by
 * SpectrumBackground, so it stays legible as the page moves from the black
 * opening through five dark fields and one bright gold one.
 *
 * Only the link you are currently on carries a colour. Every dot used to
 * carry its own, which put a row of seven rainbow dots across the top of
 * every screen — and, once you reached the end, a second row of them in
 * the footer at the same time. Seven lit dots also cannot tell you which
 * section you are in, which is what a nav is for. One lit dot can.
 */
export function TopBar() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  /* Education is second on the page and renders nothing until it has
     content, so it is not a link until then either. */
  const links = visibleBands(site.education.institution ? [] : ["education"]);

  /* Transparent over the opening, backed once there is content behind it. */
  useEffect(() => {
    let queued = 0;
    const measure = () => {
      queued = 0;
      setLifted(window.scrollY > window.innerHeight * 0.6);
      /* The same rule SpectrumBackground uses to pick the field: whichever
         section is over the middle of the screen is the one you are in.
         Read here rather than shared, because this only needs the id and
         the two components are already independent of each other. */
      const mid = window.scrollY + window.innerHeight / 2;
      const hit = Array.from(
        document.querySelectorAll<HTMLElement>("[data-band]"),
      ).find((el) => mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight);
      setActive((cur) => (cur === (hit?.dataset.band ?? null) ? cur : hit?.dataset.band ?? null));
    };
    const onScroll = () => {
      if (!queued) queued = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-40"
      style={{
        backdropFilter: lifted ? "blur(10px)" : "none",
        WebkitBackdropFilter: lifted ? "blur(10px)" : "none",
        borderBottom: `1px solid ${lifted ? "var(--band-rule, rgba(255,255,255,0.15))" : "transparent"}`,
        transition: "backdrop-filter 300ms linear, border-color 300ms linear",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4 sm:px-10">
        <a
          href="#top"
          className="pointer-events-auto flex shrink-0 items-center gap-2.5 text-[1.02rem] font-medium tracking-[-0.01em]"
          style={{ color: "var(--band-ink, #ffffff)" }}
        >
          {/* The mark: a prism, with the spectrum inside it.

              This was a rounded square filled with the seven colours as
              stacked horizontal stripes, fixed to the top left of every
              screen on the site. At 16px that is not a spectrum and it is
              not a logo — it is a flag, in the one spot a logo is supposed
              to say who you are, and it was the most-seen object on the
              page because the header never leaves.

              A triangle says the thing the square could not. The colours
              are the same and in the same order, but now they are coming
              out of something, and the something is the whole premise of
              the site. It also finally makes the mark a mark rather than a
              swatch: at this size a triangle is a silhouette you can
              recognise, and a square of colour is not. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4 shrink-0"
            fill="none"
          >
            <defs>
              {/* Raked, not axis-aligned: light leaves a prism at an angle,
                  and an angle is the other thing stripes never have. */}
              <linearGradient id="prism-mark" x1="0.1" y1="0" x2="0.9" y2="1">
                {SPECTRUM_STOPS.map((stop, i) => (
                  <stop
                    key={i}
                    offset={stop.at}
                    stopColor={stop.color}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </linearGradient>
            </defs>
            <path d="M8 1.4 L15 14.6 L1 14.6 Z" fill="url(#prism-mark)" />
          </svg>
          {site.name}
        </a>

        {/* Seven links, a name and a button is a lot of bar, so the labels
            tighten as the screen narrows rather than vanishing at the first
            sign of pressure — a nav that disappears on a 13-inch laptop is
            not a nav. Below lg the rail on the right takes over. */}
        <nav className="pointer-events-auto ml-auto hidden items-center gap-0 lg:flex xl:gap-0.5">
          {links.map((b) => (
            <a
              key={b.id}
              href={`#${b.id}`}
              className="group flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.95rem] transition-opacity hover:opacity-100 xl:px-3 xl:text-[1.02rem]"
              style={{ color: "var(--band-ink, #ffffff)", opacity: 0.88 }}
            >
              <span
                aria-hidden="true"
                className="block h-2 w-2 rounded-full transition-all group-hover:scale-150"
                style={{
                  backgroundColor:
                    b.id === active ? b.color : "var(--band-ink, #ffffff)",
                  opacity: b.id === active ? 1 : 0.32,
                  boxShadow: "0 0 0 1px var(--band-rule, rgba(255,255,255,0.28))",
                }}
              />
              {b.nav}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="pointer-events-auto ml-auto shrink-0 r-pill border px-4.5 py-2.5 text-[0.98rem] transition-colors lg:ml-2"
          style={{
            color: "var(--band-ink, #ffffff)",
            borderColor: "var(--band-rule, rgba(255,255,255,0.28))",
          }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
