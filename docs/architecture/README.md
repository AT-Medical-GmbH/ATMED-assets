# Architecture Overview — ATMED-assets

## AT Medical GmbH — Repository Architecture

**ATMED-assets** is the single authoritative source for all AT Medical visual identity assets. This document describes the repository architecture, directory layout and integration model.

---

## Purpose

This repository centralises all official AT Medical brand assets to:

- Ensure consistent visual identity across all AT Medical platforms and products
- Provide a governed, auditable source of truth for branding materials
- Enable controlled distribution of assets to downstream consumers

---

## Architecture Overview

```
ATMED-assets
├── assets/                  Primary brand asset library
│   ├── logos/               Official AT Medical logos
│   ├── wordmarks/           Text-based wordmarks
│   ├── icons/               Standalone icons and pictograms
│   ├── illustrations/       Custom illustrations
│   ├── social-media/        Platform-specific social assets
│   ├── presentations/       Slide deck templates
│   ├── documents/           Branded document templates
│   ├── website/             Web property assets
│   ├── favicons/            Favicon assets
│   └── brand-guidelines/    Official brand guidelines
│
├── artifacts/               Artifact intake and release pipeline
│   ├── incoming/            Assets pending review and staging
│   ├── staged/              Assets approved and awaiting release
│   └── releases/            Published and versioned asset releases
│
├── metadata/                Repository and asset metadata
│   └── tags/                Tag taxonomy and file tagging registry
│
├── docs/                    Operational documentation
│   ├── architecture/        This document
│   ├── governance/          Governance model and policies
│   ├── operations/          Operational procedures
│   └── deployment/          Distribution and deployment procedures
│
├── scripts/                 Automation and validation scripts
│   ├── validate/            Repository validation scripts
│   ├── reporting/           Reporting scripts
│   └── cleanup/             Maintenance and cleanup scripts
│
├── .github/                 GitHub platform configuration
│   └── workflows/           CI/CD and governance workflows
│
├── configs/                 Environment and automation configuration
│   └── automation/          Automation pipeline configuration
│
├── templates/               Reusable document and asset templates
│   └── partials/            Partial template components
│
└── status/                  Repository status outputs
    └── generated/           Generated status reports
```

---

## Integration Model

Assets in this repository are consumed by downstream systems through:

1. **Direct Git reference** — Downstream repositories reference specific asset versions via commit SHA or tag.
2. **CDN distribution** — Published releases are distributed via the AT Medical CDN.
3. **Webspace publishing** — Selected assets are published to AT Medical web properties.
4. **Cloudflare R2** — Large binary assets may be distributed via Cloudflare R2 storage.

---

## Dependency Direction

```
ATMED-assets (source of truth)
        │
        ├──▶ AT Medical web properties
        ├──▶ AT Medical software products
        ├──▶ AT Medical documentation platforms
        ├──▶ AT Medical educational platforms
        └──▶ GitHub organisation profiles
```

---

## CI/CD Pipeline

```
Pull Request
    │
    ├──▶ ci-validation.yml        — Structure and content validation
    ├──▶ governance-check.yml     — Corporate identity compliance
    ├──▶ tag-validation.yml       — Tag taxonomy validation
    └──▶ file-tagging.yml         — File tag consistency

Merge to main
    │
    └──▶ repository-selfcheck.yml — Full repository health check

Scheduled
    ├──▶ cleanup-weekly.yml       — Weekly maintenance check
    └──▶ dependency-check.yml     — Dependency and action audit
```

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
