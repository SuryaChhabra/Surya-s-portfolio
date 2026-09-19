"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen image view, shared by the index and the research gallery.
 *
 * Rendered into document.body, not where it is written. The page's <main>
 * carries `relative z-10`, which makes it a stacking context, so a z-index
 * set inside it only ever competes with other things inside it — this
 * dialog's z-80 was being read against main's z-10 and losing to the
 * fixed header at z-40. The nav then sat on top of a full-screen image
 * viewer: legible, clickable, and it scrolled the page behind the modal
 * without closing it. A portal takes the dialog out of main entirely, so
 * its z-index means what it says however the page is nested later.
 */
export function Lightbox({
  src,
  alt,
  caption,
  detail,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** The technical reading, for whoever opened the image wanting it. */
  detail?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(6,8,12,0.94)" }}
    >
      <div
        className="relative max-h-[80vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          sizes="100vw"
          className="max-h-[80vh] w-full rounded-lg object-contain"
          priority
        />
      </div>

      {caption ? (
        <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/80">
          {caption}
        </p>
      ) : null}

      {detail ? (
        <p className="mt-3 max-w-2xl text-center text-[0.8rem] leading-relaxed text-white/55">
          {detail}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="mt-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
      >
        ✕
      </button>
    </div>,
    document.body,
  );
}
