"""Render the nine annotated tripod samples used by the Definition figure."""

from __future__ import annotations

import json
from pathlib import Path

from build_grouped_gallery import render_overlay


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"G:\image\tripod")
OUTPUT = ROOT / "assets" / "img" / "definition"

SAMPLES = {
    1: ["n04485082_12776", "n04485082_11426", "n04485082_35104"],
    2: ["n04485082_4265", "n04485082_15593", "n04485082_13603"],
    6: ["n04485082_2806", "n04485082_2540", "n04485082_15649"],
}


def main() -> None:
    for model, sample_ids in SAMPLES.items():
        model_dir = SOURCE / f"类别{model}"
        for pose, sample_id in enumerate(sample_ids, start=1):
            image_path = model_dir / f"{sample_id}.JPEG"
            json_path = model_dir / f"{sample_id}.json"
            if not image_path.is_file() or not json_path.is_file():
                raise FileNotFoundError(f"Missing image/annotation pair for {sample_id}")

            record = {
                "image": image_path,
                "json": json_path,
                "data": json.loads(json_path.read_text(encoding="utf-8")),
            }
            output_path = OUTPUT / f"tripod-model-{model}-sample-{pose}-v2.png"
            render_overlay(
                record,
                output_path,
                size=320,
                context=1.60,
                point_radius=4,
                line_width=3,
            )
            print(output_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
