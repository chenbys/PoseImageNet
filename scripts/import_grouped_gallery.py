"""Import a reviewed 2-by-3 Samples gallery from its selection manifest.

Expected source layout:

    <source>/selection-manifest.json
    <source>/<semantic class>/prototype-1/pose-1.png
    <source>/<semantic class>/prototype-1/pose-2.png
    <source>/<semantic class>/prototype-1/pose-3.png
    <source>/<semantic class>/prototype-2/pose-1.png
    ...

The importer preserves all non-gallery site data and the aggregate class totals.
It only replaces the two displayed prototype groups and their six samples for
each of the 13 gallery rows.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re

from PIL import Image, ImageOps


EXPECTED_CLASSES = 13
EXPECTED_MODELS = 2
EXPECTED_POSES = 3


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path)
    parser.add_argument("--site-data", default=Path("data/site-data.js"), type=Path)
    parser.add_argument("--output", default=Path("assets/img/gallery"), type=Path)
    parser.add_argument("--size", default=512, type=int)
    parser.add_argument("--gallery-version", default="provided-2x3-512-v1")
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


def sample_id(selected_image: dict) -> str:
    source_image = selected_image.get("source_image")
    if not source_image:
        raise ValueError("Every selected image must include source_image metadata")
    return Path(source_image.replace("\\", "/")).stem


def normalize_png(source: Path, destination: Path, size: int) -> None:
    if not source.is_file():
        raise FileNotFoundError(f"Missing selected pose image: {source}")

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.size != (size, size):
            image = ImageOps.pad(
                image,
                (size, size),
                method=Image.Resampling.LANCZOS,
                color=(255, 255, 255),
                centering=(0.5, 0.5),
            )

        destination.parent.mkdir(parents=True, exist_ok=True)
        temporary = destination.with_suffix(".tmp.png")
        image.save(temporary, format="PNG", compress_level=6)
        temporary.replace(destination)


def main() -> None:
    args = parse_args()
    manifest_path = args.source / "selection-manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8-sig"))
    selections = manifest.get("classes", [])
    if len(selections) != EXPECTED_CLASSES:
        raise ValueError(
            f"Expected {EXPECTED_CLASSES} semantic classes, found {len(selections)}"
        )

    selections_by_class = {
        item["semantic_class"].casefold(): item for item in selections
    }
    if len(selections_by_class) != len(selections):
        raise ValueError("The selection manifest contains duplicate semantic classes")

    data = read_site_data(args.site_data)
    gallery = data.get("gallery", [])
    if len(gallery) != EXPECTED_CLASSES:
        raise ValueError(f"Expected {EXPECTED_CLASSES} gallery rows, found {len(gallery)}")

    gallery_classes = {row["semanticClass"].casefold() for row in gallery}
    if gallery_classes != set(selections_by_class):
        missing = sorted(gallery_classes - set(selections_by_class))
        extra = sorted(set(selections_by_class) - gallery_classes)
        raise ValueError(f"Manifest/gallery class mismatch; missing={missing}, extra={extra}")

    imported = 0
    for row in gallery:
        semantic_class = row["semanticClass"]
        selection = selections_by_class[semantic_class.casefold()]
        models = selection.get("models", [])
        if len(models) != EXPECTED_MODELS:
            raise ValueError(
                f"{semantic_class}: expected {EXPECTED_MODELS} models, found {len(models)}"
            )

        samples = []
        prototype_groups = []
        for prototype_index, model in enumerate(models, start=1):
            selected_images = sorted(
                model.get("selected_images", []), key=lambda item: int(item["pose"])
            )
            if len(selected_images) != EXPECTED_POSES:
                raise ValueError(
                    f"{semantic_class} prototype {prototype_index}: expected "
                    f"{EXPECTED_POSES} poses, found {len(selected_images)}"
                )

            expected_pose_numbers = list(range(1, EXPECTED_POSES + 1))
            pose_numbers = [int(item["pose"]) for item in selected_images]
            if pose_numbers != expected_pose_numbers:
                raise ValueError(
                    f"{semantic_class} prototype {prototype_index}: expected poses "
                    f"{expected_pose_numbers}, found {pose_numbers}"
                )

            output_group = model.get("output_group")
            expected_group = f"prototype-{prototype_index}"
            if output_group != expected_group:
                raise ValueError(
                    f"{semantic_class}: expected output group {expected_group}, "
                    f"found {output_group!r}"
                )

            model_number = int(model["model_number"])
            keypoints = int(model["keypoints"])
            object_poses = int(model["complete_annotated_images"])
            prototype_name = f"{semantic_class}_{model_number}"
            group_sample_ids = []

            for selected_image in selected_images:
                pose_index = int(selected_image["pose"])
                source = (
                    args.source
                    / semantic_class
                    / output_group
                    / f"pose-{pose_index}.png"
                )
                filename = (
                    f"{slug(row['superclass'])}-{slug(semantic_class)}-"
                    f"prototype-{prototype_index}-pose-{pose_index}.png"
                )
                destination = args.output / filename
                normalize_png(source, destination, args.size)

                identifier = sample_id(selected_image)
                group_sample_ids.append(identifier)
                samples.append(
                    {
                        "id": identifier,
                        "prototype": prototype_name,
                        "prototypeIndex": prototype_index,
                        "poseIndex": pose_index,
                        "keypoints": keypoints,
                        "objectPoses": object_poses,
                        "src": destination.as_posix(),
                    }
                )
                imported += 1

            prototype_groups.append(
                {
                    "index": prototype_index,
                    "prototype": prototype_name,
                    "keypoints": keypoints,
                    "objectPoses": object_poses,
                    "samples": group_sample_ids,
                }
            )

        row["samples"] = samples
        row["shownPrototypeCount"] = EXPECTED_MODELS
        row["shownPoseCount"] = EXPECTED_MODELS * EXPECTED_POSES
        row["prototypeGroups"] = prototype_groups

    expected_images = EXPECTED_CLASSES * EXPECTED_MODELS * EXPECTED_POSES
    if imported != expected_images:
        raise AssertionError(f"Expected to import {expected_images} images, imported {imported}")

    data.setdefault("meta", {})["galleryVersion"] = args.gallery_version
    write_site_data(args.site_data, data)
    print(
        f"Imported {imported} RGB PNG images at {args.size}x{args.size} "
        f"across {len(gallery)} gallery rows."
    )


if __name__ == "__main__":
    main()
