import { site } from "@/content/site";

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
            <span className="text-lg tracking-tight text-ink-soft sm:text-xl">
              {word}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--clay)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
