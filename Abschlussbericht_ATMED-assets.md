# Abschlussbericht — ATMED-assets

Enterprise Standardisation Completion Report

---

## Summary

This report documents the enterprise standardisation of the `ATMED-assets` repository as part of the AT Medical platform infrastructure initiative. The repository has been transformed into the central, enterprise-grade asset repository for the AT Medical platform, serving as the single source of truth for all shared visual and branding assets.

---

## 1. Asset Structure Created

The following directory structure has been established and verified:

```
assets/
├── logos/
│   ├── svg/                  ← Canonical logo: assets/logos/svg/logo.svg (✓ present)
│   ├── png/
│   ├── monochrome/
│   ├── dark-mode/
│   └── light-mode/
├── wordmarks/
│   ├── svg/
│   ├── png/
│   ├── horizontal/
│   └── vertical/
├── icons/
├── badges/                   ← Added (enterprise standardisation)
├── branding/                 ← Added (enterprise standardisation)
├── diagrams/                 ← Added (enterprise standardisation)
├── templates/                ← Added (enterprise standardisation)
├── illustrations/
├── social-media/
│   ├── linkedin/
│   ├── instagram/
│   ├── banners/
│   └── thumbnails/
├── presentations/
├── documents/
├── website/
│   ├── headers/
│   ├── footers/
│   ├── backgrounds/
│   └── ui-elements/
├── favicons/
│   ├── ico/
│   ├── png/
│   └── apple-touch-icon/
└── brand-guidelines/

docs/                         ← Added (enterprise standardisation)
metadata/                     ← Added (enterprise standardisation)
```

---

## 2. Fixes Applied

| Fix | Details |
|---|---|
| Canonical logo path verified | `assets/logos/svg/logo.svg` is present and is valid SVG |
| Enterprise badges added to README | Type, visibility, status, deploy, team (infrastructure), team (design) |
| Repository structure section updated | Includes new directories: `badges/`, `branding/`, `diagrams/`, `templates/`, `docs/`, `metadata/` |
| Governance files created | `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md` |
| Repository ownership defined | `.github/CODEOWNERS` maps all directories to owning teams |
| Version block added to all major docs | Consistent version/date/status/repository block in all governance documents |
| Repository profile created | `metadata/repository-profile.yml` with all required governance fields |

---

## 3. Missing Assets

The following asset directories were created during standardisation but currently contain only placeholder files (`.gitkeep`). Production assets should be added as part of ongoing design and infrastructure work:

| Directory | Status | Notes |
|---|---|---|
| `assets/badges/` | Empty (placeholder) | CI badges and status indicators to be added |
| `assets/branding/` | Empty (placeholder) | Supplementary brand colour/pattern assets to be added |
| `assets/diagrams/` | Empty (placeholder) | Architecture and infrastructure diagrams to be added |
| `assets/templates/` | Empty (placeholder) | Document and slide templates to be added |
| `assets/logos/png/` | Empty (placeholder) | PNG exports of official logos to be added |
| `assets/logos/monochrome/` | Empty (placeholder) | Monochrome logo variants to be added |
| `assets/logos/dark-mode/` | Empty (placeholder) | Dark-mode logo variants to be added |
| `assets/logos/light-mode/` | Empty (placeholder) | Light-mode logo variants to be added |
| `assets/wordmarks/svg/` | Empty (placeholder) | SVG wordmarks to be added |
| `assets/wordmarks/png/` | Empty (placeholder) | PNG wordmarks to be added |
| `assets/wordmarks/horizontal/` | Empty (placeholder) | Horizontal wordmark variants to be added |
| `assets/wordmarks/vertical/` | Empty (placeholder) | Vertical wordmark variants to be added |
| `assets/icons/` | Empty (placeholder) | Brand icons to be added |
| `assets/illustrations/` | Empty (placeholder) | Custom illustrations to be added |

**Currently present production assets:**

| Asset | Path | Status |
|---|---|---|
| AT Medical logo (SVG) | `assets/logos/svg/logo.svg` | ✓ Present and valid |
| Favicons | `assets/favicons/` | ✓ Present (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`) |

---

## 4. External References

The following external repositories and services reference assets from this repository:

| Reference | Asset | Status |
|---|---|---|
| Canonical logo path (other AT Medical repos) | `assets/logos/svg/logo.svg` | ✓ Valid and accessible |

**Deploy targets configured:**

| Target | Status |
|---|---|
| Cloudflare R2 | Configured in `metadata/repository-profile.yml`; deployment workflow to be implemented by DevOps team |
| CDN (Webspace mirror) | Configured in `metadata/repository-profile.yml`; deployment workflow to be implemented by DevOps team |

---

## 5. Recommendations for Asset Governance

### Immediate actions

1. **Fill empty asset directories** — Priority should be given to adding PNG logo variants, monochrome variants and wordmark files. These are the most commonly referenced assets across AT Medical projects.

2. **Implement R2 deployment workflow** — A GitHub Actions workflow for automated deployment to Cloudflare R2 should be implemented by the DevOps team. The workflow should trigger on push to `main` and deploy all contents of `assets/` to the configured R2 bucket.

3. **Add CDN deployment workflow** — A corresponding workflow for the optional Webspace CDN mirror should be implemented, with appropriate cache invalidation steps.

4. **Configure branch protection** — The `main` branch should have branch protection rules requiring:
   - At least one review from `@AT-Medical/infrastructure-team`
   - For brand-critical assets (`assets/logos/`, `assets/wordmarks/`), an additional review from `@AT-Medical/design-team`
   - All CI checks passing before merge

### Medium-term actions

5. **Add repository topics** — Apply the following topics to the repository via the GitHub UI or API to enable discoverability:
   `domain:assets`, `domain:branding`, `domain:logos`, `visibility:public`, `deploy-target:r2`, `deploy-target:cdn`, `owner:infrastructure-team`, `owner:design-team`

6. **Establish asset versioning** — As assets evolve, consider implementing a versioning convention for production assets. Recommended approach: date-stamped subdirectories or semantic version directories, e.g. `assets/logos/svg/v1/logo.svg`.

7. **Add brand guidelines document** — The `assets/brand-guidelines/` directory should contain the official AT Medical Brand Guidelines document in PDF or web-readable format.

8. **Create asset index** — Consider generating and committing an `assets/index.json` file listing all production assets with their paths, formats and usage notes. This enables downstream tooling to programmatically discover and reference assets.

9. **Remove obsolete branches** — Review and remove any feature or fix branches that have been merged and are no longer needed. Standardise on the branch strategy: `main` (production), `feature/*`, `fix/*`, `docs/*`.

### Long-term governance

10. **Automated CDN cache invalidation** — When assets are updated, the CI pipeline should automatically purge CDN caches to ensure downstream consumers always receive the latest versions.

11. **Asset usage auditing** — Implement periodic auditing of which assets are actively referenced by other AT Medical repositories. Deprecated or unused assets should be archived rather than deleted to preserve reference links.

12. **Digital asset management integration** — Consider integrating with a digital asset management (DAM) system for richer metadata, usage tracking and rights management beyond what is practical in a Git repository.

---

## 6. Workflows Implemented

| Workflow | File | Trigger | Purpose |
|---|---|---|---|
| CI Validation | `.github/workflows/ci-validation.yml` | Push/PR to main | Validates required files, directories, canonical logo path and metadata YAML |
| Governance Check | `.github/workflows/governance-check.yml` | Push/PR to main | Validates governance metadata, CODEOWNERS, SECURITY.md and version blocks |
| Asset Integrity | `.github/workflows/asset-integrity.yml` | Push/PR to main (assets/**) | Verifies SVG well-formedness, checks for executable files, enforces 10 MB file size limit |
| Broken Link Check | `.github/workflows/broken-link-check.yml` | Push/PR to main (**.md), weekly | Validates all internal Markdown links resolve to existing files |
| Repository Self-Check | `.github/workflows/repo-self-check.yml` | Push/PR to main, daily | Validates directory structure completeness, generates asset inventory, checks metadata |
| Safe Cleanup | `.github/workflows/safe-cleanup.yml` | Weekly (Sunday 03:00 UTC) | Reports empty directories, large files and duplicate filenames — informational only |

---

<!-- Version block -->
| Field | Value |
|---|---|
| Version | 0.9.0 |
| Date | 2026-03-16 |
| Status | Verified |
| Repository | ATMED-assets |

---

*© AT Medical GmbH. All rights reserved.*
