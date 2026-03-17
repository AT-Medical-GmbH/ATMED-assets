# Operations — ATMED-assets

## AT Medical GmbH — Operational Documentation

This document covers the operational procedures for the **ATMED-assets** repository, including asset management, routine maintenance, incident response and repository health monitoring.

---

## Routine Operations

### Adding New Assets

1. Create a feature branch: `git checkout -b feature/<asset-type>-<description>`
2. Add the asset file(s) to the appropriate directory under `assets/`
3. Update the directory `README.md` if required
4. Update `metadata/tags/file-tags.yml` if a new asset path is introduced
5. Submit a pull request with a clear description of the asset and its intended use
6. Await review and approval from an authorised maintainer

### Updating Existing Assets

1. Create a fix branch: `git checkout -b fix/<asset-type>-<description>`
2. Replace or update the asset file(s) in the appropriate directory
3. Submit a pull request describing the change and the reason for the update
4. Await review from an authorised maintainer (mandatory for brand-critical assets)

### Releasing Assets

1. Stage approved assets in `artifacts/staged/`
2. Create a release branch: `git checkout -b release/<version>`
3. Update `CHANGELOG.md` with the release notes
4. Merge to `main` after approval
5. Tag the release: `git tag -a v<version> -m "Release v<version>"`
6. Move released assets to `artifacts/releases/`

---

## CI/CD Monitoring

All CI workflow results are visible in the GitHub Actions tab. The following workflows run on every pull request and push to `main`:

| Workflow                    | Purpose                                  |
|-----------------------------|------------------------------------------|
| `ci-validation.yml`         | Structure and content validation          |
| `governance-check.yml`      | Corporate identity compliance             |
| `tag-validation.yml`        | Tag taxonomy validation                  |
| `file-tagging.yml`          | File tag consistency                     |

Scheduled workflows run automatically:

| Workflow                    | Schedule          |
|-----------------------------|-------------------|
| `cleanup-weekly.yml`        | Sundays at 02:00 UTC |
| `dependency-check.yml`      | Mondays at 08:00 UTC |
| `repository-selfcheck.yml`  | Mondays at 06:00 UTC |

---

## Repository Health Checks

To run the repository self-check script manually:

```bash
bash scripts/validate/repository-selfcheck.sh
```

This script validates:

- Required file and directory presence
- Workflow file completeness
- Script executability
- Metadata key presence
- Documentation structure
- Corporate identity compliance
- Secret reference consistency

---

## Incident Response

### Unauthorised Asset Modification

1. Identify the commit containing the unauthorised change via `git log`
2. Notify the AT Medical infrastructure team immediately
3. Revert the change: `git revert <commit-sha>`
4. Submit a hotfix pull request for urgent merge
5. Document the incident in the issue tracker

### Corrupted Asset File

1. Identify the last known-good version via `git log -- assets/path/to/file`
2. Restore the file: `git checkout <good-commit> -- assets/path/to/file`
3. Submit a fix pull request

### CI Workflow Failure

1. Check the GitHub Actions tab for the failing workflow
2. Review the step output for the error message
3. Fix the identified issue in a feature or fix branch
4. Verify the fix locally using `bash scripts/validate/repository-selfcheck.sh`
5. Submit a pull request

---

## Contact

For operational issues or incident escalation:

**AT Medical GmbH**
- Email: [trademark@at-medical.com](mailto:trademark@at-medical.com)
- Website: [https://at-medical.com](https://at-medical.com)

---

<sub style="color: grey; padding-left: 1em; border-left: 3px solid #ccc; display: block;">
Version: 0.9.0 &nbsp;|&nbsp; Date: 2026-03-16 &nbsp;|&nbsp; Status: verified &nbsp;|&nbsp; Repository: ATMED-assets
</sub>

---

*© AT Medical GmbH. All rights reserved.*
