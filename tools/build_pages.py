# -*- coding: utf-8 -*-
"""Build the static GitHub Pages artifact for Moovka."""

from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

from generate_library_thumbnails import generate
from generate_visual_qa import REPO


ROOT_FILES = ("index.html", "app.js", "data.js", "style.css", "manifest.json", "sw.js", ".nojekyll")
RUNTIME_DIRECTORIES = (
    Path("assets"),
    Path("Pilates Assets/01_Master_Reference"),
    Path("Pilates Assets/02_Exercise_Cards"),
    Path("00_CHATGPT_START/MASTER/02_REFERENCES/BRAND"),
)


def copy_runtime_tree(source: Path, destination: Path) -> None:
    def ignore(directory: str, names: list[str]) -> set[str]:
        current = Path(directory)
        if current == REPO / "Pilates Assets" / "02_Exercise_Cards":
            return {"_Library_Thumbnails"} & set(names)
        return set()

    shutil.copytree(source, destination, dirs_exist_ok=True, ignore=ignore)


def build(output_dir: Path, cache_dir: Path, deployment_id: str) -> None:
    if not deployment_id.strip():
        raise RuntimeError("Deployment ID nesmí být prázdné")
    if output_dir == REPO or REPO not in output_dir.parents:
        raise RuntimeError(f"Nebezpečný output adresář: {output_dir}")
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    for name in ROOT_FILES:
        source = REPO / name
        if not source.is_file():
            raise RuntimeError(f"Chybí runtime soubor: {source}")
        shutil.copy2(source, output_dir / name)
    for relative in RUNTIME_DIRECTORIES:
        source = REPO / relative
        if not source.is_dir():
            raise RuntimeError(f"Chybí runtime adresář: {source}")
        copy_runtime_tree(source, output_dir / relative)

    index = output_dir / "index.html"
    content = index.read_text(encoding="utf-8")
    if "local-dev" not in content:
        raise RuntimeError("index.html neobsahuje očekávaný local-dev token")
    index.write_text(content.replace("local-dev", deployment_id), encoding="utf-8", newline="\n")

    thumbnail_dir = output_dir / "Pilates Assets" / "02_Exercise_Cards" / "_Library_Thumbnails"
    generated, reused, outputs = generate(thumbnail_dir, cache_dir)
    print(f"Deployment ID: {deployment_id}")
    print(f"Library thumbnails: {len(outputs)} (generated {generated}, cache reuse {reused})")
    print(f"Pages artifact: {output_dir}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=REPO / "_site")
    parser.add_argument("--cache-dir", type=Path, default=REPO / ".cache" / "library-thumbnails")
    parser.add_argument("--deployment-id", required=True)
    args = parser.parse_args()
    try:
        build(args.output_dir.resolve(), args.cache_dir.resolve(), args.deployment_id)
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
