#!/usr/bin/env bash
# =============================================================================
# AT Medical Enterprise Repository Self-Check Script
# Repository: ATMED-assets
# Version:    0.9.0
# =============================================================================
#
# This script verifies the structural completeness and consistency of the
# ATMED-assets repository against the AT Medical Enterprise Repository Standard.
#
# Usage:
#   bash scripts/validate/repository-selfcheck.sh
#
# Exit codes:
#   0 — All checks passed
#   1 — One or more checks failed
# =============================================================================

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

FAILED=0
WARNINGS=0

pass()    { echo "  ✓ $1"; }
fail()    { echo "  ✗ FAIL: $1"; FAILED=1; }
warn()    { echo "  ! WARN: $1"; WARNINGS=$(( WARNINGS + 1 )); }
section() { echo ""; echo "=== $1 ==="; }

# -----------------------------------------------------------------------------
section "Structure Completeness"
# -----------------------------------------------------------------------------

required_files=(
  "README.md"
  "LICENSE"
  "CONTRIBUTING.md"
  "SECURITY.md"
  "CODE_OF_CONDUCT.md"
  "CHANGELOG.md"
  ".github/dependabot.yml"
  "metadata/repository-profile.yml"
  "metadata/tags/taxonomy.yml"
  "metadata/tags/rules.yml"
  "metadata/tags/file-tags.yml"
)

for f in "${required_files[@]}"; do
  if [ -f "$f" ]; then
    pass "$f"
  else
    fail "$f is missing"
  fi
done

required_dirs=(
  ".github/workflows"
  "metadata/tags"
  "docs/architecture"
  "docs/governance"
  "docs/operations"
  "docs/deployment"
  "scripts/validate"
  "scripts/reporting"
  "scripts/cleanup"
  "assets/logos"
  "assets/wordmarks"
  "assets/icons"
  "assets/favicons"
  "assets/brand-guidelines"
  "artifacts/incoming"
  "artifacts/staged"
  "artifacts/releases"
  "status/generated"
  "templates/partials"
)

for d in "${required_dirs[@]}"; do
  if [ -d "$d" ]; then
    pass "$d/"
  else
    fail "$d/ is missing"
  fi
done

# -----------------------------------------------------------------------------
section "Workflow References"
# -----------------------------------------------------------------------------

required_workflows=(
  ".github/workflows/ci-validation.yml"
  ".github/workflows/governance-check.yml"
  ".github/workflows/tag-validation.yml"
  ".github/workflows/file-tagging.yml"
  ".github/workflows/dependency-check.yml"
  ".github/workflows/cleanup-weekly.yml"
  ".github/workflows/repository-selfcheck.yml"
)

for wf in "${required_workflows[@]}"; do
  if [ -f "$wf" ]; then
    pass "$wf"
  else
    fail "$wf is missing"
  fi
done

# -----------------------------------------------------------------------------
section "Script Executability"
# -----------------------------------------------------------------------------

while IFS= read -r -d '' script; do
  if [ -x "$script" ]; then
    pass "$script is executable"
  else
    warn "$script is not executable (run: chmod +x $script)"
  fi
done < <(find scripts -name "*.sh" -print0 2>/dev/null)

# -----------------------------------------------------------------------------
section "Metadata Presence and Validity"
# -----------------------------------------------------------------------------

if [ -f "metadata/repository-profile.yml" ]; then
  required_keys=(
    "repository_name"
    "repository_type"
    "visibility_class"
    "primary_team"
    "sensitivity_level"
    "lifecycle_state"
    "maintenance_level"
  )
  for key in "${required_keys[@]}"; do
    if grep -q "^${key}:" metadata/repository-profile.yml; then
      pass "repository-profile.yml: $key"
    else
      fail "repository-profile.yml missing key: $key"
    fi
  done
else
  fail "metadata/repository-profile.yml not found"
fi

# -----------------------------------------------------------------------------
section "Documentation Consistency"
# -----------------------------------------------------------------------------

docs_to_check=("README.md" "CONTRIBUTING.md" "SECURITY.md" "CODE_OF_CONDUCT.md" "CHANGELOG.md")
for doc in "${docs_to_check[@]}"; do
  if [ -f "$doc" ]; then
    if head -5 "$doc" | grep -q "^#"; then
      pass "$doc has a top-level heading"
    else
      warn "$doc does not start with a heading"
    fi
  else
    fail "$doc is missing"
  fi
done

# Check verification blocks in governance documents
governance_docs=("CONTRIBUTING.md" "SECURITY.md" "CODE_OF_CONDUCT.md" "CHANGELOG.md")
for doc in "${governance_docs[@]}"; do
  if [ -f "$doc" ]; then
    if grep -q "Version:" "$doc" && grep -q "Status: verified" "$doc"; then
      pass "$doc has verification block"
    else
      warn "$doc is missing the verification block"
    fi
  fi
done

# -----------------------------------------------------------------------------
section "Corporate Identity Check"
# -----------------------------------------------------------------------------

if [ -f "LICENSE" ]; then
  if grep -qi "AT Medical GmbH" LICENSE; then
    pass "LICENSE references AT Medical GmbH"
  else
    fail "LICENSE does not reference AT Medical GmbH"
  fi
fi

if [ -f "README.md" ]; then
  if grep -qi "AT Medical" README.md; then
    pass "README.md references AT Medical"
  else
    warn "README.md does not reference AT Medical"
  fi
fi

# Check for incorrect branding
incorrect_patterns=("AT-Medical GmbH" "ATMedical GmbH" "At Medical GmbH")
for doc in "README.md" "CONTRIBUTING.md" "SECURITY.md"; do
  if [ -f "$doc" ]; then
    for pattern in "${incorrect_patterns[@]}"; do
      if grep -q "$pattern" "$doc"; then
        fail "Incorrect branding '$pattern' found in $doc"
      fi
    done
  fi
done
pass "Corporate identity spelling check passed"

# -----------------------------------------------------------------------------
section "Secret Reference Consistency"
# -----------------------------------------------------------------------------

if grep -rE "(password|api_key|secret|token)\s*=\s*['\"][^'\"]{8,}" \
  --include="*.yml" --include="*.yaml" --include="*.sh" \
  --exclude-dir=".git" . 2>/dev/null | grep -v "secrets\." | grep -v "#" | grep -q .; then
  warn "Possible hardcoded credentials detected — please review"
else
  pass "No obvious hardcoded credentials detected"
fi

# -----------------------------------------------------------------------------
section "Summary"
# -----------------------------------------------------------------------------

echo ""
echo "Repository: ATMED-assets"
echo "Date:       $(date -u '+%Y-%m-%d %H:%M UTC')"
echo "Failures:   $FAILED"
echo "Warnings:   $WARNINGS"
echo ""

if [ "$FAILED" -gt 0 ]; then
  echo "RESULT: FAILED — $FAILED check(s) failed. See errors above."
  exit 1
else
  echo "RESULT: PASSED — All critical checks passed. $WARNINGS warning(s) noted."
  exit 0
fi
