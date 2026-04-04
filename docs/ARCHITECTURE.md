# ATMED Assets – Architecture

## Purpose

`ATMED-assets` is the authoritative branding and visual asset repository for the AT Medical ecosystem.

## Repository Type

This is an **assets / brand identity repository**, not a runtime service.

## Platform Role

```text
Brand identity definitions
  ↓
ATMED-assets
  ↓
Reusable logos, wordmarks, templates and visual resources
```

## Scope

- logos and wordmarks
- visual identity resources
- branded templates and diagrams
- website and presentation assets
- brand governance references

## VPS Role

No runtime stack required. Optional mirror path for operational reference:

| Purpose | Path |
|---|---|
| Repository sync target | `/srv/atmed/repos/ATMED-assets` |

## Relationship to Other Repositories

- `ATMED-assets` = visual source of truth
- `ATMED-web`, `ATMED-docs`, `ATMED-templates` and others consume approved assets

## Target State

Conformant when branding role, non-runtime nature and consumption model are explicitly documented.
