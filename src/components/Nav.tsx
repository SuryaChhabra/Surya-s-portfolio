"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

/* The full set. Sections hide themselves when they have no real content,
   so the nav filters this down to what is actually on the page — a link to
   a section that no longer exists scrolls nowhere. */
const ALL_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "video", label: "Video" },
  { id: "research", label: "Research" },
  { id: "archery", label: "Archery" },
  { id: "events", label: "Events" },
  { id: "path", label: "Path" },
  { id: "about", label: "About" },
];

export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sections, setSections] = useState(ALL_SECTIONS);

  useEffect(() => {
    setSections(ALL_SECTIONS.filter((s) => document.getElementById(s.id)));
  }, []);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The mobile menu covers the page, so close it on Escape and hold scroll. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  /* Highlight whichever section currently owns the upper third of the screen. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        lifted ? "backdrop-blur-md" : ""
      }`}
      style={{
        backgroundColor: lifted ? "color-mix(in srgb, var(--paper) 78%, transparent)" : "transparent",
        borderBottom: lifted ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-sm font-medium tracking-tight"
        >
          <span className="rainbow-bg grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold tracking-wider text-white">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`r-pill px-3 py-1.5 text-sm transition-colors ${
                    active === s.id
                      ? "text-ink"
                      : "text-ink-faint hover:text-ink"
                  }`}
                  style={
                    active === s.id
                      ? { backgroundColor: "var(--paper-2)" }
                      : undefined
                  }
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="r-pill px-4 py-1.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
          >
            Get in touch
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-ink-soft md:hidden"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className="border-t md:hidden"
          style={{ backgroundColor: "var(--paper)" }}
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b py-3 text-lg tracking-tight last:border-b-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
