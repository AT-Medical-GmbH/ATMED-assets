# Authentik-Adapter

Ziel: ATMED-Footer mindestens auf Login-/Flow-/Fehlerseiten — über **offiziell
unterstütztes Branding**, ohne fragile Template-Hacks, update-sicher.

## Mechanismus: Brand → Custom CSS

Authentik unterstützt pro **Brand** (früher „Tenant") eigenes CSS. Das ist die
update-sichere Stelle für Footer-Styling und einen leichtgewichtigen Footer.

**Admin Interface → Brands → <brand> → "Custom CSS"** → Inhalt aus
`brand-custom.css` (dieser Ordner) einfügen. Es enthält:
- die nötigen `.atmed-footer`-Styles (Auszug aus `dist/footer.css`),
- eine `::after`-/Footer-Einblendung der rechtlich relevanten Links auf
  Flow-Seiten.

Da Authentik (React-Flows) **kein** freies HTML-Injection an beliebiger Stelle
erlaubt, wird der Footer rein über CSS + `content`/Link-Liste minimal abgebildet.

## Empfohlene Ergänzung: vorgeschaltete Landingpage

Für den vollwertigen ATMED-Footer empfiehlt sich, die öffentliche Einstiegsseite
(`auth.at-medical.de/`) als statische ATMED-Seite mit vollem Footer
(static-html-Adapter) bereitzustellen und von dort in die Authentik-Flows zu
verlinken. Die Flows selbst behalten den minimalen CSS-Footer.

## Einschränkungen (dokumentiert)

- Vollständiger, semantischer `<footer>` ist innerhalb der Authentik-Flow-UI
  **nicht** update-sicher injizierbar → bewusst nur CSS-Minimalvariante.
- Keine Änderungen an Authentik-Container-/Core-Dateien (würden bei Updates
  überschrieben).
