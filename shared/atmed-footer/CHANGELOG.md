# Changelog — ATMED Global Footer

Format: [Keep a Changelog](https://keepachangelog.com/), Versionierung: SemVer
(`meta.configVersion`). Build-Versionen zusätzlich mit Datum + Content-Hash.

## [1.1.0] — 2026-07-04

### Changed
- **Inhalt exakt an den produktiven WordPress-Footer angeglichen.** Quelle der
  Wahrheit ist jetzt der eingecheckte Live-Theme-Footer
  `ATMED-wordpress/wp-content/themes/atmedical/inc-footer.php` (nicht mehr
  `FOOTER_SNIPPET.md`).
- Öffentliche Linkstruktur auf die drei Live-Spalten umgestellt: **Leistungen**
  (5 Links), **Unternehmen** (12 Links, inkl. Systemstatus, Holding-Gesellschaften,
  Newsletter), **Rechtliches** (9 Links). Alle URLs auf das Live-Schema
  `https://at-medical.de/de/<slug>/` korrigiert.
- Firmenbeschreibung/Claim, Logo-URL (`.../assets/logos/svg/logo.svg`) und
  Copyright-Zeile (Gedankenstrich `2017 – 2026`) an den Live-Stand angepasst.
- Social-Links ergänzt: LinkedIn, Facebook, Instagram, X.

### Notes
- Bewusst **nicht** übernommen (system-spezifisch, nicht CSP-tauglich für den
  geteilten Footer): der „Cookie-Einstellungen"-Link (Inline-`onclick`/Cookiebot,
  nur auf WordPress vorhanden) und der dynamische Live-Status-Punkt am
  „Systemstatus"-Link. Der Link „Systemstatus" selbst ist enthalten.
- Interne Systemlinks (`audience: internal`) erscheinen weiterhin nur in der
  `footer.internal.html`-Variante, nie im öffentlichen Footer.
- Build: `1.1.0+2026-07-04.f78b21cd4027`, 28/28 Smoke-Tests grün.

## [1.0.0] — 2026-06-30

### Added
- Zentrale Footer-Komponente (`src/`): Config, Template, CSS, JS-Loader, Schema.
- Build (`build-footer.mjs`): Validierung, Linkprüfung, Versionierung,
  public/internal-Varianten, Versions-Manifest.
- Smoke-Tests (`test-footer.mjs`, 28 Checks: Struktur, A11y, Recht, Sicherheit,
  Variantentrennung, doppelte Footer, Token-Reste).
- Deploy (`deploy-footer.mjs`): Vendorieren in Zielsysteme + Audit-Log.
- Integrationsadapter: WordPress (MU-Plugin), Moodle, Nextcloud, Authentik,
  Mailcow, Static-HTML/Control-Center.
- Erste produktive Integration: **Backup Control Center**
  (`DIG-backup-control-center`, server-side include, internal-Variante, dark).
- Dokumentation: README, ADMIN (ändern/deployen/prüfen/rollback), pro-System-READMEs.

### Notes
- Inhalt abgeleitet aus der org-weiten Quelle `FOOTER_SNIPPET.md`. Der Live-
  WordPress-Footer war aus der isolierten Build-Umgebung nicht abrufbar
  (kein SSH, Cloudflare-Challenge). Anpassung an den exakten Live-Stand erfolgt
  ausschließlich über `src/footer.config.json`.
