/*
 * ATMED Global Footer loader.
 * Centrally maintained: ATMED-assets/shared/atmed-footer/src/footer-loader.js
 *
 * Usage on any HTML page:
 *   <div id="atmed-global-footer"
 *        data-atmed-base="https://assets.at-medical.de/footer"
 *        data-atmed-variant="public"   (public | internal)
 *        data-atmed-theme="auto"       (auto | light | dark)
 *        data-atmed-compact="false"></div>
 *   <script src="https://assets.at-medical.de/footer/footer-loader.js" defer></script>
 *
 * Security/robustness:
 *   - No eval / new Function. DOM is built from trusted same-origin/CDN assets only.
 *   - On any load failure a baked-in legal fallback footer is rendered so the
 *     page never breaks. Errors go to console only (optional admin hint for
 *     internal variant), never to normal users.
 *   - CSP-friendly: needs `connect-src` + `style-src` for the configured base.
 */
(function () {
  "use strict";

  var VERSION = "1.1.0+2026-07-04.f78b21cd4027";
  var DEFAULT_BASE = "https://assets.at-medical.de/footer";

  // Baked-in fallback - kept in sync with dist by the build step.
  var FALLBACK_HTML = "<footer class=\"atmed-footer\" role=\"contentinfo\" aria-label=\"AT Medical Footer\" data-atmed-footer-version=\"1.1.0+2026-07-04.f78b21cd4027\" data-atmed-footer-variant=\"public\">\n  <div class=\"atmed-footer__inner\">\n    <div class=\"atmed-footer__brand\">\n      <img class=\"atmed-footer__logo\" src=\"https://raw.githubusercontent.com/AT-Medical/ATMED-assets/main/assets/logos/svg/logo.svg\" alt=\"AT Medical GmbH®\" width=\"140\" loading=\"lazy\" decoding=\"async\">\n      <p class=\"atmed-footer__claim\">AT Medical GmbH® entwickelt Lösungen in den Bereichen medizinische Bildung, digitale Infrastruktur, Patientensicherheit und klinische Innovation.</p>\n    </div>\n    <nav class=\"atmed-footer__nav\" aria-label=\"Footer-Navigation\">\n            <div class=\"atmed-footer__group\" data-group=\"leistungen\">\n        <h2 class=\"atmed-footer__group-title\">Leistungen</h2>\n        <ul class=\"atmed-footer__list\">\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/akademie/\">Akademie</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/digitale-loesungen/\">Digitale Lösungen</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/patientensicherheit/\">Patientensicherheit</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/forschung-entwicklung/\">Forschung &amp; Entwicklung</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/medical-services/\">Medical Services</a></li>\n        </ul>\n      </div>\n      <div class=\"atmed-footer__group\" data-group=\"unternehmen\">\n        <h2 class=\"atmed-footer__group-title\">Unternehmen</h2>\n        <ul class=\"atmed-footer__list\">\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/ueber-at-medical/\">Über uns</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/ueber-at-medical/team-netzwerk/\">Team &amp; Netzwerk</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/verantwortung/\">Verantwortung</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/kontakt/\">Kontakt</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/presse/\">Presse</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/faq/\">FAQ</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/feedback/\">Feedback</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/sitemap/\">Sitemap</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://status.at-medical.de\" rel=\"noopener\">Systemstatus</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/at-digital-systems-gmbh/\">AT Digital Systems GmbH</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/tremml-kopp-holding/\">Tremml &amp; Kopp Holding GmbH &amp; Co. KG</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/newsletter/\">Newsletter</a></li>\n        </ul>\n      </div>\n      <div class=\"atmed-footer__group\" data-group=\"rechtliches\">\n        <h2 class=\"atmed-footer__group-title\">Rechtliches</h2>\n        <ul class=\"atmed-footer__list\">\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/impressum/\">Impressum</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/datenschutz/\">Datenschutz (DSGVO)</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/agb/\">Allgemeine Geschäftsbedingungen (AGB)</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/widerruf/\">Widerruf</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/sicherheit/\">Sicherheit</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/barrierefreiheit/\">Barrierefreiheit</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/nutzungsbedingungen/\">Nutzungsbedingungen</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/code-of-conduct/\">Code of Conduct</a></li>\n        <li><a class=\"atmed-footer__link\" href=\"https://at-medical.de/de/lieferkettenschutzgesetz/\">Lieferkettenschutzgesetz</a></li>\n        </ul>\n      </div>\n    </nav>\n  </div>\n  <div class=\"atmed-footer__bar\">\n    <p class=\"atmed-footer__copyright\">\n      <span>© Copyright 2017 – 2026 | AT Medical GmbH®</span>\n      <span class=\"atmed-footer__rights\">Alle Rechte vorbehalten | All rights reserved</span>\n    </p>\n    <div class=\"atmed-footer__social\"><a href=\"https://www.linkedin.com/company/at-medical\" aria-label=\"LinkedIn\" target=\"_blank\" rel=\"noopener noreferrer\">LinkedIn</a><a href=\"https://www.facebook.com/atmedical\" aria-label=\"Facebook\" target=\"_blank\" rel=\"noopener noreferrer\">Facebook</a><a href=\"https://www.instagram.com/at_medical_gmbh\" aria-label=\"Instagram\" target=\"_blank\" rel=\"noopener noreferrer\">Instagram</a><a href=\"https://x.com/atmedical\" aria-label=\"X\" target=\"_blank\" rel=\"noopener noreferrer\">X</a></div>\n  </div>\n</footer>\n";

  function mountPoints() {
    var nodes = [];
    var byId = document.getElementById("atmed-global-footer");
    if (byId) nodes.push(byId);
    var byAttr = document.querySelectorAll("[data-atmed-footer]");
    for (var i = 0; i < byAttr.length; i++) {
      if (nodes.indexOf(byAttr[i]) === -1) nodes.push(byAttr[i]);
    }
    return nodes;
  }

  function ensureStylesheet(base) {
    var href = base.replace(/\/+$/, "") + "/footer.css";
    if (document.querySelector('link[data-atmed-footer-css]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-atmed-footer-css", "1");
    link.onerror = function () {
      // Stylesheet unavailable: fallback footer carries its own minimal inline styles.
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[atmed-footer] stylesheet failed to load:", href);
      }
    };
    document.head.appendChild(link);
  }

  function applyOptions(el, mount) {
    var theme = mount.getAttribute("data-atmed-theme");
    if (theme && theme !== "auto") el.setAttribute("data-atmed-theme", theme);
    if (mount.getAttribute("data-atmed-compact") === "true") {
      el.classList.add("atmed-footer--compact");
    }
  }

  function alreadyRendered() {
    return document.querySelectorAll(".atmed-footer").length > 0;
  }

  function render(mount, html, isFallback) {
    if (alreadyRendered()) {
      // Guard against duplicate footers (e.g. theme + loader both injecting).
      if (console && console.warn) {
        console.warn("[atmed-footer] an .atmed-footer is already present; skipping.");
      }
      return;
    }
    var tpl = document.createElement("template");
    tpl.innerHTML = (html || "").trim();
    var footer = tpl.content.querySelector(".atmed-footer") || tpl.content.firstElementChild;
    if (!footer) return;
    applyOptions(footer, mount);
    if (isFallback) {
      footer.setAttribute("data-atmed-footer-fallback", "1");
      if (mount.getAttribute("data-atmed-variant") === "internal" &&
          console && console.info) {
        console.info("[atmed-footer] central footer unavailable - rendered local fallback (admin notice).");
      }
    }
    mount.replaceChildren(footer);
  }

  function loadInto(mount) {
    var base = (mount.getAttribute("data-atmed-base") || DEFAULT_BASE).replace(/\/+$/, "");
    var variant = mount.getAttribute("data-atmed-variant") === "internal"
      ? "footer.internal.html"
      : "footer.html";
    ensureStylesheet(base);

    var url = base + "/" + variant;
    if (typeof fetch !== "function") {
      render(mount, FALLBACK_HTML, true);
      return;
    }
    fetch(url, { credentials: "omit", mode: "cors", cache: "default" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) { render(mount, html, false); })
      .catch(function (err) {
        if (console && console.warn) {
          console.warn("[atmed-footer] falling back to local footer:", url, err && err.message);
        }
        render(mount, FALLBACK_HTML, true);
      });
  }

  function init() {
    var mounts = mountPoints();
    for (var i = 0; i < mounts.length; i++) loadInto(mounts[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose version for diagnostics.
  window.ATMED_FOOTER_VERSION = VERSION;
})();
