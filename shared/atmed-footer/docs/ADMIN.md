# Admin-Anleitung — ATMED Global Footer

## Wie ändere ich den Footer?

1. `src/footer.config.json` bearbeiten (Links, Copyright, Claim, …).
2. `npm run check` — validiert Pflichtfelder & Links, schreibt nichts.
3. `npm run release` — baut `dist/` neu und führt die Smoke-Tests aus.
4. `meta.configVersion` in der Config erhöhen (SemVer) und `CHANGELOG.md` ergänzen.
5. Commit + Push.

> Niemals Dateien in `dist/` oder vendorierte Kopien in Zielsystemen von Hand
> editieren — sie werden beim nächsten Build/Deploy überschrieben.

## Wie deploye ich die Änderung?

Pro Zielsystem die vendorierte Kopie aktualisieren:

```bash
node scripts/deploy-footer.mjs --target <zielpfad> --system <name>
```

Beispiele:
```bash
# Backup Control Center (im Repo eingecheckt)
node scripts/deploy-footer.mjs --target ../../../DIG-backup-control-center/app/static/atmed-footer --system backup-control-center
# WordPress (auf dem Server / per CI)
node scripts/deploy-footer.mjs --target /var/www/atmed-wordpress/wp-content/atmed-footer --system wordpress
```

Jeder Deploy wird in `docs/deploy-log.json` protokolliert (System, Ziel,
Version, Content-Hash, Zeitstempel) → Auditfähigkeit.

## Wie prüfe ich den aktuellen Footer-Stand?

- Zentral: `cat dist/footer.version.json`
- Pro Zielsystem: `cat <ziel>/footer.version.json` bzw.
  `<ziel>/ATMED-FOOTER-VENDORED.txt`
- WordPress: als eingeloggter Admin `/?atmed_footer_version=1` aufrufen.
- Überblick „was steht wo": `docs/deploy-log.json`.

## Wie rolle ich zurück?

Der Footer ist vollständig versioniert (Git + Content-Hash). Rollback:

1. **Inhalt zurücksetzen:** den gewünschten älteren Stand von
   `src/footer.config.json` aus Git auschecken
   (`git checkout <commit> -- src/footer.config.json`).
2. `npm run release` — `dist/` wird auf den alten Stand neu gebaut
   (deterministisch, gleicher Content-Hash wie damals).
3. Pro betroffenem Zielsystem erneut `deploy-footer` ausführen.
4. Alternativ rein auf Zielsystem-Ebene: die vorherige vendorierte Kopie aus Git
   wiederherstellen (die Artefakte sind dort eingecheckt).

`footer.version.json` macht jeden Stand eindeutig identifizierbar; der
Content-Hash erlaubt den Abgleich „läuft überall derselbe Footer?".

## Notfall / Fallback

Lässt sich eine zentrale Kopie nicht laden, zeigt der JS-Loader automatisch den
eingebackenen Fallback-Footer (rechtliche Pflichtlinks bleiben sichtbar). Bei
server-side eingebundenen Systemen (z. B. BCC) bleibt die Seite auch ohne
Footer voll funktionsfähig.
