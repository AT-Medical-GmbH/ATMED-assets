# Changelog — ATMED Global Footer

Format: [Keep a Changelog](https://keepachangelog.com/), Versionierung: SemVer
(`meta.configVersion`). Build-Versionen zusätzlich mit Datum + Content-Hash.

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
