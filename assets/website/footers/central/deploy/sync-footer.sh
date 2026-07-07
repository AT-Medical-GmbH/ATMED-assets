#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Push the central footer to the gateway so it is served same-origin under
# /_atmed/footer/ on every Traefik-fronted domain.
#
# Idempotent. Run from ATINFRA-control (SSH alias ATINFRA-gateway) or on the
# gateway itself. No secrets. After sync the nginx mount picks up files
# immediately (read-only bind mount); no container restart needed.
#
# Usage:
#   ./sync-footer.sh                 # rsync to the gateway path
#   TARGET=user@host:/path ./sync-footer.sh
# ---------------------------------------------------------------------------
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$(cd "${HERE}/.." && pwd)/"                     # the central/ directory
GATEWAY_ALIAS="${GATEWAY_ALIAS:-ATINFRA-gateway}"
GATEWAY_PATH="${GATEWAY_PATH:-/srv/atmed-gateway/footer/central}"
TARGET="${TARGET:-${GATEWAY_ALIAS}:${GATEWAY_PATH}}"

echo "==> Source : ${SRC}"
echo "==> Target : ${TARGET}"

# Only ship the servable artefacts (not deploy/ or docs noise).
rsync -az --delete \
  --include='footer.js' --include='footer.css' --include='footer.html' \
  --include='links.json' --include='VERSION' \
  --exclude='*' \
  -e "ssh -o BatchMode=yes -o ConnectTimeout=8" \
  "${SRC}" "${TARGET}/"

echo "==> Done. Verify same-origin delivery, e.g.:"
echo "    curl -skI https://login.at-medical.de/_atmed/footer/footer.js | head -n1"
echo "    curl -sk  https://login.at-medical.de/_atmed/footer/links.json | head -c 120"
