import type { Metadata } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Newsreader,
  Space_Grotesk,
} from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  display: "swap",
});

/* Extra families the design directions switch between. */
const editorial = Newsreader({
  subsets: ["latin"],
  variable: "--ff-editorial",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-grotesk",
  display: "swap",
});

/**
 * Where absolute URLs in the metadata point.
 *
 * `site.meta.url` is still the scaffold value, and a preview card whose
 * image is served from example.com is worse than no card at all. Until a
 * real domain is set, fall back to the deployment's own URL, which Vercel
 * puts in VERCEL_URL at build time — so the tile resolves on a preview or
 * a *.vercel.app deployment without anyone having to remember this.
 * Set site.meta.url and it takes precedence again.
 */
const PLACEHOLDER_HOST = /(^|\.)example\.com$/;

function siteUrl() {
  try {
    const declared = new URL(site.meta.url);
    if (!PLACEHOLDER_HOST.test(declared.hostname)) return declared;
  } catch {
    /* fall through to the deployment URL */
  }
  const deployed = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return new URL(deployed ? `https://${deployed}` : site.meta.url);
}

const BASE = siteUrl();

export const metadata: Metadata = {
  metadataBase: BASE,
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: BASE.toString(),
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
};

/* Applied before paint so a dark-mode visitor never sees a cream flash. */
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    var dir = localStorage.getItem("direction");
    if (dir) document.documentElement.setAttribute("data-direction", dir);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${editorial.variable} ${grotesk.variable} grain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
