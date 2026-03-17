# Deployment — ATMED-assets

## AT Medical GmbH — Asset Distribution and Deployment

This document describes how AT Medical brand assets are distributed and deployed from the **ATMED-assets** repository to downstream consumers.

---

## Distribution Channels

### 1. Direct Git Reference

Downstream repositories and projects may reference assets directly from this repository using a specific commit SHA or release tag. This ensures consumers are always using an explicitly approved version of each asset.

**Recommended approach for internal projects:**

```
https://raw.githubusercontent.com/AT-Medical/ATMED-assets/<tag-or-sha>/assets/logos/svg/logo.svg
```

### 2. CDN Distribution

Approved release assets are distributed via the AT Medical CDN for high-performance delivery to web properties and external consumers. CDN deployment is managed by the AT Medical infrastructure team.

### 3. Webspace Publishing

Selected assets are published directly to AT Medical web properties. Webspace publishing is configured in `configs/automation/deploy/` and managed by the AT Medical platform engineering team.

### 4. Cloudflare R2

Large binary assets and bulk asset packages are distributed via Cloudflare R2 object storage. R2 import is enabled for this repository (see `metadata/repository-profile.yml`).

---

## Release Process

### Creating a Release

1. Ensure all assets in the release have been reviewed and approved
2. Stage assets in `artifacts/staged/`
3. Create a release branch:
   ```bash
   git checkout -b release/v<version>
   ```
4. Update `CHANGELOG.md` with the release notes
5. Merge the release branch to `main` after approval
6. Create a Git tag:
   ```bash
   git tag -a v<version> -m "Release v<version>"
   ```
7. Publish the GitHub Release with a description and the tagged assets
8. Move published assets to `artifacts/releases/`

### Versioning

Asset releases follow [Semantic Versioning](https://semver.org/):

- **Major** (`v2.0.0`) — Breaking changes to brand identity (e.g., rebrand)
- **Minor** (`v1.1.0`) — New asset additions or non-breaking updates
- **Patch** (`v1.0.1`) — Corrections to existing assets (file fixes, colour corrections)

---

## Artifact Directories

| Directory              | Purpose                                              |
|------------------------|------------------------------------------------------|
| `artifacts/incoming/`  | Assets submitted for review, not yet approved        |
| `artifacts/staged/`    | Assets approved and awaiting release publication     |
| `artifacts/releases/`  | Published, versioned asset packages                  |

---

## Deployment Configuration

Deployment automation configuration files are maintained in:

```
configs/automation/deploy/
```

Contact the AT Medical infrastructure team for deployment configuration access.

---

## Consumer Responsibilities

Consumers of AT Medical brand assets are responsible for:

- Always sourcing assets from the latest approved release
- Not modifying assets in any way that alters their visual appearance
- Complying with the AT Medical Brand Guidelines and the terms of the `LICENSE` file
- Not redistributing assets to unauthorised third parties

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
