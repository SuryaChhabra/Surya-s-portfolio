import type { NextConfig } from "next";

/**
 * Two builds from one config.
 *
 * The default is a normal Next build — a server renders the page, and
 * next/image resizes and re-encodes the photos on the way out. That is what
 * Vercel and `npm start` run, and it is the one to deploy.
 *
 * `STATIC_EXPORT=1` instead writes a plain folder of files, `out/index.html`
 * among them, for hosting anywhere that only serves static files. The cost is
 * image optimisation: nothing is running to do the resizing, so the originals
 * are served as they are. Worth knowing before pointing a domain at it.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
