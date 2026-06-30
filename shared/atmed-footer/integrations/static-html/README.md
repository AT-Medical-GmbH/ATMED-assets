# Static-HTML- / Control-Center-Adapter

Standardweg für alle selbst erstellten HTML-Oberflächen und Dashboards
(System / Backup / Server / Maintenance / Traffic Control Center, Landingpages,
Status-/Runbook-Seiten).

## Zwei Einbindungsvarianten

### A) JS-Loader (empfohlen für statische/Nginx-ausgelieferte Seiten)

```html
<div id="atmed-global-footer"
     data-atmed-base="/atmed-footer"
     data-atmed-variant="internal"   <!-- public | internal -->
     data-atmed-theme="auto"         <!-- auto | light | dark -->
     data-atmed-compact="true"></div>
<script src="/atmed-footer/footer-loader.js" defer></script>
```

Der Loader:
- lädt `footer.css` + `footer.html` (bzw. `footer.internal.html`) aus
  `data-atmed-base`,
- rendert **eine** `.atmed-footer`-Instanz (Schutz gegen doppelte Footer),
- zeigt bei Ladefehler den **eingebauten Fallback-Footer** (Seite bleibt heil),
- nutzt **kein** `eval`/`new Function`, keine Inline-Handler → CSP-freundlich,
- gibt Fehler nur in der Konsole aus; bei `variant="internal"` zusätzlich einen
  Admin-Hinweis (`console.info`), nie sichtbar für normale Nutzer.

Vendorieren der Artefakte neben die Seite:

```bash
node scripts/deploy-footer.mjs --target /var/www/control-center/atmed-footer --system control-center
```

### B) Server-Side Include (empfohlen, wenn kein statisches Asset-Hosting da ist)

Wie im **Backup Control Center** umgesetzt (`DIG-backup-control-center`):
die vendorierte `footer.internal.html` + `footer.css` werden serverseitig in die
gerenderte Seite eingefügt. Keine Laufzeit-Netzabhängigkeit, Cloudflare-unabhängig.

## CSP

Für Variante A genügt im Host:
```
style-src 'self';  connect-src 'self';  script-src 'self';
```
(bei gleichem Origin der vendorierten Kopie). Inline-CSS wird vermieden.

## Sticky-Footer-Layout

```css
html, body { min-height: 100%; }
body { display: flex; flex-direction: column; }
main { flex: 1 0 auto; }
.atmed-footer { flex-shrink: 0; }
```
`.atmed-footer` hat `margin-top:auto` und rutscht so nie über den Inhalt.
