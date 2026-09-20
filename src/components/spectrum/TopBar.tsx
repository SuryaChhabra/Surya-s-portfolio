"use client";

import { useEffect, useState } from "react";
import { visibleBands } from "@/components/prism/bands";
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
          {/* The mark.

              Two versions preceded this one and both failed the same test,
              which is that a logo has to survive being 20 pixels wide. The
              first was a rounded square filled with the seven colours as
              stacked stripes — at that size not a spectrum but a flag, in
              the one spot on a page reserved for saying who you are. The
              second was a triangle with the spectrum inside it, which was
              honest about the premise and still turned to coloured mush at
              the size it actually gets rendered.

              A letter does not turn to mush. It is also the one mark that
              cannot be misread as being about anything except the person
              whose name is set immediately to the right of it.

              Set in the site's own display face rather than a generic
              serif: Instrument Serif is already loaded for the headings,
              so this costs nothing and ties the mark to the typography
              instead of floating free of it. Everything takes
              `currentColor`, which the anchor above binds to `--band-ink`,
              so the mark inverts by itself on the light closing field —
              the previous two were fixed light-on-dark and would have
              disappeared down there. */}
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-[0.4rem] border pt-px text-[0.92rem] leading-none"
            style={{
              fontFamily: "var(--font-display)",
              borderColor: "color-mix(in srgb, currentColor 32%, transparent)",
            }}
          >
            S
          </span>

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
                  backgroundColor: b.color,
                  /* Colour says which section; weight says which one you
                     are in. The dot you are on goes to full strength and
                     picks up a halo of its own light, the rest sit back.
                     Doing it with opacity rather than by draining the
                     colour out keeps the nav legible as a set. */
                  opacity: b.id === active ? 1 : 0.5,
                  boxShadow:
                    b.id === active
                      ? `0 0 0 1px var(--band-rule, rgba(255,255,255,0.28)), 0 0 9px ${b.color}`
                      : "0 0 0 1px var(--band-rule, rgba(255,255,255,0.28))",
                  transform: b.id === active ? "scale(1.25)" : "scale(1)",
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
