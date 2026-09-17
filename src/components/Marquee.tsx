import { site } from "@/content/site";

const HUES = [
  "var(--sp-red-ink)",
  "var(--sp-orange-ink)",
  "var(--sp-amber-ink)",
  "var(--sp-green-ink)",
  "var(--sp-cyan-ink)",
  "var(--sp-blue-ink)",
  "var(--sp-violet-ink)",
  "var(--sp-pink-ink)",
];

export function Marquee() {
  /* The list is rendered twice so the -50% slide loops seamlessly. */
  const items = [...site.marquee, ...site.marquee];

  return (
    <div
      className="relative flex overflow-hidden border-y py-4"
      style={{ backgroundColor: "var(--paper-2)" }}
      aria-hidden="true"
    >
      <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
        {items.map((word, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8">
            <span
              className="text-lg tracking-tight sm:text-xl"
              style={{ color: HUES[i % HUES.length] }}
            >
              {word}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: HUES[(i + 1) % HUES.length] }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
