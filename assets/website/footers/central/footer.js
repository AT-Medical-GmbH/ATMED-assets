/* =========================================================================
 * AT Medical — Central Footer Loader
 * -------------------------------------------------------------------------
 * ONE footer, managed centrally, linked into every surface. Include once:
 *
 *   <script src="https://<same-origin>/_atmed/footer/footer.js" defer></script>
 *
 * The script derives its own base URL, fetches links.json from the same
 * directory, and injects a scoped <style> + <footer> into the page. Editing
 * links.json (or this file's styling) updates all surfaces at once.
 *
 * Mount point (optional): an element with [data-atmed-footer] receives the
 * footer; otherwise it is appended to <body>. Idempotent: never double-injects.
 *
 * No dependencies. Works standalone; if links.json cannot be fetched it falls
 * back to the embedded data below so the footer still renders.
 * ========================================================================= */
(function () {
  "use strict";
  if (window.__atmedFooterLoaded) return;
  window.__atmedFooterLoaded = true;

  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/[^/]*$/, "") : "";

  var FALLBACK = {
    brand: {
      logo: "https://raw.githubusercontent.com/AT-Medical/ATMED-assets/main/assets/logos/svg/logo.svg",
      name: "AT Medical GmbH",
      tagline: "Enterprise Medical Education & Clinical Intelligence"
    },
    legal: [
      { label: "Impressum", href: "https://www.at-medical.de/impressum" },
      { label: "AGB", href: "https://www.at-medical.de/legal/agb" },
      { label: "Datenschutz", href: "https://www.at-medical.de/legal/datenschutz" },
      { label: "Widerruf", href: "https://www.at-medical.de/legal/widerruf" },
      { label: "Sicherheit", href: "https://www.at-medical.de/it-security" },
      { label: "Barrierefreiheit", href: "https://www.at-medical.de/legal/barrierefreiheit" },
      { label: "Code of Conduct", href: "https://www.at-medical.de/code-of-conduct" },
      { label: "Lieferkettenschutzgesetz", href: "https://www.at-medical.de/legal/lieferkettenschutzgesetz" },
      { label: "Kontakt", href: "https://www.at-medical.de/kontakt" }
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/at-medical", icon: "linkedin" },
      { label: "Instagram", href: "https://www.instagram.com/at.medical", icon: "instagram" },
      { label: "Xing", href: "https://www.xing.com/companies/atmedical", icon: "xing" },
      { label: "YouTube", href: "https://www.youtube.com/@at-medical", icon: "youtube" }
    ],
    copyright_html: "&copy; Copyright 2017 &ndash; 2026 | <strong>AT Medical GmbH&reg;</strong><br>Alle Rechte vorbehalten | All Rights reserved",
    contact_email: "Info@at-medical.de"
  };

  // Inline social SVG paths (no external requests).
  var ICONS = {
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    xing: "M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.077.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.264.22.476.22h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.649-.962-.649H3.648v.02z",
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  };

  var CSS = [
    ".atmed-footer{background:#111827;color:#d1d5db;font-size:.875rem;margin-top:auto;font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif}",
    ".atmed-footer *{box-sizing:border-box}",
    ".atmed-footer .af-inner{max-width:1100px;margin:0 auto;padding:2.5rem 1.5rem 1.5rem}",
    ".atmed-footer .af-top{display:grid;grid-template-columns:1fr 2fr 1fr;gap:2rem;padding-bottom:2rem;border-bottom:1px solid rgba(255,255,255,.08);align-items:start}",
    ".atmed-footer .af-brand img{height:36px;filter:brightness(0) invert(1);opacity:.9;margin-bottom:.75rem}",
    ".atmed-footer .af-brand p{font-size:.8125rem;color:#9ca3af;line-height:1.6;margin:0}",
    ".atmed-footer .af-nav{display:flex;flex-wrap:wrap;gap:.375rem 1.25rem;align-items:flex-start}",
    ".atmed-footer .af-nav a{color:#9ca3af;font-size:.8125rem;text-decoration:none;transition:color .2s ease}",
    ".atmed-footer .af-nav a:hover,.atmed-footer .af-nav a:focus-visible{color:#fff;text-decoration:underline}",
    ".atmed-footer .af-social{display:flex;gap:.75rem;justify-content:flex-end;flex-wrap:wrap}",
    ".atmed-footer .af-social a{display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,.06);border-radius:6px;color:#9ca3af;transition:background .2s ease,color .2s ease}",
    ".atmed-footer .af-social a:hover,.atmed-footer .af-social a:focus-visible{background:#0a7ea4;color:#fff}",
    ".atmed-footer .af-social svg{width:18px;height:18px;display:block;pointer-events:none}",
    ".atmed-footer .af-bottom{padding-top:1.25rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem}",
    ".atmed-footer .af-copy{font-size:.8125rem;color:#9ca3af;line-height:1.7}",
    ".atmed-footer .af-copy a{color:#9ca3af}.atmed-footer .af-copy a:hover{color:#fff}",
    ".atmed-footer .af-ver{font-size:.75rem;color:rgba(156,163,175,.65);text-align:right;line-height:1.7}",
    "@media(max-width:720px){.atmed-footer .af-top{grid-template-columns:1fr;gap:1.5rem}.atmed-footer .af-social{justify-content:flex-start}.atmed-footer .af-bottom{flex-direction:column}.atmed-footer .af-ver{text-align:left}}"
  ].join("");

  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }

  function render(data) {
    if (document.querySelector(".atmed-footer")) return; // idempotent

    var style = document.createElement("style");
    style.setAttribute("data-atmed-footer-style", "");
    style.textContent = CSS;
    document.head.appendChild(style);

    var legal = (data.legal || []).map(function (l) {
      return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>";
    }).join("");

    var social = (data.social || []).map(function (s) {
      var p = ICONS[s.icon] || "";
      return '<a href="' + esc(s.href) + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        esc(s.label) + '"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' +
        p + '"/></svg></a>';
    }).join("");

    var b = data.brand || {};
    var html =
      '<div class="af-inner">' +
        '<div class="af-top">' +
          '<div class="af-brand">' +
            (b.logo ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name || "AT Medical") + ' Logo" width="140" height="36">' : "") +
            "<p>" + esc(b.name) + "<br>" + esc(b.tagline) + "</p>" +
          "</div>" +
          '<nav class="af-nav" aria-label="Rechtliche Links">' + legal + "</nav>" +
          '<div class="af-social" aria-label="Soziale Netzwerke">' + social + "</div>" +
        "</div>" +
        '<div class="af-bottom">' +
          '<div class="af-copy">' + (data.copyright_html || "") +
            (data.contact_email ? '<br><a href="mailto:' + esc(data.contact_email) + '">' + esc(data.contact_email) + "</a>" : "") +
          "</div>" +
          '<div class="af-ver">AT Medical Identity &middot; Login Portal</div>' +
        "</div>" +
      "</div>";

    var footer = document.createElement("footer");
    footer.className = "atmed-footer";
    footer.setAttribute("role", "contentinfo");
    footer.innerHTML = html;

    var mount = document.querySelector("[data-atmed-footer]") || document.body;
    mount.appendChild(footer);
  }

  function boot() {
    if (!base || typeof fetch !== "function") { render(FALLBACK); return; }
    fetch(base + "links.json", { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (d) { render(d); })
      .catch(function () { render(FALLBACK); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
