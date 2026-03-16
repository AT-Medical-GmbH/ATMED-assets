# Governance — ATMED-assets

## AT Medical GmbH — Repository Governance Model

This document defines the governance model, access controls, review policies and branch strategy for the **ATMED-assets** repository.

---

## Governance Principles

1. **Single source of truth** — This repository is the sole authoritative source for AT Medical brand assets. No other location may serve as the primary source.
2. **Controlled access** — Write access is restricted to authorised AT Medical team members and approved contractors.
3. **Mandatory review** — All changes to brand-critical assets require at least one approval from an authorised maintainer.
4. **Audit trail** — All changes are tracked through Git history and pull request records.
5. **Automated validation** — CI workflows validate structural and governance compliance on every pull request and push.

---

## Branch Strategy

| Branch pattern  | Purpose                                    | Protected |
|-----------------|---------------------------------------------|-----------|
| `main`          | Production-ready, approved assets           | Yes       |
| `develop`       | Integration branch for staged changes       | Yes       |
| `feature/*`     | New asset additions or improvements         | No        |
| `fix/*`         | Corrections to existing assets              | No        |
| `hotfix/*`      | Urgent fixes to production assets           | No        |
| `release/*`     | Release preparation branches                | No        |
| `copilot/*`     | Automation and tooling branches             | No        |

### Branch Protection Rules (main)

- Require pull request before merging
- Require at least 1 approving review
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass before merging:
  - `CI Validation / Repository Structure Validation`
  - `Governance Check / Governance and Corporate Identity Compliance`
  - `Tag Validation / Tag Taxonomy Validation`

---

## Access Control

| Role                    | Permissions                              |
|-------------------------|------------------------------------------|
| AT Medical Maintainers  | Admin — approve merges, manage settings  |
| AT Medical Team Members | Write — create branches, open PRs        |
| Approved Contractors    | Write — limited scope per engagement     |
| External Contributors   | Fork and PR only — no direct write access |

---

## Review Policy

- **Brand-critical assets** (logos, wordmarks, primary colour palette definitions): Mandatory review by an authorised AT Medical maintainer.
- **Supporting assets** (illustrations, social media, presentations): Review recommended, one approval required.
- **Documentation and metadata**: Review recommended, one approval required.
- **Automation and workflow changes**: Mandatory review by the infrastructure team.

---

## Tagging and Metadata

All repository-level and file-level governance metadata is maintained in:

- `metadata/repository-profile.yml` — canonical repository profile
- `metadata/tags/taxonomy.yml` — tag dimension taxonomy
- `metadata/tags/rules.yml` — tag enforcement rules
- `metadata/tags/file-tags.yml` — per-path file tagging registry

Tag validation is enforced automatically by the `tag-validation.yml` and `file-tagging.yml` workflows.

---

## Compliance Workflows

| Workflow                    | Trigger               | Purpose                                  |
|-----------------------------|-----------------------|------------------------------------------|
| `ci-validation.yml`         | PR, push              | Structure and content validation          |
| `governance-check.yml`      | PR, push              | Corporate identity and documentation check |
| `tag-validation.yml`        | PR, push (metadata/)  | Tag taxonomy validation                  |
| `file-tagging.yml`          | PR, push              | File tag consistency                     |
| `dependency-check.yml`      | Push, schedule        | Action and dependency audit              |
| `cleanup-weekly.yml`        | Schedule (weekly)     | Repository maintenance checks            |
| `repository-selfcheck.yml`  | Push, schedule        | Full repository health check             |

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
