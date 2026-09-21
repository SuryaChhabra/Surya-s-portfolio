import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { VOID_DEEP } from "@/components/prism/bands";
import { site } from "@/content/site";

/**
 * The card a shared link renders as.
 *
 * This is the first thing anyone sees — it is what LinkedIn puts in the
 * feed, at about 300px wide, before a single pixel of the site has loaded.
 * Two things were wrong with the version that used to be here, and they
 * were the same two things wrong with the page in miniature:
 *
 *   1. It led with a rounded square of seven hard, equal, horizontal
 *      stripes. At thumbnail size that is not a spectrum, it is a flag —
 *      a reader coming to it cold said so, unprompted. Nothing else in the
 *      card was doing enough work to argue otherwise.
 *   2. Nobody in that thread could tell who they were looking at. A name
 *      in a feed is not a person until there is a face attached.
 *
 * A face fixes both at once: it takes the slot the stripes were in, and it
 * answers the question the stripes were distracting from.
 *
 * The spectrum survived here longest, as a thin ramp along the bottom
 * edge, after being taken off every other part of the site. It is gone
 * now too. A strip of rainbow running the full width of a card is the
 * arrangement this whole exercise has been about, and the card is the one
 * image that gets reposted, cropped and shown at thumbnail size where
 * nothing around it can explain what it is. Face, name, one line.
 *
 * Deliberately flat otherwise. The opening act is a glass prism refracting
 * light in real time, and no still can be that, so this does not try.
 */
export const alt = `${site.name}, ${site.hero.lead}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Read off disk rather than fetched over HTTP: this route is prerendered at
   build time, when there is no server to fetch from yet. JPEG rather than
   the .webp the site itself serves, because Satori's image decoding does
   not cover webp — the card would render with a hole where the face is. */
const HEADSHOT =
  "data:image/jpeg;base64," +
  readFileSync(join(process.cwd(), "src/app/headshot-og.jpg")).toString("base64");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: VOID_DEEP,
          padding: "72px 82px",
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

        {/* Text left, face right, both vertically centred.

            The first version of this kept the old column layout and simply
            dropped the face into the slot the stripe square had occupied,
            top left. It rendered, but the card had a hole through the
            middle of it and the face came out at 38px in a LinkedIn
            thumbnail, which is too small to register as anybody. Side by
            side uses the width the card actually has, and the portrait gets
            to be the size a portrait needs to be. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            gap: 64,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 100,
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
                marginTop: 28,
                fontSize: 42,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.74)",
              }}
            >
              {site.hero.lead}
            </div>
          </div>

          {/* Circular and ringed, so it reads as a person rather than as a
              photograph that happens to be in the corner. */}
          <img
            src={HEADSHOT}
            width={300}
            height={300}
            style={{
              width: 300,
              height: 300,
              flexShrink: 0,
              borderRadius: 150,
              objectFit: "cover",
              border: "4px solid rgba(255,255,255,0.22)",
            }}
          />
        </div>

      </div>
    ),
    { ...size },
  );
}
