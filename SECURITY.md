# Security Policy — ATMED-assets

## AT Medical GmbH — Repository Security Policy

This document defines the security policy for the **ATMED-assets** repository. If you believe you have discovered a security vulnerability or a misuse of proprietary assets, please follow the process described below.

---

## Supported Versions

This repository does not contain executable software. It is a brand asset repository.

| Repository Version | Status      |
|--------------------|-------------|
| main               | Active      |
| All other branches | Unsupported |

---

## What to Report

Although this repository does not contain application code, the following types of issues should be reported via the security disclosure process:

- Unauthorised or leaked proprietary assets discovered in a third-party location that were sourced from this repository
- Exposed credentials, secrets or sensitive configuration files accidentally committed to this repository
- Vulnerabilities in the CI/CD workflows or GitHub Actions that could be exploited to publish unauthorised changes
- Evidence of tampering with official AT Medical brand assets within this repository
- Any issue that could compromise the integrity or authenticity of AT Medical brand assets

---

## Reporting a Vulnerability

**Do not open a public GitHub issue to report a security concern.**

Please report security issues by contacting AT Medical GmbH directly:

- **Email:** [security@at-medical.com](mailto:security@at-medical.com)
- **Subject line:** `[SECURITY] ATMED-assets — <brief description>`

Include the following in your report:

1. A description of the issue
2. Steps to reproduce or evidence of the problem
3. The potential impact of the issue
4. Your contact information for follow-up

---

## Response Process

AT Medical GmbH will:

1. Acknowledge receipt of your report within **5 business days**.
2. Investigate the report and determine the severity and impact.
3. Take appropriate remediation action where required.
4. Notify you of the outcome once the issue has been resolved or determined to be out of scope.

We ask that you treat all security communications with confidentiality until AT Medical GmbH has had the opportunity to respond and remediate.

---

## Responsible Disclosure

AT Medical GmbH supports responsible disclosure. We ask that:

- You give us reasonable time to investigate and resolve issues before any public disclosure.
- You do not exploit any vulnerability beyond what is necessary to demonstrate the issue.
- You do not access, modify or delete data that does not belong to you.

Reporters who act in good faith and contact us privately will receive acknowledgement and be kept informed of resolution progress. We do not pursue legal action against good-faith security reporters.

---

## Scope

This security policy applies to:

- All assets hosted in this repository (logos, icons, wordmarks, branding elements, favicons, illustrations, templates, badges, diagrams)
- The repository configuration, metadata and CI/CD workflow definitions
- Any CDN or R2 deployment serving assets from this repository

---

## Asset Integrity

All assets in this repository are governed by automated integrity checks executed on every push and pull request. Any change to an existing asset in `assets/logos/` or `assets/wordmarks/` triggers a mandatory review by the AT Medical infrastructure team and design team before merging.

---

## Contact

**AT Medical GmbH**
- Email: [security@at-medical.com](mailto:security@at-medical.com)
- General enquiries: [trademark@at-medical.com](mailto:trademark@at-medical.com)
- Website: [https://at-medical.com](https://at-medical.com)

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
