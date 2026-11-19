# Konzept Look C v2: Arbeitsplatz, mit den neuen Fotos

Auftrag: `bauauftrag-hermes-v2.md` (Phase 1b). Texte: `texte-test-v2.md`. Fotos: `portrait-arbeitsplatz-02.webp` (1448 x 1086, 4:3, selbst fotografiert) und `portrait-business-01.webp` (1086 x 1448, Hochformat, transparenter Hintergrund, 696810 von 1572528 Bildpunkten transparent, gemessen).

## Leithypothese (vorgegeben)

Ein Arbeitsplatz zeigt, wie die Arbeit abläuft, ohne Worte.

## Form in vier Sätzen

Das Arbeitsplatzfoto steht am Anfang jeder der drei Seiten, ungeschnitten im Seitenverhältnis 4:3, links ab x = 0, direkt unter der Wortmarkenleiste. Das Gesicht liegt rechts oben im Bild, die Hand links unten: Die Türen liegen deshalb als weisse Karten über der unteren rechten Bildkante, wo das Bild das schwarze Hemd zeigt, und decken weder Gesicht noch Hand. Das Businessfoto steht klein auf einer Fläche, die sich vom hellen Hemd abhebt, ohne Retusche. Fläche ist Weiss und `grey-light`, Tinte Navy und `grey-deep`, Amber steht nur im Knopf, Teal gar nicht.

## Schutzfelder (Anteile des Bildes, Näherung des Auftrags, am Bild geprüft)

Arbeitsplatzfoto: Gesicht und Headset x 0,66 bis 1,00, y 0,00 bis 0,50. Hand auf der Maus x 0,24 bis 0,42, y 0,85 bis 1,00. Die Sichtprüfung am Bild bestätigt beide Felder (Kinn und Hals enden bei y 0,50, Hand und Maus liegen bei x 0,25 bis 0,45, y 0,89 bis 1,00; die Hand ist deshalb mit Rand gerechnet). Gemessen wird in gerenderten Koordinaten: Schnittfläche jeder Karte, jedes Textes und jeder Kante mit beiden Feldern muss 0 px² sein.

## Die fünf Griffe und ihre Messkriterien

Gemessen wird im Produktions-Build bei 1440 x 900 und 390 x 844 mit `messen.mjs` (neutral) und `messen-griffe.mjs` (liegt im Beleg-Ordner). Seite 1 = `/`, Seite 2 = `/fachwelt/`, Seite 3 = `/fachwelt/fachpersonen/online-coaching/`.

| Nr | Griff | Messkriterium (gilt für alle drei Seiten, sofern nicht anders genannt) |
| --- | --- | --- |
| 1 | Das Foto füllt den Seitenanfang, ungeschnitten. | Linke Bildkante x = 0, Oberkante gleich Unterkante der Wortmarkenleiste. Bei 1440 px ist das Foto die grösste Fläche im ersten Viewport (grösser als jede Karte und jede Fläche mit eigenem Hintergrund) und mindestens 55 Prozent der Viewportbreite breit. Gerendertes Seitenverhältnis 1448 : 1086 mit Abweichung unter 1 Prozent (kein Beschnitt, kein Spiegeln). Bei 390 px volle Breite (390 px). |
| 2 | Die Türen liegen als Karten über der Bildkante, ohne Gesicht und Hand zu treffen (Seite 1 und 2). | Bei 1440 px: Überlappung Karte und Foto grösser als 0 px², beide Karten gleich breit, Schnittfläche Karte mit Gesichtsfeld 0 px² und mit Handfeld 0 px². Bei 390 px: Schnittfläche 0 px². |
| 3 | Die Türen sind ohne Scrollen erreichbar (Mängel 1 und 2 der Jury). | Bei 390 x 844: Oberkante beider Türen liegt bei y 844 oder darüber, Seite 1 und 2 (sonst Grund im Bericht). Bei 1440 x 900: beide Türknöpfe liegen vollständig im ersten Viewport (Unterkante höchstens 900 px). |
| 4 | Weiss und grey-light als Fläche, Navy und grey-deep als Tinte, Amber nur im Knopf, das Businessfoto grenzt sich ab. | Aus `messung-roh.json`: Tinten auf anderer Fläche als Weiss, grey-light oder Amber (Knopf): 0. Leiseste Tinte mindestens 7:1, jedes Signal mindestens 4,5:1. Amber-Stellen je Seite höchstens 3, jede ist die Fläche eines Knopfes, Teal 0. Das Businessfoto steht auf einer Fläche, deren Luminanzkontrast zur Hemdfarbe am Bildrand (213, 212, 221) mindestens 1,1 beträgt, ohne Retusche und ohne Rahmenfarbe ausserhalb der Tokens. |
| 5 | Das Bild trägt ohne Worte, die Seite bleibt gefüllt. | Kein Text liegt auf dem Foto ohne opake Kartenfläche (Zahl 0), `figcaption` 0. Das Foto sitzt auf allen drei Seiten am gleichen Ort. Seite 3 bei 1440 px: kein leerer Block über 400 x 300 px im Textbereich des Kopfes (grösster leerer Rechteck im Kopfbereich neben dem Foto, gerechnet über ein 8-px-Raster der Elementflächen). |

## Bestandteile

- Wortmarke als einzige Navigation, keine Wörter ausserhalb des Textes.
- Seite 1: Arbeitsplatzfoto links (Bühne), rechts die H1, die zwei Türen als Karten über der unteren rechten Bildkante, darunter die Achse mit dem Businessfoto klein. Text/Form-Konflikt: Der Text nennt im Kopf der Weiche das Businessfoto. Der Look zeigt oben das Arbeitsplatzfoto (Leithypothese), das Businessfoto steht klein bei der Achse. Gemeldet im Bericht.
- Seite 2: Arbeitsplatzfoto und Kopf, die zwei Türen als Karten über der unteren rechten Bildkante, danach "Die Person" mit dem Arbeitsplatzfoto, wie der Text es nennt.
- Seite 3: Arbeitsplatzfoto im Kopf, danach Abschnitte im Wechsel von Weiss und grey-light, das Businessfoto bei "Mit wem du sprichst".
- Alte Fotos (Sitzporträt, KI-Arbeitsplatzfoto) kommen nirgends mehr vor, nicht im Code, nicht in `public/images/`, nicht in diesem Konzept als Bild.
