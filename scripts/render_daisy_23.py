"""Render the three requested daisy_23 samples using their original annotations."""

import json
from pathlib import Path

from PIL import Image, ImageDraw


SITE = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/image/daisy/类别23")
# The first two JSON files use percentages; the third uses image pixels.
SAMPLES = [("n11939491_4363", "percent"),
           ("n11939491_5102", "percent"),
           ("n11939491_11483", "pixels")]
SIZE = 256
SUPERSAMPLE = 3


def main():
    reference_edges = None
    for pose, (identifier, units) in enumerate(SAMPLES, 1):
        annotation = json.loads((SOURCE / f"{identifier}.json").read_text(encoding="utf-8"))
        points = annotation["keypoints_xyv"]
        edges = annotation["connections_idx"]
        topology = sorted(tuple(sorted(edge)) for edge in edges)
        assert len(points) == 16 and len(edges) == 16
        if reference_edges is None:
            reference_edges = topology
        assert topology == reference_edges, "Samples must share one skeleton definition"
        assert all(1 <= a <= 16 and 1 <= b <= 16 for a, b in edges)
        assert all(v > 0 for x, y, v in points)
        with Image.open(SOURCE / f"{identifier}.JPEG") as source:
            width, height = source.size
            side = max(width, height)
            left, top = (width - side) / 2, (height - side) / 2
            scale = SIZE * SUPERSAMPLE / side
            scale_x = width / 100 if units == "percent" else 1
            scale_y = height / 100 if units == "percent" else 1
            mapped = [((x * scale_x - left) * scale,
                       (y * scale_y - top) * scale) for x, y, v in points]
            margin = 3 * SUPERSAMPLE
            assert all(margin < x < SIZE * SUPERSAMPLE - margin
                       and margin < y < SIZE * SUPERSAMPLE - margin
                       for x, y in mapped), "A keypoint would be clipped"
            # Equal scale on both axes; keep the entire source image and pad.
            image = source.convert("RGB").transform(
                (SIZE * SUPERSAMPLE, SIZE * SUPERSAMPLE), Image.Transform.AFFINE,
                (1 / scale, 0, left, 0, 1 / scale, top),
                resample=Image.Resampling.BICUBIC, fillcolor="white")
        draw = ImageDraw.Draw(image)
        for start, end in edges:
            segment = (*mapped[start - 1], *mapped[end - 1])
            draw.line(segment, fill="white", width=3 * SUPERSAMPLE)
            draw.line(segment, fill=(22, 112, 178), width=SUPERSAMPLE)
        for x, y in mapped:
            radius = 2 * SUPERSAMPLE
            outer = radius + SUPERSAMPLE
            draw.ellipse((x - outer, y - outer, x + outer, y + outer), fill="white")
            draw.ellipse((x - radius, y - radius, x + radius, y + radius),
                         fill=(13, 93, 153))
        output = SITE / f"assets/img/gallery/plant-daisy-23-pose-{pose}.png"
        image.resize((SIZE, SIZE), Image.Resampling.LANCZOS).save(output, optimize=True)
        print(f"{identifier}: 16 keypoints, 16 edges -> {output.name} (256x256)")


if __name__ == "__main__":
    main()
