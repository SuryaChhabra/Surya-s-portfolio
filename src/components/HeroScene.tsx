"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useHoverCursor } from "./three/useHoverCursor";
import { useDirection } from "./direction";

/* three.js is a heavy dependency and useless to a server render, so the whole
   scene is split out and loaded only in the browser. Until it arrives (and
   forever, if WebGL is unavailable) the CSS gradient fallback stands in. */
const ClayScene = dynamic(
  () => import("./three/ClayScene").then((m) => m.ClayScene),
  { ssr: false },
);

export function HeroScene() {
  const reduced = useReducedMotion();
  const direction = useDirection();
  const host = useRef<HTMLDivElement>(null);

  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(true);
  const [supported, setSupported] = useState<boolean | null>(null);
  const { hovering, onHoverChange } = useHoverCursor();

  /* Probe for WebGL once; some browsers and locked-down devices have none. */
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(
        Boolean(
          canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
        ),
      );
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* Stop the render loop once the hero leaves the viewport — no reason to
     burn a GPU frame budget on a scene nobody is looking at. */
  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className="absolute inset-0"
      style={{ cursor: hovering ? "grab" : undefined }}
    >
      <Fallback dimmed={supported === true && direction.scene} />
      {supported && direction.scene ? (
        <ClayScene
          still={Boolean(reduced)}
          compact={compact}
          active={active && !reduced}
          onHoverChange={onHoverChange}
        />
      ) : null}
    </div>
  );
}

/** The original soft gradient field — now a backdrop for the 3D cluster. */
function Fallback({ dimmed }: { dimmed: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: dimmed ? 0.55 : 1 }}
    >
      <div
        className="animate-blob absolute -right-[10%] -top-[20%] h-[36rem] w-[36rem] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--clay) 42%, transparent), transparent 68%)",
        }}
      />
      <div
        className="animate-blob absolute -left-[16%] top-[28%] h-[30rem] w-[30rem] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--lilac) 38%, transparent), transparent 68%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-blob absolute bottom-[2%] right-[22%] h-[26rem] w-[26rem] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--butter) 40%, transparent), transparent 68%)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
