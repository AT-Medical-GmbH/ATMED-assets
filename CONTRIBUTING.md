# Contributing to ATMED-assets

Thank you for your interest in contributing to the AT Medical central asset repository. This document outlines the requirements and process for proposing changes or additions to brand assets.

---

## Who Can Contribute

Contributions are accepted from:

- **AT Medical team members** — internal staff with valid GitHub access to this organisation
- **Authorised external contributors** — third parties who have received explicit written permission from AT Medical GmbH

All contributions are subject to review and approval by the AT Medical infrastructure team and, for brand-critical assets, the design team.

---

## What Can Be Contributed

### Accepted contributions

- New assets that comply with the official AT Medical Brand Guidelines
- Corrected or updated versions of existing assets
- New subdirectory structures with associated `README.md` files
- Improvements to governance documentation

### Not accepted

- Assets that deviate from the official AT Medical colour palette, typography or visual identity standards
- Third-party logos, trademarks or branding elements
- Placeholder or draft assets that are not production-ready
- Modifications to existing logos, wordmarks or primary brand assets without explicit approval from the design team

---

## Contribution Process

1. **Open an issue first** — Before submitting a pull request, open a GitHub issue describing the asset you wish to add or the change you wish to make. Include the intended use case and any relevant context.

2. **Branch naming** — Create a branch following this convention:
   - `feature/asset-description` — for new assets
   - `fix/asset-description` — for corrections to existing assets
   - `docs/description` — for documentation-only changes

3. **Prepare your pull request** — Ensure your PR includes:
   - A clear description of the asset, its intended use case and its source or author
   - Confirmation that the asset complies with the AT Medical Brand Guidelines
   - Confirmation that the asset is an original work or that appropriate rights have been obtained
   - Relevant `README.md` updates for the affected directory

4. **Review** — All pull requests require review and approval by at least one member of `@AT-Medical/infrastructure-team`. Brand-critical assets additionally require approval from `@AT-Medical/design-team`.

5. **CI checks** — All pull requests must pass automated CI checks, including asset integrity validation and broken-link detection. Pull requests that fail CI checks will not be merged.

---

## Asset Standards

### File formats

| Asset type | Preferred format | Acceptable formats |
|---|---|---|
| Logos | SVG | PNG |
| Wordmarks | SVG | PNG |
| Icons | SVG | PNG |
| Favicons | ICO, PNG | — |
| Diagrams | SVG, PNG | PDF |
| Templates | SVG, PDF | — |
| Badges | SVG | PNG |

### Naming conventions

- Use lowercase filenames with hyphens (kebab-case): `logo-dark-mode.svg`
- Do not include version numbers in filenames — use directory versioning if necessary
- Do not include spaces in filenames

### Directory placement

Always place assets in the most specific appropriate subdirectory. Refer to the repository structure in `README.md` for guidance.

---

## Code of Conduct

All contributors are expected to adhere to the `CODE_OF_CONDUCT.md` at the root of this repository.

---

## Contact

For questions about the contribution process, please open a GitHub issue. For brand or trademark enquiries, contact [trademark@at-medical.com](mailto:trademark@at-medical.com).

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
