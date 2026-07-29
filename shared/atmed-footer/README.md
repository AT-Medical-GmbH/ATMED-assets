# ATMED Global Footer

Zentral gepflegter, systemübergreifender Footer für alle AT-Medical-Oberflächen.
**Eine Quelle der Wahrheit → ein Build → systembezogene Adapter.**

## Warum diese Architektur

- **Keine Mehrfachpflege:** Inhalt lebt nur in `src/footer.config.json`.
- **Hybrid-Modell (gewählt):** zentrale Quelle im Repo → Build erzeugt
  `dist/`-Artefakte → `deploy-footer` kopiert sie **versioniert lokal** in jedes
  Zielsystem. Damit gibt es keine Laufzeit-Abhängigkeit von einem zentralen
  Endpoint (ausfallsicher, Cloudflare-unabhängig, update-fest).
- **Trennung von Inhalt / Layout / Einbindung:** Config (JSON) · Template+CSS ·
  Adapter pro System.
- **Public vs. internal:** interne Systemlinks erscheinen nur in der
  `internal`-Variante, nie auf öffentlichen Seiten.

## Verzeichnis

```
shared/atmed-footer/
├── src/
│   ├── footer.config.json     # QUELLE DER WAHRHEIT (Inhalt)
│   ├── footer.template.html    # Layout-Template (Tokens)
│   ├── footer.css              # Styles (scoped .atmed-footer, dark-mode, responsive)
│   ├── footer-loader.js        # JS-Loader (mit eingebautem Fallback)
│   └── schema.json             # Validierungsschema der Config
├── dist/                       # generiert – NICHT von Hand editieren
│   ├── footer.html             # public-Variante
│   ├── footer.internal.html    # public + interne Links
│   ├── footer.css
│   ├── footer-loader.js        # Version + Fallback eingebacken
│   ├── footer.json             # maschinenlesbarer Inhalt
│   └── footer.version.json     # Versions-Manifest
├── integrations/               # Adapter pro System
│   ├── wordpress/   (MU-Plugin)         moodle/    (additionalhtmlfooter / mustache)
│   ├── nextcloud/   (Custom-Theme)      authentik/ (Brand Custom CSS)
│   ├── mailcow/     (vorgeschaltete Landingpage)  static-html/ (Loader / SSI)
├── scripts/
│   ├── build-footer.mjs        # Build + Validierung + Versionierung
│   ├── test-footer.mjs         # Smoke-Tests
│   └── deploy-footer.mjs       # Vendorieren in Zielsysteme + Audit-Log
├── docs/
│   ├── ADMIN.md                # „Wie ändere/deploye/prüfe/rolle ich zurück"
│   └── deploy-log.json         # Audit-Log: was steht wo
├── package.json
└── CHANGELOG.md
```

## Schnellstart

```bash
cd shared/atmed-footer
npm run check     # Config validieren (ohne zu schreiben)
npm run build     # dist/ erzeugen
npm run test      # 28 Smoke-Tests
npm run release   # build + test
# in ein Zielsystem ausrollen:
node scripts/deploy-footer.mjs --target <pfad> --system <name>
```

## Inhalt pflegen

Ausschließlich `src/footer.config.json` bearbeiten (Firmenname, Claim,
Copyright, Linkgruppen, rechtliche/Kontakt-/Social-Links, interne Links). Dann
`npm run release`. Der Build **bricht bei ungültiger Config ab** und prüft Links
(keine `javascript:`-URLs, Warnung bei unsicherem `http://`).

## Einbindung pro System

Siehe jeweils `integrations/<system>/README.md`. Erste produktive Integration:
**Backup Control Center** (`DIG-backup-control-center`, server-side include).

## Fallback & Sicherheit

- Loader rendert bei Ladefehler einen **eingebackenen Fallback-Footer** → Seite
  bricht nie. Fehler nur in der Konsole; interner Admin-Hinweis via
  `console.info`, nie für Endnutzer sichtbar.
- Kein `eval`/`new Function`, keine Inline-Handler, kein `<script>` im Markup,
  CSP-freundlich. Keine Tracking-/Drittanbieter-Abhängigkeiten.
- Schutz gegen doppelte Footer (Loader rendert genau eine `.atmed-footer`).

## Inhaltsquelle / Live-Stand

Der Inhalt entspricht seit **1.1.0** exakt dem produktiven WordPress-Footer.
Quelle der Wahrheit ist der eingecheckte Live-Theme-Footer
`ATMED-wordpress/wp-content/themes/atmedical/inc-footer.php`. Änderungen am
Footer erfolgen ausschließlich über `src/footer.config.json` + `npm run release`
und werden anschließend in WordPress und alle Zielsysteme vendoriert, damit
überall derselbe Stand läuft.
