# WordPress-Adapter

Bindet den zentralen ATMED-Footer als **Must-Use-Plugin** ein — update-sicher,
kein Theme-Core-Hack.

## Mechanismus

- `atmed-footer.php` liegt in `wp-content/mu-plugins/` (MU-Plugins werden von
  Core- und Theme-Updates **nicht** überschrieben und sind immer aktiv).
- Es rendert die **vendorierte lokale Kopie** der zentralen Build-Artefakte aus
  `wp-content/atmed-footer/` (keine Laufzeit-Abhängigkeit von einem externen
  Endpoint, Cloudflare-unabhängig).
- CSS wird inline ausgegeben → keine zusätzliche HTTP-Anfrage, keine neue
  externe Ressource, CSP-freundlich.

## Installation / Deployment

```bash
# 1) zentral bauen
cd ATMED-assets/shared/atmed-footer
npm run release

# 2) Artefakte in den WordPress-Content vendorieren (lokal/CI/Deploy-Job)
node scripts/deploy-footer.mjs \
  --target /var/www/atmed-wordpress/wp-content/atmed-footer \
  --system wordpress

# 3) MU-Plugin einmalig ablegen
cp integrations/wordpress/atmed-footer.php \
   /var/www/atmed-wordpress/wp-content/mu-plugins/atmed-footer.php
```

Im Repo `ATMED-wordpress` liegt eine eingecheckte Kopie unter
`wp-content/mu-plugins/atmed-footer.php`, die über die bestehenden
Deploy-Workflows (`deploy-staging.yml` / `deploy-production.yml`) ausgerollt wird.

## Doppelten Footer vermeiden

Wenn das aktive Theme bereits einen eigenen `<footer>` rendert, eine der beiden
Varianten wählen:

1. **Empfohlen:** den Theme-eigenen Footer-Output entfernen (Theme-`footer.php`
   bzw. Block-Template-Part `footer`), sodass nur noch der zentrale Footer greift.
2. Den zentralen Footer ausschließlich auf Seiten ohne Theme-Footer rendern.

Der Loader/MU-Plugin rendert genau **eine** `.atmed-footer`-Instanz; das
mitgelieferte Smoke-Kriterium prüft, dass kein doppelter Footer entsteht.

## Hinweis zum aktuellen Live-Stand

Das produktive Theme der WordPress-Seite ist **nicht** im Repository eingecheckt
(`themes/atmedical/` enthält nur einen Platzhalter). Der hier ausgelieferte
Footer-Inhalt stammt aus der organisationsweit verbindlichen Quelle
`.github/repo-templates/FOOTER_SNIPPET.md`. Sobald der Live-Footer-HTML vorliegt,
wird ausschließlich `src/footer.config.json` angepasst — Adapter und Build bleiben
unverändert.
