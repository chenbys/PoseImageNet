"""Render the requested daisy samples with complete flowers and annotations."""

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw


SITE = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/image/daisy")
# Ordering follows the six attached pictures, rather than the JSON file listing.
GROUPS = [
    (8, 12, 12, ["n11939491_1012", "n11939491_2724", "n11939491_1183"]),
    (24, 12, 11, ["n11939491_42762", "n11939491_18743", "n11939491_19987"]),
]
SIZE = 256
SUPERSAMPLE = 3


def draw_segment(draw, segment):
    draw.line(segment, fill="white", width=3 * SUPERSAMPLE)
    draw.line(segment, fill=(22, 112, 178), width=SUPERSAMPLE)


def main():
    for category, point_count, edge_count, identifiers in GROUPS:
        folder = SOURCE / f"类别{category}"
        for pose, identifier in enumerate(identifiers, 1):
            annotation = json.loads((folder / f"{identifier}.json").read_text(encoding="utf-8"))
            points = annotation["keypoints_xyv"]
            edges = annotation["connections_idx"]
            assert len(points) == point_count and len(edges) == edge_count
            assert all(1 <= a <= point_count and 1 <= b <= point_count for a, b in edges)
            # n11939491_1012 is pixel coordinates; the other supplied files use percentages.
            units = "pixels" if identifier == "n11939491_1012" else "percent"
            with Image.open(folder / f"{identifier}.JPEG") as source:
                width, height = source.size
                side = max(width, height)
                left, top = (width - side) / 2, (height - side) / 2
                scale = SIZE * SUPERSAMPLE / side
                if units == "percent":
                    mapped = [((x * width / 100 - left) * scale,
                               (y * height / 100 - top) * scale, v)
                              for x, y, v in points]
                else:
                    mapped = [((x - left) * scale, (y - top) * scale, v)
                              for x, y, v in points]
                margin = 3 * SUPERSAMPLE
                assert all(margin < x < SIZE * SUPERSAMPLE - margin
                           and margin < y < SIZE * SUPERSAMPLE - margin
                           for x, y, v in mapped), "A keypoint would be clipped"
                image = source.convert("RGB").transform(
                    (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), Image.Transform.AFFINE,
                    (1 / scale, 0, left, 0, 1 / scale, top),
                    resample=Image.Resampling.BICUBIC, fillcolor="white")
            draw = ImageDraw.Draw(image)
            for start, end in edges:
                x1, y1, v1 = mapped[start - 1]
                x2, y2, v2 = mapped[end - 1]
                if v1 > 0 and v2 > 0:
                    draw_segment(draw, (x1, y1, x2, y2))
                else:
                    length = math.hypot(x2 - x1, y2 - y1)
                    if length == 0:
                        continue
                    for offset in range(0, math.ceil(length), 6 * SUPERSAMPLE):
                        end_offset = min(offset + 3 * SUPERSAMPLE, length)
                        draw_segment(draw, (
                            x1 + (x2 - x1) * offset / length,
                            y1 + (y2 - y1) * offset / length,
                            x1 + (x2 - x1) * end_offset / length,
                            y1 + (y2 - y1) * end_offset / length))
            for x, y, visible in mapped:
                radius = 2 * SUPERSAMPLE
                outer = radius + SUPERSAMPLE
                draw.ellipse((x - outer, y - outer, x + outer, y + outer), fill="white")
                draw.ellipse((x - radius, y - radius, x + radius, y + radius),
                             fill=(13, 93, 153))
                if visible <= 0:
                    inner = radius - SUPERSAMPLE
                    draw.ellipse((x - inner, y - inner, x + inner, y + inner), fill="white")
            output = SITE / f"assets/img/gallery/plant-daisy-{category}-pose-{pose}.png"
            image.resize((SIZE, SIZE), Image.Resampling.LANCZOS).save(output, optimize=True)
            print(f"{identifier}: {point_count} keypoints, {edge_count} edges, {units} -> {output.name}")


if __name__ == "__main__":
    main()
