"""Build the Samples gallery as two prototypes with three poses each.

The source layout is:

    <image-root>/<semantic class>/<prototype folder>/<image>.JPEG
    <image-root>/<semantic class>/<prototype folder>/<image>.json

Each prototype folder owns one keypoint definition. The script selects two
pose-diverse prototypes per semantic class, chooses three diverse poses from
each, renders the supplied skeleton, and updates only the gallery portion of
data/site-data.js.
"""

from __future__ import annotations

import argparse
from collections import defaultdict
from itertools import combinations
import json
import math
from pathlib import Path
import re

from PIL import Image, ImageDraw, ImageOps


IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}
MODEL_NUMBER = re.compile(r"(\d+)$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--images", required=True, type=Path)
    parser.add_argument("--site-data", default=Path("data/site-data.js"), type=Path)
    parser.add_argument("--output", default=Path("assets/img/gallery"), type=Path)
    parser.add_argument("--size", default=256, type=int)
    parser.add_argument("--context", default=1.48, type=float)
    return parser.parse_args()


def read_site_data(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    return json.loads(text[text.index("=") + 1 : text.rindex(";")])


def write_site_data(path: Path, data: dict) -> None:
    banner = "/* Auto-generated gallery; statistics preserved from scripts/build_site_data.mjs. */\n"
    path.write_text(
        banner
        + "window.POSEIMAGENET_DATA = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def slug(value: str) -> str:
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", value.casefold()))


def natural_key(path: Path) -> tuple:
    parts = re.split(r"(\d+)", path.name.casefold())
    return tuple(int(part) if part.isdigit() else part for part in parts)


def model_number(path: Path) -> int:
    match = MODEL_NUMBER.search(path.name)
    return int(match.group(1)) if match else 999999


def signature(data: dict) -> tuple:
    keypoints = data.get("keypoints_xyv", [])
    connections = tuple(tuple(map(int, edge)) for edge in data.get("connections_idx", []))
    return len(keypoints), connections


def descriptor(data: dict) -> list[float]:
    keypoints = data["keypoints_xyv"]
    visible = [(float(x), float(y)) for x, y, v in keypoints if float(v) > 0]
    if not visible:
        return [0.0] * (len(keypoints) * 3)
    x_min = min(x for x, _ in visible)
    x_max = max(x for x, _ in visible)
    y_min = min(y for _, y in visible)
    y_max = max(y for _, y in visible)
    center_x = (x_min + x_max) / 2
    center_y = (y_min + y_max) / 2
    scale = max(x_max - x_min, y_max - y_min, 1.0)
    values = []
    for x, y, visibility in keypoints:
        visible_flag = 1.0 if float(visibility) > 0 else 0.0
        values.extend(
            (
                ((float(x) - center_x) / scale) if visible_flag else 0.0,
                ((float(y) - center_y) / scale) if visible_flag else 0.0,
                visible_flag,
            )
        )
    return values


def distance(left: list[float], right: list[float]) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(left, right)) / max(len(left), 1))


def select_three(records: list[dict]) -> tuple[list[dict], float]:
    if len(records) == 3:
        selected = records
    else:
        farthest = max(
            combinations(range(len(records)), 2),
            key=lambda pair: distance(records[pair[0]]["descriptor"], records[pair[1]]["descriptor"]),
        )
        third = max(
            (index for index in range(len(records)) if index not in farthest),
            key=lambda index: min(
                distance(records[index]["descriptor"], records[farthest[0]]["descriptor"]),
                distance(records[index]["descriptor"], records[farthest[1]]["descriptor"]),
            ),
        )
        selected = [records[farthest[0]], records[farthest[1]], records[third]]
    score = sum(
        distance(left["descriptor"], right["descriptor"])
        for left, right in combinations(selected, 2)
    )
    return sorted(selected, key=lambda record: natural_key(record["image"])), score


def load_model(model_dir: Path) -> dict | None:
    images = {
        path.stem.casefold(): path
        for path in model_dir.iterdir()
        if path.is_file() and path.suffix.casefold() in IMAGE_SUFFIXES
    }
    by_signature: dict[tuple, list[dict]] = defaultdict(list)
    for json_path in sorted(model_dir.glob("*.json"), key=natural_key):
        image_path = images.get(json_path.stem.casefold())
        if image_path is None:
            continue
        try:
            data = json.loads(json_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        if len(data.get("keypoints_xyv", [])) < 2 or not data.get("connections_idx"):
            continue
        record = {
            "image": image_path,
            "json": json_path,
            "data": data,
            "descriptor": descriptor(data),
        }
        by_signature[signature(data)].append(record)
    compatible = [records for records in by_signature.values() if len(records) >= 3]
    if not compatible:
        return None
    records = max(compatible, key=len)
    selected, diversity = select_three(records)
    return {
        "dir": model_dir,
        "number": model_number(model_dir),
        "keypoints": len(selected[0]["data"]["keypoints_xyv"]),
        "poses": len(records),
        "selected": selected,
        "diversity": diversity,
    }


def choose_two(models: list[dict]) -> list[dict]:
    best_pair = max(
        combinations(models, 2),
        key=lambda pair: (
            pair[0]["diversity"]
            + pair[1]["diversity"]
            + (0.45 if pair[0]["keypoints"] != pair[1]["keypoints"] else 0.0),
            pair[0]["poses"] + pair[1]["poses"],
            -(pair[0]["number"] + pair[1]["number"]),
        ),
    )
    return sorted(best_pair, key=lambda model: model["number"])


def render_overlay(
    record: dict,
    output: Path,
    size: int,
    context: float,
    point_radius: int = 5,
    line_width: int = 4,
) -> None:
    image = ImageOps.exif_transpose(Image.open(record["image"])).convert("RGB")
    data = record["data"]
    raw_keypoints = data["keypoints_xyv"]
    uses_percent_coordinates = (
        max(float(point[0]) for point in raw_keypoints) <= 110
        and max(float(point[1]) for point in raw_keypoints) <= 110
    )
    scale_x = image.width / 100 if uses_percent_coordinates else 1.0
    scale_y = image.height / 100 if uses_percent_coordinates else 1.0
    points = [
        (float(x) * scale_x, float(y) * scale_y, float(v) > 0)
        for x, y, v in raw_keypoints
    ]
    visible = [(x, y) for x, y, is_visible in points if is_visible]
    if not visible:
        raise ValueError(f"No visible keypoints in {record['json']}")

    x_min = min(x for x, _ in visible)
    x_max = max(x for x, _ in visible)
    y_min = min(y for _, y in visible)
    y_max = max(y for _, y in visible)
    side = max(x_max - x_min, y_max - y_min, 1.0) * context
    center_x = (x_min + x_max) / 2
    center_y = (y_min + y_max) / 2
    left = center_x - side / 2
    top = center_y - side / 2
    source_units_per_pixel = side / size
    canvas = image.transform(
        (size, size),
        Image.Transform.AFFINE,
        (source_units_per_pixel, 0, left, 0, source_units_per_pixel, top),
        resample=Image.Resampling.BICUBIC,
        fillcolor=(255, 255, 255),
    )
    transformed = [
        ((x - left) / source_units_per_pixel, (y - top) / source_units_per_pixel, is_visible)
        for x, y, is_visible in points
    ]
    draw = ImageDraw.Draw(canvas)
    for start, end in data["connections_idx"]:
        if not (1 <= int(start) <= len(transformed) and 1 <= int(end) <= len(transformed)):
            continue
        x1, y1, v1 = transformed[int(start) - 1]
        x2, y2, v2 = transformed[int(end) - 1]
        if not (v1 and v2):
            continue
        draw.line((x1, y1, x2, y2), fill=(255, 255, 255), width=line_width + 3)
        draw.line((x1, y1, x2, y2), fill=(22, 112, 178), width=line_width)
    for x, y, is_visible in transformed:
        if not is_visible:
            continue
        radius = point_radius
        draw.ellipse((x - radius - 2, y - radius - 2, x + radius + 2, y + radius + 2), fill=(255, 255, 255))
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=(13, 93, 153), outline=(5, 56, 96), width=1)
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, "PNG", optimize=True)


def main() -> None:
    args = parse_args()
    if args.size <= 0 or args.context < 1:
        raise ValueError("--size must be positive and --context must be at least 1")
    data = read_site_data(args.site_data)
    rows = []
    summary = []
    for row in data["gallery"]:
        semantic = row["semanticClass"]
        class_dir = args.images / semantic
        if not class_dir.is_dir():
            raise FileNotFoundError(class_dir)
        models = []
        for model_dir in sorted((path for path in class_dir.iterdir() if path.is_dir()), key=natural_key):
            model = load_model(model_dir)
            if model is not None:
                models.append(model)
        if len(models) < 2:
            raise RuntimeError(f"{semantic} has fewer than two prototypes with three compatible poses")
        selected_models = choose_two(models)
        samples = []
        groups = []
        for group_index, model in enumerate(selected_models, start=1):
            prototype_name = f"{semantic}_{model['number']}"
            group_samples = []
            for pose_index, record in enumerate(model["selected"], start=1):
                filename = (
                    f"{slug(row['superclass'])}-{slug(semantic)}-"
                    f"prototype-{group_index}-pose-{pose_index}.png"
                )
                output = args.output / filename
                render_overlay(record, output, args.size, args.context)
                sample = {
                    "id": record["image"].stem,
                    "prototype": prototype_name,
                    "prototypeIndex": group_index,
                    "poseIndex": pose_index,
                    "keypoints": model["keypoints"],
                    "objectPoses": model["poses"],
                    "src": output.as_posix(),
                }
                samples.append(sample)
                group_samples.append(sample["id"])
            groups.append(
                {
                    "index": group_index,
                    "prototype": prototype_name,
                    "keypoints": model["keypoints"],
                    "objectPoses": model["poses"],
                    "samples": group_samples,
                }
            )
        updated_row = dict(row)
        updated_row["availablePrototypeCount"] = row.get("prototypeCount")
        updated_row["availableObjectPoses"] = row.get("objectPoses")
        updated_row["shownPrototypeCount"] = 2
        updated_row["shownPoseCount"] = 6
        updated_row["prototypeGroups"] = groups
        updated_row["samples"] = samples
        rows.append(updated_row)
        summary.append(
            {
                "superclass": row["superclass"],
                "semanticClass": semantic,
                "prototypes": [
                    {
                        "name": group["prototype"],
                        "keypoints": group["keypoints"],
                        "availablePoses": group["objectPoses"],
                        "selectedSamples": group["samples"],
                    }
                    for group in groups
                ],
            }
        )
    data["gallery"] = rows
    data.setdefault("meta", {})["galleryVersion"] = "two-prototypes-three-poses-v1"
    data["meta"].pop("gallerySource", None)
    write_site_data(args.site_data, data)
    print(json.dumps({"rows": len(rows), "images": len(rows) * 6, "gallery": summary}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
