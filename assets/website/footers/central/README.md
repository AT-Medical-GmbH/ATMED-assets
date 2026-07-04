# AT Medical — Central Footer (Single Source of Truth)

**Ein** Footer, zentral gepflegt, in alle Oberflächen nur **verlinkt**. Eine
Änderung hier wirkt gleichzeitig auf allen angebundenen Oberflächen
(WordPress, Authentik-Login, Moodle, Nextcloud, …).

## Dateien

| Datei | Zweck |
|-------|-------|
| `links.json` | **Editierbare Quelle** — Links, Social, Copyright, Logo. Nur hier ändern. |
| `footer.js` | Loader: holt `links.json`, injiziert Footer + CSS. Der empfohlene, „live" verlinkte Weg. |
| `footer.css` | Standalone-CSS für die statische Fragment-Variante. |
| `footer.html` | Statisches HTML-Fragment (Build-Time/PHP-Include), falls kein JS-Include möglich. |

## Auslieferung: Same-Origin über Gateway/Traefik

Damit jede Oberfläche den Footer **ohne Cross-Origin-/CSP-Probleme** laden kann,
wird dieses Verzeichnis vom Gateway unter demselben Origin jeder Domain
ausgeliefert, kanonisch unter dem Pfad **`/_atmed/footer/`**:

```
https://login.at-medical.de/_atmed/footer/footer.js
https://www.at-medical.de/_atmed/footer/footer.js
https://moodle.at-medical.de/_atmed/footer/footer.js
https://cloud.at-medical.de/_atmed/footer/footer.js
```

Deploy-Konfiguration und Sync-Skript liegen in `deploy/` (Traefik-Router +
statischer Mount). Der Gateway spiegelt dieses Verzeichnis; ein Update in
ATMED-assets wird per Sync/CI auf den Gateway gebracht und ist danach überall
sofort aktiv.

## Einbindung je Oberfläche (nur EIN Verweis)

**Authentik-Login** (Template-Override, `custom-templates/`): am Seitenende
```html
<script src="/_atmed/footer/footer.js" defer></script>
```
CSP-Hinweis: `script-src` muss `'self'` erlauben (bei Authentik i. d. R. per
Nonce/Selbst-Origin gegeben). Details: ATMED-authentik
`docs/branding-login-footer.md`.

**WordPress** (Theme `footer.php`, vor `</body>`):
```php
<script src="/_atmed/footer/footer.js" defer></script>
```
oder serverseitig statisch: `include` von `footer.html` + `footer.css` einbinden.

**Moodle** (Site-Administration → Darstellung → Zusätzliches HTML → Vor `</body>`):
```html
<script src="/_atmed/footer/footer.js" defer></script>
```

**Nextcloud** (Theming-App / eigenes Theme, Footer-Slot):
```html
<script src="/_atmed/footer/footer.js" defer></script>
```

Optionaler Mountpunkt: Ein Element `<div data-atmed-footer></div>` an der
gewünschten Stelle nimmt den Footer auf; sonst wird er an `<body>` angehängt.

## Ändern

1. Wortlaut/URLs/Social/Copyright in `links.json` anpassen.
2. Optik in `footer.js` (CSS-Block) bzw. `footer.css` — beide synchron halten.
3. `VERSION` erhöhen. Commit → Sync/CI bringt es auf den Gateway → überall live.

Quelle des ursprünglichen Markups/CSS: `AT-Medical-GmbH/ATMED-web`
(`web/login`, `web/_core/css/login.css`).
