# -*- coding: utf-8 -*-
"""Generate Moovka SOURCE contact sheets from the active application mapping."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlsplit

from PIL import Image, ImageDraw, ImageFont, ImageOps


REPO = Path(__file__).resolve().parents[1]
DATA_JS = REPO / "data.js"
APP_JS = REPO / "app.js"
CARDS_ROOT = REPO / "Pilates Assets" / "02_Exercise_Cards"
OUTPUT_DIR = REPO / "Pilates Assets" / "03_Exports" / "Visual_QA"

OUTPUT_NAMES = (
    "MOOVKA_SOURCE_GALLERY_ALL_01.png",
    "MOOVKA_SOURCE_GALLERY_ALL_02.png",
    "MOOVKA_SOURCE_GALLERY_ALL_03.png",
    "MOOVKA_SOURCE_GALLERY_LYING.png",
    "MOOVKA_SOURCE_GALLERY_QUADRUPED.png",
    "MOOVKA_SOURCE_GALLERY_SIDE_FLOOR.png",
    "MOOVKA_SOURCE_GALLERY_STANDING.png",
)

# Camera/pose grouping is presentation metadata only. SOURCE paths always come
# from referenceExerciseAssets in app.js and are never duplicated here.
POSE_CLASS_BY_ID = {
    **{key: "LYING" for key in "hip figure_four deadbug toetap revcrunch hollow supine_twist chest_fly dumbbell_pullover rollup abduction frog hamstring_supine chest_press glute_bridge_march hip_march heeltaps bicycle sphinx swimming hundred scissors russian legraises spine".split()},
    **{key: "QUADRUPED" for key in "hydrant bird plank donkey rainbow tap knee_pushup thread catcow childs_pose".split()},
    **{key: "SIDE_FLOOR" for key in "sideleg clam inner_thigh sideplank mermaid sidekick sideplank_reach".split()},
    **{key: "STANDING" for key in "rdl row press raise triceps_kickback chest_opener standing_side_bend plie standing_oblique".split()},
}

FIELD_TO_ROLE = {
    "start": "START",
    "hero": "HERO",
    "mid": "MID",
    "opposite": "HERO_OPPOSITE",
    "end": "END",
}
ROLE_ORDER = tuple(FIELD_TO_ROLE)

CANVAS_WIDTH = 1672
COLUMNS = 5
MARGIN_X = 20
MARGIN_Y = 20
GAP_X = 8
GAP_Y = 10
TILE_WIDTH = 320
PHOTO_HEIGHT = 213
LABEL_HEIGHT = 62
TILE_HEIGHT = PHOTO_HEIGHT + LABEL_HEIGHT
ALL_CHUNK_SIZE = 45


@dataclass(frozen=True)
class SourceItem:
    exercise_id: str
    exercise_name: str
    role: str
    path: Path
    sha256: str


@dataclass
class Discovery:
    active_ids: list[str]
    items: list[SourceItem]
    skipped_end_reuse: int
    skipped_other_duplicates: int
    missing: list[str]
    ambiguous: list[str]


def read_program() -> dict:
    text = DATA_JS.read_text(encoding="utf-8").strip()
    if "=" not in text:
        raise RuntimeError("data.js nemá očekávaný window.PB40_DATA assignment")
    payload = text.split("=", 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def active_ids_in_program_order(data: dict) -> list[str]:
    result: list[str] = []
    seen: set[str] = set()
    for day in data["days"]:
        ids = [item[0] for item in day.get("items", [])]
        if day.get("stretch"):
            ids.append(day["stretch"][0])
        for exercise_id in ids:
            if exercise_id not in seen:
                seen.add(exercise_id)
                result.append(exercise_id)
    return result


def asset_blocks() -> dict[str, str]:
    text = APP_JS.read_text(encoding="utf-8")
    start = text.find("const referenceExerciseAssets={")
    if start < 0:
        raise RuntimeError("referenceExerciseAssets nebyl v app.js nalezen")
    end_markers = (
        "\n};\nconst exerciseMuscleCardAssignments",
        "\n};\nfunction detailMasterCard",
    )
    end_candidates = [text.find(marker, start) for marker in end_markers]
    end_candidates = [position for position in end_candidates if position >= 0]
    end = min(end_candidates) if end_candidates else -1
    if end < 0:
        raise RuntimeError("Konec referenceExerciseAssets nebyl v app.js nalezen")
    section = text[start:end]
    matches = list(re.finditer(r"(?m)^  ([a-z0-9_]+):\{$", section))
    blocks: dict[str, str] = {}
    for index, match in enumerate(matches):
        block_end = matches[index + 1].start() if index + 1 < len(matches) else len(section)
        exercise_id = match.group(1)
        if exercise_id in blocks:
            raise RuntimeError(f"Duplicitní referenceExerciseAssets blok: {exercise_id}")
        blocks[exercise_id] = section[match.end():block_end]
    return blocks


def exact_case_exists(relative_path: Path) -> bool:
    current = REPO
    for part in relative_path.parts:
        if not current.is_dir():
            return False
        names = {entry.name for entry in current.iterdir()}
        if part not in names:
            return False
        current /= part
    return current.is_file()


def decode_source_path(raw: str) -> tuple[Path, Path]:
    clean = raw.replace("\\'", "'")
    decoded = unquote(urlsplit(clean).path)
    relative = Path(decoded)
    return relative, REPO / relative


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def discover() -> Discovery:
    data = read_program()
    active_ids = [exercise_id for exercise_id in data["exercises"] if exercise_id != "swan"]
    program_ids = active_ids_in_program_order(data)
    blocks = asset_blocks()
    missing: list[str] = []
    ambiguous: list[str] = []
    items: list[SourceItem] = []
    skipped_end_reuse = 0
    skipped_other_duplicates = 0

    if len(active_ids) != 51:
        ambiguous.append(f"Aktivní katalog má {len(active_ids)} ID místo očekávaných 51")
    for exercise_id in program_ids:
        if exercise_id not in active_ids:
            ambiguous.append(f"Program používá neaktivní nebo neznámé ID: {exercise_id}")

    mapped_classes = set(POSE_CLASS_BY_ID)
    active_set = set(active_ids)
    for exercise_id in sorted(active_set - mapped_classes):
        ambiguous.append(f"{exercise_id}: chybí camera/pose class")
    for exercise_id in sorted(mapped_classes - active_set):
        ambiguous.append(f"{exercise_id}: camera/pose class není aktivní")

    field_pattern = re.compile(
        r"(?m)^    (start|hero|mid|opposite|end):'((?:\\'|[^'])*)',?$"
    )
    for exercise_id in active_ids:
        block = blocks.get(exercise_id)
        if block is None:
            missing.append(f"{exercise_id}: chybí referenceExerciseAssets blok")
            continue
        values: dict[str, list[str]] = {field: [] for field in ROLE_ORDER}
        for match in field_pattern.finditer(block):
            values[match.group(1)].append(match.group(2))
        for required in ("start", "hero"):
            if len(values[required]) != 1:
                ambiguous.append(
                    f"{exercise_id}: očekáván právě jeden {required.upper()}, nalezeno {len(values[required])}"
                )

        used_photo_keys = set(re.findall(r"photo:'(start|hero|mid|opposite|end)'", block))
        seen_for_exercise: set[str] = set()
        exercise_name = data["exercises"].get(exercise_id, {}).get("name", exercise_id)
        for field in ROLE_ORDER:
            candidates = values[field]
            if len(candidates) > 1:
                ambiguous.append(f"{exercise_id}: více canonical kandidátů pro {field.upper()}")
                continue
            if not candidates:
                continue
            if field in {"mid", "opposite"} and field not in used_photo_keys:
                continue
            relative, source = decode_source_path(candidates[0])
            try:
                source.relative_to(CARDS_ROOT)
            except ValueError:
                ambiguous.append(f"{exercise_id}/{field}: cesta je mimo exercise folders: {relative}")
                continue
            if re.search(r"_v\d+|_approved", source.stem, flags=re.IGNORECASE):
                ambiguous.append(f"{exercise_id}/{field}: aktivní cesta není canonical unversioned: {relative}")
                continue
            if not source.is_file():
                missing.append(f"{exercise_id}/{field}: soubor neexistuje: {relative}")
                continue
            if not exact_case_exists(relative):
                missing.append(f"{exercise_id}/{field}: case cesty nesouhlasí: {relative}")
                continue
            if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
                ambiguous.append(f"{exercise_id}/{field}: nepodporovaný formát: {relative}")
                continue
            digest = sha256(source)
            if digest in seen_for_exercise:
                if field == "end":
                    skipped_end_reuse += 1
                else:
                    skipped_other_duplicates += 1
                continue
            seen_for_exercise.add(digest)
            items.append(SourceItem(exercise_id, exercise_name, FIELD_TO_ROLE[field], source, digest))

    return Discovery(
        active_ids=active_ids,
        items=items,
        skipped_end_reuse=skipped_end_reuse,
        skipped_other_duplicates=skipped_other_duplicates,
        missing=missing,
        ambiguous=ambiguous,
    )


def load_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    filename = "arialbd.ttf" if bold else "arial.ttf"
    candidates = (Path("C:/Windows/Fonts") / filename, Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    for candidate in candidates:
        if candidate.is_file():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int) -> ImageFont.ImageFont:
    for size in range(18, 11, -1):
        font = load_font(size, bold=True)
        if draw.textbbox((0, 0), text, font=font)[2] <= max_width:
            return font
    return load_font(11, bold=True)


def render_gallery(items: list[SourceItem], destination: Path) -> None:
    rows = max(1, math.ceil(len(items) / COLUMNS))
    canvas_height = MARGIN_Y * 2 + rows * TILE_HEIGHT + (rows - 1) * GAP_Y
    canvas = Image.new("RGB", (CANVAS_WIDTH, canvas_height), (226, 226, 226))
    draw = ImageDraw.Draw(canvas)
    role_font = load_font(16)

    for index, item in enumerate(items):
        row, column = divmod(index, COLUMNS)
        x = MARGIN_X + column * (TILE_WIDTH + GAP_X)
        y = MARGIN_Y + row * (TILE_HEIGHT + GAP_Y)
        draw.rectangle((x, y, x + TILE_WIDTH - 1, y + TILE_HEIGHT - 1), fill=(250, 250, 250))
        with Image.open(item.path) as source:
            source_rgb = source.convert("RGB")
            thumbnail = ImageOps.contain(source_rgb, (TILE_WIDTH, PHOTO_HEIGHT), Image.Resampling.LANCZOS)
        photo_box = Image.new("RGB", (TILE_WIDTH, PHOTO_HEIGHT), (242, 242, 242))
        photo_box.paste(thumbnail, ((TILE_WIDTH - thumbnail.width) // 2, (PHOTO_HEIGHT - thumbnail.height) // 2))
        canvas.paste(photo_box, (x, y))
        name_font = fit_font(draw, item.exercise_name, TILE_WIDTH - 16)
        draw.text((x + 8, y + PHOTO_HEIGHT + 5), item.exercise_name, fill=(38, 38, 38), font=name_font)
        draw.text((x + 8, y + PHOTO_HEIGHT + 34), item.role, fill=(86, 86, 86), font=role_font)

    temporary = destination.with_name(destination.stem + ".tmp.png")
    canvas.save(temporary, format="PNG", optimize=True)
    temporary.replace(destination)


def output_plan(discovery: Discovery) -> list[tuple[Path, list[SourceItem]]]:
    chunks = [
        discovery.items[index:index + ALL_CHUNK_SIZE]
        for index in range(0, len(discovery.items), ALL_CHUNK_SIZE)
    ]
    if len(chunks) > 3:
        raise RuntimeError(f"ALL galerie vyžaduje {len(chunks)} částí, podporovány jsou 3")
    while len(chunks) < 3:
        chunks.append([])
    plan = [
        (OUTPUT_DIR / f"MOOVKA_SOURCE_GALLERY_ALL_{index + 1:02d}.png", chunk)
        for index, chunk in enumerate(chunks)
    ]
    for pose_class in ("LYING", "QUADRUPED", "SIDE_FLOOR", "STANDING"):
        selected = [
            item for item in discovery.items
            if POSE_CLASS_BY_ID[item.exercise_id] == pose_class
        ]
        plan.append((OUTPUT_DIR / f"MOOVKA_SOURCE_GALLERY_{pose_class}.png", selected))
    return plan


def generate() -> tuple[Discovery, list[Path]]:
    discovery = discover()
    if discovery.missing or discovery.ambiguous:
        print("Generování zastaveno: canonical SOURCE nejsou jednoznačné.")
        for problem in discovery.missing:
            print(f"CHYBÍ: {problem}")
        for problem in discovery.ambiguous:
            print(f"NEJEDNOZNAČNÉ: {problem}")
        raise RuntimeError("Canonical SOURCE validace selhala")

    hashes_before = {item.path: sha256(item.path) for item in discovery.items}
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    created: list[Path] = []
    for destination, items in output_plan(discovery):
        render_gallery(items, destination)
        created.append(destination)
    hashes_after = {path: sha256(path) for path in hashes_before}
    if hashes_before != hashes_after:
        raise RuntimeError("SOURCE hash se během generování změnil")

    print(f"Aktivní cviky: {len(discovery.active_ids)}")
    print(f"Načtené unikátní SOURCE fáze: {len(discovery.items)}")
    print(f"Vynechané duplicitní END = START: {discovery.skipped_end_reuse}")
    print(f"Vynechané další identické fáze: {discovery.skipped_other_duplicates}")
    print("Chybějící SOURCE: 0")
    print("Nejednoznačné canonical kandidáty: 0")
    print("Vytvořené galerie:")
    for path in created:
        print(f"- {path.relative_to(REPO)}")
    return discovery, created


def watched_snapshot(discovery: Discovery) -> dict[Path, int]:
    paths = {item.path for item in discovery.items} | {APP_JS, DATA_JS}
    return {path: path.stat().st_mtime_ns for path in paths if path.exists()}


def watch() -> None:
    discovery, _ = generate()
    previous = watched_snapshot(discovery)
    print("Watch mode aktivní. Ukončení: Ctrl+C")
    while True:
        time.sleep(1)
        current = watched_snapshot(discovery)
        if current != previous:
            print("\nZměna SOURCE/mappingu nalezena; regeneruji galerie...")
            try:
                discovery, _ = generate()
                previous = watched_snapshot(discovery)
            except Exception as error:
                print(f"ERROR: {error}")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--watch", action="store_true", help="Regenerovat po změně aktivního SOURCE nebo mappingu")
    args = parser.parse_args()
    try:
        if args.watch:
            watch()
        else:
            generate()
    except KeyboardInterrupt:
        print("\nWatch mode ukončen.")
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
