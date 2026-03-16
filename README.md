# AT Medical Brand Assets

![Type](https://img.shields.io/badge/type-assets-blue)
![Visibility](https://img.shields.io/badge/visibility-public-brightgreen)
![Status](https://img.shields.io/badge/status-active-success)
![Deploy](https://img.shields.io/badge/deploy-R2%20%7C%20CDN-orange)
![Team](https://img.shields.io/badge/team-infrastructure-informational)
![Team](https://img.shields.io/badge/team-design-blueviolet)

Official brand asset repository of AT Medical GmbH — the single authoritative source for all visual identity assets used across the AT Medical ecosystem.

---

## Overview

This repository contains the official branding assets of AT Medical, including logos, icons, wordmarks, social media graphics and design resources used across the entire AT Medical ecosystem.

This repository functions as the single authoritative source for branding assets used across:

- **Software projects** — embedded within AT Medical applications and tools
- **GitHub repositories** — profile images, banners and repository artwork
- **Documentation** — technical and user-facing documentation
- **Educational platforms** — learning management systems and e-learning content
- **Websites** — all AT Medical web properties and landing pages
- **Marketing materials** — promotional content, campaigns and outreach
- **Presentations** — internal and external slide decks and pitch materials

---

## Repository Purpose

This repository exists to guarantee consistent visual identity across all AT Medical projects. Centralising brand assets in a single location eliminates ambiguity, prevents the proliferation of outdated or modified assets and provides a clear governance framework for all teams working with AT Medical branding materials.

---

## Repository Structure

```
assets/
├── logos/                  Official AT Medical logos in all approved variants
│   ├── svg/                Vector format logos (scalable, print-ready)
│   ├── png/                Raster format logos for digital use
│   ├── monochrome/         Single-colour logo variants
│   ├── dark-mode/          Logos optimised for dark backgrounds
│   └── light-mode/         Logos optimised for light backgrounds
│
├── wordmarks/              Text-based AT Medical wordmarks
│   ├── svg/                Vector wordmarks
│   ├── png/                Raster wordmarks
│   ├── horizontal/         Horizontal layout wordmarks
│   └── vertical/           Vertical / stacked layout wordmarks
│
├── icons/                  Standalone brand icons and pictograms
│
├── badges/                 CI badges and status indicators
│
├── branding/               Supplementary brand elements and colour assets
│
├── diagrams/               Architecture and infrastructure diagrams
│
├── templates/              Branded document and slide templates
│
├── illustrations/          Custom illustrations and decorative graphics
│
├── social-media/           Assets formatted for social media platforms
│   ├── linkedin/           LinkedIn profile and cover assets
│   ├── instagram/          Instagram profile and post assets
│   ├── banners/            General-purpose social media banners
│   └── thumbnails/         Video and content thumbnails
│
├── presentations/          Slide deck templates and presentation assets
│
├── documents/              Branded document templates and stationery
│
├── website/                Assets used across AT Medical web properties
│   ├── headers/            Header images and hero graphics
│   ├── footers/            Footer graphics and branding elements
│   ├── backgrounds/        Background images and textures
│   └── ui-elements/        Branded UI components and interface graphics
│
├── favicons/               Favicon assets for web properties
│   ├── ico/                ICO format favicons
│   ├── png/                PNG format favicons at various resolutions
│   └── apple-touch-icon/   Apple touch icons for iOS home screens
│
└── brand-guidelines/       Official AT Medical brand guidelines and documentation

docs/                       Repository documentation
metadata/                   Repository profile and governance metadata
```

---

## Brand Governance

Branding assets contained in this repository are centrally maintained by the AT Medical design and communications team to ensure consistent visual identity and legal protection of the AT Medical brand across all touchpoints.

**Assets must not be replaced, altered or redistributed without explicit approval from repository maintainers.**

All modifications to brand-critical assets — including logos, wordmarks, colour palettes and typography definitions — require formal review and sign-off by an authorised AT Medical maintainer before being merged into this repository.

---

## Usage Guidelines

- Assets must only be used in accordance with the official AT Medical Brand Guidelines (see `assets/brand-guidelines/`).
- Assets must not be modified in any way that alters their visual appearance, meaning or perceived identity.
- Assets may not be combined with third-party branding in a way that implies joint ownership or partnership without explicit written approval.
- Assets must not be used at sizes, resolutions or colour combinations that are inconsistent with the official brand guidelines.
- Always source assets directly from this repository to ensure you are using the most current, approved versions.

---

## Trademark Protection

**AT Medical®**, **AT Medical GmbH®** and all associated logos, wordmarks and branding elements contained in this repository are protected trademarks registered with the **German Patent and Trademark Office (Deutsches Patent- und Markenamt, DPMA)**.

The following names and visual identifiers are protected trademarks of AT Medical GmbH:

- AT Medical
- AT Medical GmbH
- AT Medical logos
- AT Medical wordmarks
- All associated branding elements contained in this repository

Unauthorised use, reproduction or imitation of these trademarks may constitute trademark infringement under **German and international trademark law**, including but not limited to the German Trademark Act (Markengesetz) and the EU Trade Mark Regulation (EUTMR).

The assets contained in this repository may not be used in any manner that implies endorsement, affiliation or partnership with AT Medical GmbH without explicit prior written permission.

---

## Copyright Notice

All graphical assets, design files and visual resources contained in this repository are protected works under **German and international copyright law**, including the German Copyright Act (Urheberrechtsgesetz, UrhG) and applicable EU directives.

**All assets are the exclusive intellectual property of AT Medical GmbH.**

Reproduction, modification, distribution or public display of these assets without explicit written permission from AT Medical GmbH may violate applicable copyright laws and may result in civil and/or criminal liability.

**All rights are reserved unless explicitly granted.**

---

## License and Usage Restrictions

This repository is proprietary. See the [`LICENSE`](./LICENSE) file at the root of this repository for the full terms.

The presence of assets in this public repository does not grant any licence — express or implied — to use the AT Medical trademarks, logos, wordmarks or any other branding elements for any purpose.

Explicit written permission must be obtained from **AT Medical GmbH** prior to any commercial or public use of the assets contained in this repository.

Permitted uses are limited to those expressly authorised in writing by AT Medical GmbH or as outlined in the official AT Medical Brand Guidelines.

---

## Contribution Policy

External contributors and internal team members may propose additional assets or improvements via pull requests. All contributions must adhere to the following requirements:

- Proposed assets must comply with the official AT Medical Brand Guidelines.
- Pull requests must include a clear description of the asset, its intended use case and the source/author.
- Brand-critical assets — including logos, wordmarks and primary colour palette definitions — require formal review and approval by authorised repository maintainers before merging.
- Contributors must confirm that submitted assets are original works or that appropriate rights have been obtained and that the submission does not infringe third-party intellectual property.
- Maintainers reserve the right to reject any contribution that does not meet brand standards or legal requirements.

---

## Contact

For trademark usage enquiries, licensing requests or permission to use AT Medical branding assets, please contact:

**AT Medical GmbH**
- **Email:** [trademark@at-medical.com](mailto:trademark@at-medical.com)
- **Website:** [https://at-medical.com](https://at-medical.com)

For general repository questions or contribution guidelines, please open an issue in this repository.

---

## Repository Governance

| Field | Value |
|---|---|
| Repository type | assets |
| Domain | assets, branding, logos |
| Visibility | public |
| Customer-facing | true |
| Deploy targets | Cloudflare R2, CDN |
| Primary team | @AT-Medical/infrastructure-team |
| Secondary teams | @AT-Medical/admin-team, @AT-Medical/devops-team, @AT-Medical/design-team |
| Review policy | required |

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
