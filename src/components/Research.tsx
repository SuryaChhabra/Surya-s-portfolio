"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type ResearchImage = { src: string; caption: string; alt: string };

export function Research() {
  const images = site.research.images as readonly ResearchImage[];
  /* Index of the image open in the lightbox, or null when closed. */
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  );

  /* Arrow keys to move, Escape to close, and scroll held while open. */
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, step]);

  if (!images.length) return null;

  return (
    <section
      id="research"
      className="hue-cyan border-y"
      style={{ backgroundColor: "var(--paper-2)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          index="03 / Research"
          title="Astronomy."
          lead={site.research.blurb || undefined}
        />

        <ul className="grid gap-5 sm:grid-cols-2">
          {images.map((image, i) => (
            <Reveal key={image.src} delay={(i % 2) * 0.08}>
              <li>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full overflow-hidden r-card text-left clay-surface"
                  aria-label={`Open ${image.alt}`}
                >
                  <span
                    className="relative block aspect-[4/3] w-full overflow-hidden"
                    style={{ backgroundColor: "var(--paper)" }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      /* contain, not cover: cropping a plot cuts data off. */
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </span>
                  {image.caption ? (
                    <span className="block px-5 py-4 text-sm leading-relaxed text-ink-soft">
                      {image.caption}
                    </span>
                  ) : null}
                </button>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[open].alt}
          onClick={close}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(6,8,12,0.92)" }}
        >
          {/* Stop clicks on the image itself from closing the dialog. */}
          <div
            className="relative max-h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open].src}
              alt={images[open].alt}
              width={1600}
              height={1200}
              sizes="100vw"
              className="max-h-[80vh] w-full rounded-lg object-contain"
              priority
            />
          </div>

          {images[open].caption ? (
            <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/80">
              {images[open].caption}
            </p>
          ) : null}

          <div className="mt-5 flex items-center gap-3">
            <LightboxButton onClick={() => step(-1)} label="Previous image">
              ←
            </LightboxButton>
            <span className="text-xs text-white/60">
              {open + 1} / {images.length}
            </span>
            <LightboxButton onClick={() => step(1)} label="Next image">
              →
            </LightboxButton>
            <LightboxButton onClick={close} label="Close">
              ✕
            </LightboxButton>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function LightboxButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
    >
      {children}
    </button>
  );
}
