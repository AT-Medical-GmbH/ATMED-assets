# Moodle-Adapter

Ziel: konsistenter ATMED-Footer auf Login-, Dashboard- und Kursseiten,
**ohne Core-Hack** und update-sicher.

## Empfohlen: `additionalhtmlfooter` (kein Theme-/Core-Eingriff)

Moodle besitzt eine offizielle Einstellung, um zusätzliches HTML vor `</body>`
einzufügen. Sie überlebt Core- **und** Theme-Updates.

**Site administration → Appearance → Additional HTML → "Before BODY is closed"**,
oder in `config.php`:

```php
$CFG->additionalhtmlfooter = file_get_contents('/var/www/moodledata/atmed-footer/footer.snippet.html');
```

`footer.snippet.html` erzeugt `scripts/build-moodle-snippet` nicht separat —
es ist schlicht `dist/footer.css` (in `<style>`) + `dist/footer.html`
zusammengefügt. Bereitstellung per Deploy:

```bash
node scripts/deploy-footer.mjs --target /var/www/moodledata/atmed-footer --system moodle
cat dist/footer.css | sed '1s/^/<style>/' ; echo '</style>'; cat dist/footer.html  # -> footer.snippet.html
```

Vorteil: greift auf **allen** Seiten inkl. Login automatisch.

## Alternative: Theme-Template-Override (Child-Theme)

Wenn ein eigenes ATMED-Moodle-Theme aktiv ist, kann der Footer-Part als
Mustache-Override im **Child-Theme** liegen (nie im Core/Parent):
`theme/<atmed_child>/templates/core/footer.mustache` ergänzt um
`{{> atmed/footer }}` und das Partial `atmed/footer.mustache` = Inhalt von
`dist/footer.html`. Siehe `footer.mustache` in diesem Ordner.

## Einschränkungen

- Manche reinen System-/Wartungsseiten (z. B. Upgrade-Screen) rendern ohne
  Theme-Footer; dort erscheint der Footer ggf. nicht. Akzeptiert & dokumentiert.
