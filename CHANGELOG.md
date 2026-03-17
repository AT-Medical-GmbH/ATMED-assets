# Changelog — ATMED-assets

All notable changes to the **ATMED-assets** repository are documented in this file.

This changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] — 2026-03-16

### Added

- Enterprise standardisation: repository transformed into AT Medical central asset repository
- Enterprise directory structure (`configs/`, `metadata/`, `docs/`, `scripts/`, `tests/`, `templates/`, `status/`, `artifacts/`)
- `metadata/repository-profile.yml` — canonical machine-readable repository governance profile with deploy targets, team ownership and governance settings
- `metadata/tags/taxonomy.yml` — full tag dimension and value taxonomy
- `metadata/tags/rules.yml` — automated tag enforcement rules
- `metadata/tags/examples.yml` — tagging reference examples
- `metadata/tags/file-tags.yml` — per-path file tagging registry
- `CONTRIBUTING.md` — enterprise contribution policy
- `SECURITY.md` — security and asset integrity policy
- `CODE_OF_CONDUCT.md` — community and collaboration standards
- `CHANGELOG.md` — this file
- `.github/CODEOWNERS` — repository ownership mapping by directory
- `.github/dependabot.yml` — automated dependency update configuration
- GitHub Actions workflows:
  - `ci-validation.yml` — continuous integration and structure validation
  - `governance-check.yml` — governance, metadata and corporate identity compliance
  - `tag-validation.yml` — tag taxonomy validation
  - `file-tagging.yml` — automated file tagging on pull requests and pushes
  - `dependency-check.yml` — dependency audit workflow
  - `cleanup-weekly.yml` — weekly automated cleanup workflow
  - `repository-selfcheck.yml` — repository health self-check workflow
  - `asset-integrity.yml` — asset integrity verification
  - `broken-link-check.yml` — automated broken link detection
  - `repo-self-check.yml` — repository structure self-check
  - `safe-cleanup.yml` — automated safe cleanup on schedule
- `scripts/validate/repository-selfcheck.sh` — repository structure and consistency validation script
- `docs/architecture/README.md` — architecture overview
- `docs/governance/README.md` — governance documentation
- `docs/operations/README.md` — operational documentation
- `docs/deployment/README.md` — deployment documentation
- `artifacts/incoming/`, `artifacts/staged/`, `artifacts/releases/` — artifact intake directories
- New asset directories:
  - `assets/badges/` — CI badges and status indicators
  - `assets/branding/` — supplementary brand elements
  - `assets/templates/` — branded document and slide templates
  - `assets/diagrams/` — architecture and infrastructure diagrams
- Enterprise badges added to `README.md`
- Repository governance table and version block added to `README.md`
- Standardised verification blocks added to governance documents
- `Abschlussbericht_ATMED-assets.md` — enterprise standardisation completion report

### Changed

- `README.md` updated with enterprise badge block, governance table and verification footer
- `metadata/repository-profile.yml` unified to include both legacy compatibility keys and extended governance fields

### Fixed

- Ensured canonical logo path `assets/logos/svg/logo.svg` is valid and accessible to other repositories

---

## [0.1.0] — 2025-01-01

### Added

- Initial repository creation
- Core asset directory structure (`assets/logos/`, `assets/wordmarks/`, `assets/icons/`, `assets/illustrations/`, `assets/social-media/`, `assets/presentations/`, `assets/documents/`, `assets/website/`, `assets/favicons/`, `assets/brand-guidelines/`)
- `README.md` — repository overview and usage policy
- `LICENSE` — proprietary licence declaration
- Initial asset placeholders and per-directory `README.md` files
- `assets/logos/svg/logo.svg` — primary AT Medical logo (SVG)
- `assets/favicons/` — favicon assets for web properties

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
