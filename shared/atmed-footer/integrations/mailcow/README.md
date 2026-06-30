# Mailcow-Adapter

Mailcow ist **update-kritisch** (dockerisiert). Keine Core-Hacks in Containern —
sie gehen beim nächsten `docker compose pull` verloren.

## Empfohlen (robust): vorgeschaltete ATMED-Login-/Info-Seite

Statt das Mailcow-UI selbst zu verändern, eine schlanke statische ATMED-Seite
unter z. B. `mail.at-medical.de/` per Reverse Proxy (Traefik) ausliefern, die den
vollen ATMED-Footer (static-html-Adapter) trägt und nach `…/SOGo` bzw. ins
Mailcow-UI verlinkt. Komplett update-sicher, da außerhalb der Mailcow-Container.

```
Traefik (ATMED-traefik)
  └── mail.at-medical.de/            -> statische ATMED-Landing (mit Footer)
  └── mail.at-medical.de/SOGo, /...  -> Mailcow-Container (unverändert)
```

## Update-sichere Minimalvariante (optional)

Mailcow erlaubt persistente UI-Overrides über gemountete Verzeichnisse
(`data/web/`-Overrides via `docker-compose.override.yml`), die als Volume
eingebunden werden und Updates überstehen. Dort kann eine kleine
`footer-include`-Datei + CSS abgelegt werden. **Nur** über Volume-Mounts, nie
durch direktes Editieren im laufenden Container.

## Einschränkungen (dokumentiert)

- Eine vollständige, semantische Footer-Integration **innerhalb** des
  Mailcow-/SOGo-UI ist nicht update-sicher garantierbar → empfohlene Lösung ist
  die vorgeschaltete Landingpage.
- Keine Container-Core-Änderungen.
