#!/usr/bin/env node
/*
 * ATMED Global Footer build.
 * Reads src/footer.config.json + src/footer.template.html and produces the
 * deliverable artifacts in dist/. Zero runtime dependencies (Node >= 18).
 *
 *   node scripts/build-footer.mjs            # build
 *   node scripts/build-footer.mjs --check    # validate only, write nothing
 *
 * Exits non-zero on invalid configuration or broken links.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src");
const DIST = join(ROOT, "dist");
const CHECK_ONLY = process.argv.includes("--check");

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---- load --------------------------------------------------------------
let config;
try {
  config = JSON.parse(readFileSync(join(SRC, "footer.config.json"), "utf8"));
} catch (e) {
  console.error("FATAL: cannot read/parse src/footer.config.json:", e.message);
  process.exit(2);
}
const template = readFileSync(join(SRC, "footer.template.html"), "utf8");
const loaderSrc = readFileSync(join(SRC, "footer-loader.js"), "utf8");
const css = readFileSync(join(SRC, "footer.css"), "utf8");

// ---- validate ----------------------------------------------------------
if (!config.company || !config.company.legalName) fail("company.legalName is required");
if (!config.company || !config.company.displayName) fail("company.displayName is required");
if (!config.copyright || !config.copyright.line) fail("copyright.line is required");
if (!config.copyright || !config.copyright.rights) fail("copyright.rights is required");
if (!Array.isArray(config.linkGroups) || config.linkGroups.length === 0) {
  fail("linkGroups must be a non-empty array");
}

const ALLOWED_AUDIENCE = ["public", "internal", "admin"];
const seenIds = new Set();
let linkCount = 0;
for (const g of config.linkGroups || []) {
  if (!g.id) fail("link group missing id");
  if (seenIds.has(g.id)) fail(`duplicate link group id: ${g.id}`);
  seenIds.add(g.id);
  if (!ALLOWED_AUDIENCE.includes(g.audience)) {
    fail(`link group ${g.id}: invalid audience '${g.audience}'`);
  }
  if (!Array.isArray(g.links) || g.links.length === 0) {
    fail(`link group ${g.id}: links must be non-empty`);
  }
  for (const l of g.links || []) {
    linkCount++;
    if (!l.label) fail(`link group ${g.id}: a link is missing a label`);
    if (!l.href) { fail(`link group ${g.id}: link '${l.label}' has no href`); continue; }
    const href = String(l.href);
    if (/^javascript:/i.test(href)) fail(`link '${l.label}': javascript: scheme not allowed`);
    else if (/^http:\/\//i.test(href)) warn(`link '${l.label}': insecure http:// (prefer https://)`);
    else if (!/^(https:\/\/|mailto:|tel:|\/|#)/.test(href)) {
      warn(`link '${l.label}': unusual href '${href}'`);
    }
  }
}

if (errors.length) {
  console.error("Footer build FAILED - invalid configuration:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

// ---- render helpers ----------------------------------------------------
function renderLogo(company) {
  if (!company.logo || config.options?.showLogo === false) return "";
  const l = company.logo;
  const w = l.width ? ` width="${esc(l.width)}"` : "";
  return `<img class="atmed-footer__logo" src="${esc(l.src)}" alt="${esc(l.alt)}"${w} loading="lazy" decoding="async">`;
}

function renderGroups(groups) {
  return groups
    .map((g) => {
      const items = g.links
        .map((l) => {
          const rel = l.rel ? ` rel="${esc(l.rel)}"` : "";
          const ext = /^https?:\/\//i.test(l.href) && !l.href.includes("at-medical.de")
            ? ' target="_blank" rel="noopener noreferrer"'
            : "";
          return `        <li><a class="atmed-footer__link" href="${esc(l.href)}"${rel}${ext}>${esc(l.label)}</a></li>`;
        })
        .join("\n");
      return `      <div class="atmed-footer__group" data-group="${esc(g.id)}">
        <h2 class="atmed-footer__group-title">${esc(g.title)}</h2>
        <ul class="atmed-footer__list">
${items}
        </ul>
      </div>`;
    })
    .join("\n");
}

function renderSocial(social) {
  if (!Array.isArray(social) || social.length === 0) return "";
  const items = social
    .map(
      (s) =>
        `<a href="${esc(s.href)}" aria-label="${esc(s.label)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`
    )
    .join("");
  return `<div class="atmed-footer__social">${items}</div>`;
}

function buildHtml(variant) {
  const groups =
    variant === "internal"
      ? config.linkGroups
      : config.linkGroups.filter((g) => g.audience === "public");
  return template
    .replace(/{{VERSION}}/g, version)
    .replace(/{{VARIANT}}/g, variant)
    .replace("{{LOGO}}", renderLogo(config.company))
    .replace(
      "{{COMPANY_CLAIM}}",
      config.options?.showClaim === false ? "" : esc(config.company.claim || "")
    )
    .replace("{{LINK_GROUPS}}", renderGroups(groups))
    .replace("{{COPYRIGHT_LINE}}", esc(config.copyright.line))
    .replace("{{COPYRIGHT_RIGHTS}}", esc(config.copyright.rights))
    .replace("{{SOCIAL}}", renderSocial(config.social))
    // strip the leading comment block from the template output
    .replace(/^<!--[\s\S]*?-->\s*/, "");
}

// ---- version -----------------------------------------------------------
const contentHash = createHash("sha256")
  .update(JSON.stringify(config) + template + css)
  .digest("hex")
  .slice(0, 12);
const now = new Date();
const buildDate = now.toISOString();
const version = `${config.meta?.configVersion || "0.0.0"}+${buildDate.slice(0, 10)}.${contentHash}`;

// ---- emit --------------------------------------------------------------
const publicHtml = buildHtml("public");
const internalHtml = buildHtml("internal");

if (CHECK_ONLY) {
  console.log(`Footer config OK (${config.linkGroups.length} groups, ${linkCount} links).`);
  if (warnings.length) {
    console.log("Warnings:");
    for (const w of warnings) console.log("  - " + w);
  }
  process.exit(0);
}

mkdirSync(DIST, { recursive: true });
writeFileSync(join(DIST, "footer.html"), publicHtml + "\n");
writeFileSync(join(DIST, "footer.internal.html"), internalHtml + "\n");
copyFileSync(join(SRC, "footer.css"), join(DIST, "footer.css"));

// machine-readable content
writeFileSync(
  join(DIST, "footer.json"),
  JSON.stringify({ version, generatedAt: buildDate, config }, null, 2) + "\n"
);

// loader with version + fallback baked in (fallback = public footer)
const loaderOut = loaderSrc
  .replace(/{{VERSION}}/g, version)
  .replace(/{{DEFAULT_BASE}}/g, "https://assets.at-medical.de/footer")
  .replace("{{FALLBACK_HTML}}", JSON.stringify(publicHtml));
writeFileSync(join(DIST, "footer-loader.js"), loaderOut);

// version manifest
writeFileSync(
  join(DIST, "footer.version.json"),
  JSON.stringify(
    {
      name: "atmed-global-footer",
      version,
      configVersion: config.meta?.configVersion || "0.0.0",
      environment: config.meta?.environment || "production",
      contentHash,
      buildDate,
      artifacts: [
        "footer.html",
        "footer.internal.html",
        "footer.css",
        "footer-loader.js",
        "footer.json",
      ],
    },
    null,
    2
  ) + "\n"
);

console.log(`Footer built: version ${version}`);
console.log(`  dist/footer.html            (${publicHtml.length} bytes, public)`);
console.log(`  dist/footer.internal.html   (${internalHtml.length} bytes, public+internal)`);
console.log(`  dist/footer.css, footer-loader.js, footer.json, footer.version.json`);
if (warnings.length) {
  console.log("Warnings:");
  for (const w of warnings) console.log("  - " + w);
}
