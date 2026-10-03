"""Render the requested meerkat samples, preserving their annotation geometry."""

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw


SITE = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/image/meerkat")
# Keep the ordering of the six pictures supplied by the user.
GROUPS = [
    (10, 39, 43, ["n02138441_778", "n02138441_1188", "n02138441_5795"]),
    (17, 34, 34, ["n02138441_940", "n02138441_3928", "n02138441_5271"]),
]
SIZE = 256
SUPERSAMPLE = 3


def draw_segment(draw, segment):
    draw.line(segment, fill="white", width=3 * SUPERSAMPLE)
    draw.line(segment, fill=(22, 112, 178), width=SUPERSAMPLE)


def main():
    for prototype, point_count, edge_count, identifiers in GROUPS:
        reference_edges = None
        folder = SOURCE / f"类别{prototype}"
        for pose, identifier in enumerate(identifiers, 1):
            annotation = json.loads((folder / f"{identifier}.json").read_text(encoding="utf-8"))
            points = annotation["keypoints_xyv"]
            edges = annotation["connections_idx"]
            assert len(points) == point_count and len(edges) == edge_count
            if reference_edges is None:
                reference_edges = edges
            assert edges == reference_edges, "Samples must share one skeleton definition"
            assert all(1 <= a <= point_count and 1 <= b <= point_count for a, b in edges)
            assert all(0 <= x <= 100 and 0 <= y <= 100 for x, y, v in points)
            with Image.open(folder / f"{identifier}.JPEG") as source:
                width, height = source.size
                side = max(width, height)
                left, top = (width - side) / 2, (height - side) / 2
                scale = SIZE * SUPERSAMPLE / side
                # All six annotations use percentage coordinates.
                mapped = [((x * width / 100 - left) * scale,
                           (y * height / 100 - top) * scale, v) for x, y, v in points]
                margin = 3 * SUPERSAMPLE
                assert all(margin < x < SIZE * SUPERSAMPLE - margin
                           and margin < y < SIZE * SUPERSAMPLE - margin
                           for x, y, v in mapped), "A keypoint would be clipped"
                # Equal scaling and square padding retain the entire source image.
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
                    # Retain occluded coordinates and connections as hollow points
                    # and dashed edges, matching the previous sample visualizations.
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
            output = SITE / f"assets/img/gallery/animal-meerkat-{prototype}-pose-{pose}.png"
            image.resize((SIZE, SIZE), Image.Resampling.LANCZOS).save(output, optimize=True)
            print(f"{identifier}: {point_count} keypoints, {edge_count} edges -> {output.name} (256x256)")


if __name__ == "__main__":
    main()
