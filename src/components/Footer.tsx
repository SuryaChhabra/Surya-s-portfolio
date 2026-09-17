import { site } from "@/content/site";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--paper-2)" }}>
      <div aria-hidden="true" className="rainbow-bg h-1 w-full" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="label">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </div>

        <ul className="flex flex-wrap items-center gap-5">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="link-draw text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
