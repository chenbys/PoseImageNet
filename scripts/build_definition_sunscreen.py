"""Prepare nine Sunscreen definition images without changing the figure layout."""

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps


SITE = Path(__file__).resolve().parents[1]
OUTPUT = SITE / "assets/img/definition"
SOURCE = Path("D:/image/sunscreen/类别3")
SAMPLES = ["n04357314_13382", "n04357314_11152", "n04357314_12942"]
SIZE = 256
SUPERSAMPLE = 3


def main():
    text = (SITE / "data/site-data.js").read_text(encoding="utf-8")
    data = json.loads(text[text.index("=") + 1:text.rindex(";")])
    row = next(row for row in data["gallery"] if row["semanticClass"] == "sunscreen")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for sample in row["samples"]:
        destination = OUTPUT / f"sunscreen-model-{sample['prototypeIndex']}-sample-{sample['poseIndex']}.png"
        with Image.open(SITE / sample["src"]) as image:
            # Preserve the existing overlay and full image, adding square padding.
            ImageOps.pad(image.convert("RGB"), (SIZE, SIZE),
                         method=Image.Resampling.LANCZOS, color="white").save(destination)

    reference_edges = None
    for pose, identifier in enumerate(SAMPLES, 1):
        annotation = json.loads((SOURCE / f"{identifier}.json").read_text(encoding="utf-8"))
        points, edges = annotation["keypoints_xyv"], annotation["connections_idx"]
        assert len(points) == 16 and len(edges) == 18
        if reference_edges is None:
            reference_edges = edges
        assert edges == reference_edges
        assert all(1 <= a <= 16 and 1 <= b <= 16 for a, b in edges)
        assert all(v > 0 for x, y, v in points)
        with Image.open(SOURCE / f"{identifier}.JPEG") as source:
            width, height = source.size
            side = max(width, height)
            left, top = (width - side) / 2, (height - side) / 2
            scale = SIZE * SUPERSAMPLE / side
            # All three files use pixels, including the 100x87 source image.
            mapped = [((x - left) * scale, (y - top) * scale) for x, y, v in points]
            margin = 3 * SUPERSAMPLE
            assert all(margin < x < SIZE * SUPERSAMPLE - margin
                       and margin < y < SIZE * SUPERSAMPLE - margin for x, y in mapped)
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
            radius, outer = 2 * SUPERSAMPLE, 3 * SUPERSAMPLE
            draw.ellipse((x - outer, y - outer, x + outer, y + outer), fill="white")
            draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(13, 93, 153))
        destination = OUTPUT / f"sunscreen-model-3-sample-{pose}.png"
        image.resize((SIZE, SIZE), Image.Resampling.LANCZOS).save(destination, optimize=True)
    print("Prepared 9 square definition samples; existing gallery overlays preserved.")


if __name__ == "__main__":
    main()
