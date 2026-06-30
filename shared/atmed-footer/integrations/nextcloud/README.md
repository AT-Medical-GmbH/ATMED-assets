# Nextcloud-Adapter

Ziel: konsistenter Footer auf der Login-Seite und (soweit sinnvoll) in
eingeloggten Bereichen — **ohne Core-Dateien zu patchen**, update-sicher.

## Empfohlen: update-sicheres Custom-Theme (`themes/`)

Nextcloud lädt eigene Themes aus dem `themes/`-Verzeichnis; diese überleben
Updates. Ein minimales Theme kann CSS + JS hinzufügen, ohne Core zu verändern.

```
nextcloud/
  themes/
    atmed/
      theme.json
      core/css/atmed-footer.css      # = dist/footer.css
      core/js/atmed-footer.js        # = dist/footer-loader.js
```

`config/config.php`:
```php
'theme' => 'atmed',
```

Footer-Mount erfolgt über den mitgelieferten Loader; auf der Login-Seite per
`OCP\Util::addScript`/`addStyle`-Äquivalent des Themes bzw. via die unten
genannte App.

## Alternative: Theming-App + „rechtlicher Hinweis"

Die eingebaute **Theming-App** bietet Felder für *Impressum* (legal notice) und
*Datenschutz* (privacy policy) sowie eine Fußzeile — diese sind voll
update-sicher und decken die rechtlich kritischen Links sofort ab:

**Administration → Theming → „Rechtlicher Hinweis" / „Datenschutzrichtlinie".**

Setze:
- Rechtlicher Hinweis: `https://www.at-medical.de/impressum`
- Datenschutz: `https://www.at-medical.de/legal/datenschutz`

## Einschränkungen (dokumentiert)

- Nextcloud beschränkt die Footer-Anpassung im eingeloggten App-Bereich bewusst;
  der vollständige ATMED-Footer ist dort nur via Custom-Theme/JS robust, nicht
  über die Theming-App. Auf der **Login-Seite** ist die volle Einbindung sauber
  möglich.
- Kein Core-Patch. Keine App aus nicht vertrauenswürdiger Quelle.
