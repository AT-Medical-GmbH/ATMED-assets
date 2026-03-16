# Changelog

All notable changes to this repository are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions, adapted for an asset repository.

---

## [0.9.0] — 2026-03-16

### Added

- Enterprise standardisation: repository transformed into AT Medical central asset repository
- `metadata/repository-profile.yml` — machine-readable repository profile with deploy targets, team ownership and governance settings
- `SECURITY.md` — security and asset integrity policy
- `CONTRIBUTING.md` — standardised contribution guidelines
- `CODE_OF_CONDUCT.md` — contributor code of conduct
- `CHANGELOG.md` — this file
- `.github/CODEOWNERS` — repository ownership mapping by directory
- GitHub Actions workflows:
  - `ci-validation.yml` — CI validation on push and pull request
  - `governance-check.yml` — governance and metadata validation
  - `asset-integrity.yml` — asset integrity verification
  - `broken-link-check.yml` — automated broken link detection
  - `repo-self-check.yml` — repository structure self-check
  - `safe-cleanup.yml` — automated safe cleanup on schedule
- New asset directories:
  - `assets/badges/` — CI badges and status indicators
  - `assets/branding/` — supplementary brand elements
  - `assets/templates/` — branded document and slide templates
  - `assets/diagrams/` — architecture and infrastructure diagrams
  - `docs/` — repository documentation
- `Abschlussbericht_ATMED-assets.md` — enterprise standardisation completion report
- Version and verification blocks added to all major governance documents
- README updated with enterprise badges, deploy targets, team ownership and structure

### Fixed

- Ensured canonical logo path `assets/logos/svg/logo.svg` is valid and accessible to other repositories

---

## [0.1.0] — 2024-01-01

### Added

- Initial repository setup with core asset structure
- `assets/logos/` — official AT Medical logos (SVG and PNG)
- `assets/wordmarks/` — official AT Medical wordmarks
- `assets/icons/` — brand icons
- `assets/illustrations/` — custom illustrations
- `assets/social-media/` — social media assets
- `assets/presentations/` — presentation templates
- `assets/documents/` — branded document templates
- `assets/website/` — web property assets
- `assets/favicons/` — favicon assets
- `assets/brand-guidelines/` — official brand guidelines
- `README.md` — repository overview and usage guidelines
- `LICENSE` — proprietary licence

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
