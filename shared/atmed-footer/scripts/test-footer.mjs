#!/usr/bin/env node
/*
 * ATMED Global Footer smoke tests (zero dependencies).
 * Validates the built artifacts in dist/. Run after build-footer.mjs.
 *   node scripts/test-footer.mjs
 * Exits non-zero on the first failed assertion.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");

let passed = 0;
const failures = [];
function ok(name, cond) {
  if (cond) { passed++; }
  else { failures.push(name); }
}

const required = [
  "footer.html",
  "footer.internal.html",
  "footer.css",
  "footer-loader.js",
  "footer.json",
  "footer.version.json",
];
for (const f of required) ok(`artifact exists: ${f}`, existsSync(join(DIST, f)));

if (failures.length === 0) {
  const pub = readFileSync(join(DIST, "footer.html"), "utf8");
  const intl = readFileSync(join(DIST, "footer.internal.html"), "utf8");
  const css = readFileSync(join(DIST, "footer.css"), "utf8");
  const loader = readFileSync(join(DIST, "footer-loader.js"), "utf8");
  const version = JSON.parse(readFileSync(join(DIST, "footer.version.json"), "utf8"));

  // Structural / a11y
  ok("public: semantic <footer>", /<footer[\s>]/.test(pub));
  ok("public: contentinfo role", /role="contentinfo"/.test(pub));
  ok("public: exactly one footer element", (pub.match(/<footer[\s>]/g) || []).length === 1);
  ok("public: has aria-label", /aria-label=/.test(pub));

  // Legal links present (compliance-critical)
  for (const must of ["impressum", "datenschutz", "agb", "kontakt"]) {
    ok(`public: contains legal link '${must}'`, pub.toLowerCase().includes(must));
  }
  ok("public: copyright present", /Copyright/i.test(pub));

  // Variant separation: internal-only links must NOT leak into public footer
  ok("public: no internal Control Center links", !/Control Center/.test(pub));
  ok("internal: contains Control Center links", /Control Center/.test(intl));

  // Security: no inline event handlers, no javascript: URLs, no <script> in markup
  ok("public: no inline on* handlers", !/\son\w+=/.test(pub));
  ok("public: no javascript: urls", !/javascript:/i.test(pub));
  ok("public: no <script> in footer markup", !/<script/i.test(pub));

  // No unresolved template tokens
  ok("public: no leftover {{tokens}}", !/{{[A-Z_]+}}/.test(pub));
  ok("loader: no leftover {{tokens}}", !/{{[A-Z_]+}}/.test(loader));

  // Loader: no eval-like constructs, fallback baked in, version stamped
  ok("loader: no eval/new Function", !/\beval\s*\(|new\s+Function\s*\(/.test(loader));
  ok("loader: fallback footer baked in", loader.includes('class=\\"atmed-footer\\"'));
  ok("loader: version stamped", loader.includes(version.version));

  // CSS scoped under .atmed-footer
  ok("css: scoped to .atmed-footer", css.includes(".atmed-footer"));
  ok("css: defines dark-mode override", /prefers-color-scheme: dark/.test(css));

  // Version manifest sanity
  ok("version: has version string", typeof version.version === "string" && version.version.length > 0);
}

console.log(`\nATMED footer tests: ${passed} passed, ${failures.length} failed.`);
if (failures.length) {
  for (const f of failures) console.error("  FAIL: " + f);
  process.exit(1);
}
console.log("All footer smoke tests passed.");
