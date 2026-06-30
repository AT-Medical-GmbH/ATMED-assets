#!/usr/bin/env node
/*
 * ATMED Global Footer deploy (hybrid model).
 * Copies the built dist/ artifacts into a target system's local vendor
 * directory and appends an entry to docs/deploy-log.json so every rollout
 * is auditable. Targets keep a LOCAL copy (no runtime dependency on a
 * central endpoint); re-running this script re-syncs them.
 *
 *   node scripts/deploy-footer.mjs --target <dir> [--system <name>] [--only <glob>]
 *
 * Example:
 *   node scripts/deploy-footer.mjs \
 *     --target ../../../DIG-backup-control-center/app/static/atmed-footer \
 *     --system backup-control-center
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const LOG = join(ROOT, "docs", "deploy-log.json");

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const target = arg("--target");
const system = arg("--system", "unspecified");
if (!target) {
  console.error("Usage: deploy-footer.mjs --target <dir> [--system <name>]");
  process.exit(2);
}
if (!existsSync(join(DIST, "footer.version.json"))) {
  console.error("dist/ not built. Run: node scripts/build-footer.mjs");
  process.exit(1);
}

const version = JSON.parse(readFileSync(join(DIST, "footer.version.json"), "utf8"));
const targetAbs = resolve(process.cwd(), target);
mkdirSync(targetAbs, { recursive: true });

const files = readdirSync(DIST);
for (const f of files) copyFileSync(join(DIST, f), join(targetAbs, f));

// vendor marker so consumers know not to hand-edit
writeFileSync(
  join(targetAbs, "ATMED-FOOTER-VENDORED.txt"),
  [
    "DO NOT EDIT. Vendored copy of the central ATMED footer.",
    "Source: ATMED-assets/shared/atmed-footer (run build + deploy to update).",
    `Version: ${version.version}`,
    `Synced:  ${new Date().toISOString()}`,
    `System:  ${system}`,
    "",
  ].join("\n")
);

let log = [];
try { log = JSON.parse(readFileSync(LOG, "utf8")); } catch { /* first run */ }
log.push({
  system,
  target: target,
  version: version.version,
  contentHash: version.contentHash,
  deployedAt: new Date().toISOString(),
});
mkdirSync(dirname(LOG), { recursive: true });
writeFileSync(LOG, JSON.stringify(log, null, 2) + "\n");

console.log(`Deployed footer ${version.version} -> ${target} (system: ${system})`);
console.log(`Logged to docs/deploy-log.json (${log.length} entries).`);
