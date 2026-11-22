---
status: Entwurf von Hermes, Phase 3. Nichts davon ist ausgeführt.
last_updated: 2026-11-17
source: konzept-phase-3.md, hermes-nachtrag-phase-3-v1.md (E-1, E-2, E-6, F-1 bis F-5), Stand design/phase-3
---

# Deploy-Anleitung bundu.ch (Phase 3)

Diese Anleitung bereitet die Umschaltung vor. **Hermes führt nichts davon aus.** Kein Deploy, kein DNS-Wechsel, kein Push auf `main`. Die Wartungsseite läuft bis zu deiner Umschaltung weiter. Zugänge, Passwörter und Geheimnisse setzt du selbst, nie im Chat und nie in Dateien.

Reihenfolge: A DNS, B Microsoft Graph, C Sanity, D hPanel und Umgebungsvariablen, E Umschaltung, F erste Zustellung, G Rückfall.

## A. DNS: SPF, DKIM, DMARC (E-2), vor dem Start

Stand von aussen am 2026-11-17: Der MX von bundu.ch zeigt auf Microsoft 365 (`bundu-ch.mail.protection.outlook.com`). Es steht nur die Google-Bestätigung als TXT-Eintrag da. SPF, DKIM und DMARC fehlen. Trage die drei Einträge im DNS von bundu.ch ein (Hostinger hPanel, DNS-Zone). Wo bundu.ch heute seine Nameserver hat, siehst du in hPanel unter «Domains». Stehen sie nicht bei Hostinger, trägst du die Zeilen dort ein.

| Nr. | Typ | Name | Wert |
| --- | --- | --- | --- |
| A-1 SPF (Microsoft 365 und KlickTipp) | TXT | `@` | `v=spf1 include:spf.protection.outlook.com include:<SPF-Einschluss von KlickTipp> ~all` |
| A-2 DKIM 1 | CNAME | `selector1._domainkey` | `selector1-bundu-ch._domainkey.WalterUehli.onmicrosoft.com` |
| A-3 DKIM 2 | CNAME | `selector2._domainkey` | `selector2-bundu-ch._domainkey.WalterUehli.onmicrosoft.com` |
| A-4 DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@bundu.ch` |
| A-5 KlickTipp, DKIM | laut KlickTipp | laut KlickTipp | `<Einträge von KlickTipp>` |

Hinweise:

- Es darf nur **ein** SPF-Eintrag auf `@` stehen. Gibt es schon einer, ergänze `include:spf.protection.outlook.com` darin, statt einen zweiten anzulegen. Den Google-TXT-Eintrag lässt du stehen.
- **KlickTipp sendet Mails über bundu.ch.** Die Werte für A-1 (SPF-Einschluss) und A-5 (DKIM-Einträge) liefert KlickTipp bei der Einrichtung der Absenderdomain in deinem KlickTipp-Konto. **Nicht raten, nichts aus dem Gedächtnis eintragen.** Die Angaben in spitzen Klammern in der Tabelle sind Platzhalter, keine Werte.
- Auf `@` steht **ein einziger** SPF-Eintrag, der beide Dienste enthält. Er besteht aus `v=spf1`, dann einem `include:` je Dienst, dann `~all`. Zwei getrennte SPF-Einträge machen SPF ungültig. Das Muster:

  ```
  v=spf1 include:spf.protection.outlook.com include:<Wert von KlickTipp> ~all
  ```

  Hat KlickTipp einen anderen Mechanismus angegeben (zum Beispiel `ip4:` statt `include:`), setzt du diesen an die Stelle. Die Zahl der DNS-Abfragen in einem SPF-Eintrag ist auf 10 begrenzt, sind es mehr, wird er ungültig.
- Der Eintrag bleibt `~all`, bis beide Dienste eingetragen sind und je eine **Testmail von Microsoft 365 und von KlickTipp** geprüft ist (Kopfzeile `spf=pass`, `dkim=pass`). Erst dann sinnvoll auf `-all`.
- `~all` markiert fremde Absender als verdächtig, lehnt sie aber nicht ab. Erst wenn feststeht, wer ausser Microsoft 365 als bundu.ch sendet, auf `-all` erhöhen.
- Die Ziele der DKIM-Einträge hängen vom Domainnamen deines Mandanten ab. Ich habe `WalterUehli.onmicrosoft.com` aus der Bookings-Adresse abgeleitet und **nicht geprüft**. Massgebend sind die zwei Werte, die dir das Defender-Portal anzeigt: https://security.microsoft.com, Email und Zusammenarbeit, Richtlinien und Regeln, Bedrohungsrichtlinien, E-Mail-Authentifizierungseinstellungen, DKIM, bundu.ch. Weichen sie ab, gelten die Werte des Portals.
- Nach dem Eintragen: im selben Portal bei bundu.ch «DKIM-Signaturen für diese Domäne aktivieren» einschalten. Das geht erst, wenn beide CNAME-Einträge sichtbar sind (Wartezeit bis ca. 1 Stunde).
- DMARC beginnt mit `p=none` (nur beobachten). Nach 2 bis 4 Wochen ohne Auffälligkeiten kannst du auf `p=quarantine` erhöhen.
- Prüfen: `nslookup -type=TXT bundu.ch`, `nslookup -type=TXT _dmarc.bundu.ch`, `nslookup -type=CNAME selector1._domainkey.bundu.ch`. Das Ergebnis muss die Werte der Tabelle zeigen.

## B. Microsoft Graph: eigene App für das Formular (E-1, F-1)

Ziel: Die Website sendet Mails nur als `info@bundu.ch` und kann sonst nichts. Dauer ca. 15 Minuten.

1. **App anlegen.** https://entra.microsoft.com, Identität, Anwendungen, App-Registrierungen, Neue Registrierung. Name: `BundU Formular`. Kontotyp: «Nur Konten in diesem Organisationsverzeichnis». Kein Umleitungs-URI. Registrieren.
2. **Kennungen notieren.** Auf der Übersicht stehen «Anwendungs-ID (Client)» und «Verzeichnis-ID (Mandant)». Das sind `MS_CLIENT_ID` und `MS_TENANT_ID`. Beide sind keine Geheimnisse.
3. **Berechtigung.** API-Berechtigungen, Berechtigung hinzufügen, Microsoft Graph, **Anwendungsberechtigungen**, `Mail.Send`. Dann «Administratorzustimmung erteilen».
4. **Geheimnis.** Zertifikate und Geheimnisse, Neuer geheimer Clientschlüssel, Laufzeit **24 Monate** (Maximum). Den **Wert** sofort kopieren, er wird nur einmal angezeigt. Das ist `MS_CLIENT_SECRET`. Trage ihn nur in hPanel ein (Schritt D). Notiere dir im Kalender: **Ablaufdatum minus 1 Monat, Geheimnis erneuern.** Nach Ablauf geht kein Formular mehr durch.
5. **Auf das Postfach beschränken (wichtig).** Ohne diesen Schritt dürfte die App als jede Person im Mandanten senden. In Exchange Online PowerShell (Verbindung: `Connect-ExchangeOnline`):

   ```
   New-ApplicationAccessPolicy -AppId <Client-ID> -PolicyScopeGroupId info@bundu.ch -AccessRight RestrictAccess -Description "BundU Formular nur info@bundu.ch"
   Test-ApplicationAccessPolicy -AppId <Client-ID> -Identity info@bundu.ch
   Test-ApplicationAccessPolicy -AppId <Client-ID> -Identity walter@walter-uehli.ch
   ```

   Der erste Test muss `Granted` zeigen, der zweite `Denied`. `PolicyScopeGroupId` verlangt eine Gruppe mit Mail-Aktivierung. Ist `info@bundu.ch` ein einzelnes Postfach, lege eine E-Mail-aktivierte Sicherheitsgruppe «BundU Formular» an, nimm nur dieses Postfach auf und gib deren Adresse an. Microsoft ersetzt dieses Verfahren schrittweise durch «RBAC for Applications». Zeigt dein Mandant einen Hinweis darauf, nimm die dort genannte Variante mit gleichem Ziel: Zugriff nur auf `info@bundu.ch`. **Die Richtlinie wirkt nach bis zu 30 Minuten.** Bis dahin kann der Test noch das alte Ergebnis liefern.
6. Variablen (D): `KONTAKT_ABSENDER` = `info@bundu.ch`, `KONTAKT_ZIEL` = `info@bundu.ch`.

Nicht von mir geprüft: Dein Mandant, die Gruppe und das Verhalten der Richtlinie. Der Versand über Microsoft Graph ist nur gegen einen Nachbau getestet (siehe F).

## C. Sanity: Preise befüllen (E-7)

Ich nutze keinen Sanity-Schlüssel. Du importierst die Preise selbst, einmal.

1. Im Repo liegt `preise-import.ndjson` (6 Dokumente vom Typ `preisangebot`, 21 Preiszeilen, wortgleich zu den Textdateien).
2. Anmelden und importieren (im Ordner des Repos):

   ```
   npx sanity login
   npx sanity dataset import preise-import.ndjson production --missing
   ```

   `--missing` fügt nur Dokumente hinzu, die es noch nicht gibt. Die 7 alten `angebot`-Dokumente bleiben unberührt (E-3). Willst du zuerst ein zweites Dataset zum Üben: `npx sanity dataset create test`, dann `... import preise-import.ndjson test`, und für den Bau `NEXT_PUBLIC_SANITY_DATASET=test` setzen.
3. Prüfen: `npm run build` muss `PREISE: Sanity, 6 Dokumente übernommen` und `0 Abweichungen` melden. Bricht der Bau mit `ABBRUCH` ab, nennt die Meldung Seite, Satz und Betrag (E-5). Dann steht ein Preis im Text, der nicht mehr zum Studio passt: Text anpassen lassen oder den Preis im Studio zurücksetzen.
4. Preis ändern später: Studio öffnen (`/studio`, Anmeldung bei Sanity), Preis ändern, veröffentlichen, dann **Bau in hPanel anstossen** (E-6, siehe E-5 unten). Ohne neuen Bau bleibt die Seite beim alten Preis. Es gibt keinen Webhook.
5. Fällt Sanity beim Bau aus, gilt die gespeicherte Datei `content/preise.json`. Der Bau meldet das mit `Sanity nicht erreichbar`. Eine leere Tabelle entsteht nie.

Termine (E-4): Schema `termin` steht im Studio, die Seiten zeigen nichts an, bis du einen Wortlaut freigibst.

## D. hPanel: Umgebungsvariablen

Hostinger-Einstellungen wie heute: Node 22.x, Build `npm run build`, Start `npm start`, `.npmrc` mit `legacy-peer-deps=true`. Die Namen stehen in `.env.example`. Die Werte trägst du in hPanel unter «Umgebungsvariablen» der Node-Anwendung ein.

| Name | Wert | Hinweis |
| --- | --- | --- |
| `SITE_URL` | `https://bundu.ch` | robots.txt, Sitemap, canonical |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `f4vevv6s` | öffentlich |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `FORMULAR_AKTIV` | **leer lassen** | erst in Schritt F auf `1` |
| `ERLAUBTE_HERKUNFT` | `https://bundu.ch,https://www.bundu.ch` | |
| `KONTAKT_ZIEL` | `info@bundu.ch` | |
| `KONTAKT_ABSENDER` | `info@bundu.ch` | |
| `MS_TENANT_ID` | aus B.2 | |
| `MS_CLIENT_ID` | aus B.2 | |
| `MS_CLIENT_SECRET` | aus B.4 | Geheimnis, nur hier |

**Nie setzen:** `KONTAKT_TESTMODUS`, `GRAPH_TEST_TOKEN_URL`, `GRAPH_TEST_API_BASE`. Sie gehören nur zu lokalen Tests.

Wichtig: `FORMULAR_AKTIV` wirkt zweimal. Beim **Bau** entscheidet es, ob das Formular absendet, und zur **Laufzeit**, ob die Route antwortet. Wechselst du den Wert, brauchst du einen neuen Bau.

**Bauweise der Pakete:** hPanel installiert mit `npm install`, nicht mit `npm ci`. Deshalb muss `package.json` immer zur Lockdatei `package-lock.json` passen: Wer eine Abhängigkeit ändert, erzeugt die Lockdatei im selben Commit neu und prüft mit `npm ci` aus sauberem Klon. Vorschlag für den Inhaber: Erlaubt hPanel `npm ci` als Installationsbefehl, dort eintragen (wird hier nicht selbst eingestellt).

## E. Umschaltung (nicht vor deiner Freigabe)

Es gibt keine Testadresse und keine zweite Anwendung (F-3). Die Umschaltung ist deshalb der Moment, in dem die neue Seite zum ersten Mal auf dem echten Hosting läuft. Plane sie für eine ruhige Zeit.

1. **Stand sichern.** Notiere den Commit auf `main` im GitHub-Repo `Walt6183/bundu-website`, der die Wartungsseite enthält. Das ist dein Rückfallpunkt (G).
2. **Baum übernehmen.** Der Baum von `design/phase-3` kommt als **ein Commit** auf einen eigenen Branch im GitHub-Repo (die Historien sind getrennt, kein Zusammenführen, kein Force-Push). Das Zusammenstellen und der Push folgen auf dein ausdrückliches Kommando. Danach hat der Branch den Stand, der auch die Wartungsseite (`middleware.ts`, `app/maintenance/`) ersetzt.
3. **Variablen prüfen** (D). `FORMULAR_AKTIV` bleibt leer.
4. **Branch bauen.** hPanel, Node-Anwendung, Branch auf den neuen Branch stellen oder Pull Request nach `main` zusammenführen, dann «Neu bauen». Im Bau-Log suchen: `PREISE: ... 0 Abweichungen`, `Compiled successfully`.
5. **Weiterleitungen prüfen** (38 von 38): `curl -sI https://bundu.ch/angebote/online-eltern-coaching` muss `301` und `location: /eltern/coaching/` zeigen. Die Liste der 38 alten Adressen steht in `next.config.ts` (19 Paare, je mit und ohne Schrägstrich).
6. **Cache leeren** in hPanel.
7. Sichtprüfung: `/`, `/eltern/`, `/fachwelt/`, `/impressum/`, `/datenschutz/`, `/robots.txt`, `/sitemap.xml`. Der Cookie-Banner muss erscheinen, die Widgets müssen Text zeigen.

## F. Erste echte Zustellung (Testmail)

Die Zustellung über Microsoft ist **nicht getestet**. Ich konnte nur gegen einen lokalen Nachbau testen. Das ist das offene Risiko aus F-3.

1. Die Seite läuft (E) mit `FORMULAR_AKTIV` leer. Das Formular ist sichtbar, sendet aber nichts. Die Route antwortet `404`.
2. Prüfe vorher: A abgeschlossen (SPF, DKIM, DMARC sichtbar), B abgeschlossen (Richtlinie getestet), der Datenschutzhinweis von PrivacyBee steht auf `/datenschutz/`.
   Der Hinweis unter dem Formular ist ein reiner Link «Datenschutzerklärung» und steht bereits in `content/konfig.ts` (`DATENSCHUTZ_HINWEIS.du` und `.sie`). Wird ein Feld dort geleert, bricht der Bau mit `FORMULAR_AKTIV=1` ab und die Route antwortet 404.
3. In hPanel `FORMULAR_AKTIV` auf `1` setzen und neu bauen.
4. Testmail: auf `/fachwelt/fachpersonen/kontakt/` ein Formular mit deinen Testwerten absenden (mindestens 3 Sekunden nach dem Laden warten). Erwartet: Die Bestätigung erscheint, in `info@bundu.ch` kommt eine Mail «Anfrage über bundu.ch (Fachpersonen)» an. `Antworten` geht an die Testadresse.
5. Kontrolle des Logs in hPanel: Zeile `kontakt bereich=fachpersonen status=200 code=gesendet`. Bei `status=502` steht dahinter `graph-401`, `graph-403` oder `versand`. 401 heisst: Geheimnis falsch oder abgelaufen. 403: Berechtigung oder Richtlinie (B.3, B.5). `versand`: Netz oder Zeitlimit. Bei `status=503 code=konfiguration` fehlt eine Variable.
6. Prüfe die Mail im Junk-Ordner und in den Kopfzeilen: `spf=pass`, `dkim=pass`. Sonst zuerst A korrigieren.
7. Fällt die Testmail durch und du kommst nicht weiter: `FORMULAR_AKTIV` wieder leeren, neu bauen (die Route ist wieder 404, das Formular sendet nichts). Die Seite bleibt online.

Die Fehlermeldung der Seite («Die Nachricht ist nicht angekommen …») nennt `info@bundu.ch`. Solange der Versand nicht geprüft ist, bleibt der Schalter aus.

## G. Rückfall auf die Wartungsseite

Die alte Wartungsseite liegt im Commit, den du in E.1 notiert hast. Es braucht keinen DNS-Wechsel, die Domain bleibt auf derselben Anwendung.

1. hPanel, Node-Anwendung: Branch wieder auf den Stand mit der Wartungsseite stellen (oder in GitHub `main` auf den notierten Commit zurücksetzen, per «Revert» als neuer Commit, nicht per Force-Push).
2. «Neu bauen», Cache leeren.
3. Prüfen: `curl -s https://bundu.ch | head` zeigt die Wartungsseite.
4. Vor dem Rückfall: `FORMULAR_AKTIV` leeren, falls es an war.

## H. Offen und nicht geprüft

- Echte Zustellung über Microsoft Graph und die Wirkung der Exchange-Richtlinie (B.5).
- DKIM-Zielnamen deines Mandanten (A.2, A.3).
- Hostinger-Tarif: Name, Speicher, Build-Zeit. Der Build braucht auf dieser Umgebung zeitweise über 1 GB Arbeitsspeicher. Bricht er in hPanel mit Speicherfehler ab, in `package.json` den Build mit `NODE_OPTIONS=--max-old-space-size=900` starten oder den Tarif prüfen.
- Rechtliche Vollständigkeit der Texte von PrivacyBee und des Cookie-Banners. Das bleibt bei dir.
- Datenschutzhinweis im Formular: in den Quellen steht noch ein Platzhalter. Die Fläche verlinkt auf `/datenschutz/`, ein Satz fehlt. Er muss vor `FORMULAR_AKTIV=1` stehen.
- Die Bookings-Adressen stehen in `content/konfig.ts` unverändert.
- Terminabschnitt: kein Wortlaut, nichts angezeigt (E-4).
