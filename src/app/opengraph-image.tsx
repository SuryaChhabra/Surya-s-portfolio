import { ImageResponse } from "next/og";
import { BANDS, VOID_DEEP } from "@/components/prism/bands";
import { site } from "@/content/site";

/**
 * The card a shared link renders as.
 *
 * Built from the same BANDS array that drives the prism, the fields and the
 * nav, so it cannot drift out of step with the site: change a wavelength in
 * bands.ts and the preview changes with it.
 *
 * Deliberately flat. The opening act is a glass prism refracting light in
 * real time, and no still can be that, so this does not try — it shows the
 * result instead: the seven colours, the name, and the one line that says
 * what the work is. It also has to survive being 300px wide in a LinkedIn
 * feed, which rules out anything with detail in it.
 */
export const alt = `${site.name}, ${site.hero.lead}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: VOID_DEEP,
          padding: "78px 82px 96px",
          fontFamily: "sans-serif",
        }}
      >
        {/* The light, arriving from off the top right at the angle red
            leaves the prism, which is the same 260deg the red field is lit
            along. A radial gradient was the first attempt and Satori did
            not render it: its gradient parser is narrower than a browser's,
            so this uses the linear form, which it does handle.
            Sized with top/left/width/height rather than `inset: 0`, which
            Satori ignores — the output was byte-for-byte identical with the
            overlay in place, which is how the shorthand got caught. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(260deg, rgba(255,255,255,0.13), rgba(255,255,255,0.03) 45%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* The whole spectrum stacked, which is the site's own mark. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 104,
            height: 104,
            borderRadius: 26,
            overflow: "hidden",
          }}
        >
          {BANDS.map((b) => (
            <div key={b.id} style={{ display: "flex", flex: 1, backgroundColor: b.color }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              color: "#ffffff",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 40,
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.74)",
            }}
          >
            {site.hero.lead}
          </div>
        </div>

        {/* The same seven-colour edge the page ends on. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 18,
            display: "flex",
          }}
        >
          {BANDS.map((b) => (
            <div key={b.id} style={{ display: "flex", flex: 1, backgroundColor: b.color }} />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
