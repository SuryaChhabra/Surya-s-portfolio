"use client";

import { useEffect, useState } from "react";
import { BANDS, visibleBands } from "@/components/prism/bands";
import { site } from "@/content/site";

/**
 * The bar across the top.
 *
 * It takes its colours from `--band-ink` and `--band-rule`, published by
 * SpectrumBackground, so it stays legible as the page moves from the black
 * opening through five dark fields and one bright gold one. Nothing here
 * knows which band is current; it just follows the ink.
 *
 * Each link carries its band's colour as a dot, which is the only nav
 * affordance the page needs: you are picking a wavelength, not a page.
 */
export function TopBar() {
  const [lifted, setLifted] = useState(false);
  /* Education is second on the page and renders nothing until it has
     content, so it is not a link until then either. */
  const links = visibleBands(site.education.institution ? [] : ["education"]);

  /* Transparent over the opening, backed once there is content behind it. */
  useEffect(() => {
    let queued = 0;
    const measure = () => {
      queued = 0;
      setLifted(window.scrollY > window.innerHeight * 0.6);
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
          className="pointer-events-auto flex shrink-0 items-center gap-2.5 text-[0.95rem] font-medium tracking-[-0.01em]"
          style={{ color: "var(--band-ink, #ffffff)" }}
        >
          {/* The whole spectrum, stacked, as the mark. */}
          <span aria-hidden="true" className="flex h-4 w-4 flex-col overflow-hidden rounded-[5px]">
            {BANDS.map((b) => (
              <span key={b.id} className="flex-1" style={{ backgroundColor: b.color }} />
            ))}
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
              className="group flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.88rem] transition-opacity hover:opacity-100 xl:px-3 xl:text-[0.95rem]"
              style={{ color: "var(--band-ink, #ffffff)", opacity: 0.85 }}
            >
              <span
                aria-hidden="true"
                className="block h-[7px] w-[7px] rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: b.color }}
              />
              {b.nav}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="pointer-events-auto ml-auto shrink-0 r-pill border px-4 py-2 text-[0.92rem] transition-colors lg:ml-2"
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
