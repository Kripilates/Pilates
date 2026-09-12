# Project Structure

This document defines the active long-term project structure for Moovka.

## Active Locations

- `04_Codex/`
  Dated audit snapshots and working evidence for Codex. A file here is not a
  MASTER authority unless the MASTER index explicitly says otherwise.

- `Pilates Assets/00_Project_Standards/`
  Compatibility templates and short checklists. They point to MASTER and are
  subordinate to it.

- `Pilates Assets/00_Project_Status/`
  Current status overview for individual exercises and image assets.

- `00_CHATGPT_START/MASTER/`
  Jediný canonical kořen pro aktivní MASTER dokumentaci a referenční podklady.

- `Pilates Assets/02_Exercise_Cards/`
  Source images and cards for individual exercises.

- `Pilates Assets/03_Exports/`
  Exports, previews, reports, and backups of completed outputs.

- `Pilates Assets/03_Exports/Visual_QA/`
  Read-only contact sheets aktuálních SOURCE; nejsou runtime assets.

- `assets/exercises/`
  Images used directly by the app. Do not modify this folder while working on the source asset library unless explicitly requested.

- `05_Archive/`
  Older or replaced documents and safety backups.

## Rule

Nevytvářet další složku Project_Status nebo Codex bez předchozí kontroly existující struktury.

Aktuální image workflow a stavová inventura patří pouze do
`00_CHATGPT_START/MASTER/01_DOCUMENTS/`. Dokončené implementační plány a staré
audity patří do `05_Archive/`, ne mezi aktivní MASTER autority.
