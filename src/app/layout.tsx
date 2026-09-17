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

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.meta.url,
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
