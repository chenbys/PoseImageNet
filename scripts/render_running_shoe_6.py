"""Render the three requested running shoe_6 samples without changing annotations."""

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw


SITE = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/image/running shoe/类别6")
# Square views include both complete shoes and the supplied skeleton.
VIEWS = [
    ("n04120489_4325", (-62.5, 0, 500)),
    ("n04120489_4348", (155, 35, 300)),
    ("n04120489_4433", (570, 30, 1400)),
]
SIZE = 256
SUPERSAMPLE = 3


def main():
    reference_edges = None
    for pose, (identifier, (left, top, side)) in enumerate(VIEWS, 1):
        annotation = json.loads((SOURCE / f"{identifier}.json").read_text(encoding="utf-8"))
        points = annotation["keypoints_xyv"]
        edges = annotation["connections_idx"]
        assert len(points) == 24
        if reference_edges is None:
            reference_edges = edges
        assert edges == reference_edges, "Samples must share one skeleton definition"
        assert all(1 <= a <= 24 and 1 <= b <= 24 for a, b in edges)
        scale = SIZE * SUPERSAMPLE / side
        mapped = [((x - left) * scale, (y - top) * scale, v) for x, y, v in points]
        margin = 3 * SUPERSAMPLE
        assert all(margin < x < SIZE * SUPERSAMPLE - margin
                   and margin < y < SIZE * SUPERSAMPLE - margin
                   for x, y, v in mapped), "A crop would cut a keypoint"
        with Image.open(SOURCE / f"{identifier}.JPEG") as source:
            image = source.convert("RGB").transform(
                (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE),
                Image.Transform.AFFINE,
                (1 / scale, 0, left, 0, 1 / scale, top),
                resample=Image.Resampling.BICUBIC,
                fillcolor="white",
            )
        draw = ImageDraw.Draw(image)
        for start, end in edges:
            x1, y1, v1 = mapped[start - 1]
            x2, y2, v2 = mapped[end - 1]
            if v1 > 0 and v2 > 0:
                draw.line((x1, y1, x2, y2), fill="white", width=3 * SUPERSAMPLE)
                draw.line((x1, y1, x2, y2), fill=(22, 112, 178), width=SUPERSAMPLE)
            else:
                # v=0 is an occluded point in these per-image annotations.
                # Keep its coordinate and connectivity, using dashed edges.
                length = math.hypot(x2 - x1, y2 - y1)
                for offset in range(0, math.ceil(length), 6 * SUPERSAMPLE):
                    end_offset = min(offset + 3 * SUPERSAMPLE, length)
                    segment = (x1 + (x2 - x1) * offset / length,
                               y1 + (y2 - y1) * offset / length,
                               x1 + (x2 - x1) * end_offset / length,
                               y1 + (y2 - y1) * end_offset / length)
                    draw.line(segment, fill="white", width=3 * SUPERSAMPLE)
                    draw.line(segment, fill=(22, 112, 178), width=SUPERSAMPLE)
        for x, y, visible in mapped:
            radius = 2 * SUPERSAMPLE
            border = SUPERSAMPLE
            draw.ellipse((x - radius - border, y - radius - border,
                          x + radius + border, y + radius + border), fill="white")
            draw.ellipse((x - radius, y - radius, x + radius, y + radius),
                         fill=(13, 93, 153))
            if visible <= 0:
                inner = radius - SUPERSAMPLE
                draw.ellipse((x - inner, y - inner, x + inner, y + inner), fill="white")
        output = SITE / f"assets/img/gallery/wear-items-running-shoe-6-pose-{pose}.png"
        image.resize((SIZE, SIZE), Image.Resampling.LANCZOS).save(output, optimize=True)
        print(f"{identifier}: 24 keypoints, {len(edges)} skeleton edges -> {output.name} (256x256)")


if __name__ == "__main__":
    main()
