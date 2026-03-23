#!/bin/bash
set -e

DEMO_DIR="/private/tmp/morph-ai-docs/public/demo"
WORK_DIR="/tmp/gif-new-frames"
OUTPUT="$DEMO_DIR/chat-usecases-demo.gif"

mkdir -p "$WORK_DIR"
rm -f "$WORK_DIR"/*.png

# Frames to include in GIF - one per category for variety
FRAMES=(
  "chat-01-multi-event-generation.png"
  "chat-02-task-planning.png"
  "chat-img-conference.png"
  "chat-audio-call.png"
  "chat-05-web-search-warriors.png"
  "chat-rag-homework.png"
)

TARGET_W=1104
TARGET_H=900

echo "Normalizing frames to ${TARGET_W}x${TARGET_H}..."

for i in "${!FRAMES[@]}"; do
  src="$DEMO_DIR/${FRAMES[$i]}"
  out="$WORK_DIR/frame_$(printf '%02d' "$i").png"

  # Scale down to target width, then crop/pad to exact target height
  ffmpeg -y -i "$src" \
    -vf "scale=${TARGET_W}:-1,crop=${TARGET_W}:min(ih\,${TARGET_H}):0:0,pad=${TARGET_W}:${TARGET_H}:0:0:white" \
    "$out" 2>/dev/null

  echo "  ${FRAMES[$i]} -> $(identify -format '%wx%h' "$out" 2>/dev/null || echo 'done')"
done

echo "Generating GIF..."

# Create GIF: 0.4 fps = each frame shows for 2.5 seconds
ffmpeg -y -framerate 0.4 -i "$WORK_DIR/frame_%02d.png" \
  -vf "fps=12,scale=${TARGET_W}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
  "$OUTPUT" 2>/dev/null

SIZE=$(du -h "$OUTPUT" | cut -f1)
echo "Done! Output: $OUTPUT ($SIZE)"
