---
status: Konzept, wartet auf Freigabe des Inhabers (Bauauftrag v4, Abschnitt 5, Schritt 1). Nichts gebaut.
last_updated: 2026-11-15
source: bauauftrag-hermes-v4.md, Stand design/phase-2 (3c85910), Messung der laufenden Seite von aussen am 2026-11-15, content/seiten.json, content/texte.ts, die vier Textquellen
---

# Konzept Phase 3: Pflege, Buchung, Formular, Hosting

Branch `design/phase-3` ist von `design/phase-2` abgezweigt (Worktree `wt-p3`, gleicher Stand 3c85910). Bisher liegt nur diese Datei darin. Nichts gebaut, nichts gepusht, kein Schlüsselwert gelesen.

## 0. Das Wichtigste vorweg

Fünf Dinge weichen vom Auftrag ab oder brauchen deinen Entscheid, bevor ich baue.

| Nr. | Befund | Folge |
| --- | --- | --- |
| 1 | **Es gibt kein Hostinger-Postfach für bundu.ch.** Der MX-Eintrag von bundu.ch zeigt auf Microsoft 365 (`bundu-ch.mail.protection.outlook.com`). Der Auftrag nennt «SMTP des Hostinger-Postfachs». Das lässt sich so nicht bauen. | Neuer Versandweg nötig, Vorschlag in Abschnitt 3 (Microsoft Graph über eine eigene, auf `info@bundu.ch` beschränkte App). Entscheid E-1. |
| 2 | **Für bundu.ch fehlen SPF, DKIM und DMARC im öffentlichen DNS.** Gelesen am 2026-11-15 bei zwei Resolvern: Es steht nur die Google-Bestätigung als TXT-Eintrag da. `autodiscover.bundu.ch` zeigt noch auf Hostinger-Mail. | Mails von `@bundu.ch` können im Spam landen, auch Offerten, nicht nur das Formular. Ausserhalb dieses Auftrags, aber vor dem Start zu beheben (Entscheid E-2). |
| 3 | **Der Schematyp `angebot` gibt es in Sanity schon**, mit 7 Dokumenten und alten Preisen (zum Beispiel Kurse «ab CHF 350.–», 5 Angebote «Auf Anfrage»). Der Auftrag verlangt einen neuen Typ gleichen Namens. | Ich nenne den neuen Typ `preisangebot`, die alten Dokumente bleiben unberührt. Entscheid E-3. |
| 4 | **Für die Termine gibt es keinen Platz auf der Seite.** In den 19 Routen steht kein Terminabschnitt, und der Text der Webinar-Seite sagt «Es gibt noch kein Thema, keinen Termin und keinen Preis». Ein Terminabschnitt ist ein neuer Text, und Textänderungen sind ausgeschlossen. | Schema und Abfrage baue ich, angezeigt wird nichts, bis du einen Wortlaut freigibst. Entscheid E-4. |
| 5 | **Preise stehen auch im Fliesstext.** In den Preistabellen stehen 21 Zeilen. Dazu kommen 13 Stellen mit CHF-Beträgen in Fliesstext, Meta-Beschreibung und Kartenzeilen (zum Beispiel «Im 5er-Paket kostet eine Sitzung CHF 124»). Ändert jemand im Studio einen Preis, ändert sich nur die Tabelle. | Ich baue eine Prüfung, die beim Build jede Abweichung meldet. Entscheid E-5. |

## 1. Befunde zur Ausgangslage

### 1.1 Hosting (Punkt 2.4)

Ich habe keinen Zugang zu hPanel und sehe den Tarifnamen nicht. Von aussen belegt:

- bundu.ch läuft heute als **Next.js-Anwendung auf Hostinger** (`x-powered-by: Next.js`, `platform: hostinger`). Die Wartungsseite vom 14.11. kam über die Middleware, also über Server-Code. Ein POST an `/api/contact` antwortet mit einer Fehlermeldung der App (Feldprüfung), `/studio` antwortet mit 200. **Der Tarif von bundu.ch erlaubt Node.js mit Server-Routen.** Ich habe dabei einen leeren POST an den alten Endpunkt geschickt. Er wurde abgewiesen («Pflichtfelder fehlen»), es ging keine Mail raus.
- Die Wartungsseite ging 5 Minuten nach dem Push auf `main` live. Hostinger deployt also automatisch aus dem GitHub-Repo `Walt6183/bundu-website`, Branch `main`.
- Eine Vorschau-Adresse existiert (`lightsalmon-antelope-598888.hostingersite.com`). Sie gehört zur laufenden App, nicht zu einem getrennten Testsystem.
- Nicht prüfbar von aussen: Tarifname, Arbeitsspeicher, Zahl der erlaubten Node-Anwendungen, Build-Minuten, ob ausgehender SMTP-Verkehr erlaubt wäre. Ich plane deshalb so, dass nichts davon nötig ist (nur HTTPS nach aussen, ein Prozess).

Die Frage «Node oder nur statisch» ist damit beantwortet: **Node geht, die zwei Wege aus dem Auftrag (Tarif wechseln, externer Dienst) sind nicht nötig.**

### 1.2 Git

Das lokale Repo (`main`, a53dd71) hat keine gemeinsame Geschichte mit `Walt6183/bundu-website` auf GitHub. Es ist ein Import der Übergabe. Der Dateibaum ist bis auf die Wartungsseite (`middleware.ts`, `app/maintenance/`) gleich. Für die Übernahme genügt später **ein** Commit auf einem eigenen Branch im GitHub-Repo, der den Baum von `design/phase-3` setzt. Kein Zusammenführen unabhängiger Geschichten, kein Force-Push (Abschnitt 6).

### 1.3 Sanity

- Projekt `f4vevv6s`, Dataset `production` ist **öffentlich lesbar** (eine Abfrage ohne Schlüssel liefert die Dokumente). Für Preise und Termine ist das unkritisch. Personendaten kommen nie in Sanity.
- Dokumente heute: 7 `angebot`, 6 `faq`, 0 `termin`, 0 `impuls`, 0 `thema`.
- Der Studio-Zugang ist durch die Sanity-Anmeldung geschützt (Einladung über sanity.io/manage). Die Seite `/studio` selbst ist öffentlich erreichbar, ohne Anmeldung sieht man darin nichts. Das ist so gewollt.

## 2. Reihenfolge und Commits

1. Buchung (2.1), 2. Sanity (2.3), 3. Formular (2.2), 4. Hosting und Anleitung (2.4), danach Bericht. **Ein Commit je Punkt**, Messwerte im Text. Nach dem ersten grünen Build wird committet, bevor der Feinschliff beginnt (Lehre aus Phase 2: das Werkzeugbudget). Bericht, Belege und Upload nach `rueckgabe/phase-3/` liegen vor dem letzten Feinschliff.

## 3. Formular-Versand (Punkt 2.2)

### 3.1 Ablauf

1. Die Person füllt das Formular aus. Die drei Formulare (Eltern, Fachpersonen, Institutionen) behalten Felder und Wortlaut aus Phase 2.
2. Die Client-Komponente prüft Pflichtfelder (`required`, wie heute) und schickt **einen** POST an `/api/kontakt` (nur wenn `FORMULAR_AKTIV` an ist, sonst bleibt alles wie heute: kein Aufruf).
3. Die Route (`app/api/kontakt/route.ts`, Node-Laufzeit) prüft in dieser Reihenfolge: Schalter, Herkunft (Header `Origin` gegen eine Liste), verstecktes Feld leer, Mindestzeit, Längen und Pflichtfelder, Zahl der Anfragen je Adresse (in-memory, 5 je 10 Minuten).
4. Sie baut eine Textmail (kein HTML, Zeilenumbrüche in Name und Betreff entfernt, damit kein Mail-Header eingeschleust werden kann). Betreff: «Anfrage über bundu.ch (Eltern)» bzw. «Fachpersonen» oder «Institutionen». `Reply-To` ist die geprüfte Adresse der Person, damit du direkt antwortest.
5. Sie sendet über den Versandweg in 3.2 und antwortet `200` oder einen Fehlercode. Es wird nichts gespeichert, kein Inhalt geloggt (nur Status und Zeit), kein Tracking.
6. Die Seite zeigt die Bestätigung oder die Fehlermeldung (3.4).

### 3.2 Versandweg: vier Möglichkeiten

| Weg | Wie es geht | Dafür | Dagegen |
| --- | --- | --- | --- |
| **A. Microsoft Graph, eigene App (Vorschlag)** | Die Route holt mit einem Geheimnis ein Token und ruft `sendMail` für `info@bundu.ch` auf. Nur HTTPS, keine neue Abhängigkeit (`fetch`). Die App bekommt nur die Berechtigung «Mail senden» und wird per Exchange-Richtlinie auf das Postfach `info@bundu.ch` beschränkt. | Läuft über dein bestehendes Microsoft 365. Kein SMTP-Port, keine Basis-Anmeldung. Die App kann nicht als andere Person senden. Absender und Ziel im selben Konto. | Einmalige Einrichtung im Entra- und im Exchange-Verwaltungsportal (ca. 15 Minuten, Anleitung folgt in `deploy-anleitung.md`). Das Geheimnis läuft nach höchstens 24 Monaten ab, ein Erinnerungstermin ist nötig. |
| B. nodemailer mit M365-SMTP | Wie im Auftrag, aber gegen `smtp.office365.com`. | Eine Zeile Code. | Beim alten Formular scheiterte genau dieser Weg an der gesperrten klassischen SMTP-Anmeldung deines Tenants (Fehler 535 5.7.139). Microsoft hat angekündigt, diesen Weg einzuschränken, genaue Daten habe ich nicht geprüft. Port 587 kann auf dem Hosting blockiert sein. Ein Passwort mit Vollzugriff auf das Postfach liegt auf dem Server. |
| C. Hostinger-Postfach | Wie im Auftrag. | | Es gibt keins, solange der MX bei Microsoft liegt. Umziehen hiesse, die Mail von bundu.ch umzustellen. Nicht Teil dieses Auftrags. |
| D. Externer Dienst (zum Beispiel Resend) | HTTPS-Aufruf an den Dienst. | Einfach. | Ein dritter Anbieter ausserhalb der Schweiz sieht den Inhalt der Anfragen, das müsste im Datenschutzhinweis stehen. SPF und DKIM für den Dienst wären neu nötig. |

Vorschlag: **A.** Ich baue die Route so, dass Absender, Ziel und Dienst in Umgebungsvariablen stehen, damit B oder D später ohne Umbau möglich wären.

### 3.3 Schutz und Schalter

- Verstecktes Feld (für Menschen unsichtbar, für Skripte ein Köder), Mindestzeit 3 Sekunden zwischen Seitenaufbau und Absenden.
- Längen: Name 100, Einrichtung 150, Funktion 100, E-Mail 254, Telefon 40, Auswahl nur aus der Liste, Nachricht 5'000 Zeichen.
- **Schalter `FORMULAR_AKTIV`, Standard aus.** Er wirkt doppelt: beim Bau (die Seite zeigt das Formular wie in Phase 2, ohne Absenden) und zur Laufzeit in der Route (sie antwortet 404, solange er aus ist). Ohne Datenschutzhinweis geht also nie eine Anfrage raus.
- Kein Captcha eines Drittanbieters (würde Tracking bringen).
- Folge bei ausgeschaltetem Schalter: Wer auf «Nachricht senden» drückt, sieht wie heute nichts. Das ist nur zum Testen vertretbar. **Vor dem Start muss der Schalter an sein**, und der Datenschutzhinweis muss stehen.

### 3.4 Texte für Bestätigung und Fehler (Vorschlag, du gibst frei)

In den Quellen steht Folgendes:

- Fachpersonen (`texte-fachpersonen-v1.md`, freigegeben): «Danke für deine Nachricht. Walter Uehli meldet sich werktags innert 24 Stunden bei dir.» und «Die Nachricht ist nicht angekommen. Versuch es noch einmal oder schreib direkt an info@bundu.ch.»
- Eltern (Kommentar in `texte-eltern-v1.md`, nur Bestätigung): wie Fachpersonen.
- Institutionen (Kommentar, nur Bestätigung): «Danke für Ihre Nachricht. Walter Uehli meldet sich werktags innert 24 Stunden bei Ihnen.»

Mein Vorschlag für die zwei Lücken, damit alle drei gleich gebaut sind:

| Formular | Bestätigung | Fehlermeldung |
| --- | --- | --- |
| Eltern | wie Fachpersonen (Du) | wie Fachpersonen (Du) |
| Fachpersonen | freigegebener Wortlaut | freigegebener Wortlaut |
| Institutionen | Vorschlag aus dem Kommentar (Sie) | «Die Nachricht ist nicht angekommen. Versuchen Sie es noch einmal oder schreiben Sie direkt an info@bundu.ch.» (neu, abgeleitet) |

Das Wortlaut-Gate: Der Textcheck verbietet bisher, dass diese beiden Texte auf der Seite stehen. Ich ergänze ihn um einen Absendetest und prüfe die Texte gegen die Quellen, sobald du sie freigibst. Bis dahin steht dort ein Platzhalter, und der Bericht sagt es.

### 3.5 Testen ohne echte Mail

Ich teste nie gegen `info@bundu.ch`. Die Route kennt zwei Test-Umgebungsvariablen (nur wirksam mit `KONTAKT_TESTMODUS=1`, in der Produktion gesperrt), die Token- und Mail-Adresse auf einen **lokalen Nachbau von Microsoft Graph** umbiegen. Damit messe ich: Pflichtfelder, Längen, Verstecktes Feld, Mindestzeit, Mail-Header-Schutz, Antwortzeit unter 3 s, und «Schalter aus: kein Netzwerkaufruf». **Nicht prüfbar ohne deine Zugangsdaten:** die echte Zustellung über Microsoft. Sie ist ein Test von dir mit einer Testadresse (Anleitung folgt).

## 4. Pflege über Sanity (Punkt 2.3)

### 4.1 Datenmodell

Neuer Typ `preisangebot` (Name geändert wegen E-3), ein Dokument je Preistabelle:

| Feld | Typ | Bemerkung |
| --- | --- | --- |
| `schluessel` | Text, schreibgeschützt | feste Kennung der Tabelle, zum Beispiel `eltern-coaching` |
| `titel` | Text | Anzeige im Studio, nicht auf der Seite |
| `bereich` | Auswahl Eltern, Fachpersonen, Institutionen | |
| `zeilen` | Liste | je Zeile: `leistung` (Text), `umfang` (Text), `preisart` (Betrag, kostenlos, auf Anfrage), `betrag` (ganze Zahl, nur bei Betrag) |

Der Betrag ist eine Zahl, kein Text. Die Seite setzt daraus «CHF 1'150» (gleiche Schreibweise wie in den Quellen). Das verhindert Tippfehler wie «CHF 135.–» und hält den Textcheck gültig. Spaltenköpfe (Leistung, Dauer, Preis) bleiben in den Dateien.

Es gibt 6 Tabellen (Eltern-Coaching 4 Zeilen, Online-Coaching Fachpersonen 6, Inhouse 3, Fachinput 4, STARK 1, Bündner Standard 3, zusammen 21 Zeilen, davon 6 Erstgespräche).

Neuer Typ `termin`: `titel`, `datum` (Datum mit Uhrzeit), `ort`, `bereich`, `link` (Adresse), `sichtbar` (Ja oder Nein, Standard Nein). Schema, Abfrage und Komponente werden gebaut, **angezeigt wird nichts** (E-4).

Alte Typen (`angebot`, `download`, `faq`, `impuls`, `referenz`, `thema`) bleiben im Schema und in den Daten, werden aber nicht abgefragt.

### 4.2 Wie die Preise auf die Seite kommen

- Die Preise werden **beim Bau** aus Sanity gezogen und in `content/preise.json` geschrieben (mit 8 Sekunden Zeitlimit). Die Seiten sind danach reine Dateien, **kein Sanity-Aufruf zur Laufzeit**.
- Fällt Sanity aus oder fehlt der Zugang, nimmt der Bau die zuletzt gespeicherte `content/preise.json` aus dem Repo. Eine leere Tabelle kann nie entstehen: Ist die Datei leer oder unlesbar, bricht der Bau ab.
- Ein Preis im Studio erscheint auf der Seite erst nach einem neuen Bau. Dafür gibt es drei Wege: (a) du stösst den Bau in hPanel an, (b) ein Sanity-Webhook stösst ihn an (ich kann nicht prüfen, ob Hostinger dafür eine Adresse anbietet), (c) Hermes baut auf Zuruf. Entscheid E-6.

### 4.3 Prüfung gegen Abweichungen (E-5)

Ein Bauschritt vergleicht jeden CHF-Betrag in Fliesstext, Meta-Beschreibung und Kartenzeilen (13 Stellen) mit den Beträgen aus Sanity. Gleiche Beträge in Tabelle und Text sind der Normalfall. Weicht ein Betrag im Text ab, **bricht der Bau ab** und nennt Seite, Satz und Betrag (Vorschlag). Alternative: nur Warnung. Damit geht kein widersprüchlicher Preis live, es heisst aber auch, dass eine Preisänderung immer eine Textänderung nach sich zieht.

### 4.4 Erstbefüllung

Ich habe keinen Schlüssel und lese keinen. Daher: Ich erzeuge **`preise-import.ndjson`** aus den Preiszeilen der Textdateien, wortgleich, und weise jede der 21 Zeilen im Bericht aus. Den Import macht entweder du mit `npx sanity dataset import` nach deiner eigenen Anmeldung, oder du gibst mir ausdrücklich die Erlaubnis, einen vorhandenen Sanity-Schlüssel dafür zu verwenden, ohne ihn zu zeigen (E-7). Der Auftrag verbietet, Schlüsselwerte zu lesen, deshalb tue ich Letzteres nur auf deine Anweisung.

### 4.5 Test «geänderte Zahl erscheint nur an einer Stelle»

Auf der echten Sanity ohne Schreibzugang nicht prüfbar. Ich messe stattdessen mit einer Testdatei, die die Abfrage ersetzt: Eine Testzahl in `preise.json` erscheint nach dem Bau genau in der betreffenden Zelle und sonst nirgends (Suche über alle 19 Routen). Der Rundlauf Studio → Seite ist danach **dein Test**, am besten in einem zweiten Dataset (`test`), das du anlegst, damit `production` unberührt bleibt.

## 5. Buchung (Punkt 2.1)

- Neue Datei `content/konfig.ts` mit drei Feldern: `BUCHUNG.eltern`, `BUCHUNG.fachpersonen`, `BUCHUNG.institutionen`. Heute `#`. Keine Adresse im Seitentext.
- **27 Knöpfe «Erstgespräch buchen»** auf 12 Seiten (gemessen am Stand Phase 2d, alle `#`): Eltern 6, Fachpersonen 6, Institutionen 15. Jeder Knopf bekommt seinen Bereich aus der Adresse der Seite (`/eltern/…`, `/fachwelt/fachpersonen/…`, `/fachwelt/institutionen/…`).
- Der Link öffnet in neuem Tab mit `rel="noopener noreferrer"`, es wird kein Skript von Microsoft geladen. Der Bookings-Rahmen der alten Kontaktseite (iFrame) entfällt.
- Solange eine Adresse fehlt, bleibt `#`, und der Bericht nennt die Zahl der Knöpfe, die noch auf `#` zeigen.
- Der Auftrag verlangt drei Dauern (Eltern 15, Fachpersonen 30, Institutionen 30). Die drei Adressen müssen zu **drei Buchungsdiensten mit je eigener Dauer** führen. Ob dein Bookings dafür drei direkte Dienst-Links oder drei Buchungsseiten bietet, habe ich nicht geprüft (Frage F-2).
- Messkriterium: alle 27 Knöpfe zeigen auf das Feld ihres Bereichs, nach Lieferung der Adressen gleich 0 Knöpfe mit `#`.

## 6. Hosting (Punkt 2.4)

Vorbereiten, nicht ausführen. Ergebnis: `deploy-anleitung.md`, ausführbar ohne Rückfrage.

- **Build:** `next build` (Hostinger-Einstellungen wie heute: Build `npm run build`, Start `npm start`, Node 22.x, `.npmrc` mit `legacy-peer-deps=true`). Das ist die Konfiguration, die bundu.ch heute schon baut.
- **Umgebungsvariablen als Namensliste** in `.env.example`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `FORMULAR_AKTIV`, `KONTAKT_ZIEL`, `KONTAKT_ABSENDER`, `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET`, `ERLAUBTE_HERKUNFT`, `SITE_URL`. Werte setzt du in hPanel. Prüfung ohne Wert zu zeigen: `grep -c '^MS_CLIENT_SECRET=' .env`.
- **Weiterleitungen:** die 38 von 38 aus Phase 2 bleiben Gate und werden nach dem Umbau erneut gemessen.
- **robots.txt und Sitemap** nehmen ihre Adresse aus `SITE_URL`. Produktion: `https://bundu.ch`. Testadresse: eigene Unterdomain, mit `noindex` und Zugangsschutz, damit Google sie nicht aufnimmt.
- **Testadresse:** Sie braucht eine zweite Node-Anwendung auf dem Tarif (Branch `design/phase-3`) und einen Unterdomain-Eintrag in hPanel, zum Beispiel `test.bundu.ch` (heute nicht vorhanden). Ob dein Tarif eine zweite Anwendung erlaubt, kann ich nicht sehen (F-3).
- **Ablauf der Umschaltung (nur Skizze, nicht ausführen):** 1. Test-App auf Branch, du nimmst ab. 2. Der Baum wird als ein Commit auf `main` gesetzt, das ersetzt auch die Wartungsseite. 3. Hostinger baut, 301-Test, Cache leeren in hPanel. 4. Rückfall: den letzten Commit mit der Wartungsseite wiederherstellen. Kein DNS-Wechsel nötig, die Domain bleibt auf derselben App.
- **Kein Deploy, kein DNS-Wechsel, keine Änderung an der Domain** ohne deine ausdrückliche Freigabe. Die Wartungsseite läuft unverändert.

## 7. Messkriterien (verfeinert)

| Punkt | Kriterium |
| --- | --- |
| Buchung | 27 von 27 Knöpfen zeigen auf das Feld ihres Bereichs. `#`-Knöpfe: Zahl wird im Bericht genannt (heute 27). Kein Skript von Microsoft in den Seiten. Neuer Tab mit `noopener`. |
| Sanity | Alle 21 Preiszeilen gleich den Textquellen (Textcheck 654 Stellen, 0 Abweichungen). Testzahl erscheint genau einmal. Ohne Sanity-Antwort baut die Seite aus `preise.json`. Build bricht ab bei leerer Datei oder abweichendem Betrag im Text. Prüfung von 13 Textstellen. |
| Formular | Schalter aus: 0 Netzwerkaufrufe beim Absenden. Schalter an gegen den Nachbau: 1 Aufruf, Pflichtfelder und Längen greifen, verstecktes Feld und Mindestzeit weisen ab, Mail-Header-Test ohne Zeilenumbruch, Antwortzeit unter 3 s (am Nachbau gemessen). Notfallnummern der Eltern-Kontaktseite unverändert, nicht aufklappbar. |
| Hosting | `next build` ohne Fehler, 38 von 38 Weiterleitungen, Sitemap und robots nehmen `SITE_URL`, `deploy-anleitung.md` ist in einem Durchgang ausführbar, `.env.example` nennt nur Namen. |
| Allgemein | Überlauf 0, Einzelwort-Zeilen 0, Amber höchstens 3, Textcheck 0 Abweichungen, Seitenhöhen der 19 Routen gegen Phase 2d (nur Formular und Tabellen dürfen sich ändern). |

## 8. Entscheide und Fragen an den Inhaber

Mit Vorschlag. Antwort als Kürzel genügt, zum Beispiel «E-1 A, E-2 ja».

| Nr. | Frage | Mein Vorschlag |
| --- | --- | --- |
| E-1 | Versandweg für das Formular (Abschnitt 3.2) | **A**, Microsoft Graph mit eigener App |
| E-2 | SPF, DKIM, DMARC für bundu.ch eintragen, ausserhalb dieses Auftrags | Ja, vor dem Start. Ich liefere die drei Einträge als fertige Zeilen, du trägst sie in hPanel ein |
| E-3 | Neuer Sanity-Typ heisst `preisangebot`, die 7 alten `angebot`-Dokumente bleiben | Ja |
| E-4 | Wortlaut für einen Terminabschnitt (Überschrift, leerer Zustand), Seite und Stelle | Erst bei der ersten Webinar-Planung. Bis dahin nur Schema |
| E-5 | Bau bricht ab, wenn ein Preis im Text vom Studio abweicht (sonst nur Warnung) | Abbruch |
| E-6 | Wie kommt eine Preisänderung auf die Seite? Hostinger-Bau von dir, Webhook, oder Hermes auf Zuruf | Zuerst von dir, später Webhook |
| E-7 | Erstbefüllung: du importierst `preise-import.ndjson` selbst, oder ich darf einen vorhandenen Sanity-Schlüssel dafür nutzen, ohne ihn zu zeigen | Du importierst. Wenn dir das zu technisch ist, die zweite Möglichkeit |
| E-8 | Wortlaut Bestätigung und Fehlermeldung aus 3.4 | Wie in der Tabelle |
| F-1 | Gibt es `info@bundu.ch` in Microsoft 365 (Postfach, Alias oder geteiltes Postfach)? | Ich habe es nicht geprüft, weil der Auftrag verbietet, Schlüsselwerte zu lesen. Bitte bestätigen |
| F-2 | Wie liefert dein Bookings die drei Links mit eigener Dauer (Eltern 15, Fachpersonen 30, Institutionen 30)? | Du schickst die drei Adressen, ich prüfe, ob sie öffnen |
| F-3 | Erlaubt dein Hostinger-Tarif eine zweite Node-Anwendung für `test.bundu.ch`? | Bitte in hPanel nachsehen oder den Tarifnamen nennen |
| F-4 | Zugang zu Hostinger und Sanity, Passwort und Geheimnis der App | Setzt du selbst, nie im Chat |
| F-5 | Datenschutzhinweis und Impressum | Durch eine Fachperson, Platzhalter bleibt. Formular bleibt bis dahin aus |

## 9. Was ich nicht geprüft habe und was ich annehme

- Tarifname und Grenzen (Anwendungen, Speicher, Build-Zeit): von aussen nicht sichtbar. Annahme: gleiche Grenzen wie die laufende App.
- Ob Hostinger einen Webhook für automatisches Bauen bietet: nicht geprüft.
- Ob `info@bundu.ch` ein Microsoft-Postfach ist: nicht geprüft (F-1). Die DNS-Befunde zu SPF, DKIM und DMARC sind von aussen gelesen. Falls sie in hPanel anders stehen, gilt dein Stand.
- Die echte Mailzustellung und der Rundlauf Studio → Seite sind nur mit deinen Zugängen prüfbar. Was ich ohne sie messen kann, steht in 3.5 und 4.5.
- Microsofts Fristen zur Abschaltung der Basis-Anmeldung bei SMTP: nur als Ankündigung bekannt, Daten nicht geprüft.

Ich halte hier an. Gebaut wird erst nach deiner Freigabe der Entscheide E-1 bis E-8.
