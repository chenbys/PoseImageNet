"""Restore PoseImageNet images from ImageNet/UniKPT using SampleTrack.json."""

import argparse
import json
from pathlib import Path, PureWindowsPath
import shutil


def relative_parts(value):
    path = PureWindowsPath(value)
    if path.anchor or ".." in path.parts or not path.parts:
        raise ValueError(f"Expected a relative image path: {value}")
    return path.parts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--annotations", type=Path, default=Path("PoseImageNet.json"))
    parser.add_argument("--track", type=Path, default=Path("SampleTrack.json"))
    parser.add_argument("--imagenet", type=Path, required=True, help="ImageNet images_train folder")
    parser.add_argument("--unikpt", type=Path, required=True, help="UniKPT images folder")
    parser.add_argument("--output", type=Path, default=Path("PoseImageNet"))
    args = parser.parse_args()
    with args.annotations.open(encoding="utf-8-sig") as file:
        dataset = json.load(file)
    with args.track.open(encoding="utf-8-sig") as file:
        track = json.load(file)

    jobs, missing = [], []
    for image in dataset["images"]:
        parts = relative_parts(track[str(image["id"])])
        if parts[0] == "ImageNet":
            if len(parts) < 3 or parts[1] != "images_train":
                raise ValueError(f"Unexpected ImageNet path: {parts}")
            source = args.imagenet.joinpath(*parts[2:])
        else:
            source = args.unikpt.joinpath(*parts)
        destination = args.output.joinpath(*relative_parts(image["file_name"]))
        if not source.is_file():
            missing.append(str(source))
        jobs.append((source, destination))
    if missing:
        parser.error(f"{len(missing)} source images missing; first paths: " + "; ".join(missing[:3]))

    args.output.mkdir(parents=True, exist_ok=True)
    for source, destination in jobs:
        destination.parent.mkdir(parents=True, exist_ok=True)
        if source.resolve() != destination.resolve():
            shutil.copy2(source, destination)
    for file in (args.annotations, args.track):
        destination = args.output / file.name
        if file.resolve() != destination.resolve():
            shutil.copy2(file, destination)
    print(f"Restored {len(jobs)} images and both JSON files to {args.output}")


if __name__ == "__main__":
    main()
