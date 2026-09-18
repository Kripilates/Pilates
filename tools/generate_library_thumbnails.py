# -*- coding: utf-8 -*-
"""Generate active Moovka library thumbnails from canonical HERO SOURCE files."""

from __future__ import annotations

import argparse
import hashlib
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

from generate_visual_qa import REPO, asset_blocks, decode_source_path, discover, exact_case_exists


DEFAULT_OUTPUT = REPO / "_site" / "Pilates Assets" / "02_Exercise_Cards" / "_Library_Thumbnails"
DEFAULT_CACHE = REPO / ".cache" / "library-thumbnails"
WIDTH = 640
QUALITY = 90
METHOD = 6


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def validate_webp(path: Path) -> None:
    with Image.open(path) as image:
        image.load()
        if image.format != "WEBP":
            raise RuntimeError(f"{path}: output není WebP")
        if image.width != WIDTH:
            raise RuntimeError(f"{path}: šířka {image.width}, očekáváno {WIDTH}")
        if image.mode != "RGB":
            raise RuntimeError(f"{path}: režim {image.mode}, očekáváno RGB")


def create_thumbnail(source: Path, target: Path) -> None:
    with Image.open(source) as image:
        image.load()
        rgb = image.convert("RGB")
        height = round(rgb.height * WIDTH / rgb.width)
        resized = rgb.resize((WIDTH, height), Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        temporary = target.with_suffix(".tmp.webp")
        resized.save(temporary, "WEBP", quality=QUALITY, method=METHOD)
        temporary.replace(target)
    validate_webp(target)


def generate(output_dir: Path, cache_dir: Path) -> tuple[int, int, list[Path]]:
    inventory = discover()
    problems = [*inventory.missing, *inventory.ambiguous]
    if problems:
        raise RuntimeError("Canonical SOURCE inventory není jednoznačný:\n- " + "\n- ".join(problems))
    if len(inventory.active_ids) != 51:
        raise RuntimeError(f"Očekáváno 51 aktivních cviků, nalezeno {len(inventory.active_ids)}")

    blocks = asset_blocks()
    hero_by_id = {}
    hero_pattern = re.compile(r"(?m)^    hero:'((?:\\'|[^'])*)',?$")
    for exercise_id in inventory.active_ids:
        matches = hero_pattern.findall(blocks.get(exercise_id, ""))
        if len(matches) > 1:
            raise RuntimeError(f"{exercise_id}: více než jeden canonical HERO")
        if len(matches) == 1:
            relative, source = decode_source_path(matches[0])
            if not source.is_file() or not exact_case_exists(relative):
                raise RuntimeError(f"{exercise_id}: canonical HERO neexistuje s přesným case: {relative}")
            hero_by_id[exercise_id] = source
    missing_heroes = [exercise_id for exercise_id in inventory.active_ids if exercise_id not in hero_by_id]
    if missing_heroes:
        raise RuntimeError("Chybí canonical HERO: " + ", ".join(missing_heroes))

    output_dir.mkdir(parents=True, exist_ok=True)
    expected_names = {f"{exercise_id}.webp" for exercise_id in inventory.active_ids}
    for stale in output_dir.glob("*.webp"):
        if stale.name not in expected_names:
            stale.unlink()

    generated = 0
    reused = 0
    outputs: list[Path] = []
    for exercise_id in inventory.active_ids:
        source = hero_by_id[exercise_id]
        source_hash = digest(source)
        cached = cache_dir / exercise_id / f"{source_hash}.webp"
        if cached.is_file():
            validate_webp(cached)
            reused += 1
        else:
            create_thumbnail(source, cached)
            generated += 1
        destination = output_dir / f"{exercise_id}.webp"
        shutil.copy2(cached, destination)
        validate_webp(destination)
        outputs.append(destination)

    return generated, reused, outputs


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--cache-dir", type=Path, default=DEFAULT_CACHE)
    args = parser.parse_args()
    try:
        generated, reused, outputs = generate(args.output_dir.resolve(), args.cache_dir.resolve())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    total = sum(path.stat().st_size for path in outputs)
    largest = max(outputs, key=lambda path: path.stat().st_size)
    print(f"Active exercises: {len(outputs)}")
    print(f"Generated: {generated}")
    print(f"Reused from content cache: {reused}")
    print(f"Total thumbnail payload: {total} bytes")
    print(f"Average thumbnail: {round(total / len(outputs))} bytes")
    print(f"Largest thumbnail: {largest.name} ({largest.stat().st_size} bytes)")
    print(f"Output: {args.output_dir.resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
