# ARCHITECTURE.md — ATMED-assets

> Central branding asset repository for AT Medical GmbH.
> This document describes the asset catalogue structure, naming conventions, supported formats, brand usage guidelines, how other repositories reference these assets, and the versioning strategy.

---

## Table of Contents

1. [Repository Purpose](#1-repository-purpose)
2. [Asset Catalogue Structure](#2-asset-catalogue-structure)
3. [Naming Conventions](#3-naming-conventions)
4. [Supported Formats](#4-supported-formats)
5. [Brand Usage Guidelines and Restrictions](#5-brand-usage-guidelines-and-restrictions)
6. [Referencing Assets from Other Repositories](#6-referencing-assets-from-other-repositories)
7. [Versioning Strategy](#7-versioning-strategy)
8. [Governance and Ownership](#8-governance-and-ownership)

---

## 1. Repository Purpose

`ATMED-assets` is the **single source of truth** for all AT Medical GmbH visual identity assets. It is a **public repository** so that downstream projects, partners and the community can consume official assets without needing repository access.

All brand materials — logos, icons, wordmarks, favicons, social-media templates, illustrations and design-system components — are stored, versioned and governed here.

---

## 2. Asset Catalogue Structure

```
ATMED-assets/
├── assets/
│   ├── brand-guidelines/   # Brand rules, colour palettes, typography specs
│   ├── branding/           # Core brand identity files (source and exports)
│   ├── badges/             # Repository and status badges (SVG)
│   ├── diagrams/           # Architecture and flow diagrams
│   ├── documents/          # Branded document templates (PDF, DOCX)
│   ├── favicons/           # Favicon variants
│   │   ├── apple-touch-icon/
│   │   ├── ico/
│   │   └── png/
│   ├── icons/              # Product and UI icon set
│   ├── illustrations/      # Custom illustration assets
│   ├── logos/              # Primary logo mark
│   │   ├── dark-mode/
│   │   ├── light-mode/
│   │   ├── monochrome/
│   │   ├── png/
│   │   └── svg/
│   ├── presentations/      # Slide deck templates
│   ├── social-media/       # Social platform-specific assets
│   │   ├── banners/
│   │   ├── instagram/
│   │   ├── linkedin/
│   │   └── thumbnails/
│   ├── templates/          # Reusable design templates
│   ├── website/            # Web-specific visual assets
│   │   ├── backgrounds/
│   │   ├── footers/
│   │   ├── headers/
│   │   └── ui-elements/
│   └── wordmarks/          # Logotype (logo + text)
│       ├── horizontal/
│       ├── png/
│       ├── svg/
│       └── vertical/
├── artifacts/              # Release artefacts (staged, incoming, released)
│   ├── incoming/
│   ├── staged/
│   └── releases/
├── configs/                # Automation configuration (deploy, mail, status)
├── docs/                   # Repository-level documentation
│   ├── architecture/
│   ├── deployment/
│   ├── governance/
│   └── operations/
├── metadata/               # Machine-readable governance metadata
│   └── tags/
├── scripts/                # Utility and validation scripts
│   ├── cleanup/
│   ├── reporting/
│   └── validate/
├── status/                 # Generated status reports
├── templates/              # Partial templates used by automation
└── tests/                  # CI test scripts
```

Each `assets/<category>/` directory contains its own `README.md` with category-specific guidelines, accepted formats and dimension specifications.

---

## 3. Naming Conventions

### General Rules

| Rule | Detail |
|---|---|
| **Case** | All lowercase, hyphen-separated (`kebab-case`) |
| **Spaces** | Never use spaces in file names |
| **Underscores** | Avoid; use hyphens instead |
| **Special characters** | Not permitted (except hyphens and dots) |

### File Name Pattern

```
atmed-<category>-<variant>-<colour-mode>[-<size>].<ext>
```

| Segment | Description | Example values |
|---|---|---|
| `atmed` | Organisation prefix — always present | `atmed` |
| `<category>` | Asset type | `logo`, `icon`, `wordmark`, `badge`, `favicon` |
| `<variant>` | Specific variant or name | `primary`, `stacked`, `icon-only`, `full` |
| `<colour-mode>` | Colour treatment | `light`, `dark`, `mono`, `colour` |
| `<size>` _(optional)_ | Pixel dimensions for raster files | `512`, `1200x630` |
| `<ext>` | File extension | `.svg`, `.png`, `.ico`, `.webp` |

**Examples:**

```
atmed-logo-primary-light.svg
atmed-logo-primary-dark.png
atmed-wordmark-horizontal-mono.svg
atmed-icon-primary-colour-512.png
atmed-favicon-colour-32.ico
atmed-badge-build-passing.svg
atmed-social-linkedin-banner-light-1584x396.png
```

### Directory-Level README Files

Every asset category directory **must** contain a `README.md` describing:
- Purpose and usage context
- Accepted file formats and dimensions
- Colour mode variants available
- Download / reference links for external consumers

---

## 4. Supported Formats

| Format | Use Case | Notes |
|---|---|---|
| **SVG** | Logos, wordmarks, icons, badges, illustrations | Preferred for all vector assets; scalable without quality loss |
| **PNG** | Raster exports, social media, favicons, email | Use 2× resolution (retina) where possible |
| **ICO** | Browser favicons | Must include 16×16, 32×32 and 48×48 pixel variants |
| **WebP** | Web-optimised image assets | Use for website assets where browser support is adequate |
| **PDF** | Document templates, print-ready artwork | Required for print-quality deliverables |
| **JPEG / JPG** | Photographic backgrounds only | Avoid for logos or icons (lossy compression) |

### Format Matrix by Asset Category

| Category | SVG | PNG | ICO | WebP | PDF |
|---|---|---|---|---|---|
| Logos | ✅ Primary | ✅ Export | — | — | — |
| Wordmarks | ✅ Primary | ✅ Export | — | — | — |
| Icons | ✅ Primary | ✅ Export | — | — | — |
| Favicons | — | ✅ | ✅ | — | — |
| Badges | ✅ Primary | — | — | — | — |
| Social media | — | ✅ Primary | — | ✅ | — |
| Documents | — | — | — | — | ✅ Primary |
| Illustrations | ✅ Primary | ✅ Export | — | ✅ | — |
| Website assets | ✅ | ✅ | — | ✅ Primary | — |
| Presentations | — | — | — | — | ✅ |

---

## 5. Brand Usage Guidelines and Restrictions

> Full brand guidelines are available in [`assets/brand-guidelines/`](assets/brand-guidelines/README.md).

### Permitted Uses

- Referencing official AT Medical assets in AT-Medical GitHub repositories and projects
- Using assets in presentations, documents and communications produced by or on behalf of AT Medical GmbH
- Embedding assets in AT Medical product interfaces and marketing materials

### Restrictions

| Action | Permitted |
|---|---|
| Modify logo colours | ❌ No |
| Alter logo proportions or distort | ❌ No |
| Combine AT Medical logo with third-party logos without written approval | ❌ No |
| Use assets in non-AT Medical branded materials without authorisation | ❌ No |
| Reproduce assets in print without using print-ready (PDF/EPS) sources | ❌ No |
| Use outdated / deprecated asset versions | ❌ No |

### Colour Palette

Colour values are defined in `assets/brand-guidelines/`. Always use the values from that source; never eyedrop from compressed raster images.

### Minimum Clear Space

Logos and wordmarks must always be surrounded by a minimum clear space equal to the height of the AT Medical icon mark. Do not place other elements, text or imagery within this zone.

### Minimum Size

| Asset | Minimum size |
|---|---|
| Logo mark | 24 px height (digital) |
| Wordmark | 80 px width (digital) |
| Favicon | 16×16 px |

---

## 6. Referencing Assets from Other Repositories

### Recommended Method — Direct GitHub Raw URL

Use the `raw.githubusercontent.com` URL pinned to a specific **tag** (not `main`) to ensure reproducibility:

```
https://raw.githubusercontent.com/AT-Medical/ATMED-assets/<tag>/assets/<category>/<file>
```

**Example — logo in a README:**

```markdown
![AT Medical Logo](https://raw.githubusercontent.com/AT-Medical/ATMED-assets/v1.0.0/assets/logos/svg/atmed-logo-primary-light.svg)
```

**Example — favicon in HTML:**

```html
<link rel="icon" type="image/x-icon"
      href="https://raw.githubusercontent.com/AT-Medical/ATMED-assets/v1.0.0/assets/favicons/ico/atmed-favicon-colour-32.ico">
```

### Why Pin to a Tag?

Pinning to a tag rather than `main` or `HEAD` ensures:
- **Reproducibility** — downstream repos always get the same file
- **Stability** — a new logo upload to `main` does not silently change what downstream repos display
- **Auditability** — easy to identify which version of an asset is in use

### Copying Assets into Downstream Repos

For use cases where an external URL is not suitable (e.g. CI pipelines, offline environments):
1. Copy the asset into the downstream repository.
2. Record the source tag and file path in the downstream `README.md` or a `NOTICE` file.
3. Keep track of updates so the copy can be refreshed when a new version is released.

---

## 7. Versioning Strategy

### Semantic Versioning

ATMED-assets follows **Semantic Versioning (SemVer)** adapted for brand assets:

| Version type | Increment when… | Example |
|---|---|---|
| **Major** (`X.0.0`) | A brand refresh changes core identity (logo shape, primary colours, typeface) | `v1.0.0 → v2.0.0` |
| **Minor** (`x.Y.0`) | New asset categories or variants are added (e.g. dark-mode logo, new icon set) | `v1.0.0 → v1.1.0` |
| **Patch** (`x.y.Z`) | A file is corrected (wrong colour value, corrupted export, typo in SVG path) | `v1.0.0 → v1.0.1` |

### Release Process

1. Branch from `main` following the convention `release/<version>` (e.g. `release/1.1.0`).
2. Add or update assets, update `CHANGELOG.md`, bump any relevant version references.
3. Open a pull request targeting `main`; obtain required reviews (see `CODEOWNERS`).
4. On merge, create a GitHub Release with tag `v<version>` and release notes derived from `CHANGELOG.md`.
5. Downstream repositories should update their pinned tag reference when consuming updated assets.

### Deprecation

When an asset is deprecated:
- Move it to a `deprecated/` subdirectory within its category.
- Add a notice in the category `README.md`.
- Record the deprecation in `CHANGELOG.md`.
- Deprecated assets are removed at the next major version.

---

## 8. Governance and Ownership

| Area | Owner |
|---|---|
| Brand-critical assets (logos, wordmarks) | `@AT-Medical/design-team` + `@AT-Medical/infrastructure-team` |
| Repository governance and metadata | `@AT-Medical/infrastructure-team` + `@AT-Medical/admin-team` |
| CI/CD workflows and tooling | `@AT-Medical/devops-team` |
| All other assets | `@AT-Medical/infrastructure-team` |

See [`.github/CODEOWNERS`](.github/CODEOWNERS) for the full ownership matrix.

All significant changes are logged in [`CHANGELOG.md`](CHANGELOG.md).

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 1.0.0 &nbsp;|&nbsp; Date: 2026-03-17 &nbsp;|&nbsp; Status: active &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
