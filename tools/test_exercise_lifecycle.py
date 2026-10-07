# -*- coding: utf-8 -*-
"""Regression tests for dynamic Moovka exercise lifecycle validation."""

from __future__ import annotations

import copy
import unittest
from unittest.mock import patch

import generate_visual_qa as visual_qa
from exercise_catalog import read_lifecycle_js, resolve_exercise_catalog


class ExerciseLifecycleTests(unittest.TestCase):
    def setUp(self) -> None:
        self.data = visual_qa.read_program()
        self.lifecycle = read_lifecycle_js(visual_qa.LIFECYCLE_JS)

    def test_draft_without_assets_is_excluded_from_strict_runtime_validation(self) -> None:
        data = copy.deepcopy(self.data)
        lifecycle = copy.deepcopy(self.lifecycle)
        data["exercises"]["draft_fixture"] = {"name": "Draft fixture"}
        lifecycle["draft"].append("draft_fixture")
        with patch.object(visual_qa, "read_program", return_value=data), patch.object(
            visual_qa, "read_lifecycle_js", return_value=lifecycle
        ):
            discovery = visual_qa.discover()
        self.assertNotIn("draft_fixture", discovery.active_ids)
        self.assertFalse(any("draft_fixture" in problem for problem in discovery.missing + discovery.ambiguous))

    def test_planned_draft_may_precede_metadata(self) -> None:
        lifecycle = copy.deepcopy(self.lifecycle)
        lifecycle["draft"].append("planned_without_metadata")
        catalog = resolve_exercise_catalog(self.data, lifecycle)
        self.assertIn("planned_without_metadata", catalog.draft_ids)
        self.assertNotIn("planned_without_metadata", catalog.active_ids)

    def test_current_lifecycle_counts_and_program_scope(self) -> None:
        catalog = resolve_exercise_catalog(self.data, self.lifecycle)
        program_ids = set(visual_qa.active_ids_in_program_order(self.data))
        self.assertEqual(len(catalog.active_ids), 52)
        self.assertEqual(len(catalog.draft_ids), 15)
        self.assertEqual(catalog.inactive_ids, ["swan"])
        self.assertTrue(program_ids.isdisjoint(catalog.draft_ids))
        self.assertIn("kneeling_hip_extension", catalog.active_ids)
        self.assertNotIn("kneeling_hip_extension", catalog.draft_ids)

    def test_active_count_is_dynamic(self) -> None:
        baseline = resolve_exercise_catalog(self.data, self.lifecycle)
        data = copy.deepcopy(self.data)
        data["exercises"]["future_complete_fixture"] = {"name": "Future complete fixture"}
        expanded = resolve_exercise_catalog(data, self.lifecycle)
        self.assertEqual(len(expanded.active_ids), len(baseline.active_ids) + 1)

    def test_active_without_reference_mapping_fails(self) -> None:
        data = copy.deepcopy(self.data)
        data["exercises"]["active_fixture"] = {"name": "Active fixture"}
        pose_classes = {**visual_qa.POSE_CLASS_BY_ID, "active_fixture": "QUADRUPED"}
        with patch.object(visual_qa, "read_program", return_value=data), patch.object(
            visual_qa, "POSE_CLASS_BY_ID", pose_classes
        ):
            discovery = visual_qa.discover()
        self.assertIn("active_fixture: chybí referenceExerciseAssets blok", discovery.missing)

    def test_active_without_camera_class_fails(self) -> None:
        pose_classes = dict(visual_qa.POSE_CLASS_BY_ID)
        pose_classes.pop("kneeling_hip_extension")
        with patch.object(visual_qa, "POSE_CLASS_BY_ID", pose_classes):
            discovery = visual_qa.discover()
        self.assertIn("kneeling_hip_extension: chybí camera/pose class", discovery.ambiguous)

    def test_active_without_required_source_fails(self) -> None:
        blocks = visual_qa.asset_blocks()
        blocks["kneeling_hip_extension"] = blocks["kneeling_hip_extension"].replace(
            "kneeling_hip_extension_start.png", "missing_start.png"
        )
        with patch.object(visual_qa, "asset_blocks", return_value=blocks):
            discovery = visual_qa.discover()
        self.assertTrue(
            any("kneeling_hip_extension/start: soubor neexistuje" in problem for problem in discovery.missing)
        )


if __name__ == "__main__":
    unittest.main()
