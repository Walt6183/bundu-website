#!/usr/bin/env python3
"""Erzeugt content/preise.json (Rückfall-Datei) und preise-import.ndjson (Erstbefüllung Sanity)
aus den Preiszeilen der Textdateien (content/seiten.json und SEITE3 in content/texte.ts), wortgleich.
Aufruf im Repo-Stamm: python3 scripts/preise-erzeugen.py  (nur beim ersten Mal nötig, danach ist Sanity die Wahrheit)."""
import json, re, sys

TAB = {
    '/eltern/coaching/': ('eltern-coaching', 'Eltern-Coaching', 'eltern'),
    '/fachwelt/institutionen/inhouse-fortbildung/': ('inhouse-fortbildung', 'Inhouse-Fortbildung', 'institutionen'),
    '/fachwelt/institutionen/fachinput/': ('fachinput', 'Fachinput', 'institutionen'),
    '/fachwelt/institutionen/stark-im-team/': ('stark-im-team', 'STARK im Team', 'institutionen'),
    '/fachwelt/institutionen/buendner-standard/': ('buendner-standard', 'Bündner Standard', 'institutionen'),
}

def zeile(leistung, umfang, preis):
    if preis == 'kostenlos':
        return {'leistung': leistung, 'umfang': umfang, 'preisart': 'kostenlos'}
    if preis == 'auf Anfrage':
        return {'leistung': leistung, 'umfang': umfang, 'preisart': 'anfrage'}
    m = re.fullmatch(r"CHF (\d{1,3}(?:'\d{3})*)", preis)
    if not m:
        sys.exit('Preis nicht lesbar: ' + preis)
    return {'leistung': leistung, 'umfang': umfang, 'preisart': 'betrag', 'betrag': int(m.group(1).replace("'", ''))}

d = json.load(open('content/seiten.json'))
out = {}
for route, (key, titel, bereich) in TAB.items():
    tabs = [n for a in d['seiten'][route]['abschnitte'] for n in a['knoten'] if n['k'] == 'tabelle']
    if len(tabs) != 1:
        sys.exit('Tabelle fehlt oder doppelt: ' + route)
    out[key] = {'titel': titel, 'bereich': bereich, 'zeilen': [zeile(*z) for z in tabs[0]['zeilen']]}

t = open('content/texte.ts').read()
blk = re.search(r"preise: \{.*?zeilen: \[(.*?)\n    \],", t, re.S).group(1)
rows = re.findall(r"\[('(?:[^'\\]|\\.)*'|\"[^\"]*\"), ('(?:[^'\\]|\\.)*'|\"[^\"]*\"), ('(?:[^'\\]|\\.)*'|\"[^\"]*\")\]", blk)
un = lambda s: s[1:-1]
out['online-coaching-fachpersonen'] = {'titel': 'Online-Coaching Fachpersonen', 'bereich': 'fachpersonen',
                                      'zeilen': [zeile(*map(un, r)) for r in rows]}
order = ['eltern-coaching', 'online-coaching-fachpersonen', 'inhouse-fortbildung', 'fachinput', 'stark-im-team', 'buendner-standard']
out = {k: out[k] for k in order}
json.dump(out, open('content/preise.json', 'w'), ensure_ascii=False, indent=2)
open('content/preise.json', 'a').write('\n')
with open('preise-import.ndjson', 'w') as f:
    for k, v in out.items():
        doc = {'_id': 'preisangebot-' + k, '_type': 'preisangebot', 'schluessel': k, 'titel': v['titel'], 'bereich': v['bereich'],
               'zeilen': [dict(z, _key='z%d' % i, _type='zeile') for i, z in enumerate(v['zeilen'])]}
        f.write(json.dumps(doc, ensure_ascii=False) + '\n')
print({k: len(v['zeilen']) for k, v in out.items()}, sum(len(v['zeilen']) for v in out.values()))
