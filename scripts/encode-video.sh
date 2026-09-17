#!/usr/bin/env bash
# Turn a video master into the three files a card needs.
#
#   ./scripts/encode-video.sh public/work/_raw/my-clip.mov community-flywheel
#
# Produces in public/work/:
#   <slug>.webp      poster, pulled from 1.5s in
#   <slug>.mp4       H.264, the universal fallback
#   <slug>.av1.mp4   AV1, ~30-50% smaller, offered first
#
# Then run `npm run media` to pick them up.
set -euo pipefail

SRC="${1:-}"
SLUG="${2:-}"
POSTER_AT="${3:-00:00:01.5}"

if [[ -z "$SRC" || -z "$SLUG" ]]; then
  echo "usage: $0 <source-video> <slug> [poster-timestamp]" >&2
  exit 1
fi
[[ -f "$SRC" ]] || { echo "no such file: $SRC" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg not installed" >&2; exit 1; }

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/work"
mkdir -p "$OUT"

# -an strips audio: these loops are always muted, so the track is dead weight.
# scale to 1280 wide (even height), 24fps — plenty for a card-sized element.
COMMON=(-an -vf "scale=1280:-2,fps=24" -pix_fmt yuv420p -movflags +faststart)

echo "→ poster"
ffmpeg -loglevel error -y -i "$SRC" -ss "$POSTER_AT" -frames:v 1 \
  -vf "scale=1280:-2" -quality 82 "$OUT/$SLUG.webp"

echo "→ h.264"
ffmpeg -loglevel error -y -i "$SRC" "${COMMON[@]}" \
  -c:v libx264 -crf 26 -preset slow -profile:v high "$OUT/$SLUG.mp4"

echo "→ av1"
if ffmpeg -hide_banner -encoders 2>/dev/null | grep -q libsvtav1; then
  ffmpeg -loglevel error -y -i "$SRC" "${COMMON[@]}" \
    -c:v libsvtav1 -crf 34 -preset 6 "$OUT/$SLUG.av1.mp4"
else
  echo "   (skipped: no libsvtav1 in this ffmpeg — the h.264 file is enough)"
fi

echo
ls -lh "$OUT/$SLUG".* | awk '{print "   " $9 "  " $5}'
echo
echo "now run: npm run media"
