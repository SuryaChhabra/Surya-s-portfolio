"use client";

import { useEffect, useRef, useState } from "react";
import { DIRECTIONS, setDirection, useDirection } from "./direction";

/**
 * Floating control for trying design directions. This is a decision-making
 * tool, not a site feature — once a direction is chosen, drop this component
 * and hard-code the winner (see the README).
 */
export function DirectionSwitcher() {
  const active = useDirection();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    /* Deferred so the click that opened the panel doesn't immediately close it. */
    const id = window.setTimeout(
      () => document.addEventListener("click", onClick),
      0,
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.clearTimeout(id);
    };
  }, [open]);

  return (
    <div ref={panel} className="fixed bottom-5 right-5 z-[70] print:hidden">
      {open ? (
        <div
          className="r-card mb-3 w-[17rem] overflow-hidden border p-2 clay-surface"
          role="listbox"
          aria-label="Design direction"
        >
          <p className="label px-3 pb-2 pt-2.5">Design direction</p>
          {DIRECTIONS.map((d) => {
            const selected = d.id === active.id;
            return (
              <button
                key={d.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => setDirection(d.id)}
                className="r-pill flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors"
                style={{
                  backgroundColor: selected ? "var(--paper-2)" : "transparent",
                }}
              >
                <span
                  aria-hidden="true"
                  className="mt-1 h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: selected ? "var(--sp-red)" : "var(--line)",
                  }}
                />
                <span>
                  <span className="block text-sm font-medium">{d.label}</span>
                  <span className="block text-xs leading-snug text-ink-faint">
                    {d.blurb}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="r-pill ml-auto flex items-center gap-2 border px-4 py-2.5 text-sm font-medium clay-surface"
      >
        <span
          aria-hidden="true"
          className="rainbow-bg h-3.5 w-3.5 rounded-full"
        />
        {active.label}
      </button>
    </div>
  );
}
