# -*- coding: utf-8 -*-
"""Canonical ACTIVE/DRAFT/INACTIVE exercise lifecycle helpers."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class ExerciseCatalog:
    active_ids: list[str]
    draft_ids: list[str]
    inactive_ids: list[str]


def read_data_js(path: Path) -> dict:
    text = path.read_text(encoding="utf-8").strip()
    if "=" not in text:
        raise RuntimeError("data.js nemá očekávaný window.PB40_DATA assignment")
    payload = text.split("=", 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def read_lifecycle_js(path: Path) -> dict:
    text = path.read_text(encoding="utf-8").strip()
    if "=" not in text:
        raise RuntimeError("exercise-lifecycle.js nemá očekávaný assignment")
    payload = text.split("=", 1)[1].strip()
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def resolve_exercise_catalog(data: dict, lifecycle: dict) -> ExerciseCatalog:
    """Resolve runtime lifecycle without any fixed expected ACTIVE count.

    Catalog entries are fail-closed: every exercise not explicitly listed as
    DRAFT or INACTIVE is ACTIVE and therefore receives strict runtime/asset QA.
    A planned incomplete exercise must be explicitly placed in ``draft``.
    """

    exercises = data.get("exercises")
    if not isinstance(exercises, dict) or not exercises:
        raise RuntimeError("data.js neobsahuje neprázdný exercises katalog")
    if not isinstance(lifecycle, dict):
        raise RuntimeError("Canonical exercise lifecycle není objekt")

    resolved: dict[str, list[str]] = {}
    for state in ("draft", "inactive"):
        values = lifecycle.get(state, [])
        if not isinstance(values, list) or any(not isinstance(value, str) or not value for value in values):
            raise RuntimeError(f"exerciseLifecycle.{state} musí být pole neprázdných ID")
        if len(values) != len(set(values)):
            raise RuntimeError(f"exerciseLifecycle.{state} obsahuje duplicitní ID")
        resolved[state] = values

    draft = set(resolved["draft"])
    inactive = set(resolved["inactive"])
    overlap = draft & inactive
    if overlap:
        raise RuntimeError("Exercise ID je současně DRAFT i INACTIVE: " + ", ".join(sorted(overlap)))
    # DRAFT is also the canonical registry for planned IDs, so it may precede
    # the metadata record and image bundle. INACTIVE, by contrast, describes a
    # retained catalog record and therefore must still exist in data.js.
    unknown_inactive = inactive - set(exercises)
    if unknown_inactive:
        raise RuntimeError(
            "INACTIVE lifecycle odkazuje na neznámé exercise ID: "
            + ", ".join(sorted(unknown_inactive))
        )

    active = [exercise_id for exercise_id in exercises if exercise_id not in draft and exercise_id not in inactive]
    if not active:
        raise RuntimeError("Canonical ACTIVE katalog je prázdný")
    return ExerciseCatalog(active, resolved["draft"], resolved["inactive"])
