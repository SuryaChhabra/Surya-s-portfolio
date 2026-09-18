"use client";

import Image from "next/image";
import { useEffect } from "react";

/** Full-screen image view, shared by the index and the research gallery. */
export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
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

  return (
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

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="mt-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
      >
        ✕
      </button>
    </div>
  );
}
